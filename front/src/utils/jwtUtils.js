import { jwtDecode } from 'jwt-decode';

export const isTokenExpired = (token) => {
  if (!token) return 0;
  const decoded = jwtDecode(token);
  const currentTime = Date.now() / 1000;

  console.log('남은 인증 시간', decoded.exp - currentTime);
  return decoded.exp < currentTime;
};
