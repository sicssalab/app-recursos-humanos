import { combineReducers } from "redux";
import audioStreaming from "./audioStreamingReducer";
import stories from "./storiesReducer";
import entertainments from "./entertainmentsReducer";
import userAuth from "./userAuthReducer";
import statesList from "./statesListReducer";
import experiencesStates from "./experiencesStatesReducer";
import experiences from "./experiencesReducer";
import magicTowns from "./magicTownsReducer";
import entertainmentProfileList from "./entertainmentProfileListReducer";
import avenueProfileList from "./avenueProfileListReducer";
import experienceProfileList from "./experienceProfileListReducer";
import magicTownProfileList from "./magicTownProfileListReducer";
import mallsStates from "./mallsStatesReducer";
import mallProfileList from "./mallProfileListReducer";
import trainingList from "./trainingListReducer";
import messagesPost from "./messagesPostReducer";
import contactList from "./contactListReducer";

const rootReducer = combineReducers({
    userAuth,
    audioStreaming,
    contactList,
    stories,
    entertainments,
    experiences,
    experiencesStates,
    statesList,
    magicTowns,
    mallsStates,
    mallProfileList,
    avenueProfileList,
    entertainmentProfileList,
    experienceProfileList,
    magicTownProfileList,
    trainingList,
    messagesPost
})

export default rootReducer;