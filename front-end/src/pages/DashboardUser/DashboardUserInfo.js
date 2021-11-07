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
    message
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

import moment from 'moment'

import {
    beforeUpload,
    getBase64
} from '../../helpers/uploadHelper.js'
import { useAuthenticated } from '../../hooks/useAuthenticate'
import { actUpdateProfile } from '../../store/auth/action'

const DashboardUserInfo = () => {

    useAuthenticated()

    const [form] = Form.useForm()
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false)

    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState("")

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

    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setLoading(true)
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imageUrl => {
                setImageUrl(imageUrl)
                setLoading(false)
            }
            );
            const url = info.file.response.data.display_url
            form.setFieldsValue({
                image: url
            })
        }
    }

    const handleChangeDate = (date, dateString) => {
        form.setFieldsValue({
            dob: dateString
        })
    }

    const handleSubmit = (values) => {
        console.log(values)
        setIsLoading(true)
        dispatch(actUpdateProfile(values)).then((res) => {
            if (res.ok) {
                message.success(res.message)
            } else {
                message.error(res.message)
            }
        }).finally(() => setIsLoading(false))
    }

    return (
        <div
            style={{ backgroundColor: "#fff", padding: "3rem" }}
        >
            <Form
                layout="vertical"
                initialValues={{
                    image: currentUser.image,
                    email: currentUser.email,
                    name: currentUser.name,
                    sex: currentUser.sex,
                    dob: currentUser.dob
                }}
                form={form}
            >
                <Row
                    gutter={[20, 5]}
                >
                    <Col
                        span={24}
                    >
                        <Form.Item
                            name="image"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn ảnh đại diện'
                                }
                            ]}
                        >
                            <Upload
                                name="image"
                                listType="picture-card"
                                className="avatar-uploader"
                                maxCount={1}
                                showUploadList={false}
                                action="https://api.imgbb.com/1/upload?expiration=600&key=8c37ca908e1a1a4f5db86e4555a008c2"
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                            >
                                {
                                    imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                                        :
                                        (
                                            currentUser.image ? <img src={currentUser.image} /> : <Avatar icon={<UserOutlined />} />
                                        )
                                }
                            </Upload>
                        </Form.Item>
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
                            name="dob"
                            style={{ display: "none" }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn ngày sinh'
                                }
                            ]}
                        >

                        </Form.Item>
                        <DatePicker
                            defaultValue={currentUser.dob ? moment(currentUser.dob, 'YYYY/MM/DD') : ''}
                            format={'YYYY/MM/DD'}
                            placeholder="Ngày tháng năm sinh"
                            style={{ width: "100%", marginTop: '3rem' }}
                            size="large"
                            onChange={handleChangeDate}
                        />
                    </Col>
                    <Col span={24}>
                        <Form.Item
                        >
                            <Button
                                type="primary"
                                loading={isLoading}
                                size="large"
                                icon={<SaveOutlined />}
                                onClick={() => {
                                    form
                                        .validateFields()
                                        .then((values) => {
                                            handleSubmit(values);
                                        })
                                        .catch((info) => {
                                            console.log('Validate Failed:', info);
                                        });
                                }}
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
