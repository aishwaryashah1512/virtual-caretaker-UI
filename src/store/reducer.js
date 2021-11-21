import * as actiontypes from './actionTypes'

const initialState = {
    username: '',
    password: '',
    path: '',
    signup: false,
    isAuthenticated: false,
    not : "0"
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actiontypes.ON_AUTH:
            return {
                ...initialState,
                username: action.username,
                password: action.password,
                signup: action.signup
            }
            
        case 'ON_AUTHENTICATED':
            return {
                ...initialState,
                isAuthenticated: true
            }
            case  'update_not':{
                console.log("hello")
                return {
                    ...initialState,
                       not : not + 1
                }
            }

        default: return state;
    }
}

export default reducer;