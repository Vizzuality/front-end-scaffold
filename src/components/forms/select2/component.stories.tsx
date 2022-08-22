/* eslint-disable @next/next/no-img-element */
import { Story } from '@storybook/react/types-6-0';

import Select2, { Option, OptionGroup } from './component';
import type { Select2Props } from './types';

const StorySelect2 = {
  title: 'Components/Forms/Select2',
  component: Select2,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  argTypes: {},
};

export default StorySelect2;

const Template: Story<Select2Props> = (args) => (
  <Select2
    {...args}
    value=""
    render={(selectedIndex) => (
      <div className="flex space-x-3">
        {args.items[selectedIndex] ? (
          <img
            className="object-cover w-6 h-6 text-transparent bg-gray-800 rounded-full"
            alt={args.items[selectedIndex]?.name}
            src={args.items[selectedIndex]?.icon}
          />
        ) : null}
        <p>{args.items[selectedIndex]?.name ?? `${args.label}`} </p>
      </div>
    )}
    onChange={(e) => console.info(e)}
  >
    {args.categories &&
      args.categories.map((category) => (
        <OptionGroup {...args} key={category} label={category}>
          {args.items
            .filter((item) => item.category === category)
            .map(({ name, icon }) => (
              <Option key={name} value={name} theme={args.theme} multi={args.multi}>
                <div className="flex space-x-3">
                  {icon && (
                    <img
                      className="object-cover w-6 h-6 text-transparent bg-gray-800 rounded-full"
                      alt={name}
                      src={icon}
                    />
                  )}{' '}
                  <span>{name}</span>
                </div>
              </Option>
            ))}
        </OptionGroup>
      ))}
  </Select2>
);

export const Simple = Template.bind({});
Simple.args = {
  label: 'Select...',
  theme: 'dark',
  multi: false,
  categories: ['1990s', '2000s', '2010s', '2020s'],
  items: [
    {
      name: 'Toy Story',
      icon: 'https://upload.wikimedia.org/wikipedia/en/1/13/Toy_Story.jpg',
      category: '1990s',
    },
    {
      name: 'A Bugs Life',
      icon: 'https://upload.wikimedia.org/wikipedia/en/c/cc/A_Bug%27s_Life.jpg',
      category: '1990s',
    },
    {
      name: 'Toy Story 2',
      icon: 'https://upload.wikimedia.org/wikipedia/en/c/c0/Toy_Story_2.jpg',
      category: '1990s',
    },
    {
      name: 'Monsters, Inc.',
      icon: 'https://upload.wikimedia.org/wikipedia/en/6/63/Monsters_Inc.JPG',
      category: '2000s',
    },
    {
      name: 'Finding Nemo',
      icon: 'https://upload.wikimedia.org/wikipedia/en/2/29/Finding_Nemo.jpg',
      category: '2000s',
    },
    {
      name: 'The Incredibles',
      icon: 'https://upload.wikimedia.org/wikipedia/en/2/27/The_Incredibles_%282004_animated_feature_film%29.jpg',
      category: '2000s',
    },
    {
      name: 'Cars',
      icon: 'https://upload.wikimedia.org/wikipedia/en/3/34/Cars_2006.jpg',
      category: '2000s',
    },
    {
      name: 'Ratatouille',
      icon: 'https://upload.wikimedia.org/wikipedia/en/5/50/RatatouillePoster.jpg',
      category: '2000s',
    },
    {
      name: 'WALL-E',
      icon: 'https://upload.wikimedia.org/wikipedia/en/c/c2/WALL-Eposter.jpg',
      category: '2000s',
    },
    {
      name: 'Up',
      icon: 'https://upload.wikimedia.org/wikipedia/en/0/05/Up_%282009_film%29.jpg',
      category: '2000s',
    },
    {
      name: 'Cars 2',
      icon: 'https://upload.wikimedia.org/wikipedia/en/7/7f/Cars_2_Poster.jpg',
      category: '2010s',
    },
    {
      name: 'Toy Story 3',
      icon: 'https://upload.wikimedia.org/wikipedia/en/6/69/Toy_Story_3_poster.jpg',
      category: '2010s',
    },
    {
      name: 'Brave',
      icon: 'https://upload.wikimedia.org/wikipedia/en/9/96/Brave_Poster.jpg',
      category: '2010s',
    },
    {
      name: 'Monsters University',
      icon: 'https://upload.wikimedia.org/wikipedia/en/2/2a/Monsters_University_poster_3.jpg',
      category: '2010s',
    },
    {
      name: 'Inside Out',
      icon: 'https://upload.wikimedia.org/wikipedia/en/0/0a/Inside_Out_%282015_film%29_poster.jpg',
      category: '2010s',
    },
    {
      name: 'The Good Dinosaur',
      icon: 'https://upload.wikimedia.org/wikipedia/en/8/80/The_Good_Dinosaur_poster.jpg',
      category: '2010s',
    },
    {
      name: 'Finding Dory',
      icon: 'https://upload.wikimedia.org/wikipedia/en/3/3e/Finding_Dory.jpg',
      category: '2010s',
    },
    {
      name: 'Cars 3',
      icon: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/94/Cars_3_poster.jpg/220px-Cars_3_poster.jpg',
      category: '2010s',
    },
    {
      name: 'Coco',
      icon: 'https://upload.wikimedia.org/wikipedia/en/9/98/Coco_%282017_film%29_poster.jpg',
      category: '2010s',
    },
    {
      name: 'Incredibles 2',
      icon: 'https://upload.wikimedia.org/wikipedia/en/1/1f/Incredibles_2_%282018_animated_film%29.jpg',
      category: '2010s',
    },
    {
      name: 'Toy Story 4',
      icon: 'https://upload.wikimedia.org/wikipedia/en/4/4c/Toy_Story_4_poster.jpg',
      category: '2010s',
    },
    {
      name: 'Onward',
      icon: 'https://upload.wikimedia.org/wikipedia/en/0/03/Onward_poster.jpg',
      category: '2020s',
    },
    {
      name: 'Soul',
      icon: 'https://upload.wikimedia.org/wikipedia/en/3/39/Soul_%282020_film%29_poster.jpg',
      category: '2020s',
    },
    {
      name: 'Luca',
      icon: 'https://upload.wikimedia.org/wikipedia/en/3/33/Luca_%282021_film%29.png',
      category: '2020s',
    },
  ],
};

