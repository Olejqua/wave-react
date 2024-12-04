import React from 'react';
import { useWaveform } from '../hooks/useWaveform';

export interface WaveformComponentProps {
  url: string;
  waveColor?: string;
  progressColor?: string;
  height?: number;
}

const WaveformComponent: React.FC<WaveformComponentProps> = ({ url, waveColor, progressColor, height }) => {
  const { isReady, error, progress, setProgress, audioProcessor } = useWaveform({
    container: '#waveform-container',
    url,
    waveColor,
    progressColor,
    height,
  });

  const handleResume = async () => {
    try {
      await audioProcessor.resumeAudioContext();
    } catch (err) {
      console.error('Failed to resume audio context:', err);
    }
  };

  return (
    <div>
      <div id="waveform-container" style={{ width: '100%', height: height || 100 }} />
      {error && <div>Error: {error}</div>}
      {!isReady && <button onClick={handleResume}>Start Audio</button>}
      {isReady && (
        <div>
          <div>Progress: {Math.round(progress * 100)}%</div>
          <button onClick={() => setProgress(0.5)}>Jump to 50%</button>
        </div>
      )}
    </div>
  );
};

export default WaveformComponent;
