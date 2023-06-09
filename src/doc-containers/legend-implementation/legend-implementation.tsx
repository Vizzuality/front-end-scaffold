import { useCallback, useMemo, useState } from 'react';

import Legend from 'components/map/legend/component';
import LegendItem from 'components/map/legend/item';
import LegendTypeBasic from 'components/map/legend/types/basic';
import LegendTypeChoropleth from 'components/map/legend/types/choropleth';
import LegendTypeGradient from 'components/map/legend/types/gradient';

import ITEMS from './mock';

const LegendImplementation = ({ args }) => {
  const [sortArray, setSortArray] = useState([]);

  // Sorted
  const sortedItems = useMemo(
    () => ITEMS.sort((a, b) => sortArray.indexOf(a.id) - sortArray.indexOf(b.id)),
    [sortArray]
  );

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
              <LegendTypeBasic className="text-sm text-gray-300" items={items} />
            )}
            {type === 'choropleth' && (
              <LegendTypeChoropleth className="text-sm text-gray-300" items={items} />
            )}
            {type === 'gradient' && (
              <LegendTypeGradient className="text-sm text-gray-300" items={items} />
            )}
          </LegendItem>
        );
      })}
    </Legend>
  );
};

export default LegendImplementation;
