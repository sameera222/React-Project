import {configureStore} from "@reduxjs/toolkit";

//This is redux store having state of the application

const INITIAL_STATE = {
    products: [],
    cart: [],
    lengthA: 0,
}

export const ACTION_TYPES = {
    ADD_PRODUCTS: "add-products",
   ADD_TO_CART: "add-to-cart",
   UPDATE_CART: "update-cart",

}


const store = configureStore({
    reducer: (state, action)=>{

        const {type, payload} = action
       

        switch(type){
            case "products-fetched":
                const products = payload

                return{
                    ...state,
                    products,
                }

            case ACTION_TYPES.ADD_TO_CART:
               const{product} = payload;

                    return{
                        ...state,
                        cart: [
                            ...state.cart.filter((item)=> item.id !== product.id),
                            {...product, quantity: 1}
                        ],
                        lengthA: state.cart.length,
                    };
                
            case ACTION_TYPES.UPDATE_CART:
               const{cartProduct} = payload;

                        return{
                            ...state,
                            cart: cartProduct,
                        }

                default:
                break;

         }
           return INITIAL_STATE;

    }
});

export default store;
