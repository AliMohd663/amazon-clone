import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import { img } from './data'
import "react-responsive-carousel/lib/styles/carousel.min.css";

function CarouselEffect() {
    return (
        <div>
            <Carousel
                autoPlay={true}  
                infiniteLoop={true}  
                showIndicators={false}
                showThumbs={false}
            >
                {img.map((imagelink, index) => (
                    <div key={index}>
                        <img src={imagelink} alt={`Slide ${index + 1}`} />
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default CarouselEffect;