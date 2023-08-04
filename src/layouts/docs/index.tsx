import { PropsWithChildren } from 'react';

import { useRouter } from 'next/router';

const Layout: React.FC<PropsWithChildren> = (props: PropsWithChildren) => {
  const { children } = props;
  const router = useRouter();
  const isMainRoute = router.pathname === '/docs';

  return (
    <main className={`flex flex-col font-sans antialiased lg:min-h-screen`}>
      {!isMainRoute && (
        <button type="button" className="w-24 p-4 text-gray-500" onClick={() => router.back()}>
          &lt; Back
        </button>
      )}
      <div className="prose relative grow p-20">{children}</div>
    </main>
  );
};

export default Layout;
