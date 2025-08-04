# tonal

[![pnpm version](https://img.shields.io/pnpm/v/tonal.svg?style=flat-square)](https://www.pnpmjs.com/package/tonal)

`tonal` is a music theory library. Contains functions to manipulate tonal
elements of music (note, intervals, chords, scales, modes, keys). It deals with
abstractions (not actual music or sound).

`tonal` is implemented in Typescript and published as a collection of Javascript
pnpm packages.

It uses a functional programming style: all functions are pure, there is no data
mutation, and entities are represented by data structures instead of objects.

## Example

```js
import { Chord, Interval, Note, Scale } from "tonal";

Note.midi("C4"); // => 60
Note.freq("a4"); // => 440
Note.accidentals("c#2"); // => '#'
Note.transpose("C4", "5P"); // => "G4"
Interval.semitones("5P"); // => 7
Interval.distance("C4", "G4"); // => "5P"

// Scales
Scale.get("C major").notes; // => ["C", "D", "E", "F", "G", "A", "B"];
[1, 3, 5, 7].map(Scale.degrees("C major")); // => ["C", "E", "G", "B"]

Chord.get("Cmaj7").name; // => "C major seventh"

// Chord inversions
const triad = Chord.degrees("Cm");
[1, 2, 3].map(triad); // => ["C", "Eb", "G"];
[2, 3, 1].map(triad); // => ["Eb", "G", "C"];
[3, 1, 2].map(triad); // => ["G", "C", "Eb"];
```

## Install

Install all packages at once:

```bash
pnpm install --save tonal
```

You can read [CHANGELOG here](https://github.com/tonaljs/tonal/blob/main/docs/CHANGELOG.md).

## Usage

Tonal is compatible with both ES5 and ES6 modules, and browser.

#### ES6 `import`:

```js
import { Note, Scale } from "tonal";
```

#### ES5 `require`:

```js
const { Note, Scale } = require("tonal");
```

#### Browser

You can use the browser version from jsdelivr CDN directly in your html:

```html
<script src="https://cdn.jsdelivr.net/pnpm/tonal/browser/tonal.min.js"></script>
<script>
  console.log(Tonal.Key.minorKey("Ab"));
</script>
```

Or if you prefer, grab the
[minified browser ready version](https://raw.githubusercontent.com/tonaljs/tonal/master/packages/tonal/browser/tonal.min.js)
from the repository.

#### Bundle size

`tonal` includes all published modules.

Although the final bundle it is small, you can
reduce bundle sizes even more by installing the modules individually, and
importing only the functions you need.

Note that individual modules are prefixed with `./`. For example:

```bash
pnpm i ./note
```

```js
import { transpose } from "./note";
transpose("A4", "P5");
```

## Documentation

Visit the [documentation site](https://tonaljs.github.io/tonal/docs) or the README.md of each module 👇

#### Notes and intervals

- [./note](/packages/note): Note operations (simplify, transposeBy )
- [./midi](/packages/midi): Midi number conversions
- [./interval](/packages/interval): Interval operations (add, simplify,
  invert)
- [./abc-notation](/packages/abc-notation): Parse ABC
  notation notes

#### Scales and chords

- [./scale](/packages/scale): Scales
- [./scale-type](/packages/scale-type): A dictionary of scales
- [./chord](/packages/chord): Chords
- [./chord-type](/packages/chord-type): A dictionary of chords
- [./chord-detect](/packages/chord-detect): Detect chords from notes
- [./pcset](/packages/pcset): Pitch class sets. Compare note groups.

#### Voicings

- [./voicing](/packages/voicing/): Voicings and voice leadings for chords
- [./voice-leading](/packages/voice-leading/): Voice leading logic for transitions between voicings
- [./voicing-dictionary](/packages/voicing-dictionary/): Collections of chord voicings

#### Keys, chord progressions

- [./key](/packages/key): Major and minor keys, it's scales and chords
- [./mode](/packages/mode): A dictionary of Greek modes (ionian,
  dorian...)
- [./progression](/packages/progression): Chord progressions
- [./roman-numeral](/packages/roman-numeral): Parse roman numeral symbols

#### Time, rhythm

- [./rhythm-pattern](/packages/rhythm-pattern): Generate and manipulate rhythmic patterns
- [./time-signature](/packages/time-signature): Parse time signatures
- [./duration-value](/packages/duration-value): Note duration values

#### Utilities

- [./core](/packages/core): Core functions (note, interval, transpose and
  distance)
- [./collection](/packages/collection): Utility functions to work with
  collections (range, shuffle, permutations)
- [./range](/packages/range): Create note ranges

## Contributing

Read [contributing document](/docs/CONTRIBUTING.md). To contribute open a PR and ensure:

- If is a music theory change (like the name of a scale) link to reliable references.
- If is a new feature, add documentation: changes to README of the affected module(s) are expected.
- Ad tests: changes to the test.ts file of the affected module(s) are expected.
- All tests are green

## Inspiration

This library takes inspiration from other music theory libraries:

- Teoria: https://github.com/saebekassebil/teoria
- Impro-Visor: https://www.cs.hmc.edu/~keller/jazz/improvisor/
- MusicKit: https://github.com/benzguo/MusicKit
- Music21: https://www.music21.org/music21docs/
- Sharp11: https://github.com/jsrmath/sharp11
- python-mingus: https://github.com/bspaans/python-mingus
- Open Music Theory: https://viva.pressbooks.pub/openmusictheory/

## Projects using tonal

Showcase of projects that are using Tonal:

- [Solfej](https://www.solfej.io/) by
  [Shayan Javadi](https://github.com/ShayanJavadi)
- [EarBeater](https://www.earbeater.com/online-ear-training/) by
  [Morten Vestergaard](https://github.com/vellebelle)
- [Sonid](https://sonid.app/)
  ([play store](https://play.google.com/store/apps/details?id=org.stroopwafel.music.app),
  [apple store](https://apps.apple.com/us/app/sonid/id1490221762?ls=1)) by
  [martijnmichel](https://github.com/martijnmichel)
- [Songcraft](https://songcraft.io/) by
  [Gabe G'Sell](https://github.com/gabergg)
- [React Guitar](https://react-guitar.com/) by
  [4lejandrito](https://github.com/4lejandrito)
- [Fretty.app](https://fretty.app/) by [tfeldmann](https://github.com/tfeldmann)
- [Chordify](https://ashleymays.github.io/Chordify) by [ashleymays](https://github.com/ashleymays)
- [Chordal](https://chordal.vercel.app) by [kad1kad](https://github.com/kad1kad)
- [muted.io](https://muted.io/) by [thisisseb](https://github.com/thisisseb)
- [Midi Sandbox](https://midisandbox.com/) by [jdlee022](https://github.com/jdlee022)
- [music, eternal](https://eternal.rob.computer) by [kousun12](https://github.com/kousun12)
- [Chromatone.center](https://chromatone.center) by [davay42](https://github.com/davay42)
- [Super Oscillator](https://github.com/lukehorvat/super-oscillator) by [lukehorvat](https://github.com/lukehorvat)
- [StringScales](https://stringscales.com/) by [Ambewas](https://github.com/ambewas)
- [Polychron](https://github.com/PolychronMidi/Polychron) by [i1li](https://github.com/i1li)
- [MusicTrainer](https://musictrainer.barnman.cc) by [zilongliu](https://github.com/Zilong-L)

Thank you all!

Add your project here by
[editing this file](https://github.com/tonaljs/tonal/edit/main/README.md)

## License

[MIT License](docs/LICENSE)
