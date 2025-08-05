import { Chord, Midi } from "@pakholeung37/tonal";

const detect = Chord.detect;
const midiToNoteName = Midi.midiToNoteName;
// Web MIDI API类型声明
declare global {
  interface Navigator {
    requestMIDIAccess(): Promise<MIDIAccess>;
  }
}

interface MIDIAccess {
  inputs: Map<string, MIDIInput>;
  outputs: Map<string, MIDIOutput>;
  onstatechange: ((event: MIDIConnectionEvent) => void) | null;
}

interface MIDIInput {
  name: string;
  manufacturer: string;
  onmidimessage: ((event: MIDIMessageEvent) => void) | null;
}

interface MIDIOutput {
  name: string;
  manufacturer: string;
}

interface MIDIConnectionEvent {
  port: MIDIInput | MIDIOutput;
}

interface MIDIMessageEvent {
  data: Uint8Array;
}

// MIDI状态管理
class MidiChordDetector {
  private activeNotes: Set<number> = new Set();
  private midiAccess: MIDIAccess | null = null;
  private statusElement: HTMLElement | null = null;
  private devicesElement: HTMLElement | null = null;
  private notesElement: HTMLElement | null = null;
  private chordsElement: HTMLElement | null = null;

  constructor() {
    this.initializeElements();
    this.initializeMidi();
  }

  private initializeElements() {
    this.statusElement = document.getElementById("midi-status");
    this.devicesElement = document.getElementById("midi-devices");
    this.notesElement = document.getElementById("current-notes");
    this.chordsElement = document.getElementById("detected-chords");
  }

  private async initializeMidi() {
    try {
      if (!navigator.requestMIDIAccess) {
        this.updateStatus("error", "浏览器不支持Web MIDI API");
        return;
      }

      this.updateStatus("connecting", "正在请求MIDI访问权限...");
      this.midiAccess = await navigator.requestMIDIAccess();

      this.updateStatus("connected", "MIDI访问已授权");
      this.setupMidiDevices();
    } catch (error) {
      console.error("MIDI初始化失败:", error);
      this.updateStatus("error", `MIDI初始化失败: ${(error as Error).message}`);
    }
  }

  private setupMidiDevices() {
    if (!this.midiAccess) return;

    this.updateDevicesList();

    // 监听设备连接/断开
    this.midiAccess.onstatechange = () => {
      this.updateDevicesList();
    };

    // 为所有输入设备设置消息处理器
    for (const input of this.midiAccess.inputs.values()) {
      input.onmidimessage = (message: MIDIMessageEvent) =>
        this.handleMidiMessage(message);
    }
  }

  private updateDevicesList() {
    if (!this.midiAccess || !this.devicesElement) return;

    const inputs = Array.from(this.midiAccess.inputs.values());

    if (inputs.length === 0) {
      this.devicesElement.innerHTML = "暂无MIDI输入设备";
      return;
    }

    const deviceList = inputs
      .map(
        (input) =>
          `<div><strong>${input.name}</strong> - ${input.manufacturer || "未知制造商"}</div>`,
      )
      .join("");

    this.devicesElement.innerHTML = deviceList;
  }

  private handleMidiMessage(message: MIDIMessageEvent) {
    const [status, note, velocity] = message.data;
    const messageType = status & 0xf0;

    // Note On (velocity > 0) 或 Note Off (velocity = 0 或 0x80)
    if (messageType === 0x90 && velocity > 0) {
      // Note On
      this.activeNotes.add(note);
    } else if (
      messageType === 0x80 ||
      (messageType === 0x90 && velocity === 0)
    ) {
      // Note Off
      this.activeNotes.delete(note);
    }

    this.updateDisplay();
  }

  private updateDisplay() {
    this.updateNotesDisplay();
    this.updateChordsDisplay();
  }

  private updateNotesDisplay() {
    if (!this.notesElement) return;

    if (this.activeNotes.size === 0) {
      this.notesElement.innerHTML = "请弹奏音符...";
      return;
    }

    const noteNames = Array.from(this.activeNotes)
      .sort((a, b) => a - b)
      .map((note) => {
        const noteName = midiToNoteName(note);
        return `<span class="note">${noteName}</span>`;
      })
      .join("");

    this.notesElement.innerHTML = noteNames;
  }

  private updateChordsDisplay() {
    if (!this.chordsElement) return;

    if (this.activeNotes.size < 2) {
      this.chordsElement.innerHTML = "需要至少2个音符来检测和弦...";
      return;
    }

    // 将MIDI音符转换为音符名称
    const noteNames = Array.from(this.activeNotes)
      .sort((a, b) => a - b)
      .map((note) => midiToNoteName(note, { pitchClass: true }));

    // 使用detect函数检测和弦
    const chords = detect(noteNames);

    if (chords.length === 0) {
      this.chordsElement.innerHTML = "未检测到已知和弦";
      return;
    }

    // 显示检测到的和弦，第一个是最匹配的
    const chordsHtml = chords
      .map((chord, index) => {
        const className = index === 0 ? "chord primary" : "chord";
        return `<span class="${className}">${chord}</span>`;
      })
      .join("");

    this.chordsElement.innerHTML = chordsHtml;
  }

  private updateStatus(
    type: "connecting" | "connected" | "error",
    message: string,
  ) {
    if (!this.statusElement) return;

    this.statusElement.className = `status ${type}`;
    this.statusElement.textContent = message;
  }
}

// 等待DOM加载完成后初始化
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new MidiChordDetector();
  });
} else {
  new MidiChordDetector();
}

// 将类导出到全局，便于调试
(window as any).MidiChordDetector = MidiChordDetector;
