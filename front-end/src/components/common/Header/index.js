import {
    Row,
    Col,
    Input,
    Space,
} from 'antd'

import HeaderLogo from './HeaderLogo'
import HeaderSearch from './HeaderSearch'
import HeaderMenu from './HeaderMenu'

const { Search } = Input

export default function Header() {

    return (
        <header>
            <div className="header-wrapper">
                <div className="container">
                    <header className="header">
                        <Row justify="space-between" align="middle" gutter={[10, 10]}>
                            <Col
                                md={4}
                                xs={22}
                            >
                                <HeaderLogo />
                            </Col>
                            <Col
                                md={10}
                                xs={24}
                            >
                                <HeaderSearch />
                            </Col>
                            <Col
                                md={10}
                                xs={2}
                            >
                                <HeaderMenu />
                            </Col>
                        </Row>
                    </header>
                </div>
            </div>
        </header>

    )
}