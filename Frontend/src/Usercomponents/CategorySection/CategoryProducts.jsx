import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

export default function CategoryProducts(){

  const {categoryId} = useParams();
  const [products,setProducts] = useState([]);

  useEffect(()=>{

    const fetchProducts = async()=>{

      try{
        const res = await axios.get(
          `http://localhost:4000/api/v1/auth/getProductsByCategory/${categoryId}`
        );

        setProducts(res.data);

      }catch(err){
        console.log(err);
      }

    };

    fetchProducts();

  },[categoryId]);

  return(

    <div style={{padding:"40px"}}>

      <h2>Category Products</h2>

      <div style={{display:"flex",flexWrap:"wrap",gap:"20px"}}>

        {products.map((p)=>(
          <div key={p._id} style={{border:"1px solid #ddd",padding:"20px",width:"250px"}}>

            <img
              src={`http://localhost:4000/uploads/${p.images[0]}`}
              alt={p.Name}
              width="100%"
            />

            <h4>{p.Name}</h4>
            <p>₹{p.price}</p>

          </div>
        ))}

      </div>

    </div>

  );

}