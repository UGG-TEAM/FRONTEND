import axiosInstance from '../axiosInstance';

export const postData = async (data) => {
  try {
    const response = await axiosInstance.post('/api/program/recommend', {
      params: data,
    });
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error sending data:', error);
  }
};
