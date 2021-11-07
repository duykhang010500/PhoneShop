import React from 'react'
import { Carousel, Row, Col } from 'antd';
import { Link } from 'react-router-dom'
import Banner from '../../assets/banner'

const Slider = () => {
    return (
        <div className="container carousel">
            <Row>
                <Col
                    span={4}
                >
                    <ul className="menu">
                        <Link className="menu-item">
                            Iphone
                        </Link>
                        <Link className="menu-item">
                            Samsung
                        </Link>
                        <Link className="menu-item">
                            Oppo
                        </Link>
                        <Link className="menu-item">
                            Vivo
                        </Link>
                        <Link className="menu-item">
                            huwai
                        </Link>
                        <Link className="menu-item">
                            Bphone
                        </Link>
                    </ul>
                </Col>
                <Col span={14}>
                    <Carousel className="carousel">
                        {
                            Banner.map((item, index) =>
                                <img key={index} src={item} alt="" />
                            )
                        }
                    </Carousel>
                </Col>
                <Col
                    span={6}
                >
                    <Row
                        gutter={[10, 10]}
                        justify="space-around"
                    >
                        <Col span={24}>
                            <Link className="banner-item">
                                <img src="https://cdn.cellphones.com.vn/media/ltsoft/promotion/arb_s21-Ultra.png" alt="" />
                            </Link>
                        </Col>
                        <Col span={24} >
                            <Link className="banner-item">
                                <img src="https://cdn.cellphones.com.vn/media/ltsoft/promotion/mn-Right_Banner_Desktop_2_.png" alt="" />
                            </Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default Slider

