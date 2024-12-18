export const validateToken = async (accessToken) => {
  try {
    const response = await fetch('http://localhost:8081/auth/validate-token', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
