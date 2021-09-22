import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { useSession } from 'next-auth/client';

import USERS from 'services/users';

import { UseSaveMeProps, SaveMeProps } from './types';

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

export function useSaveMe({
  requestConfig = {
    method: 'PATCH',
  },
}: UseSaveMeProps) {
  const queryClient = useQueryClient();
  const [session] = useSession();

  const saveMe = ({ data }: SaveMeProps) =>
    USERS.request({
      url: '/me',
      data,
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      ...requestConfig,
    });

  return useMutation(saveMe, {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries('me');
      console.info('Succces', data, variables, context);
    },
    onError: (error, variables, context) => {
      // An error happened!
      console.info('Error', error, variables, context);
    },
  });
}
