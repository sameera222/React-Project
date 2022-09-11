import React, { useState, useEffect } from "react"
import { useDispatch } from 'react-redux'
import { useSelector } from "react-redux"
import { ACTION_TYPES } from "./Redux/store";
import "./CheckOutPage.css"
import { useNavigate } from "react-router-dom";


function CheckOutPage() {

  //Products quantity is updated
  function updateProductQuantity(id, quantity, products) {
    const updateProducts = JSON.parse(JSON.stringify(products));
    const updateTextIndex = updateProducts.findIndex(
      (product) => product.id === id
    )
    updateProducts[updateTextIndex].quantity = quantity > 0 ? quantity : 1;
    return updateProducts;
  }

  //Initially products are added in the array and total values are collected when we added in the cart

  const [cartProducts, setCart] = useState([]);
  const [total, setTotal] = useState();

  const dispatch = useDispatch()
  const navigate = useNavigate()
 
  //State is read by the useSelector 
  const cart = useSelector((state) => {
    return state.cart;
  });

  useEffect(() => {
    setCart(cart)
  }, [cart])
  
  //Total cart price is caluculated here
  const subTotal = cartProducts.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )


  useEffect(() => {
    setTotal(subTotal)
  }, [subTotal])


const handleQntyIncrement = (item) => {
    const updateProducts = updateProductQuantity(
      item.id,
      item.quantity + 1,
      cartProducts
    );

    dispatch({
      type: ACTION_TYPES.UPDATE_CART,
      payload: { cartProduct: updateProducts }
    })
  
}

const handleQntyDecrement = (item) => {
    const updateProducts = updateProductQuantity(
      item.id,
      item.quantity - 1,
      cartProducts
    );

    dispatch({
      type: ACTION_TYPES.UPDATE_CART,
      payload: { cartProduct: updateProducts }
    })
  
}


  return (
    <>
      <div>
        {cartProducts.length === 0 ? (
          <p>No carts available</p>
        )
          :
          (
            cartProducts.map((item) => {
              return (
                <>
                 
                    <div className="column">
                      <div className="card">
                        <div className="data" key={item.id}>

                          <p><img src={item.images[0]} alt="product img" /></p>
                          <p>product Title:{item.title}</p>
                          <p>product Price:{item.price}</p>

                          <button type="button" onClick={() => {

                            handleQntyIncrement(item)

                          }}>+</button>


                          <p>{item.quantity}</p>

                          <button type="button" onClick={() => {

                            handleQntyDecrement(item)

                          }}>-</button>
                          <p>product Stock:{item.stock}</p>
                        </div>
                      </div>

                    </div>
                

                </>
              )
            })
          )}

      </div>

      <div className="column">
           <p className="card">
             <p>Your total is:</p>
             <button type='button' id="btn">{subTotal}</button>
             <button type="button" id="btn" onClick={()=>{
                 navigate("/ThankYouPage")
              }}>Proceed to checkout</button>
           </p>     
      </div>
    </>
  )
}

export default CheckOutPage;
