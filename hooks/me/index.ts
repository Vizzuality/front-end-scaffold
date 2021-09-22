import { useMemo } from 'react';
import { useQuery } from 'react-query';

import { useSession } from 'next-auth/client';

import USERS from 'services/users';

export default function useMe() {
  const [session, loading] = useSession();

  const query = useQuery(
    'me',
    () =>
      USERS.request({
        method: 'GET',
        url: '/me',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }).then((response) => response.data),
    {
      enabled: !!session && !loading,
    }
  );

  const { data } = query;

  return useMemo(
    () => ({
      ...query,
      user: data?.data,
    }),
    [query, data?.data]
  );
}
