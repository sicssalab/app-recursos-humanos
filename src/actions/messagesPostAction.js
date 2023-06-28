import types from "../constants/reducers/messagesPostConstants";
import settings from "../settings";

const getDispatch = (messagesPost) => {
  messagesPost.complete = true;

  return { type: types.MESSAGES_POST, messagesPost };
};
const loadingDispatch = () => {
  const messagesPost = {
    loading: true,
  };
  return { type: types.MESSAGES_POST_FETCHING, messagesPost };
};

const error = (messagesPost = {}) => {
  messagesPost.error = true;
  return { type: types.MESSAGES_POST_ERROR, messagesPost };
};

const get = async (request, dispatch, onSuccess, onError) => {
  dispatch(loadingDispatch());
  try {
    //TODO el profile no lo usa en este caso &populate[urban][populate][1]=profileCover
    await fetch(`${settings.domainApi}/api/message-posts?populate[site_user][populate][0]=avatar&populate[site_user][fields][0]=name&populate[site_user][fields][0]=lastname&filters[${request.postType}][id][$eq]=${request.post_id}&sort=createdAt:DESC&pagination[page]=${request.page}&pagination[pageSize]=${request.pageSize}`)
      .then((res) => res.json())
      .then((response) => {
        // const auxAuth = {
        //   data: response.data,
        //   meta: response.meta
        // }
        dispatch(getDispatch(response));
        onSuccess && onSuccess(response);
      });
  } catch (e) {
    dispatch(error(e));
  }
};
const set = async (request, dispatch, onSuccess, onError) => {
  //dispatch(loadingDispatch());
  try {
    //TODO el profile no lo usa en este caso &populate[urban][populate][1]=profileCover
    await fetch(`${settings.domainApi}/api/message-posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: request,
      })
    }
    )
      .then((res) => res.json())
      .then((response) => {
        // const auxAuth = {
        //   data: response.data,
        //   meta: response.meta
        // }
        //dispatch(getDispatch(response));
        //TODO response
        //   {
        //     "data": {
        //         "id": 6,
        //         "attributes": {
        //             "description": "comentario desde postmant",
        //             "createdAt": "2023-06-16T16:33:00.224Z",
        //             "updatedAt": "2023-06-16T16:33:00.224Z"
        //         }
        //     },
        //     "meta": {}
        // }
        onSuccess && onSuccess(response);
      });
  } catch (e) {
    //dispatch(error(e));
  }
};

const messagesPostAction = {
  get,
  set,
};

export default messagesPostAction;
