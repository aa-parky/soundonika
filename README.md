# 🧃 Soundonika

**Soundonika** is a modular audio engine designed to support the wider [Tonika](https://github.com/aa-parky/tonika) ecosystem. It provides simple, programmatic access to sound playback, including sample kits and oscillator-based fallback clicks.

It is intentionally **headless** — there is no UI, styling, or layout. That’s the job of the `*onika` modules (like `rhythonika`, `catchonika`, etc.). Soundonika is focused entirely on **sound generation and playback**, with a lightweight API and built-in WebAudio scheduling.

---

## 🎯 Philosophy

### ✅ What Soundonika _is_:

- A **headless audio scheduler** for `*onika` modules
- A **sample kit repository** (currently percussion, but extensible)
- An **API-driven backend** for audio playback
- A **fallback system** using oscillator-based click tones

### 🚫 What Soundonika _is not_:

- ❌ A UI
- ❌ A MIDI handler
- ❌ A sequencer or rhythm generator
- ❌ A transport manager
- ❌ A layout or style engine

---

## ⚙️ Basic Usage

### 1. Include the engine:

```html
<script src="js/soundonika.js"></script>
```

### 2. Init from user interaction:

```js
const ctx = new AudioContext();
const engine = new SoundonikaEngine(ctx);
await engine.loadSampleIndex(); // Load the available samples
```

### 3. Play a sound:

```js
// Play a fallback click sound
engine.playClickSound("kick");

// Preview a sample (used in the demo)
engine.previewSample("percussion", "DopeDrumsVol5", "DD5_Kick_01.wav");
```

---

## 🧠 API

| Status | Method                                    | Description                                               |
| :----: | ----------------------------------------- | --------------------------------------------------------- |
|   ✅   | `new SoundonikaEngine(audioContext)`      | Creates a new engine instance.                            |
|   ✅   | `async loadSampleIndex()`                 | Loads the sample index file.                              |
|   ✅   | `setVolume(0–1)`                          | Sets the master output gain.                              |
|   ✅   | `setSoundMode('clicks' or 'samples')`     | Switches the playback engine.                             |
|   ✅   | `getSoundMode()`                          | Returns `'clicks'` or `'samples'`.                        |
|   ✅   | `getAvailableSampleCategories()`          | Returns an array of sample categories.                    |
|   ✅   | `getSamplePacksForCategory(category)`     | Returns an array of packs for a category.                 |
|   ✅   | `getSamplesForPack(category, pack)`       | Returns an array of samples in a pack.                    |
|   ✅   | `previewSample(category, pack, filename)` | Plays a sample using HTML5 Audio (for demo).              |
|   ✅   | `playClickSound(name)`                    | Plays a fallback click sound.                             |
|   ⬜️   | `init()`                                  | **TBI**: Loads samples into memory for WebAudio playback. |
|   ⬜️   | `scheduleSound(time, type, velocity?)`    | **TBI**: Schedules a sound with precise timing.           |
|   ⬜️   | `getVolume()`                             | **TBI**: Returns the current volume (float).              |

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

## 🚀 Future Plans

- [ ] **Core Audio Engine**
    - [ ] Implement `init()` to pre-load samples into memory.
    - [ ] Implement `scheduleSound()` for precise WebAudio scheduling.
    - [ ] Implement `getVolume()`.
    - [ ] Add proper gain staging and velocity support.
- [ ] **Sample Management**
    - [ ] Implement kit switching via `getSampleConfig(kitName)`.
    - [ ] Add a basic (headless) sample browser.
- [ ] **Advanced Features**
    - [ ] Support optional CDN sample paths (e.g., jsDelivr).
    - [ ] Add MIDI trigger support.
    - [ ] Allow routing to other WebAudio nodes (for FX chains).
    - [ ] Implement event listeners (e.g., `onSampleLoad`).

---

## 🤝 Contributing

We welcome:

- Community kits (CC0/Free/Open)
- Bug fixes, suggestions, and improvements
- Refactoring or general feedback

> Please ensure samples are under 1MB each and licensed appropriately.

---

## 🎛 Demo

Open [demo/soundonika.html](demo/soundonika.html) in a browser to test the current functionality:

- ✅ **Working Features:**
    - Audio context initialization
    - Mode switching between clicks and samples
    - Volume control
    - Sample browsing and selection
    - Click sound generation
    - Sample preview playback

- ⬜️ **Demo Features Pending Core Implementation:**
    - Precise audio scheduling
    - WebAudio-based sample playback
    - Velocity-sensitive playback

---

## 📁 Directory Structure

```
soundonika/
├── js/
│   └── soundonika.js        # The engine (current: 62 lines)
├── samples/
│   ├── sample-index.json    # Sample catalog
│   └── percussion/
│       ├── DopeDrumsVol5/   # 64 drum samples
│       └── VinylDrumKitsVol1/ # 64 drum samples
├── demo/
│   └── soundonika.html      # Live test interface
└── README.md
```

---

## 🧩 Integration Diagram (Current vs. Planned)

### Current Implementation:

```
+------------------+                 +----------------------+
|   Demo HTML      |                 |   SoundonikaEngine   |
|  (UI + Logic)    |                 |  (Sample Browser)    |
+------------------+                 +----------------------+
        |                                     |
        |  const ctx = new AudioContext();    |
        |  const engine =                     |
        |      new SoundonikaEngine(ctx);     |
        |                                     |
        |------------------------------------>|
        |    await engine.loadSampleIndex();  |
        |                                     |
        |   engine.previewSample(...)         |
        |------------------------------------>|
        |                                     V
        |                         Plays via HTML5 Audio
```

### Planned Implementation:

```
+------------------+                 +----------------------+
|   Rhythonika     |                 |   Soundonika Engine  |
|  (UI + Logic)    |                 |  (WebAudio Scheduler)|
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
        |                    Plays via WebAudio with precise timing
```

---

## 🔧 Implementation Status

### ✅ Completed (Ready for Use)

- Basic class structure and constructor
- Sample index loading and management
- Sample browsing API (categories, packs, samples)
- Volume control
- Mode switching
- Oscillator-based click sounds
- HTML5 Audio sample preview (for demo)

### ⬜️ To Be Implemented (TBI)

- **Critical for Production Use:**
    - Global namespace export (`window.Soundonika = { Engine: SoundonikaEngine }`)
    - `init()` method for sample preloading
    - `scheduleSound()` method for precise timing
    - `getVolume()` getter method
    - WebAudio-based sample playback
    - Proper error handling and validation

- **Enhanced Features:**
    - Velocity-sensitive gain staging
    - Sample caching and memory management
    - Sound type mapping (accent → kick, normal → hihat_closed)
    - Event system for notifications
    - Kit switching functionality

---

## 🎛️ The Curated Tonika Frontend

Tonika includes a default browser-based UI that brings together a suite of `*onika` tools. These modules can be used independently or as part of the curated experience.

| Module                                                  | Description                                                  |
| ------------------------------------------------------- | ------------------------------------------------------------ |
| 🎹 [Clavonika](https://github.com/aa-parky/clavonika)   | An 88-key interactive MIDI piano keyboard.                   |
| 🎚️ [Midonika](https://github.com/aa-parky/midonika)     | Visualize and debug live MIDI input/output messages.         |
| 🔌 [Jackonika](https://github.com/aa-parky/jackonika)   | Your MIDI patchbox: listens, connects, and routes.           |
| 🎙️ [Catchonika](https://github.com/aa-parky/catchonika) | Always listening—capture spontaneous ideas and takes.        |
| 🎼 [Chordonika](https://github.com/aa-parky/chordonika) | Explore chords, visualize voicings, find that special sound. |
| 🥁 [Rhythonika](https://github.com/aa-parky/rhythonika) | Smart metronome and rhythm trainer with creative patterns.   |

Each of these modules is being developed to work independently or within the **Tonika rack**.

---

## 📜 License

MIT © [aa-parky](https://github.com/aa-parky)
