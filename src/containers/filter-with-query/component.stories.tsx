import { useCallback } from 'react';

import Link from 'next/link';

import { Story } from '@storybook/react/types-6-0';
import { useAtom } from 'jotai';

import JotaiProvider from 'components/jotai-provider';
import atomWithQueryParamStorage from 'lib/query-params';

const scenarioAtom = atomWithQueryParamStorage<number>('scenario', 1);

// import FilterWhithQuery from './component';
import { FilterWhithQueryProps } from './types';

const StoryFilterWithQuery = {
  title: 'Components/FilterWhithQuery',
  // component: FilterWhithQuery,
  argTypes: {},
  decorators: [
    (StoryFilterWithQueryStory: Story) => (
      <JotaiProvider>
        <StoryFilterWithQueryStory />
      </JotaiProvider>
    ),
  ],
};

export default StoryFilterWithQuery;

const Template: Story<FilterWhithQueryProps> = () => {
  const [scenario, setScenario] = useAtom(scenarioAtom);

  const handleClick = useCallback(() => {
    setScenario(scenario + 1);
  }, [scenario, setScenario]);

  return (
    <>
      <button type="button" onClick={handleClick}>
        Increase scenario
      </button>
      <div>
        <span>Scenario: {scenario}</span>
      </div>
      <Link href="/privacy-policy">Link</Link>
    </>
  );
};

export const Default = Template.bind({});

Default.args = {};
