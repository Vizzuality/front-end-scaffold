import { MapProvider } from 'react-map-gl';
import { Provider as ReduxProvider } from 'react-redux';

import type { AppProps } from 'next/app';

import { OverlayProvider } from '@react-aria/overlays';
import { QueryClient, QueryClientProvider, Hydrate } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';

import ThirdParty from 'containers/third-party';

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
            {/* @ts-ignore: https://github.com/artsy/fresnel/issues/281 */}
            <MediaContextProvider>
              <MapProvider>
                <ThirdParty />
                <Component {...pageProps} />
              </MapProvider>
            </MediaContextProvider>
          </OverlayProvider>
        </SessionProvider>
      </Hydrate>
    </QueryClientProvider>
  </ReduxProvider>
);

export default MyApp;
