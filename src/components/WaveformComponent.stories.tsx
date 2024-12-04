import { Meta, StoryFn } from '@storybook/react';
import WaveformComponent, { WaveformComponentProps } from './WaveformComponent';

export default {
  title: 'Components/WaveformComponent',
  component: WaveformComponent,
  argTypes: {
    url: { control: 'text' },
    waveColor: { control: 'color' },
    progressColor: { control: 'color' },
    height: { control: 'number' },
  },
  parameters: {
    // Optional: Add layout parameter if you want to control the padding/width
    layout: 'padded',
  },
} as Meta<WaveformComponentProps>;

const Template: StoryFn<WaveformComponentProps> = (args) => (
  <div style={{ maxWidth: '800px' }}>
    <WaveformComponent {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  url: '/sample.mp3', // Using the audio file from public directory
  waveColor: '#333',
  progressColor: '#666',
  height: 100,
};

// Optional: Add more stories with different configurations
export const TallWaveform = Template.bind({});
TallWaveform.args = {
  url: '/sample.mp3',
  waveColor: '#2196f3',
  progressColor: '#1976d2',
  height: 200,
};
