import ky from 'ky';
import * as auth from './auth';
import * as team from './team';
import * as manga from './manga';
import { useSessionStore } from '../zustand';
import { enqueueSnackbar } from 'notistack';
import { ApiResponse } from './types';

type KyaOptions = {
  hasAccessToken?: boolean;
  enableAutoContentType?: boolean;
  snackbar?: {
    disabled?: boolean;
    error?: boolean;
    success?: boolean;
  };
};

const Api = {
  auth,
  team,
  manga
};

/**
 * Экземпляр `ky` с предварительно настроенными параметрами,
 * включая URL-префикс и заголовки авторизации.
 *
 * @returns {ky.Instance} Настроенный экземпляр `ky`.
 */
export const kya = (options?: KyaOptions) => {
  const {
    hasAccessToken = true,
    enableAutoContentType = false,
    snackbar: {
      disabled: disabledSnackbar = false,
      error: hasError = true,
      success: hasSuccess = true,
    } = {},
  } = options || {};
  const accessToken = useSessionStore.getState()?.session?.user?.accessToken;

  const instance = ky.create({
    prefixUrl: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      'Content-type': enableAutoContentType ? undefined : 'application/json',
      Authorization: hasAccessToken && accessToken ? `Bearer ${accessToken}` : undefined,
    },
    throwHttpErrors: true,
    hooks: {
      afterResponse: [
        async (_input, _options, response) => {
          try {
            if (disabledSnackbar) return;

            const body = (await response.json()) as ApiResponse;

            if (response.ok && hasSuccess && body.message) {
              enqueueSnackbar(body.message, { variant: 'success' });
              return;
            }
            if (hasError && body.message) {
              enqueueSnackbar(body.message, { variant: 'error' });
              return;
            }
          } catch (error) {
            console.error(error);
          }
        },
      ],
    },
  });

  return instance;
};

export default Api;
