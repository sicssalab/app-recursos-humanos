import types from "../constants/reducers/trainingListConstants";
import settings from "../settings";
const getDispatch = (trainingList) => {
  trainingList.complete = true;
  trainingList.loading = false;

  return { type: types.TRAININGLIST, trainingList };
};
const loading = () => {
  const trainingList = {
    loading: true,
  };
  return { type: types.TRAININGLIST_FETCHING, trainingList };
};

const error = () => {
  const trainingList = {
    error: true,
  };
  return { type: types.TRAININGLIST_ERROR, trainingList };
};

const get = async (request, dispatch) => {
  dispatch(loading());
  try {
    await fetch(`${settings.domain}${settings.api.trainingList}`)
      .then((res) => res.json())
      .then((response) => {
        dispatch(getDispatch(response));
    });
  } catch (e) {
    dispatch(error());
  }
};

const trainingListAction = {
  get,
};

export default trainingListAction;
