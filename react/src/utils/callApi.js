import axios from 'axios';

export const callGetApi = async (url, parameter) => {
  try {
    const response = await axios.get(url, parameter);

    return response.data;
  } catch (error) {
    return error;
  }
};

export const callPostApi = async (url, parameter) => {
  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
