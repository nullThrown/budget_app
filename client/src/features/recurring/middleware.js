import axios from 'axios';
export const createRecurring = (recurring) => async (dispatch) => {
  try {
    const newRecurring = await axios.post(
      'http://localhost:4000/api/profile/recurring/create',
      recurring,
      {
        withCredentials: true,
      }
    );
    console.log(newRecurring.data);
    dispatch({ type: 'finance/createRecurring', payload: newRecurring.data });
  } catch (err) {
    const { data, status } = err.response;
    if (status >= 400 && status < 500 && data.error === 'unauthenticated') {
      // token is not valid... requires a redirect to login
    } else if (status >= 500 && data.error === 'server_error') {
      // dispatch some type of server error
    }
  }
};

export const editRecurring = (recurring) => async (dispatch) => {
  try {
    const newRecurring = await axios.put(
      'http://localhost:4000/api/profile/recurring/edit',
      recurring,
      {
        withCredentials: true,
      }
    );
    console.log(newRecurring.data);
    dispatch({ type: 'finance/editRecurring', payload: newRecurring.data });
  } catch (err) {
    const { data, status } = err.response;
    if (status >= 400 && status < 500 && data.error === 'unauthenticated') {
      // token is not valid... requires a redirect to login
    } else if (status >= 500 && data.error === 'server_error') {
      // dispatch some type of server error
    }
  }
};

export const deleteRecurring =
  ({ id, category }) =>
  async (dispatch) => {
    try {
      const newRecurring = await axios.delete(
        `http://localhost:4000/api/profile/recurring/delete/${id}/${category}`,
        {
          withCredentials: true,
        }
      );
      console.log('axios delete success');
      dispatch({ type: 'finance/deleteRecurring', payload: { id, category } });
    } catch (err) {
      const { data, status } = err.response;
      if (status >= 400 && status < 500 && data.error === 'unauthenticated') {
        // token is not valid... requires a redirect to login
      } else if (status >= 500 && data.error === 'server_error') {
        // dispatch some type of server error
      }
    }
  };
