import { useEffect, useRef } from 'react';
import { useWaveform } from '@/hooks/useWaveform';

export interface WaveProps {
  mediaElementId: string;
  height?: number;
  waveColor?: string;
  progressColor?: string;
  onReady?: () => void;
  children?: React.ReactNode;
}

export const Wave = ({ mediaElementId, height, waveColor, progressColor, onReady }: WaveProps) => {
  const waveformRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef<HTMLCanvasElement>(null);
  const { isReady } = useWaveform(waveformRef, progressRef, { mediaElementId, waveColor });

  useEffect(() => {
    if (isReady) onReady?.();
  }, [isReady, onReady]);

  return (
    <div className="relative w-full">
      <canvas ref={waveformRef} className="w-full absolute top-0 left-0" height={height} />
      <canvas ref={progressRef} className="w-full absolute top-0 left-0" height={height} />
    </div>
  );
};
