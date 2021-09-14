/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useCookies } from 'react-cookie';
import AUTH_TOKEN from '../constants';

const useAuthToken = () => {
  const [cookies, setCookie, removeCookie] = useCookies([AUTH_TOKEN]);

  const setAuthToken = (authToken: string) => setCookie(AUTH_TOKEN, authToken);

  const removeAuthToken = () => removeCookie(AUTH_TOKEN);

  return [cookies[AUTH_TOKEN], setAuthToken, removeAuthToken];
};

export default useAuthToken;
