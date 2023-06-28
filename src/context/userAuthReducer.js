import initialState from "./initialState";
import types from "../constants/reducers/userAuthConstants";

const userAuthReducer = (state = initialState.userAuth, action) => {
    switch(action.type) {
        case types.USERAUTH_FETCHING:
            return {...initialState.userAuth, ...action.userAuth};
        case types.USERAUTH:
            return {...initialState.userAuth, ...action.userAuth};
        case types.USERAUTH_ERROR:
            return {...initialState.userAuth, ...action.userAuth};
        default:
            return state;
    }
}

export default userAuthReducer;