import { Story } from '@storybook/react/types-6-0';

import FitBoundsControl from 'components/map/controls/fit-bounds';
import ZoomControl from 'components/map/controls/zoom';

import Controls from './component';
import { ControlsProps } from './types';

const StoryControls = {
  title: 'Components/Map/Controls',
  component: Controls,
};

export default StoryControls;

const Template: Story<ControlsProps> = (args) => {
  return (
    <div className="relative h-24">
      <Controls {...args}>
        <ZoomControl />

        <FitBoundsControl
          bounds={{
            bbox: [10.5194091796875, 43.6499881760459, 10.9588623046875, 44.01257086123085],
            options: {
              padding: 50,
              duration: 1500,
            },
          }}
          onFitBoundsChange={(bounds) => {
            console.info(bounds);
          }}
        />
      </Controls>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  className: 'absolute bottom-0 left-0',
};
