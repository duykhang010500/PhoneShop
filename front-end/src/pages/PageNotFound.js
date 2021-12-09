
import React from 'react'
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';
export default function PageNotFound() {
    return (
        <div className="mt-12">
            <Result

                status="404"
                title="404"
                subTitle="Xin lỗi, trang bạn tìm không tồn tại!"
                extra={<Button type="primary" size="middle">
                    <Link to='/'>
                        Về trang chủ
                    </Link>
                </Button>}
            />
        </div>
    )
}
