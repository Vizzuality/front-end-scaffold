import { Story } from '@storybook/react/types-6-0';

import DOWNLOAD_SVG from 'svgs/ui/download.svg';

import Icon from './component';
import { IconProps } from './types';

const StoryIcon = {
  title: 'Components/Icon',
  component: Icon,
};

export default StoryIcon;

const Template: Story<IconProps> = (args) => <Icon {...args} />;

export const Default = Template.bind({});
Default.args = {
  className: 'w-5 h-5 text-blue-500',
  icon: DOWNLOAD_SVG,
};
