import React, { useEffect, useState } from 'react'
import {
    Row,
    Typography
} from 'antd'

export default function DetailProductPost({ product }) {
    useEffect(() => {
        window.scrollTo(0, 0)
        const height = document.getElementById('desc').clientHeight;
        if (height >= 200) {
            setIsShowMore(true)
        }
    }, [])

    const [isShowMore, setIsShowMore] = useState(false)

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
                    isShowMore ? <p className="show-more box-sd1" onClick={() => setIsShowMore(false)}>Xem thêm</p>
                        :
                        <p className="show-more box-sd1" onClick={() => {
                            setIsShowMore(true)
                            window.scrollTo(200, 500)
                        }}>Thu Gọn</p>
                }
            </Row>
        </div>
    )
}
