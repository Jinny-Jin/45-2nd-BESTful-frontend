import { API_ADDRESS } from './API_ADDRESS';

const fetchApi = async (endpoint, setStateFunc = null, init = null) => {
  try {
    const response = await fetch(`${API_ADDRESS}${endpoint}`, {
      ...init,
      headers: {
        Authorization: localStorage.getItem('resToken'),
        'Content-Type': 'application/json;charset=utf-8',
      },
    });

    if (!response.ok) {
      throw new Error(`에러 : ${response.status}`);
    }
    const result = await response.json();

    if (setStateFunc) {
      return setStateFunc(result);
    } else {
      return result;
    }
  } catch (error) {
    console.log(error);
  }
};

export default fetchApi;
