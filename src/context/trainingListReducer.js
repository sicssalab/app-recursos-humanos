import initialState from "./initialState";
import types from "../constants/reducers/trainingListConstants";

const trainingListReducer = (state = initialState.trainingList, action) => {
    switch(action.type) {
        case types.TRAININGLIST_FETCHING:
            return {...state, ...action.trainingList};
        case types.TRAININGLIST:
            return {...state, ...action.trainingList};
        case types.TRAININGLIST_ERROR:
            return {...state, ...action.trainingList};
        default:
            return state;
    }
}
export default trainingListReducer;