import { API_ADDRESS } from './API_ADDRESS';

const fetchApi = async (endpoint, setStateFunc = null, init) => {
  try {
    const response = await fetch(`${API_ADDRESS}${endpoint}`, {
      ...init,
      headers: {
        Authorization: localStorage.getItem('resToken'),
        'Content-Type': 'application/json;charset=utf-8',
      },
    });
    const result = await response.json();

    if (setStateFunc) {
      setStateFunc(result);
    }
  } catch (error) {
    console.log(error);
  }
};

export default fetchApi;
