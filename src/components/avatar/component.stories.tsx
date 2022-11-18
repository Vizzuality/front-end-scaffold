import { ReactNode } from 'react';

import { Story } from '@storybook/react/types-6-0';

import Icon from 'components/icon';

import HELP_SVG from 'svgs/ui/help.svg';

import Avatar from './component';
import { AvatarProps } from './types';

const StoryAvatar = {
  title: 'Components/Avatar',
  component: Avatar,
  argTypes: {},
};

export default StoryAvatar;

const Template: Story<AvatarProps> = ({ children, ...args }: AvatarProps) => (
  <Avatar {...args}>{children}</Avatar>
);

export const Default = Template.bind({});
Default.args = {
  // children: <Icon icon={HELP_SVG} className="w-5 h-5" />,
  bgImage: '/images/avatar.png',
};

export function Groups(): ReactNode {
  return (
    <ul className="flex">
      <li>
        <Avatar bgImage="/images/avatar.png" />
      </li>
      <li className="-ml-3">
        <Avatar bgImage="/images/avatar.png" />
      </li>
      <li className="-ml-3">
        <Avatar bgImage="/images/avatar.png" />
      </li>
      <li className="-ml-3">
        <Avatar bgImage="/images/avatar.png" />
      </li>
      <li className="ml-3">
        <Avatar className="bg-white">
          <Icon icon={HELP_SVG} className="h-5 w-5" />
        </Avatar>
      </li>
    </ul>
  );
}
