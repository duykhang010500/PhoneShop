import { Divider } from "antd";

export default function CoreValue() {
    return (
        <section>
            <Divider />
            <div className="container">
                <div className="corevalue">
                    <div className="corevalue__item">
                        <div className="corevalue__icon">
                            <i class="far fa-check-circle"></i>
                        </div>
                        <div className="corevalue__info">
                            <span>Sản phẩm</span>
                            <strong>Chính hãng</strong>
                        </div>
                    </div>
                    <div className="corevalue__item">
                        <div className="corevalue__icon">
                            <i class="fas fa-truck-moving"></i>
                        </div>
                        <div className="corevalue__info">
                            <span>Giao hàng</span>
                            <strong>Miễn phí</strong>
                        </div>
                    </div>
                    <div className="corevalue__item">
                        <div className="corevalue__icon">
                            <i class="fas fa-headphones"></i>
                        </div>
                        <div className="corevalue__info">
                            <span>Online hỗ trợ</span>
                            <strong>1900.4444</strong>
                        </div>
                    </div>
                    <div className="corevalue__item">
                        <div className="corevalue__icon">
                            <i class="fas fa-history"></i>
                        </div>
                        <div className="corevalue__info">
                            <span>Đổi trả trong</span>
                            <strong>30 ngày</strong>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}