export const Multi = Template.bind({});
Multi.args = {
  label: 'Select...',
  theme: 'dark',
  multi: true,
  categories: ['1990s', '2000s', '2010s', '2020s'],
  items: [
    {
      name: 'Toy Story',
      icon: 'https://upload.wikimedia.org/wikipedia/en/1/13/Toy_Story.jpg',
      category: '1990s',
    },
    {
      name: 'A Bugs Life',
      icon: 'https://upload.wikimedia.org/wikipedia/en/c/cc/A_Bug%27s_Life.jpg',
      category: '1990s',
    },
    {
      name: 'Toy Story 2',
      icon: 'https://upload.wikimedia.org/wikipedia/en/c/c0/Toy_Story_2.jpg',
      category: '1990s',
    },
    {
      name: 'Monsters, Inc.',
      icon: 'https://upload.wikimedia.org/wikipedia/en/6/63/Monsters_Inc.JPG',
      category: '2000s',
    },
    {
      name: 'Finding Nemo',
      icon: 'https://upload.wikimedia.org/wikipedia/en/2/29/Finding_Nemo.jpg',
      category: '2000s',
    },
    {
      name: 'The Incredibles',
      icon: 'https://upload.wikimedia.org/wikipedia/en/2/27/The_Incredibles_%282004_animated_feature_film%29.jpg',
      category: '2000s',
    },
    {
      name: 'Cars',
      icon: 'https://upload.wikimedia.org/wikipedia/en/3/34/Cars_2006.jpg',
      category: '2000s',
    },
    {
      name: 'Ratatouille',
      icon: 'https://upload.wikimedia.org/wikipedia/en/5/50/RatatouillePoster.jpg',
      category: '2000s',
    },
    {
      name: 'WALL-E',
      icon: 'https://upload.wikimedia.org/wikipedia/en/c/c2/WALL-Eposter.jpg',
      category: '2000s',
    },
    {
      name: 'Up',
      icon: 'https://upload.wikimedia.org/wikipedia/en/0/05/Up_%282009_film%29.jpg',
      category: '2000s',
    },
    {
      name: 'Cars 2',
      icon: 'https://upload.wikimedia.org/wikipedia/en/7/7f/Cars_2_Poster.jpg',
      category: '2010s',
    },
    {
      name: 'Toy Story 3',
      icon: 'https://upload.wikimedia.org/wikipedia/en/6/69/Toy_Story_3_poster.jpg',
      category: '2010s',
    },
    {
      name: 'Brave',
      icon: 'https://upload.wikimedia.org/wikipedia/en/9/96/Brave_Poster.jpg',
      category: '2010s',
    },
    {
      name: 'Monsters University',
      icon: 'https://upload.wikimedia.org/wikipedia/en/2/2a/Monsters_University_poster_3.jpg',
      category: '2010s',
    },
    {
      name: 'Inside Out',
      icon: 'https://upload.wikimedia.org/wikipedia/en/0/0a/Inside_Out_%282015_film%29_poster.jpg',
      category: '2010s',
    },
    {
      name: 'The Good Dinosaur',
      icon: 'https://upload.wikimedia.org/wikipedia/en/8/80/The_Good_Dinosaur_poster.jpg',
      category: '2010s',
    },
    {
      name: 'Finding Dory',
      icon: 'https://upload.wikimedia.org/wikipedia/en/3/3e/Finding_Dory.jpg',
      category: '2010s',
    },
    {
      name: 'Cars 3',
      icon: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/94/Cars_3_poster.jpg/220px-Cars_3_poster.jpg',
      category: '2010s',
    },
    {
      name: 'Coco',
      icon: 'https://upload.wikimedia.org/wikipedia/en/9/98/Coco_%282017_film%29_poster.jpg',
      category: '2010s',
    },
    {
      name: 'Incredibles 2',
      icon: 'https://upload.wikimedia.org/wikipedia/en/1/1f/Incredibles_2_%282018_animated_film%29.jpg',
      category: '2010s',
    },
    {
      name: 'Toy Story 4',
      icon: 'https://upload.wikimedia.org/wikipedia/en/4/4c/Toy_Story_4_poster.jpg',
      category: '2010s',
    },
    {
      name: 'Onward',
      icon: 'https://upload.wikimedia.org/wikipedia/en/0/03/Onward_poster.jpg',
      category: '2020s',
    },
    {
      name: 'Soul',
      icon: 'https://upload.wikimedia.org/wikipedia/en/3/39/Soul_%282020_film%29_poster.jpg',
      category: '2020s',
    },
    {
      name: 'Luca',
      icon: 'https://upload.wikimedia.org/wikipedia/en/3/33/Luca_%282021_film%29.png',
      category: '2020s',
    },
  ],
};
