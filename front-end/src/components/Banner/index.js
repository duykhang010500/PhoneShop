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

    return (
        <div className="banner">
            <div className="container">
                <Carousel
                    dots={true}
                    autoplay
                >
                    <div style={contentStyle}>
                        <img src="https://cdn.hoanghamobile.com/i/home/Uploads/2021/11/26/web-fold-filp-01.jpg" alt="" />
                    </div>
                    <div style={contentStyle}>
                        <img src="https://cdn.hoanghamobile.com/i/home/Uploads/2021/11/15/lenovo-m10-01.jpg" alt="" />
                    </div>
                    <div style={contentStyle}>
                        <img src="https://cdn.hoanghamobile.com/i/home/Uploads/2021/12/03/tua-n-le-giam-so-c-samsung-galaxy-a-1200x382.jpg" alt="" />
                    </div>
                    <div style={contentStyle}>
                        <img src="https://cdn.hoanghamobile.com/i/home/Uploads/2021/12/02/huawei-band-6-freebuds-4i-01.jpg" alt="" />
                    </div>
                </Carousel>
            </div>
        </div>
    )
}

export default Banner
