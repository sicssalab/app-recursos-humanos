import initialState from "./initialState";
import types from "../constants/reducers/contactListConstants";

const contactListReducer = (state = initialState.contactList, action) => {
    switch(action.type) {
        case types.CONTACT_LIST_FETCHING:
            return {...initialState.contactList, ...action.contactList};
        case types.CONTACT_LIST:
            return {...initialState.contactList, ...action.contactList};
        case types.CONTACT_LIST_ERROR:
            return {...initialState.contactList, ...action.contactList};
        default:
            return state;
    }
}
export default contactListReducer;