import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Breadcrumb, Form, Input, Row, Col, Upload, Typography, InputNumber, Select, Button } from 'antd'
import { HomeOutlined, UploadOutlined, InboxOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons'

import { useDispatch, useSelector } from 'react-redux'
import slugify from 'slugify'
import { useQuill } from 'react-quilljs';
import { modules, placeholder, theme } from '../../helpers/textEditorHelper'
import { actCreateProductAsync } from '../../store/products/actions'

const DashboardAdminCreateProduct = () => {

    const [form] = Form.useForm()
    const selector = useSelector(state => state)
    const dispatch = useDispatch()

    // Danh sách các màu sắc
    const colorList = selector.Products.colorsProduct
    if (!colorList) {
        return null
    }

    // Danh sách các thương hiệu
    const brandList = selector.Brands.list
    if (!brandList) {
        return null
    }

    // Chuyển name thành slug
    const handleChangeName = (e) => {
        form.setFieldsValue({
            slug: slugify(e.target.value)
        })
    }

    // Submit form
    const onFinish = (values) => {
        // console.log(values)
        const image = values.image[0].response.data.display_url
        const images_product = values.images_product.map((item) => item.response.data.display_url)
        const newObj = { ...values, image, images_product }
        console.log(newObj)
        dispatch(actCreateProductAsync(newObj))
    }

    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    const QuillJS = () => {

        const { quill, quillRef } = useQuill({ theme, placeholder, modules });

        useEffect(() => {
            if (quill) {
                quill.on('text-change', () => {
                    // console.log('Text change!');
                    // console.log(quill.root.innerHTML);
                    form.setFieldsValue({
                        desc: quill.root.innerHTML
                    })
                });
                quill.getModule('toolbar').addHandler('image', selectLocalImage)
            }
        }, [quill]);
        //QuillJS function
        const insertToEditor = (url) => {
            const range = quill.getSelection();
            quill.insertEmbed(range.index, 'image', url);
        };

        const saveToServer = async (file) => {
            const body = new FormData();
            body.append('image', file);
            const res = await axios.post('https://api.imgbb.com/1/upload?expiration=600&key=8c37ca908e1a1a4f5db86e4555a008c2', body)
            insertToEditor(res.data.data.display_url);
        };

        const selectLocalImage = () => {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            input.click();
            input.onchange = () => {
                const file = input.files[0];
                saveToServer(file);
            };
        };
        //End QuillJS function
        return (
            <div ref={quillRef} style={{ width: '300', height: 500 }} />
        )
    }

    return (
        <div className="create-product-page">
            <Breadcrumb style={{ marginBottom: '2rem' }}>
                <Breadcrumb.Item href="/admin">
                    <HomeOutlined />
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    Sản phẩm
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/admin/products">
                    Quản lý sản phẩm
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    Tạo sản phẩm
                </Breadcrumb.Item>
            </Breadcrumb>

            <Form
                layout="vertical"
                form={form}
                onFinish={onFinish}
                initialValues={{
                    quantity: 1,
                    discount: 0
                }}
            >
                <Row gutter={[20, 20]}>
                    <Col span={24}>
                        <Typography.Title level={4}>
                            Thông tin cơ bản
                        </Typography.Title>

                    </Col>
                    {/* Ảnh sản phẩm  */}
                    <Col span={24}>
                        <Form.Item
                            label="Ảnh đại diện (1 Ảnh)"
                            name="image"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                        >
                            <Upload
                                name="image"
                                action="https://api.imgbb.com/1/upload?key=8c37ca908e1a1a4f5db86e4555a008c2"
                                listType="picture"
                                maxCount={1}
                            >
                                <Button icon={<UploadOutlined />}>Click to upload</Button>
                            </Upload>
                        </Form.Item>
                    </Col>

                    {/* Tên sản phẩm  */}
                    <Col span={6}>
                        <Form.Item
                            label="Tên sản phẩm"
                            name="name"
                        >
                            <Input
                                onChange={handleChangeName}
                            />
                        </Form.Item>
                    </Col>

                    {/* Hiệu sản phẩm  */}
                    <Col span={6}>
                        <Form.Item
                            label="Thương hiệu"
                            name="brand_id"
                        >
                            <Select>
                                {
                                    brandList.map((item) => (
                                        <Select.Option
                                            key={item.id}
                                            value={item.id}
                                        >
                                            {item.name}
                                        </Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </Col>

                    {/* Giá sản phẩm  */}
                    <Col span={6}>
                        <Form.Item
                            label="Giá (VNĐ)"
                            name="price"
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                min={0}
                                step={1000000}
                            />
                        </Form.Item>
                    </Col>

                    {/* Số lượng tồn kho  */}
                    <Col span={6}>
                        <Form.Item
                            label="Tồn kho"
                            name="quantity"
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                min={1}
                            />
                        </Form.Item>
                    </Col>

                    {/* Màu sắc */}
                    <Col span={6}>
                        <Form.Item
                            label="Màu sắc"
                            name="colors"
                        >
                            <Select mode="multiple">
                                {
                                    colorList.map((item) => (
                                        <Select.Option
                                            key={item.id}
                                            value={item.id}
                                        >
                                            {item.name}
                                        </Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </Col>

                    {/* Đường dẫn  */}
                    <Col span={6}>
                        <Form.Item
                            label="Đường dẫn"
                            name="slug"
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    {/* Khuyến mại  */}
                    <Col span={6}>
                        <Form.Item
                            label="Khuyến mại (%)"
                            name="discount"
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                min={0}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Typography.Title level={4}>
                            Thông tin cấu hình
                        </Typography.Title>
                    </Col>

                    {/* Màn hình  */}
                    <Col span={6}>
                        <Form.Item
                            label="Màn hình"
                            name="screen"
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    {/* Camera sau  */}
                    <Col span={6}>
                        <Form.Item
                            label="Camera sau"
                            name="rear_camera"
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    {/* Camera trước */}
                    <Col span={6}>
                        <Form.Item
                            label="Camera trước"
                            name="selfie_camera"
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    {/* Bộ nhớ ram  */}
                    <Col span={6}>
                        <Form.Item
                            label="Ram"
                            name="ram"
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    {/* Bộ nhớ trong  */}
                    <Col span={6}>
                        <Form.Item
                            label="Bộ nhớ trong"
                            name="internal_memory"
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    {/* CPU */}
                    <Col span={6}>
                        <Form.Item
                            label="CPU"
                            name="cpu"
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    {/* GPU  */}
                    <Col span={6}>
                        <Form.Item
                            label="GPU"
                            name="gpu"
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    {/* Dung lượng Pin  */}
                    <Col span={6}>
                        <Form.Item
                            label="Dung lượng PIN (mAh)"
                            name="battery"
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    {/* Số khe sim  */}
                    <Col span={6}>
                        <Form.Item
                            label="Sim"
                            name="sim"
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    {/* Hệ điều hành  */}
                    <Col span={6}>
                        <Form.Item
                            label="Hệ điều hành"
                            name="os"
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    {/* Nơi sản xuất */}
                    <Col span={6}>
                        <Form.Item
                            label="Nơi sản xuất"
                            name="made"
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    {/* Thời gian sản xuất  */}
                    <Col span={6}>
                        <Form.Item
                            label="Thời gian sản xuất"
                            name="time"
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    {/* Ảnh sản phẩm */}
                    <Col span={12}>
                        <Form.Item label="Ảnh sản phẩm (Tối đa 10 ảnh)">
                            <Form.Item
                                name="images_product"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                                noStyle
                            >
                                <Upload.Dragger
                                    multiple
                                    name="image"
                                    action="https://api.imgbb.com/1/upload?key=8c37ca908e1a1a4f5db86e4555a008c2"
                                    maxCount={10}
                                >
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">Bấm hoặc kéo thả hình ảnh vào đây</p>

                                </Upload.Dragger>
                            </Form.Item>
                        </Form.Item>
                    </Col>

                    {/* Bài viết đánh giá chi tiết  */}
                    <Col span={24}>
                        <Typography.Title level={4}>
                            Bài viết chi tiết
                        </Typography.Title>
                        <Form.Item
                            name="desc"
                        >
                            <QuillJS />
                        </Form.Item>
                    </Col>

                    {/* Button tạo sản phẩm  */}
                    <Col span={24} style={{ textAlign: 'right', marginBottom: '3rem' }}>
                        <Form.Item>
                            <Button htmlType="submit" type="primary">
                                Tạo sản phẩm
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>

        </div>
    )
}

export default DashboardAdminCreateProduct
