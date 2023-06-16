import types from "../constants/reducers/entertainmentsConstants";
import settings from "../settings";
const getDispatch = (entertainments) => {
  entertainments.complete = true;
  entertainments.loading = false;

  return { type: types.ENTERTAINMENTS, entertainments };
};
const loading = () => {
  const entertainments = {
    loading: true,
  };
  return { type: types.ENTERTAINMENTS_FETCHING, entertainments };
};

const error = (entertainments = {}) => {
  entertainments.error = true;
  return { type: types.ENTERTAINMENTS_ERROR, entertainments };
};

const get = async (request, dispatch) => {
  dispatch(loading());
  try {
    await fetch(`${settings.domain}${settings.api.entertainments}`)
      .then((res) => res.json())
      .then((response) => {
        dispatch(getDispatch(response));
      });
  } catch (e) {
    dispatch(error());
  }
};
const inGetPage = async (request, dispatch, onSuccess, onError) => {
  try {
    //TODO el profile no lo usa en este caso &populate[urban][populate][1]=profileCover
    await fetch(`${settings.domainApi}/api/post-urbans?populate[urban][populate][0]=avatar&sort=createdAt:DESC&pagination[page]=${request.page}&pagination[pageSize]=${request.pageSize}`)
      .then((res) => res.json())
      .then((response) => {
        //dispatch(getDispatch(response));
        const auth = [...response.data];

        if (auth.length <= 0) {
          const auxError = {
            message: "Ups! ocurrio un error"
          }
          dispatch(error(auxError));
          onError && onError(auxError);
        }
        else {
          const auxAuth = {
            // id: auth[0].id,
            // ...auth[0].attributes,
            data: auth
          }
          dispatch(getDispatch(auxAuth));
          onSuccess && onSuccess(auxAuth);
        }
      });
  } catch (e) {
    dispatch(error(e));
  }
};
const getPage = async (request, dispatch, onSuccess, onError) => {
  inGetPage(request, dispatch, onSuccess, onError);
};
const getPageInitial = async (_request, dispatch, onSuccess, onError) => {
  // request.page =1
  // request.pageSize =5
  dispatch(loading());
  inGetPage({page: 1, pageSize: 5}, dispatch, onSuccess, onError);
};

const entertainmentsAction = {
  get,
  getPage,
  getPageInitial
};

export default entertainmentsAction;
