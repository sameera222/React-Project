import React, { useEffect } from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import './App.css';
import Home from "./Components/Home"
import CheckOutPage from "./Components/CheckOutPage";
import ThankYouPage from "./Components/ThankYouPage";
import {ProductAPI} from "./Components/API/ProductAPI";
import {useDispatch} from "react-redux";


function App() {

  const dispatch = useDispatch();

//Here I have fetched products from API 

useEffect(()=>{
  ProductAPI().then((response)=>{
    const products = response.data.products;
    console.log(products, "products are fethed on app")

    dispatch({
      type: "products-fetched",
      payload: 
       products,
    })
  })
},[]);


  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path="/" element={ <Home/>}/>
            <Route path="/CheckOutPage" element={<CheckOutPage/>}/>
            <Route path="/ThankYouPage" element={<ThankYouPage/>}/>
        </Routes>
      </Router>   
    </div>
  );

}

export default App;

