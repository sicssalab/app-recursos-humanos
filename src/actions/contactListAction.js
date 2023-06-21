import types from "../constants/reducers/contactListConstants";
import settings from "../settings";
const getDispatch = (contactList) => {
  contactList.complete = true;
  contactList.loading = false;

  return { type: types.CONTACT_LIST, contactList };
};
const loading = () => {
  const contactList = {
    loading: true,
  };
  return { type: types.CONTACT_LIST_FETCHING, contactList };
};

const error = (contactList = {}) => {
  contactList.error = true;
  return { type: types.CONTACT_LIST_ERROR, contactList };
};

const inGetPage = async (request, dispatch, onSuccess, onError) => {
  try {
    //TODO el profile no lo usa en este caso &populate[urban][populate][1]=profileCover
    await fetch(`${settings.domainApi}/api/site-users?populate[avatar][populate]=*&populate[department_user]=*&fields[0]=name&fields[1]=lastname`)
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
const getForPage = async (request, dispatch, onSuccess, onError) => {
  inGetPage(request, dispatch, onSuccess, onError);
};
const get = async (_request, dispatch, onSuccess, onError) => {
  // request.page =1
  // request.pageSize =5
  dispatch(loading());
  inGetPage({page: 1, pageSize: 5}, dispatch, onSuccess, onError);
};

const contactListAction = {
  get,
  getForPage,
};

export default contactListAction;
