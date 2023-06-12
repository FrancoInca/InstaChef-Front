import axios from 'axios';
import {
    GET_ALL_PRODUCTS,
    GET_DETAIL,
    SEARCH_BY_NAME, LOGIN, SIGNUP, AGREGAR_PAGO, TRAER_PRODUCT_PAGOS, CUENTA 
} from './variables';


export function getAllProducts() {
    return async function (dispatch) {
        const response = await axios.get('/products/');
        const allProducts = response.data;
        console.log(allProducts);
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

export function postSignUp(obj) {
    return async function (dispatch) {
        const response = await axios.post("/login/signup", obj );
        const userData = response.data;
        localStorage.setItem("token", userData.token)
        return dispatch({
            type: SIGNUP,
            payload: userData,
        });
    };
}

export function postLogin(obj) {
    return async function (dispatch) {
        const response = await axios.post("/login/login", obj );
        const userData = response.data;
        localStorage.setItem("token", userData.token)
        console.log(userData);
        return dispatch({
            type: LOGIN,
            payload: userData,
        });
    };
}

export function agregarPago({amount, id, email, nombre, idCurso}) {
    let token = localStorage.getItem("token")
    let obj = {
        amount, id, email, nombre, idCurso, token
    }
    return async function (dispatch) {
        const response = await axios.post("/checkout", obj );
        const pagoData = response.data;
        return dispatch({
            type: AGREGAR_PAGO,
            payload: pagoData,
        });
    };
}


export function getProductosPagos() {
    let token = localStorage.getItem("token")
    let obj = {
         token
    }
    return async function (dispatch) {
        const response = await axios.post("/productosPagos", obj );
        const pagoData = response.data;
        console.log(pagoData);
        return dispatch({
            type: TRAER_PRODUCT_PAGOS,
            payload: pagoData,
        });
    };
}


export const cuenta = (obj) => {
  return ({
    type: CUENTA,
    payload: obj
  })
}