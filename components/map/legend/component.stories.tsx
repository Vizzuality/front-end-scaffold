import { useCallback, useMemo, useState } from 'react';

import { Story } from '@storybook/react/types-6-0';

import Legend from './component';
import LegendItem from './item';
import ITEMS from './mock';
import { LegendProps } from './types';
import LegendTypeBasic from './types/basic';
import LegendTypeChoropleth from './types/choropleth';
import LegendTypeGradient from './types/gradient';

export default {
  title: 'Components/Map/Legend',
  component: Legend,
};

const Template: Story<LegendProps> = (args) => {
  const [sortArray, setSortArray] = useState([]);

  // Sorted
  const sortedItems = useMemo(() => {
    const itms = ITEMS.sort((a, b) => sortArray.indexOf(a.id) - sortArray.indexOf(b.id));
    return itms;
  }, [sortArray]);

  // Callbacks
  const onChangeOrder = useCallback((ids) => {
    setSortArray(ids);
  }, []);

  return (
    <Legend {...args} onChangeOrder={onChangeOrder}>
      {sortedItems.map((i) => {
        const { type, items } = i;
        return (
          <LegendItem key={i.id} {...i}>
            {type === 'basic' && (
              <LegendTypeBasic className="text-sm text-slate-300" items={items} />
            )}
            {type === 'choropleth' && (
              <LegendTypeChoropleth className="text-sm text-slate-300" items={items} />
            )}
            {type === 'gradient' && (
              <LegendTypeGradient className="text-sm text-slate-300" items={items} />
            )}
          </LegendItem>
        );
      })}
    </Legend>
  );
};

export const Default = Template.bind({});
Default.args = {
  className: '',
};

export const MaxHeight = Template.bind({});
MaxHeight.args = {
  className: '',
  maxHeight: 300,
};
