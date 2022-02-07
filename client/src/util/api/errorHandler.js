const handleErrors = (err, sliceName, dispatch) => {
  // add case for not_found
  // if(error === 'resource_not_found')
  if (!err.request.response) {
    return dispatch({ type: `${sliceName}/dataLoadError` });
  }
  const { data, status } = err.response;
  const { error } = data;

  if (status >= 400 && status < 500) {
    if (error === 'invalid_credentials') {
      console.log('invalid credentials');
      dispatch({ type: `${sliceName}/invalidCredentials` });
    }
    if (error === 'unauthenticated') {
      // redirect to login page
    }
    if (error === 'invalid_data') {
      // dispatch errors array to appropriate state
    }
    if (error === 'email_already_exists') {
      dispatch({ type: `${sliceName}/emailAlreadyExists` });
      console.log('email already exists');
    }
  } else if (status >= 500) {
    if (error === 'server_error') {
      console.log('server error : (');
      return dispatch({ type: `${sliceName}/dataLoadError` });
    }
  }
};

export default handleErrors;
