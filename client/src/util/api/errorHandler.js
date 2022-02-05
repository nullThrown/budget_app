const handleErrors = (err, sliceName, dispatch) => {
  // add case for not_found
  // if(error === 'resource_not_found')
  if (!err.request.response) {
    return dispatch({ type: `${sliceName}/dataLoadError` });
  }
  const { data, status } = err.response;
  const { error } = data;

  if (status >= 400 && status < 500) {
    if (error === 'unauthenticated') {
      // redirect to login page
      console.log('unauth');
    }
    if (error === 'invalid_data') {
      // dispatch errors array to appropriate state
      console.log('invalid');
    }
    if (error === 'email_already_exists') {
      // dispatch error msg to appropriate state
      console.log('email already');
    }
  } else if (status >= 500) {
    if (error === 'server_error') {
      console.log('server error : (');
      return dispatch({ type: `${sliceName}/dataLoadError` });
    }
  }
};

export default handleErrors;
