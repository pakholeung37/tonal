import * as AbcNotation from "./abc-notation";
import * as Array from "./array";
import * as Chord from "./chord";
import * as ChordType from "./chord-type";
import * as Collection from "./collection";
import * as DurationValue from "./duration-value";
import * as Interval from "./interval";
import * as Key from "./key";
import * as Midi from "./midi";
import * as Mode from "./mode";
import * as Note from "./note";
import * as Pcset from "./pcset";
import * as Progression from "./progression";
import * as Range from "./range";
import * as RhythmPattern from "./rhythm-pattern";
import * as RomanNumeral from "./roman-numeral";
import * as Scale from "./scale";
import * as ScaleType from "./scale-type";
import * as TimeSignature from "./time-signature";
import * as VoiceLeading from "./voice-leading";
import * as Voicing from "./voicing";
import * as VoicingDictionary from "./voicing-dictionary";

export * from "./core";

// deprecated (backwards compatibility)
import * as Core from "./core";
/** @deprecated */
const Tonal = Core;
/** @deprecated */
const PcSet = Pcset;
/** @deprecated */
const ChordDictionary = ChordType;
/** @deprecated */
const ScaleDictionary = ScaleType;

export {
  AbcNotation,
  Array,
  Chord,
  ChordDictionary,
  ChordType,
  Collection,
  Core,
  DurationValue,
  Interval,
  Key,
  Midi,
  Mode,
  Note,
  PcSet,
  Pcset,
  Progression,
  Range,
  RhythmPattern,
  RomanNumeral,
  Scale,
  ScaleDictionary,
  ScaleType,
  TimeSignature,
  Tonal,
  VoiceLeading,
  Voicing,
  VoicingDictionary,
};
