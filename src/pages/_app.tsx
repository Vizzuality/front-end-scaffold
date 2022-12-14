import { useCallback, useEffect, useState } from 'react';

import { MapProvider } from 'react-map-gl';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import { OverlayProvider } from '@react-aria/overlays';
import { QueryClient, QueryClientProvider, Hydrate } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';

import ThirdParty from 'containers/third-party';

import JotaiProvider from 'components/jotai-provider';
import { MediaContextProvider } from 'components/media-query';
import { GAPage } from 'lib/analytics/ga';

import 'styles/globals.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  // Never ever instantiate the client outside a component, hook or callback as it can leak data
  // between users
  const [queryClient] = useState(() => new QueryClient());

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
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SessionProvider session={pageProps.session} refetchInterval={10 * 60} refetchOnWindowFocus>
          <JotaiProvider>
            <OverlayProvider>
              {/* @ts-ignore: https://github.com/artsy/fresnel/issues/281 */}
              <MediaContextProvider>
                <MapProvider>
                  <ThirdParty />
                  <Component {...pageProps} />
                </MapProvider>
              </MediaContextProvider>
            </OverlayProvider>
          </JotaiProvider>
        </SessionProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default MyApp;
