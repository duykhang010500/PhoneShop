import React from 'react'
import { Carousel } from 'antd'

const Banner = () => {
    const contentStyle = {
        height: '360px',
        color: '#fff',
        lineHeight: '160px',
        background: '#364d79',
        marginBottom: '2rem'
    }

    const listImg = [
        'https://i.ibb.co/p0FXd27/web-fold-filp-01.jpg',
        'https://i.ibb.co/2cZCTN5/tua-n-le-giam-so-c-samsung-galaxy-a-1200x382.jpg',
        'https://i.ibb.co/HYtGxB7/lenovo-m10-01.jpg',
        'https://i.ibb.co/J3khjQL/huawei-band-6-freebuds-4i-01.jpg'
    ]

    return (
        <div className="banner">
            <div className="container">
                <Carousel
                    dots={true}
                    autoplay
                >
                    {
                        listImg.map((item, index) => {
                            return <div
                                style={contentStyle}
                                key={index}
                            >
                                <img src={item} alt="" />
                            </div>
                        })
                    }

                </Carousel>
            </div>
        </div>
    )
}

export default Banner
