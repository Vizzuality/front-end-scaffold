import { Story } from '@storybook/react/types-6-0';

import ZoomControl from './component';
import { ZoomControlProps } from './types';

export default {
  title: 'Components/Map/Controls/Zoom',
  component: ZoomControl,
};

const Template: Story<ZoomControlProps> = (args) => <ZoomControl {...args} />;

export const Default = Template.bind({});
Default.args = {
  className: '',
};
