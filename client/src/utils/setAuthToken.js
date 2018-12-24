import axios from 'axios';

const setAuthToken = token =>{
    if(token) {
        // Apply to every request
        axios.defaults.headers.Authorization=token;
    } else{
        delete axios.defaults.headers.Authorization;
    }
};

export default setAuthToken;