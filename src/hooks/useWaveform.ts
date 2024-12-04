import { useEffect, useRef, useState, useCallback } from 'react';
import { createAudioProcessor } from '../core/createAudioProcessor';
import { createDrawer } from '../core/createDrawer';

interface WaveformOptions {
  container: string;
  url?: string;
  waveColor?: string;
  progressColor?: string;
  height?: number;
}

export const useWaveform = (options: WaveformOptions) => {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const audioProcessorRef = useRef(createAudioProcessor());
  const drawerRef = useRef<ReturnType<typeof createDrawer> | null>(null);

  useEffect(() => {
    const container = document.querySelector(options.container);
    if (!container || !(container instanceof HTMLElement)) {
      setError('Container not found');
      return;
    }

    drawerRef.current = createDrawer(container, {
      waveColor: options.waveColor,
      progressColor: options.progressColor,
      height: options.height,
    });

    const audioProcessor = audioProcessorRef.current;

    audioProcessor.on('decoded', () => {
      setIsReady(true);
      updateWaveform();
    });

    audioProcessor.on('error', (err: string) => setError(err));

    if (options.url) {
      audioProcessor.loadFromUrl(options.url);
    }

    return () => {
      container.innerHTML = '';
    };
  }, [options.container]);

  const updateWaveform = useCallback(() => {
    if (!isReady || !drawerRef.current) return;

    const container = document.querySelector(options.container);
    if (!container) return;

    const peaks = audioProcessorRef.current.getPeaks(container.clientWidth);
    drawerRef.current.drawWaveform(peaks, progress);
  }, [isReady, progress, options.container]);

  const setWaveformProgress = useCallback((newProgress: number) => {
    setProgress(Math.max(0, Math.min(1, newProgress)));
  }, []);

  useEffect(() => {
    updateWaveform();
  }, [progress, updateWaveform]);

  return {
    isReady,
    error,
    progress,
    setProgress: setWaveformProgress,
    audioProcessor: audioProcessorRef.current,
  };
};
