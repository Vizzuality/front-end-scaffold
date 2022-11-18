import { Story } from '@storybook/react/types-6-0';

import Tooltip from './component';
import type { TooltipProps } from './types';

const StoryTooltip = {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {},
};

export default StoryTooltip;

const Template: Story<TooltipProps> = (args: TooltipProps) => (
  <div className="mt-52 text-white">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit{' '}
    <Tooltip
      {...args}
      content={
        <div className="rounded bg-white px-2 py-1 text-gray-500">
          <span>Tooltip</span>
        </div>
      }
    >
      <span className="text-blue-500 underline">HOVER ME!</span>
    </Tooltip>{' '}
    quisquam explicabo iure nihil, eveniet dolorum at hic voluptatem in maxime enim a aspernatur?{' '}
    <Tooltip
      {...args}
      placement="bottom-end"
      trigger="click"
      content={
        <div className="rounded bg-white p-5 text-gray-500">
          <h2 className="text-lg text-blue-500">Title</h2>
          <p>This is a content. We could have whateveryouwant</p>
        </div>
      }
    >
      <span className="text-blue-500 underline">CLICK ME!</span>
    </Tooltip>{' '}
    doloremque iusto! Sunt, dignissimos sint. Lorem ipsum dolor sit amet consectetur adipisicing
    elit. Harum doloremque, voluptas aut inventore facere asperiores soluta, minima iste voluptate a
    expedita similique, optio rerum cupiditate dolorem cumque? Neque, ducimus quaerat? Lorem ipsum
    dolor sit amet consectetur, adipisicing elit. Possimus recusandae quisquam vel beatae a officiis
    excepturi nihil libero voluptatibus corporis vitae, esse quod error amet. Illo omnis voluptatum
    labore eligendi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, iusto
    voluptatum tenetur modi, facilis inventore ratione quas atque similique laboriosam soluta.
    Consequuntur in porro voluptatem accusamus totam deleniti amet iste. Lorem ipsum dolor sit amet
    consectetur adipisicing elit. Enim consequatur alias eius, quo doloribus cupiditate. Ipsa,
    repellat! Iure quas ducimus iusto nemo architecto eaque quo eligendi, incidunt sit cumque rerum!
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi incidunt eum suscipit ex,
    veritatis sit temporibus unde dolor! Earum magni ratione facilis atque quis at itaque quia cum
    nostrum numquam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos commodi ad
    assumenda porro maxime ratione iure, illum odit ipsum veniam eaque suscipit alias tempore
    laborum animi non iste necessitatibus dolorem. Lorem ipsum dolor sit amet consectetur
    adipisicing elit. Beatae, eum magni excepturi a laborum ducimus quae temporibus at perspiciatis
    distinctio debitis fugit enim eaque voluptates dignissimos esse officia hic quis.
  </div>
);

export const Default = Template.bind({});

Default.args = {
  arrowProps: {
    enabled: true,
    size: 6,
    className: 'bg-white',
  },
  portalProps: {
    enabled: true,
  },
};
