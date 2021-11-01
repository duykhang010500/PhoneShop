import React from 'react'
import {
    Form,
    Input,
    DatePicker,
    Button,
    Col,
    Row,
    Upload,
    Select
} from 'antd'

import {
    MailOutlined,
    PlusOutlined,
    UserOutlined,
    ClockCircleOutlined
} from '@ant-design/icons'

const DashboardUserInfo = () => {

    const { Option } = Select

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <div
            style={{ backgroundColor: "#fff", padding: "3rem" }}
        >
            <Form
                layout="vertical"

            >
                <Row
                    gutter={[20, 5]}
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
                        Tải ảnh
                    </Upload>
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
                                value="Your email"
                                disabled
                                prefix={<MailOutlined />}
                                size="large"

                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label='Họ và tên'
                            name="fullname"
                            rules={[
                                {
                                    required: true
                                }
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined />}
                                size="large"

                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label='Giới tính'
                            name="gender"
                            rules={[
                                {
                                    required: true
                                }
                            ]}
                        >
                            <Select
                                size="large"
                                placeholder="Giới tính"
                            >
                                <Option>
                                    Nam
                                </Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label='Ngày sinh'
                            name="birthday"
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
                    <Form.Item
                        style={{ textAlign: 'center' }}
                    >
                        <Button
                            type="primary"
                            loading
                        >
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Row>
            </Form>
        </div >
    )
}

export default DashboardUserInfo
