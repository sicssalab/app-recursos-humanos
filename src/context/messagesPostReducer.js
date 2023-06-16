import initialState from "./initialState";
import types from "../constants/reducers/messagesPostConstants";

const messagesPostReducer = (state = initialState.messagesPost, action) => {
    switch(action.type) {
        case types.MESSAGES_POST_FETCHING:
            return {...initialState.messagesPost, ...action.messagesPost};
        case types.MESSAGES_POST:
            return {...initialState.messagesPost, ...action.messagesPost};
        case types.MESSAGES_POST_ERROR:
            return {...initialState.messagesPost, ...action.messagesPost};
        default:
            return state;
    }
}
export default messagesPostReducer;