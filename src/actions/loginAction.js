//import { createAction } from 'redux-actions'

import { 
    LOGIN_USER,
} from '../constants/actionType'

//export const login_user = createAction('LOGIN_USER');
  
export function login_user(user_info) {
    return {type: LOGIN_USER, user_info}
}