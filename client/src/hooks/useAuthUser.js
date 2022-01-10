// import { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import axios from 'axios';

// const useAuthUser = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(
//     () => async () => {
//       try {
//         const res = await axios.get('http://localhost:4000/api/user/me');
//         dispatch({ type: 'user/userLoaded', payload: res.data });
//         navigate('/home');
//       } catch (err) {
//         const { status, data } = err.response;
//         if (status === 400 && data.msg === 'token is not valid') {
//           dispatch({ type: 'user/userLoadedError' });
//           console.log(location);
//         }
//       }
//     },
//     []
//   );
// };

// export default useAuthUser;
