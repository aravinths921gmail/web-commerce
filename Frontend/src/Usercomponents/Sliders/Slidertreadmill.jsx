import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import gymgirl from '../../assets/Sliders/gymbanner3.png'
import gymboy from '../../assets/Sliders/gymbanner1.png'
import gymboy2 from '../../assets/Sliders/gymbanner2.png'
import styles from './Slider.module.css'

export default function Slider({categoryId}) {
  return (
    <Carousel className={styles.carousel}>
      <Carousel.Item interval={1000}>
        <img  className={`${styles.image}`}  src={gymboy} alt="First slide" />
        <Carousel.Caption className={styles.bannerCaption}>
          <h1 className={styles.bannerText}>BUILD YOUR <p className={styles.colorChanger}>DREAM GYM</p> </h1>
          <h6 className={styles.bannerSubText}>
            Premium Fitness Equipment for Home & Commercial Gyms
          </h6>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={500}>
        <img
          className={`d-block w-100 ${styles.image}`}
          src={gymgirl}
          alt="First slide"
        />
       <Carousel.Caption className={styles.bannerCaption}>
          <h1 className={styles.bannerText}>Train Hard. <p className={styles.colorChanger}>Stay Strong</p></h1>
          <h6 className={styles.bannerSubText}>
            Explore Treadmills, Spin Bikes, Dumbbells & More
          </h6>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className={`d-block w-100 ${styles.image}`}
          src={gymboy2}
          alt="First slide"
        />
       <Carousel.Caption className={styles.bannerCaption}>
          <h1 className={styles.bannerText}>Upgrade Your <p className={styles.colorChanger}>Workout Today</p></h1>
          <h6 className={styles.bannerSubText}>
            High Quality Gym Equipment at the Best Price
          </h6>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}


