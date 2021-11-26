import {
    Row,
    Col,
} from 'antd'

import HeaderLogo from './HeaderLogo'
import HeaderSearch from './HeaderSearch'
import HeaderMenu from './HeaderMenu'

export default function Header() {
    return (
        <div className="header-wrapper">
            <header className="header">
                <div className="container">
                    <Row justify="space-between" align="middle" gutter={[10, 10]}>
                        <Col
                            xs={22}
                            md={4}
                        >
                            <HeaderLogo />
                        </Col>
                        <Col
                            xs={24}
                            md={10}
                        >
                            <HeaderSearch />
                        </Col>
                        <Col
                            xs={2}
                            md={10}
                        >
                            <HeaderMenu />
                        </Col>
                    </Row>
                </div>
            </header>
        </div>
    )
}