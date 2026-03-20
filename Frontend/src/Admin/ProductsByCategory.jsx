import { useState } from "react";
import axios from "axios";

export default function ProductsByCategory(){

  const [categoryId,setCategoryId] = useState("");
  const [products,setProducts] = useState([]);

  const fetchProducts = async () => {

    try{

      const res = await axios.get(
        `http://13.58.192.45:4000/api/v1/product/category/${categoryId}`
      );

      setProducts(res.data);

    }

    catch(error){

      console.log(error);

    }

  }

  return(

    <div>

      <h2>Products By Category</h2>

      <input
      placeholder="Category ID"
      value={categoryId}
      onChange={(e)=>setCategoryId(e.target.value)}
      />

      <button onClick={fetchProducts}>
        Get Products
      </button>

      <div>

        {products.map(product => (

          <div key={product._id}>
            {product.name}
          </div>

        ))}

      </div>

    </div>

  )

}