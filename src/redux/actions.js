import axios from 'axios';
import {
  GET_ALL_PRODUCTS,
  GET_DETAIL,
  EDIT_FOTO,
  EDIT_NAME,
  COMENTARIO,
  REVIEW,
  SEARCH_BY_NAME,
  LOGIN,
  SIGNUP,
  AGREGAR_PAGO,
  TRAER_PRODUCT_PAGOS,
  CUENTA,
  GET_USER_BY_ID,
  UPDATE_PROFILE,
  BAN_USER,
  FAVORITES_UPDATE,
} from './variables';

export function getAllProducts() {
    return async function (dispatch) {
        const response = await axios.get('/products/');
        const allProducts = response.data;
        return dispatch({
            type: GET_ALL_PRODUCTS,
            payload: allProducts,
        });
    };
}
export function getProductsByName(name) {
    return async function (dispatch) {
        try {
            const response = await axios.get(`/products/?name=${name}`);
            const filteredProduct = response.data;
            return dispatch({
                type: SEARCH_BY_NAME,
                payload: filteredProduct,
            });
        } catch (error) {
            console.log(error.message);
            return dispatch({
                type: SEARCH_BY_NAME,
                payload: [],
            });
        }
    };
}

export function getDetail(id) {
    return async function (dispatch) {
        const response = await axios.get(`/products/${id}`);
        const productId = response.data;
        return dispatch({
            type: GET_DETAIL,
            payload: productId,
        });
    };
}

export function getUserByID(id) {
    return async function (dispatch) {
        try {
            const response = await axios.get(`/users/${id}`);
            const userInfo = response.data;
            return dispatch({
                type: GET_USER_BY_ID,
                payload: userInfo,
            });
        } catch (error) {
            console.log(error);
        }
    };
}

export function updateProfile(email, name, address, favorite, cart, banned) {
    return async function (dispatch) {
        try {
            const response = await axios.put('/users', {
                email,
                name,
                address,
                favorite,
                cart,
                banned,
            });
            return dispatch({
                type: UPDATE_PROFILE,
                payload: response.data,
            });
        } catch (error) {
            return error;
        }
    };
}

export function favoritesHandler(userId, productId) {
    return async function (dispatch) {
        try {
            const response = await axios.put(`/users/${userId}/favorites/${productId}`);
            return dispatch({
                type: FAVORITES_UPDATE,
                payload: response.data,
            })
        } catch (error) {
            console.log(error)
        }
    };
}

export function postSignUp(obj) {
    return async function (dispatch) {
        const response = await axios.post('/login/signup', obj);
        const userData = response.data;
        localStorage.setItem('token', userData.token);
        return dispatch({
            type: SIGNUP,
            payload: userData,
        });
    };
}

export function postLogin(obj) {
  return async function (dispatch) {
    try {
      const response = await axios.post('/login/login', obj);
      if (response.status === 401) throw new Error(response.message);
      const userData = response.data;
      localStorage.setItem('token', userData.token);
      return dispatch({
        type: LOGIN,
        payload: userData,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function agregarPago(data) {
  return {
    type: AGREGAR_PAGO,
    payload: data,
  };
}

export function getProductosPagos(obj) {
    let token = obj.token
    return async function (dispatch) {
        try {
            const response = await axios.get(`/productHistory/${token}`);
            const pagoData = response.data;
            return dispatch({
                type: TRAER_PRODUCT_PAGOS,
                payload: pagoData,
            });
        } catch (error) {
            console.log("ha ocurrido un error")
            console.log(error.message);
            return dispatch({
                type: TRAER_PRODUCT_PAGOS,
                payload: [],
            });
        }
    };
}

export const cuenta = (obj) => {
  return {
    type: CUENTA,
    payload: obj,
  };
};

export function editFoto(user) {
  return async function (dispatch) {
    const response = await axios.post('/undateFoto', user);
    const userData = response.data;
    return dispatch({
      type: EDIT_FOTO,
      payload: userData,
    });
  };
}

export function editNombre(obj) {
  return async function (dispatch) {
    const response = await axios.put('/usersName', obj);
    const userData = response.data;
    return dispatch({
      type: EDIT_NAME,
      payload: userData,
    });
  };
}

export function getReview(productId) {
  return async function (dispatch) {
    const response = await axios.get(`/reviews/${productId}`);
    const data = response.data;
    return dispatch({
      type: REVIEW,
      payload: data,
    });
  };
}

export function setComentario(obj) {
  return async function (dispatch) {
    const response = await axios.post('/reviews', obj);
    const data = response.data;
    return dispatch({
      type: COMENTARIO,
      payload: data,
    });
  };
}

export function BanUser(id) {
  return async function (dispatch) {
    const response = await axios.delete(`/users/${id}`);
    const data = response.data;
    return dispatch({
      type: BAN_USER,
      payload: data,
    });
  };
}
