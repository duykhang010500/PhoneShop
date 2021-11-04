import React, { useState } from 'react'
import {
    Form,
    Input,
    DatePicker,
    Button,
    Col,
    Row,
    Upload,
    Select,
    Avatar,
    Image
} from 'antd'

import {
    MailOutlined,
    PlusOutlined,
    UserOutlined,
    SaveOutlined
} from '@ant-design/icons'

import {
    useSelector,
    useDispatch
} from 'react-redux'
import { useAuthenticated } from '../../hooks/useAuthenticate'

const DashboardUserInfo = () => {
    useAuthenticated()
    const [isLoading, setIsLoading] = useState(false)

    const { Option } = Select

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const currentUser = useSelector(state => state.Auth.currentUser)
    if (!currentUser) {
        return null
    }

    const handleSubmit = (values) => {
        console.log(values)
    }

    return (
        <div
            style={{ backgroundColor: "#fff", padding: "3rem" }}
        >
            <Form
                layout="vertical"
                initialValues={{
                    email: currentUser.email,
                    name: currentUser.name,
                    sex: currentUser.sex,
                    // dob: '2015-01-01'
                }}
                onFinish={handleSubmit}
            >
                <Row
                    gutter={[20, 5]}
                >

                    <Col
                        span={24}
                    >
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        // beforeUpload={beforeUpload}
                        // onChange={this.handleChange}
                        >
                            {
                                currentUser.image ? <Image /> : <Avatar icon={<UserOutlined />} />
                            }
                        </Upload>
                    </Col>
                    <Col
                        span={12}
                    >
                        <Form.Item
                            label='Email'
                            name='email'
                            rules={[
                                {
                                    required: true
                                }
                            ]}

                        >
                            <Input
                                // value="Your email"
                                disabled
                                prefix={<MailOutlined />}
                                size="large"
                                defaultValue="usertest@gmail.com"

                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label='Họ và tên'
                            name="name"
                            rules={[
                                {
                                    required: true
                                }
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined />}
                                size="large"
                                defaultValue="User Test"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label='Giới tính'
                            name="sex"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng chọn giới tính"
                                }
                            ]}
                        >
                            <Select
                                size="large"
                                placeholder="Giới tính"
                            >
                                <Option
                                    value="male"
                                >
                                    Nam
                                </Option>
                                <Option
                                    value="female"
                                >
                                    Nữ
                                </Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label='Ngày sinh'
                            name="dob"
                            rules={[
                                {
                                    required: true
                                }
                            ]}
                        >
                            <DatePicker
                                style={{ width: "100%" }}
                                size="large"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                        >
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={isLoading}
                                size="large"
                                icon={<SaveOutlined />}
                            >
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default DashboardUserInfo
