import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider as ReduxProvider } from 'react-redux';

import type { AppProps } from 'next/app';

import { OverlayProvider } from '@react-aria/overlays';
import { SessionProvider } from 'next-auth/react';
import { Hydrate } from 'react-query/hydration';

import { MediaContextProvider } from 'components/media-query';
import store from 'store';

import 'styles/globals.css';

const queryClient = new QueryClient();

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <ReduxProvider store={store}>
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SessionProvider session={pageProps.session} refetchInterval={10 * 60} refetchOnWindowFocus>
          <OverlayProvider>
            <MediaContextProvider>
              <Component {...pageProps} />
            </MediaContextProvider>
          </OverlayProvider>
        </SessionProvider>
      </Hydrate>
    </QueryClientProvider>
  </ReduxProvider>
);

export default MyApp;
