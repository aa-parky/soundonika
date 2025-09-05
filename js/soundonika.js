// js/soundonika.js
// Modular audio engine for Tonika modules (formerly Rhythonika)
// Handles both click sounds and drum samples

class SoundonikaEngine {
    constructor(audioContext) {
        this.ctx = audioContext;
        this.soundMode = localStorage.getItem('rhyth_sound_mode') || 'clicks';
        this.volume = parseFloat(localStorage.getItem('rhyth_volume')) || 0.7;

        this.samples = new Map();
        this.isLoading = false;
        this.loadingPromise = null;

        this.sampleConfig = {
            kick: 'https://cdn.jsdelivr.net/gh/aa-parky/soundonika@main/samples/percussion/DopeDrumsVol5/DD5_Kick_01.wav',
            snare: 'https://cdn.jsdelivr.net/gh/aa-parky/soundonika@main/samples/percussion/DopeDrumsVol5/DD5_Snare_01.wav',
            hihat_closed: 'https://cdn.jsdelivr.net/gh/aa-parky/soundonika@main/samples/percussion/DopeDrumsVol5/DD5_CH_01.wav',
            hihat_open: 'https://cdn.jsdelivr.net/gh/aa-parky/soundonika@main/samples/percussion/DopeDrumsVol5/DD5_OH_01.wav',
            perc: 'https://cdn.jsdelivr.net/gh/aa-parky/soundonika@main/samples/percussion/DopeDrumsVol5/DD5_Perc_01.wav',
            shaker: 'https://cdn.jsdelivr.net/gh/aa-parky/soundonika@main/samples/percussion/DopeDrumsVol5/DD5_Shk_01.wav'
        };
    }

    async init() {
        if (this.soundMode === 'samples' && this.samples.size === 0) {
            await this.loadSamples();
        }
    }

    async loadSamples() {
        if (this.isLoading) return this.loadingPromise;

        this.isLoading = true;
        this.loadingPromise = this._loadSamplesInternal();

        try {
            await this.loadingPromise;
        } finally {
            this.isLoading = false;
        }

        return this.loadingPromise;
    }

    async _loadSamplesInternal() {
        const loadPromises = [];

        for (const [sampleType, url] of Object.entries(this.sampleConfig)) {
            loadPromises.push(this._loadSample(sampleType, url));
        }

        const results = await Promise.all(loadPromises);
        const successCount = results.filter(result => result).length;

        if (successCount === results.length) {
            console.log('Soundonika: All samples loaded successfully');
        } else if (successCount > 0) {
            console.log(`Soundonika: ${successCount}/${results.length} samples loaded`);
        } else {
            console.warn('Soundonika: No samples could be loaded. Using fallback clicks.');
        }
    }

    async _loadSample(sampleType, url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                console.warn(`Soundonika: Failed to load ${sampleType}: HTTP ${response.status}`);
                return false;
            }

            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await this.ctx.decodeAudioData(arrayBuffer);
            this.samples.set(sampleType, audioBuffer);

            console.log(`Soundonika: Loaded ${sampleType}`);
            return true;
        } catch (err) {
            console.warn(`Soundonika: Error loading ${sampleType}:`, err.message);
            return false;
        }
    }

    async setSoundMode(mode) {
        if (mode === this.soundMode) return;

        this.soundMode = mode;
        localStorage.setItem('rhyth_sound_mode', mode);

        if (mode === 'samples' && this.samples.size === 0) {
            await this.loadSamples();
        }
    }

    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        localStorage.setItem('rhyth_volume', this.volume.toString());
    }

    scheduleSound(time, soundType, velocity = 1.0) {
        if (this.soundMode === 'clicks') {
            this._scheduleClick(time, soundType, velocity);
        } else {
            this._scheduleSample(time, soundType, velocity);
        }
    }

    _scheduleClick(time, soundType, velocity = 1.0) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        let freq, gainLevel;
        switch (soundType) {
            case 'accent':
            case 'kick': freq = 2000; gainLevel = 0.28; break;
            case 'snare': freq = 1500; gainLevel = 0.22; break;
            case 'hihat':
            case 'hihat_closed': freq = 3000; gainLevel = 0.15; break;
            default: freq = 1000; gainLevel = 0.18;
        }

        osc.type = "square";
        osc.frequency.setValueAtTime(freq, time);

        const finalGain = gainLevel * velocity * this.volume;

        gain.gain.setValueAtTime(0.001, time);
        gain.gain.exponentialRampToValueAtTime(finalGain, time + 0.002);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

        osc.connect(gain).connect(this.ctx.destination);
        osc.start(time);
        osc.stop(time + 0.06);
    }

    _scheduleSample(time, soundType, velocity = 1.0) {
        const sampleType = this._mapSoundTypeToSample(soundType);
        const buffer = this.samples.get(sampleType);

        if (!buffer) {
            console.warn(`Soundonika: Sample ${sampleType} not loaded. Falling back to click.`);
            this._scheduleClick(time, soundType, velocity);
            return;
        }

        const source = this.ctx.createBufferSource();
        const gain = this.ctx.createGain();

        source.buffer = buffer;
        gain.gain.setValueAtTime(velocity * this.volume, time);

        source.connect(gain).connect(this.ctx.destination);
        source.start(time);
    }

    _mapSoundTypeToSample(soundType) {
        switch (soundType) {
            case 'accent':
            case 'kick': return 'kick';
            case 'snare': return 'snare';
            case 'hihat':
            case 'hihat_closed': return 'hihat_closed';
            case 'hihat_open': return 'hihat_open';
            case 'perc': return 'perc';
            case 'shaker': return 'shaker';
            default: return 'hihat_closed';
        }
    }

    getSoundMode() {
        return this.soundMode;
    }

    getVolume() {
        return this.volume;
    }
}

// Browser global
window.Soundonika = {
    Engine: SoundonikaEngine
};