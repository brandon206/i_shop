import types from './types';
import axios from 'axios';

export const signUp = userInfo => async dispatch => {
    try {
        const resp = await axios.post('/auth/sign-up', userInfo);

        console.log("Sign Up Resp: ", resp);
    } catch (err) {
        console.log("Sign Up Error: ", err.message);
    }
}

export const signIn = userInfo => async dispatch => {
    try {
        const resp = await axios.post('/auth/sign-in', userInfo);
        
        console.log("Sign In Resp: ", resp);
    } catch (err) {
        console.log("Error Signing In");
    }
}