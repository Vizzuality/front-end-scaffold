import React, { useEffect, useMemo } from 'react';

import useCookie from 'react-use-cookie';

import Script from 'next/script';

import { useModal } from 'hooks/modals';

import Cookies from 'components/cookies';
import { GA_TRACKING_ID } from 'lib/analytics/ga';

const ThirdParty: React.FC = () => {
  const [consentCookie, setConsentCookie] = useCookie('consent', undefined);

  const consent = useMemo(() => {
    if (consentCookie === 'true') return true;
    if (consentCookie === 'false') return false;
    return undefined;
  }, [consentCookie]);

  const { isOpen: isOpenCookies, open: openCookies, close: closeCookies } = useModal();

  const handleCookieClick = (c) => {
    setConsentCookie(String(c));
    closeCookies();
  };

  useEffect(() => {
    if (!consentCookie) {
      openCookies();
    }
  }, [consentCookie, openCookies]);

  return (
    <>
      {consent && (
        <>
          {/* Third Party Script needing cookies */}
          {/* Global site tag (gtag.js) - Google Analytics */}
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <Script id="gtm-config-script" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}');
            `}
          </Script>
        </>
      )}
      <Cookies
        open={isOpenCookies}
        onAccept={() => handleCookieClick(true)}
        onReject={() => handleCookieClick(false)}
      />
    </>
  );
};

export default ThirdParty;
