class SoundonikaEngine {
    constructor() {
        this.sampleIndex = {};
        this.sampleBasePath = '../samples';
        this.samples = new Map();
    }

    async loadSampleIndex() {
        const response = await fetch(`${this.sampleBasePath}/sample-index.json`);
        this.sampleIndex = await response.json();
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
        audio.volume = 0.8;
        audio.play().then(() => {
            // Audio playback started successfully
        });
    }
}
