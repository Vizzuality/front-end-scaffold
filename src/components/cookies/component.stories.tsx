import { Story } from '@storybook/react/types-6-0';

import Cookies, { CookiesProps } from './index';

const StoryCookies = {
  title: 'Components/Cookies',
  component: Cookies,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  argTypes: {
    onAccept: {
      control: {
        disable: true,
      },
    },
    onReject: {
      control: {
        disable: true,
      },
    },
  },
};

export default StoryCookies;

const Template: Story<CookiesProps> = ({ ...args }: CookiesProps) => {
  return (
    <div className="relative h-96">
      <Cookies {...args} />
    </div>
  );
};

export const Default: Story<CookiesProps> = Template.bind({});
Default.args = {
  open: true,
  onAccept: () => {
    console.info('Accepted');
  },
  onReject: () => {
    console.info('Rejected');
  },
};
