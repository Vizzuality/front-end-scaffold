import { useCallback } from 'react';

import Link from 'next/link';

import { scenarioAtom, pageAtom } from 'store/ui';
import { projectsURLAtom, readWriteAtom } from 'store/url';

import { useAtom } from 'jotai';
import { GetServerSideProps } from 'next';

import useAtomURL from 'hooks/query-params';

const SyncURLPage: React.FC = ({ search }: { search: string }) => {
  const [scenario, setScenario] = useAtom(scenarioAtom);
  const [page, setPage] = useAtom(pageAtom);

  const [x, setX] = useAtom(readWriteAtom);

  useAtomURL(projectsURLAtom, search);

  const handleClick = useCallback(() => {
    setX(88);
  }, [setX]);

  // const handleClick = useCallback(() => {
  //   setScenario((_scenario) => _scenario + 1);
  // }, [setScenario]);

  const handleClickPage = useCallback(() => {
    setPage((_page) => _page + 1);
  }, [setPage]);

  return (
    <>
      <button type="button" onClick={handleClick}>
        Increase scenario
      </button>
      <br />
      <button type="button" onClick={handleClickPage}>
        Increase page
      </button>
      <br />
      <span>Scenario: {scenario}</span>
      <br />
      <span>X: {x}</span>
      <br />
      <span>Page: {page}</span>
      <br />
      <Link href="/privacy-policy">Link</Link>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      search: req.url.split('?')[1] || '',
    },
  };
};

export default SyncURLPage;
