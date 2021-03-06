import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';


import {GET_ERRORS,SET_CURRENT_USER} from './types';


   // Register User
export const registerUser=(userData, history) => dispatch =>{
     axios.post('/api/users/register', userData)
          .then (res => history.push('/login'))
          .catch(err => 
            dispatch({
               type: GET_ERRORS,
               payload: err.response.data
            })
         );
    };

   // Login User
export const loginUser= userData => dispatch =>{
  axios.post('/api/users/login', userData)
  .then (res => {
     // Save to local storage
     const {token} =res.data;
     // Set Token to local storage
     localStorage.setItem('jwtToken', token);
     // Set auth to Header
     setAuthToken(token);
     // Decode Token to get User Data
     const decoded=jwt_decode(token);
     // Set Current User
     dispatch(setCurrentUser(decoded));

  })
 .catch(err => 
    dispatch({
       type: GET_ERRORS,
       payload: err.response.data
    })
 );
};

// Set Logged in User
export const setCurrentUser = decoded => {
   return {
      type: SET_CURRENT_USER,
      payload: decoded
   };
};

/// Log user out
export const logoutUser=()=> dispatch =>{
   // Remove token from local storage
   localStorage.removeItem('jwtToken');
   // Remove auth header for future request
   setAuthToken(false);
   // Set current user to {} which will set isAuthenticated to false
   dispatch(setCurrentUser({}));
};