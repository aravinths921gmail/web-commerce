
import React from "react";
import { useParams } from "react-router-dom";
import Productfetching from "../Products/Productfetching";
import Navbars from "../Navbar/Navbar";
import Slider from "../Sliders/Slider";
import CategorySection from "../CategorySection/CategorySection"

export default function Categoryfilter() {

  const { id } = useParams(); // get category id from URL

  return (
    <>
      <Slider categoryId={id}/>
      <Productfetching categoryId={id} />
      <CategorySection />
    </>
  );
}







