import {
    GET_ALL_PRODUCTS,
    GET_DETAIL,
    SEARCH_BY_NAME,LOGIN, SIGNUP, AGREGAR_PAGO

} from './variables';

const initialState = {
    products: [],
    filtered: [],
    detail: [],
    filters: [],
    userData: null,
    pagoData: null
};


const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                filtered: action.payload,
            };

        case SEARCH_BY_NAME:
            return {
                ...state,
                filtered: action.payload,
            };

        case GET_DETAIL: {
            return {
                ...state,
                detail: action.payload,
            };
        }
        case SIGNUP: {
           return {
             ...state,
             userData: action.payload
           }
        }
        case LOGIN: {
            return {
              ...state,
              userData: action.payload
            }
         }
         case AGREGAR_PAGO: {
            return {
              ...state,
              pagoData: action.payload
            }
         }

        default:
            return state;
    }
}

export default rootReducer;