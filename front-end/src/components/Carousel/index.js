import React from 'react'
import { Carousel } from 'antd';
import Banner from '../../assets/banner'

const Slider = () => {

    return (
        <div className="container">
            <Carousel className="carousel" dots={false} autoplay>
                {
                    Banner.map((item, index) =>
                        <img key={index} src={item} alt="" />
                    )

                }
            </Carousel>
        </div>
    )
}

export default Slider

