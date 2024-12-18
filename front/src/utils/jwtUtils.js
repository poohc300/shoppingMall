import { jwtDecode } from 'jwt-decode';

export const getTokenExpiry = (token) => {
  if (!token) {
    return 0;
  }
  const decodedToken = jwtDecode(token);
  return decodedToken.exp * 1000;
};

export const isTokenExpired = (token) => {
  const expiryTime = getTokenExpiry(token);
  const now = new Date().getTime();
  return now > expiryTime;
};
