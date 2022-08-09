import { Story } from '@storybook/react/types-6-0';

import FitBoundsControl from './component';
import { FitBoundsControlProps } from './types';

const StoryFitBoundsControl = {
  title: 'Components/Map/Controls/FitBounds',
  component: FitBoundsControl,
};

export default StoryFitBoundsControl;

const Template: Story<FitBoundsControlProps> = (args) => (
  <FitBoundsControl
    {...args}
    onFitBoundsChange={(bounds) => {
      console.info('onFitBoundsChange: ', bounds);
    }}
  />
);

export const Default = Template.bind({});
Default.args = {
  className: '',
  bounds: {
    bbox: [10.5194091796875, 43.6499881760459, 10.9588623046875, 44.01257086123085],
    options: {},
  },
  onFitBoundsChange: (bounds) => {
    console.info(bounds);
  },
};
