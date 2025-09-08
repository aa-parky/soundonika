# 🧃 Soundonika

**Soundonika** is a modular audio engine designed to support the wider [Tonika](https://github.com/aa-parky/tonika) ecosystem. It provides simple, programmatic access to sound playback, including sample kits and oscillator-based fallback clicks.

It is intentionally **headless** — there is no UI, styling, or layout. That's the job of the `*onika` modules (like `rhythonika`, `catchonika`, etc.). Soundonika is focused entirely on **sound generation and playback**, with a lightweight API and built-in WebAudio scheduling.

---
# Current State
after much tweaking Soundonika will be moved into the Core Tonika repo

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


## 📜 License

MIT © [aa-parky](https://github.com/aa-parky)
