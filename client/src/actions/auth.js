import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js'


export const signIn = (formData,history) => async (dispatch) => {
    
    try {
        //login
        history.push('/')
    } catch (error) {
        console.log(error); 
    }
}
export const signUp = () => async (dispatch) => {
    
    try {
        //signup
        history.push('/')

    } catch (error) {
        console.log(error);
    }
}