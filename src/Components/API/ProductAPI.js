import axios from "axios"

export async function ProductAPI(){
    //This is the API Link.
    return await axios.get("https://dummyjson.com/products/");

}


