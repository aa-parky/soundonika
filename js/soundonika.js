class SoundonikaEngine {
    constructor(audioContext) {
        this.audioContext = audioContext;  // NEW
        this.sampleIndex = {};
        this.sampleBasePath = '../samples';
        this.samples = new Map();
        this.volume = 0.8;
        this.mode = 'samples';
    }

    async loadSampleIndex() {
        const response = await fetch(`${this.sampleBasePath}/sample-index.json`);
        this.sampleIndex = await response.json();
    }

    setVolume(vol) {
        this.volume = vol;
    }

    getVolume() {
        return this.volume;
    }

    setSoundMode(mode) {
        this.mode = mode;
    }

    getSoundMode() {
        return this.mode;
    }

    getAvailableSampleCategories() {
        return Object.keys(this.sampleIndex);
    }

    getSamplePacksForCategory(category) {
        return this.sampleIndex[category] ? Object.keys(this.sampleIndex[category]) : [];
    }

    getSamplesForPack(category, pack) {
        if (this.sampleIndex[category] && this.sampleIndex[category][pack]) {
            return this.sampleIndex[category][pack];
        }
        return [];
    }

    previewSample(category, pack, filename) {
        const url = `${this.sampleBasePath}/${category}/${pack}/${filename}`;
        const audio = new Audio(url);
        audio.volume = this.volume;
        audio.play().then(() => {
            // success
        });
    }

    playClickSound(name) {
        const osc = this.audioContext.createOscillator();  // Use shared context
        const gain = this.audioContext.createGain();

        osc.frequency.value = name === 'kick' ? 100 : 300;
        gain.gain.value = this.volume;

        osc.connect(gain).connect(this.audioContext.destination);
        osc.start();
        osc.stop(this.audioContext.currentTime + 0.1);
    }
}