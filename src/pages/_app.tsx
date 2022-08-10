import { useCallback, useEffect } from 'react';

import { MapProvider } from 'react-map-gl';
import { Provider as ReduxProvider } from 'react-redux';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import { OverlayProvider } from '@react-aria/overlays';
import { QueryClient, QueryClientProvider, Hydrate } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';

import ThirdParty from 'containers/third-party';

import { MediaContextProvider } from 'components/media-query';
import { GAPage } from 'lib/analytics/ga';
import store from 'store';

import 'styles/globals.css';

const queryClient = new QueryClient();

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  const handleRouteChangeCompleted = useCallback((url: string) => {
    GAPage(url);
  }, []);

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChangeCompleted);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeCompleted);
    };
  }, [router.events, handleRouteChangeCompleted]);

  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <SessionProvider
            session={pageProps.session}
            refetchInterval={10 * 60}
            refetchOnWindowFocus
          >
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
};

export default MyApp;
