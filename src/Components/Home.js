import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";
import "../Components/Home.css"
import { useDispatch } from "react-redux";
import { ACTION_TYPES } from "./Redux/store";
import { useNavigate } from "react-router-dom";


function Home() {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [inputValue, setInputValue] = useState(1);
    const [titleFilter, setTitleFilter] = useState(" ");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const products = useSelector((state) => {
        console.log("products in selector in home", state.products)
        return state.products;
    })


    useEffect(() => {
        const filteredProductList = products.filter((product) => {
            if (product.title.toLowerCase().includes(titleFilter.trim().toLowerCase()))
                return true;
            return false;
        });

        setFilteredProducts(filteredProductList);

    }, [titleFilter, products])


  return (
      <>
        <div className="searchbar">
            <p className="search-name">Search:</p>
            <input type="search"
                placeholder="search for products"
                onChange={(event) => setTitleFilter(event.target.value)}
                value={titleFilter}
                size="50"
            />

                <button type="button" id="btn"
                    onClick={()=>{
                    
                    navigate("/checkOutPage")

                }}>Add to Cart</button>
        </div>
    <div className="container">
       {filteredProducts.length === 0 ? (
          <p>No products available</p>
          )
         : (
          filteredProducts.map((product) => {
             return (
                <>
                    <div className="box">
                        <div className="content">
                            <div className="data" key={product.id} >
                                <p><img src={product.images[0]} alt="product img" />
                                    <p>product title: {product.title}</p>
                                </p>

                                <p>product id:{product.id}</p>
                                <p> product price:{product.price}</p>
                                <input value={inputValue} onChange={(event) => setInputValue(event.target.value) }
                                    size="10"
                                    placeholder='Add an item...'
                                />
                                <FontAwesomeIcon icon={faShoppingCart}/>

                                <input type="checkbox" id="checkbox" onChange={(e) => 
                                            dispatch({
                                            type: ACTION_TYPES.ADD_TO_CART,
                                            payload:{
                                                product: product,
                                            }           
                                        })
                                  }/>

                                <p>product brand:{product.brand}</p>
                                <p>product category:{product.category}</p>
                                <p>product stock:{product.stock}</p>    
                                <p>product rating:{product.rating}</p>
                                <p>product discount:{product.discountPercentage}</p>

                            </div>

                        </div>

                    </div>
                </>
            )
         })
       )}
    </div>
 </>
    )
}

export default Home;
