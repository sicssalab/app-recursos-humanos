import types from "../constants/reducers/userAuthConstants";
import settings from "../settings";
// const get = (userAuth) =>{
//     return {type: types.USERAUTH, userAuth};
// };
const loading = () => {
    const userAuth = {
        loading: true,
    };
    return {
        type: types.USERAUTH_FETCHING,
        userAuth,
    };
};
const getDispatch = (userAuth) => {
    userAuth.complete = true;

    return { type: types.USERAUTH, userAuth };
};
const errorDispath = (userAuth) => {
    userAuth.error = true;
    return {
        type: types.USERAUTH_ERROR,
        userAuth,
    };
};
const update = async (userAuth, dispatch) => {
    dispatch(getDispatch(userAuth));
}
const premium = async (dispatch) => {
    const userAuth = {
        isPremium: true,
    }
    dispatch(get(userAuth));
}

const get = async (request, dispatch, onSuccess, onError) => {
    dispatch(loading());
    try {
        await fetch(`${settings.domainApi}/api/site-users?populate=*&filters[celphone][$eq]=${request.username}&filters[password_view][$eq]=${request.password}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
            .then((res) => res.json())
            .then((response) => {
                //TODO caso solo del mock si error manda mensaje message
                const auth = [...response.data];

                if (auth.length <= 0 || !auth[0].attributes.active) {
                    const auxError = {
                        message: "No existe el usuario o la contraseña es incorrecta"
                    }
                    dispatch(errorDispath(auxError));
                    onError && onError(auxError);
                }
                else {
                    const auxAuth = {
                        id: auth[0].id,
                        ...auth[0].attributes
                    }
                    //TODO example relationship
                    //   "lada_user": {
                    //     "data": {
                    //         "id": 2,
                    //         "attributes": {
                    //             "lada": "+55",
                    //             "createdAt": "2023-06-01T21:02:56.173Z",
                    //             "updatedAt": "2023-06-01T21:12:37.424Z",
                    //             "publishedAt": "2023-06-01T21:12:37.421Z"
                    //         }
                    //     }
                    // },
                    dispatch(getDispatch(auxAuth));
                    onSuccess && onSuccess(auxAuth);
                }
            });
    } catch (e) {
        dispatch(errorDispath({message: e}));
        onError && onError({message: e});
    }
};

const userAuthAction = {
    update,
    premium,
    get,
}

export default userAuthAction;