# 🧃 Soundonika

**Soundonika** is a modular audio engine designed to support the wider [Tonika](https://github.com/aa-parky/tonika) ecosystem. It provides simple, programmatic access to sound playback, including sample kits and oscillator-based fallback clicks.

It is intentionally **headless** — there is no UI, styling, or layout. That’s the job of the `*onika` modules (like `rhythonika`, `catchonika`, etc.). Soundonika is focused entirely on **sound generation and playback**, with a lightweight API and built-in WebAudio scheduling.

---

## 🎛️ The Curated Tonika Frontend

Tonika includes a default browser-based UI that brings together a suite of `*onika` tools. These modules can be used independently or as part of the curated experience.

| Module                                                   | Description                                                  |
|----------------------------------------------------------|--------------------------------------------------------------|
| 🎹 [Clavonika](https://github.com/aa-parky/clavonika)    | An 88-key interactive MIDI piano keyboard.                   |
| 🎚️ [Midonika](https://github.com/aa-parky/midonika)     | Visualize and debug live MIDI input/output messages.         |
| 🔌 [Jackonika](https://github.com/aa-parky/jackonika)    | Your MIDI patchbox: listens, connects, and routes.           |
| 🎙️ [Catchonika](https://github.com/aa-parky/catchonika) | Always listening—capture spontaneous ideas and takes.        |
| 🎼 [Chordonika](https://github.com/aa-parky/chordonika)  | Explore chords, visualize voicings, find that special sound. |
| 🥁 [Rhythonika](https://github.com/aa-parky/rhythonika)  | Smart metronome and rhythm trainer with creative patterns.   |

Each of these modules is being developed to work independently or within the **Tonika rack**.


## 🎯 Philosophy

### ✅ What Soundonika *is*:

- A **headless audio scheduler** for `*onika` modules
- A **sample kit repository** (currently percussion, but extensible)
- An **API-driven backend** for audio playback
- A **fallback system** using oscillator-based click tones
- A consistent **gain + velocity + volume** gain shaper
- A **modular core**, capable of powering rhythm modules, sequencers, samplers, and more

### 🚫 What Soundonika *is not*:

- ❌ A UI
- ❌ A MIDI handler
- ❌ A sequencer or rhythm generator
- ❌ A transport manager
- ❌ A layout or style engine

---

## 🧩 Integration Diagram (ASCII)

```
+------------------+                 +----------------------+
|   Rhythonika     |                 |   Soundonika Engine  |
|  (UI + Logic)    |                 |  (Headless Backend)  |
+------------------+                 +----------------------+
        |                                     |
        |  const ctx = new AudioContext();    |
        |  const engine =                     |
        |      new Soundonika.Engine(ctx);    |
        |                                     |
        |------------------------------------>|
        |         await engine.init();        |
        |                                     |
        |   engine.scheduleSound(...)         |
        |------------------------------------>|
        |                                     V
        |                            Plays audio via WebAudio
```

---

## ⚙️ Basic Usage

### 1. Include the engine:

```html
<script src="js/soundonika.js"></script>
```

### 2. Init from user interaction:

```js
const ctx = new AudioContext();
const engine = new Soundonika.Engine(ctx);
await engine.init();  // Loads samples if needed
```

### 3. Play a sound:

```js
const now = ctx.currentTime;
engine.scheduleSound(now + 0.1, 'kick', 1.0);
```

---

## 🧠 API

| Method                                 | Description                       |
|----------------------------------------|-----------------------------------|
| `init()`                               | Loads samples (if in sample mode) |
| `setSoundMode('clicks'                 | 'samples')`                       | Switches playback engine |
| `setVolume(0–1)`                       | Sets master output gain           |
| `scheduleSound(time, type, velocity?)` | Play a sound                      |
| `getSoundMode()`                       | Returns `'clicks'` or `'samples'` |
| `getVolume()`                          | Returns current volume (float)    |

### Sound Types Supported

- `'kick'`
- `'snare'`
- `'hihat_closed'`
- `'hihat_open'`
- `'perc'`
- `'shaker'`
- `'accent'` (maps to `kick`)
- `'normal'` (maps to `hihat_closed` by default)

---

## 📁 Directory Structure

```
soundonika/
├── js/
│   └── soundonika.js        # The engine
├── samples/
│   └── percussion/
│       ├── DopeDrumsVol5/
│       └── VinylDrumKitsVol1/
├── demo/
│   └── index.html           # Live test interface
└── README.md
```

---

## 🎛 Demo

Open [demo/index.html](demo/soundonika.html) in a browser to test:

- Init engine
- Switch sound modes
- Adjust volume
- Trigger test sounds manually

---

## 🚀 Future Plans

- ✅ Kit switching: support for `getSampleConfig(kitName)`
- ✅ Add basic sample browser (headless)
- 🔜 Optional CDN sample paths (via jsDelivr)
- 🔜 MIDI trigger support
- 🔜 Routing to WebAudio nodes (for FX chains)
- 🔜 Event listeners (e.g. `onSampleLoad`)

---

## 🤝 Contributing

We welcome:

- Community kits (CC0/Free/Open)
- Bug fixes, suggestions, and improvements
- Refactoring or general feedback

> Please ensure samples are under 1MB each and licensed appropriately.

---

## 📜 License

MIT © [aa-parky](https://github.com/aa-parky)