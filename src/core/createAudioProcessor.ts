import { createEventEmitter } from './createEventEmitter';

export const createAudioProcessor = () => {
  const audioContext = new AudioContext();
  let audioBuffer: AudioBuffer | null = null;
  const emitter = createEventEmitter();

  const resumeAudioContext = async () => {
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }
  };

  const decode = async (arrayBuffer: ArrayBuffer): Promise<AudioBuffer> => {
    try {
      await resumeAudioContext();
      audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      emitter.emit('decoded', audioBuffer);
      return audioBuffer;
    } catch (error) {
      emitter.emit('error', 'Failed to decode audio data');
      throw error;
    }
  };

  const getPeaks = (width: number, channel = 0): number[] => {
    if (!audioBuffer) {
      throw new Error('No audio buffer available');
    }

    const channelData = audioBuffer.getChannelData(channel);
    const peaks: number[] = [];
    const step = Math.ceil(channelData.length / width);

    for (let i = 0; i < width; i++) {
      let min = 1.0;
      let max = -1.0;

      for (let j = 0; j < step; j++) {
        const datum = channelData[i * step + j];
        if (datum < min) min = datum;
        if (datum > max) max = datum;
      }

      peaks.push(min, max);
    }

    return peaks;
  };

  const loadFromUrl = async (url: string): Promise<void> => {
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      await decode(arrayBuffer);
    } catch (error) {
      emitter.emit('error', 'Failed to load audio file');
      throw error;
    }
  };

  return {
    decode,
    getPeaks,
    loadFromUrl,
    on: emitter.on,
    off: emitter.off,
    getAudioBuffer: () => audioBuffer,
    getContext: () => audioContext,
    resumeAudioContext,
  };
};
