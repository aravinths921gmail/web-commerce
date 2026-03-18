import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import gymgirl from '../../assets/Sliders/gymbanner3.png';
import gymboy from '../../assets/Sliders/gymbanner1.png';
import gymboy2 from '../../assets/Sliders/gymbanner2.png';
import treadmill1 from '../../assets/Sliders/tread1.png';
import treadmill2 from '../../assets/Sliders/tread2.png';
import dumbbell1 from '../../assets/Sliders/dumb.png';
import dumbbell2 from '../../assets/Sliders/dumb2.png';
import elliptical1 from '../../assets/Sliders/Elliptical1.png';
import elliptical2 from '../../assets/Sliders/Elliptical2.png';
import yogamate1 from '../../assets/Sliders/yoga1.jpg';
import yogamate2 from '../../assets/Sliders/yoga2.jpg';
import spinbike1 from '../../assets/Sliders/spinbike1.jpg';
import spinbike2 from '../../assets/Sliders/spinbike2.jpg';
import barbell1 from '../../assets/Sliders/barbell1.jpg';
import barbell2 from '../../assets/Sliders/barbell2.jpg';
import styles from './Slider.module.css';

export default function Slider({ categoryId }) {

  // Slider data with images, headers, and descriptions
  const sliderData = {
    "69aeecd2fb1fa9b52efa3486": { // Treadmills
      images: [treadmill1, treadmill2],
      headers: ["Upgrade Your Workout", "Premium Treadmills"],
      descriptions: ["Smooth running experience", "Durable & Stylish"]
    },

    "69aeed00fb1fa9b52efa348f": { // Dumbbells
      images: [dumbbell1, dumbbell2],
      headers: ["Strength Training", "High-Quality Dumbbells"],
      descriptions: ["For beginners & pros", "Compact & Ergonomic"]
    },

    "69aeece3fb1fa9b52efa3489": { // Ellipticals
      images: [elliptical1, elliptical2],
      headers: ["Cardio Made Easy", "Ellipticals for All Levels"],
      descriptions: ["Low-impact workout", "Smooth & Comfortable"]
    },
    "69aeed05fb1fa9b52efa3492": { // Yoga Mats
      images: [yogamate1, yogamate2],
      headers: ["Perfect Your Poses", "Yoga Mats for Home"],
      descriptions: ["Non-slip surface", "Eco-friendly material"]
    },
    "69aeecf3fb1fa9b52efa348c": { // Spin Bikes
      images: [spinbike1, spinbike2],
      headers: ["Spin to Win", "Indoor Cycling Bikes"],
      descriptions: ["Adjustable & Sturdy", "Smooth Ride"]
    },
    "69aeed12fb1fa9b52efa3495": { // Barbells
      images: [barbell1, barbell2],
      headers: ["Lift Like a Pro", "Barbells for Every Gym"],
      descriptions: ["Heavy-duty & Safe", "Perfect for Strength Training"]
    }
  };

  // Default slides if categoryId is not in sliderData
  const { images, headers, descriptions } = sliderData[categoryId] || {
    images: [gymboy, gymgirl, gymboy2],
    headers: ["BUILD YOUR", "DREAM GYM"],
    descriptions: ["Premium Fitness Equipment", "For Home & Commercial Gyms"]
  };

  return (
    <Carousel className={styles.carousel}>
      {images.map((img, index) => (
        <Carousel.Item key={index} interval={3000}>
          <img className={`d-block w-100 ${styles.image}`} src={img} alt={`Slide ${index + 1}`} />
          <Carousel.Caption className={styles.bannerCaption}>
            <h1 className={styles.bannerText}>{headers[0]}</h1>
            <h1 className={styles.bannerText}>{headers[1]}</h1>
            <h6 className={styles.bannerSubText}>{descriptions[0]}</h6>
            <h6 className={styles.bannerSubText}>{descriptions[1]}</h6>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}