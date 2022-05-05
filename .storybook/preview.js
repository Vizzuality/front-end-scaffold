import React from 'react';

import { themes } from '@storybook/theming';
import { OverlayProvider } from '@react-aria/overlays';

import { MediaContextProvider } from 'components/media-query';

import '../src/styles/globals.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    storySort: {
      order: [
        'Intro',
        'Docs',
        ['Install', 'Deploy', 'Authentication', 'Fetching', 'Media', 'Tests'],
        'Components',
      ],
    },
  },
  docs: {
    theme: themes.dark,
  },
};

export const decorators = [
  (Story) => {
    return (
      <OverlayProvider>
        <MediaContextProvider>
          <div>{Story()}</div>
        </MediaContextProvider>
      </OverlayProvider>
    );
  },
];
