import React, { useEffect, useState } from 'react'
import {
    Row,
    Typography
} from 'antd'
import { useSelector } from 'react-redux'

export default function DetailProductPost() {

    const [isShowMore, setIsShowMore] = useState(false)
    const [isShowButton, setIsShowButton] = useState(true)

    useEffect(() => {
        window.scrollTo(0, 0)
        const height = document.getElementById('desc').offsetHeight;
        if (height >= 500) {
            setIsShowMore(true)
        } else {
            setIsShowButton(false)
        }
    }, [])

    const product = useSelector((state) => state.Products.detailProduct.data)
    if (!product) {
        return null
    }

    return (
        <div >
            <Typography.Title
                level={4}>
                Đặc điểm nổi bật
            </Typography.Title>
            <Typography.Paragraph
                id="desc" className={isShowMore ? 'hide-desc' : ''}
            >
                {
                    product.desc ?
                        <div dangerouslySetInnerHTML={{
                            __html: product.desc
                        }} />
                        : 'Đang cập nhật'
                }
            </Typography.Paragraph>
            <Row justify="center">
                {
                    isShowMore ?
                        (
                            isShowButton && <p className="show-more box-sd1"
                                onClick={() => setIsShowMore(false)}>
                                Xem thêm
                            </p>
                        )
                        :
                        (
                            isShowButton && <p className="show-more box-sd1" onClick={() => {
                                setIsShowMore(true)
                                window.scrollTo(200, 500)
                            }}>Thu Gọn</p>
                        )
                }
            </Row>
        </div>
    )
}
