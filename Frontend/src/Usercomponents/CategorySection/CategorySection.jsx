import React from "react";
import { useNavigate } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import "./CategorySection.css";
import treadmillImg from "../../assets/images/Products/treadmills.png";
import elliptical from "../../assets/images/Products/elliptical.png";
import spinbike from "../../assets/images/Products/spinbike.png";
import dumbells from "../../assets/images/Products/home/dumbells.png";
import yogamat from "../../assets/images/Products/home/yoga-mat.png";
import bands from "../../assets/images/Products/home/bands.png";
// import Treadmill from "../Categorieslist/Treadmill";

export default function CategorySection() {

  const navigate = useNavigate();

  const categories = [
    { id: "69aeecd2fb1fa9b52efa3486", name: "Treadmills", image: treadmillImg },
    { id: "69aeece3fb1fa9b52efa3489", name: "Elliptical Trainer", image: elliptical },
    { id: "69aeecf3fb1fa9b52efa348c", name: "Spin Bikes", image: spinbike },
    { id: "69aeed00fb1fa9b52efa348f", name: "Dumbells", image: dumbells},
    { id: "69aeed05fb1fa9b52efa3492", name: "Yoga Mats & ropes", image: yogamat },
    { id: "69aeed12fb1fa9b52efa3495", name: "Lifting Barbells", image: bands }
  ];

const openCategory = (id) => {
  navigate(`/category/${id}`);
};

  return (
    <div className="category-container">
      <h2 className="category-title">Shop by Category</h2>

      <Carousel interval={3000} indicators={false} controls={true}>
        {/* First Slide */}
        <Carousel.Item>
          <div className="category-row">
            {categories.slice(0, 3).map(cat => (
              <div key={cat.id} className="category-card" onClick={() => openCategory(cat.id)}>
                <img src={cat.image} alt={cat.name} className="category-img" />
                <div className="category-name">{cat.name}</div>
              </div>
            ))}
          </div>
        </Carousel.Item>

        {/* Second Slide */}
        <Carousel.Item>
          <div className="category-row">
            {categories.slice(3, 6).map(cat => (
              <div key={cat.id} className="category-card" onClick={() => openCategory(cat.id)}>
                <img src={cat.image} alt={cat.name} className="category-img" />
                <div className="category-name">{cat.name}</div>
              </div>
            ))}
          </div>
        </Carousel.Item>
      </Carousel>

    </div>
  )
}