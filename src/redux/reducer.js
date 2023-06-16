import {
    GET_ALL_PRODUCTS,
    GET_DETAIL,
    SEARCH_BY_NAME,LOGIN, SIGNUP, AGREGAR_PAGO, TRAER_PRODUCT_PAGOS, CUENTA, REVIEW, COMENTARIO, EDIT_NAME, EDIT_FOTO

} from './variables';

const initialState = {
    products: [],
    filtered: [],
    detail: [],
    filters: [],
    userData: null,
    pagoData: null,
    productPagos: null,
    cuenta: {
        General: true,
        MisDatos: false,
        MisPedidos: false
    }
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

         case TRAER_PRODUCT_PAGOS: {
            return {
                ...state,
                productPagos: action.payload
              }
         }

         case CUENTA: {
            return {
                ...state,
                cuenta: action.payload
              }
         }

         case REVIEW: {
            return console.log(action.payload);
            
         }

         case COMENTARIO: {
            return console.log(action.payload);
            
         }
         case EDIT_NAME: {
            return console.log(action.payload);
            
         }
         case EDIT_FOTO: {
            return console.log(action.payload);
            
         }

        default:
            return state;
    }
}

export default rootReducer;