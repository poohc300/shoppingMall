export const validateToken = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    if (response.status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate('/auth/login');
    }
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
