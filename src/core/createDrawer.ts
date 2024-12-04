interface DrawerOptions {
  waveColor: string;
  progressColor: string;
  height: number;
  pixelRatio: number;
}

export const createDrawer = (container: HTMLElement, initialOptions: Partial<DrawerOptions> = {}) => {
  const canvas = document.createElement('canvas');
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get canvas context');

  const options: DrawerOptions = {
    waveColor: '#999',
    progressColor: '#555',
    height: 128,
    pixelRatio: window.devicePixelRatio || 1,
    ...initialOptions,
  };

  const setDimensions = () => {
    const { width } = canvas.parentElement?.getBoundingClientRect() || { width: 0 };
    canvas.width = width * options.pixelRatio;
    canvas.height = options.height * options.pixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${options.height}px`;
    ctx.scale(options.pixelRatio, options.pixelRatio);
  };

  const drawWaveform = (peaks: number[], progress = 0) => {
    const { width, height } = canvas;
    const halfHeight = height / (2 * options.pixelRatio);

    ctx.clearRect(0, 0, width, height);

    // Draw waveform
    ctx.beginPath();
    ctx.strokeStyle = options.waveColor;
    ctx.lineWidth = 1;

    const step = Math.floor(peaks.length / width);
    let i: number;

    ctx.moveTo(0, halfHeight);
    for (i = 0; i < width; i++) {
      const peak = peaks[i * step];
      ctx.lineTo(i, halfHeight + peak * halfHeight);
    }
    ctx.stroke();

    // Draw progress
    if (progress > 0) {
      const progressWidth = width * progress;
      ctx.beginPath();
      ctx.strokeStyle = options.progressColor;

      for (i = 0; i < progressWidth; i++) {
        const peak = peaks[i * step];
        ctx.lineTo(i, halfHeight + peak * halfHeight);
      }
      ctx.stroke();
    }
  };

  setDimensions();

  return {
    drawWaveform,
    setDimensions,
    getCanvas: () => canvas,
    updateOptions: (newOptions: Partial<DrawerOptions>) => {
      Object.assign(options, newOptions);
    },
  };
};
