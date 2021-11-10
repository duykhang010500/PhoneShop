import {
    YoutubeOutlined,
    FacebookFilled,
    TwitterCircleFilled,
} from '@ant-design/icons'

export default function Footer() {
    return (
        <footer >
            <div className="container">
                <div className="footer">
                    <ul className="footer__column">
                        <h3 className="footer__title">
                            Điều khoản và sử dụng
                        </h3>
                        <li className="footer__item">
                            <p>Hướng dẫn mua hàng</p>
                        </li>
                        <li className="footer__item">
                            <p>Chính sách mua hàng</p>
                        </li>
                        <li className="footer__item">
                            <p>Chính sách bảo mật</p>
                        </li>
                        <li className="footer__item">
                            <p>Điều khoản mua bán</p>
                        </li>
                    </ul>
                    <ul className="footer__column">
                        <h3 className="footer__title">
                            Hỗ trợ - Dịch vụ
                        </h3>
                        <li className="footer__item">
                            <p>Hỗ trợ kỹ thuật</p>
                        </li>
                        <li className="footer__item">
                            <p>Hỗ trợ bảo hàng và sửa chữa</p>
                        </li>
                    </ul>
                    <ul className="footer__column">
                        <h3 className="footer__title">
                            Giới thiệu công ty
                        </h3>
                        <li className="footer__item">
                            <p>Về công ty</p>
                        </li>
                        <li className="footer__item">
                            <p>Đối tác</p>
                        </li>
                    </ul>
                    <ul className="footer__column">
                        <h3 className="footer__title">
                            Liên hệ với chúng tôi
                        </h3>
                        <ul className="footer__social">
                            <YoutubeOutlined className="footer__social--ytb" />
                            <FacebookFilled className="footer__social--fb" />
                            <TwitterCircleFilled className="footer__social--tt" />
                        </ul>
                    </ul>
                </div>
            </div>
        </footer>
    )
}