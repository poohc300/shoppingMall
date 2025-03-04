const url = 'http://localhost:8081/auth/';

export const validateToken = async (accessToken) => {
  try {
    const response = await fetch(url + 'validate-token', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const refreshToken = async (refreshToken) => {
  try {
    const response = await fetch(url + 'refresh-token', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(refreshToken),
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
