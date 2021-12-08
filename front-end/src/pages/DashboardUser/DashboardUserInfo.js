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
    SaveOutlined,
    LoadingOutlined
} from '@ant-design/icons'

import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { beforeUpload, getBase64 } from '../../helpers/uploadHelper.js'
import { useAuthenticated } from '../../hooks/useAuthenticate'
import { actFetchMe, actUpdateProfile } from '../../store/auth/action'

const DashboardUserInfo = () => {
    useAuthenticated()
    const [form] = Form.useForm()
    const [isLoading, setIsLoading] = useState(false)
    const [isImageChange, setIsImageChange] = useState(false)

    // const [fileList, setFileList] = useState([])
    //Set preview avatar on change
    const [imageUrl, setImageUrl] = useState("")

    //Set avt has been uploaded
    const [avatar, setAvatar] = useState("")

    //Destructing item antd
    const { Option } = Select

    //CurrentUser
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.Auth.currentUser)
    if (!currentUser) {
        return null
    }

    //Upload Button
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Tải ảnh</div>
        </div>
    );

    //Change Avatar
    const handleChange = async (info) => {

        try {
            if (info.file.status === 'uploading') {
                setIsImageChange(true)
                return
            }
            if (info.file.status === 'done') {
                getBase64(info.file.originFileObj, imageUrl => {
                    setIsImageChange(false)
                    setImageUrl(imageUrl)
                })
                const url = info.file.response.data.display_url
                // form.setFieldsValue({
                //     image: url
                // })
                setAvatar(url)
            }
        } catch (err) {
            console.log(err)
        }

    }

    //Submit form update profile
    const handleSubmit = (fieldsValue) => {
        const newFieldsValue = {
            ...fieldsValue,
            'dob': fieldsValue['dob'].format('YYYY-MM-DD'),
            'image': avatar || currentUser.image
        }

        console.log(newFieldsValue)
        setIsLoading(true)
        dispatch(actUpdateProfile(newFieldsValue)).then((res) => {
            if (res.ok) {
                message.success(res.message)
                dispatch(actFetchMe())
            } else {
                message.error(res.message)
            }
        }).finally(() => setIsLoading(false))
    }



    //rendering
    return (
        <div className="box-sd1" style={{ backgroundColor: "#fff", padding: "3rem" }}>
            <Form
                layout="vertical"
                initialValues={{
                    // image: currentUser.image,
                    email: currentUser.email,
                    name: currentUser.name,
                    sex: currentUser.sex,
                    dob: currentUser.dob ? moment(currentUser.dob) : null
                }}
                form={form}
            >
                <Row gutter={[20, 5]} justify="space-between">
                    <Col span={24}>
                        <Form.Item
                            label="Ảnh đại diện"
                            // valuePropName="fileList"
                            name="avt"
                            rules={[
                                {
                                    required: true
                                }
                            ]}
                        >
                            <Upload
                                name="image"
                                listType="picture-card"
                                showUploadList={false}
                                action="https://api.imgbb.com/1/upload?key=8c37ca908e1a1a4f5db86e4555a008c2"
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                            >
                                {
                                    isImageChange ? <LoadingOutlined style={{ color: 'skyblue' }} /> : (
                                        imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%', height: '100%' }} />
                                            :
                                            (
                                                currentUser.image ? <img src={currentUser.image} style={{ width: '100%', height: '100%' }} /> : <Avatar icon={<UserOutlined />} />
                                            )
                                    )
                                }
                            </Upload>
                        </Form.Item>
                    </Col>
                    <Col span={12} >
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
                                disabled
                                prefix={<MailOutlined />}
                                size="large"
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
                            label="Ngày sinh"
                            name="dob"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn ngày sinh'
                                }
                            ]}
                        >
                            <DatePicker
                                format={'DD/MM/YYYY'}
                                placeholder="Ngày tháng năm sinh"
                                style={{ width: "100%" }}
                                size="large"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item>
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
