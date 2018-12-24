import axios from 'axios';

const setAuthToken = token =>{
    if(token) {
        // Apply to every reuest
        axios.defaults.headers.common ['Authorization']=token;
    } else{
        delete axios.defaults.headers.common ['Authorization'];
    }
}

export default setAuthToken;