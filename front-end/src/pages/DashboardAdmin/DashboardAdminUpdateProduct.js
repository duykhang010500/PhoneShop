import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Breadcrumb, Form, Input, Row, Col, Upload, Typography, InputNumber, Select, Button, message, Space } from 'antd'
import { HomeOutlined, UploadOutlined, InboxOutlined, PlusOutlined, LoadingOutlined, SaveOutlined } from '@ant-design/icons'

import { useDispatch, useSelector } from 'react-redux'
import slugify from 'slugify'
import { useQuill } from 'react-quilljs';
// import { modules, placeholder, theme } from '../../helpers/textEditorHelper'
import { actCreateProductAsync, actGetDetailProductAsync, actUpdateProductAsync } from '../../store/products/actions'
import { Link, useParams } from 'react-router-dom'

const DashboardAdminUpdateProduct = () => {

    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [text, setText] = useState('')
    const { slug } = useParams()
    const selector = useSelector(state => state)

    useEffect(() => {
        console.log(slug)
        dispatch(actGetDetailProductAsync(slug))
    }, [slug, dispatch])

    // Chi tiết sản phẩm
    const product = selector.Products.detailProduct
    if (!product) {
        return null
    }

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
        setIsLoading(true)
        setText(values.desc)
        // convert string
        let image
        if (values.image[0].response) {
            image = values.image[0].response.data.display_url
        } else {
            image = values.image[0].url
        }
        // convert array
        let listImage
        if (values.images_product === undefined) {
            listImage = []
        } else {
            listImage = values.images_product.map((item) => {
                if (item.response) {
                    return item.response.data.display_url
                } else {
                    return item.url
                }
            })
        }

        const newObj = { ...values, image, images_product: listImage }
        // console.log(newObj)
        dispatch(actUpdateProductAsync(slug, newObj))
            .then((res) => {
                if (res.ok) {
                    message.success(res.message)
                } else {
                    message.error(res.message)
                }
            }).finally(() => {
                setIsLoading(false)
            })
    }

    // File upload
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    //Text editor
    const TextEditor = () => {
        const { quill, quillRef } = useQuill({});
        useEffect(() => {
            if (quill) {
                // quill.clipboard.dangerouslyPasteHTML(text);
                if (!text) {
                    quill.root.innerHTML = product.data.desc
                } else {
                    quill.root.innerHTML = text
                }
                form.setFieldsValue({
                    desc: quill.root.innerHTML
                })
                quill.on('text-change', () => {
                    // console.log('Text change!');
                    // console.log(quill.root.innerHTML);
                    setText(quill.root.innerHTML)
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
            <div>
                <div style={{ width: '100%', height: 500, marginBottom: 40 }}>
                    <div ref={quillRef} />
                </div>
            </div>
        )
    }

    // Chuyển mảng hình ảnh thành fileList
    const convertArrayImageToFileList = (arr) => {
        let fileList = []
        arr.forEach((item) => {
            let newObj = { url: item }
            fileList.push(newObj)
        })
        return fileList
    }

    const convertColorProduct = (arr) => {
        let color = []
        arr.forEach((item) => {
            color.push(item.id)
        })
        return color
    }


    return (
        <div className="create-product-page" style={{ marginBottom: 50 }}>
            <Breadcrumb style={{ marginBottom: '2rem' }}>
                <Breadcrumb.Item href="/admin">
                    <HomeOutlined />
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    Sản phẩm
                </Breadcrumb.Item>
                <Breadcrumb.Item href='/admin/products'>
                    Quản lý sản phẩm
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    Cập nhật sản phẩm
                </Breadcrumb.Item>
            </Breadcrumb>

            <Form
                layout="vertical"
                form={form}
                onFinish={onFinish}
                initialValues={{
                    name: product.data.name,
                    image: [{ url: product.data.image }],
                    images_product: convertArrayImageToFileList(product.data.images_product),
                    brand_id: product.data.brand_id,
                    price: product.data.price,
                    quantity: product.data.quantity,
                    colors: convertColorProduct(product.data.attributes),
                    slug: product.data.slug,
                    discount: product.data.discount,
                    screen: product.data.product_info.screen,
                    rear_camera: product.data.product_info.rear_camera,
                    selfie_camera: product.data.product_info.selfie_camera,
                    ram: product.data.product_info.ram,
                    internal_memory: product.data.product_info.internal_memory,
                    cpu: product.data.product_info.cpu,
                    gpu: product.data.product_info.gpu,
                    battery: product.data.product_info.battery,
                    sim: product.data.product_info.sim,
                    os: product.data.product_info.os,
                    made: product.data.product_info.made,
                    time: product.data.product_info.time,
                    desc: product.data.desc,
                    type: product.data.type

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
                            rules={[{
                                required: true,
                                message: 'Vui lòng chọn ảnh đại diện!'
                            }]}
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
                            rules={[{
                                required: true,
                                message: 'Vui lòng nhập tên sản phẩm!'
                            }]}
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
                            rules={[{
                                required: true,
                                message: 'Vui lòng chọn thương hiệu!'
                            }]}
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
                            rules={[{
                                required: true,
                                message: 'Vui lòng nhập giá sản phẩm!'
                            }]}
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
                            rules={[{
                                required: true,
                                message: 'Vui lòng nhập số lượng sản phẩm!'
                            }]}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                min={1}
                            />
                        </Form.Item>
                    </Col>

                    {/* Dòng sản phẩm */}
                    <Col span={6}>
                        <Form.Item
                            label="Dòng sản phẩm"
                            name="type"
                            rules={[{
                                required: true,
                                message: 'Vui lòng nhập dòng sản phẩm!'
                            }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    {/* Màu sắc */}
                    <Col span={6}>
                        <Form.Item
                            label="Màu sắc"
                            name="colors"
                            rules={[{
                                required: true,
                                message: 'Vui lòng chọn màu sắc sản phẩm!'
                            }]}
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
                            rules={[{
                                required: true,
                                message: 'Vui lòng nhập đường dẫn sản phẩm!'
                            }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    {/* Khuyến mại  */}
                    <Col span={6}>
                        <Form.Item
                            label="Khuyến mại (%)"
                            name="discount"
                            rules={[{
                                required: true,
                                message: 'Vui lòng khuyến mại sản phẩm!'
                            }]}
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
                            rules={[{
                                required: true,
                                message: 'Vui lòng màn hình sản phẩm!'
                            }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    {/* Camera sau  */}
                    <Col span={6}>
                        <Form.Item
                            label="Camera sau"
                            name="rear_camera"
                            rules={[{
                                required: true,
                                message: 'Vui lòng camera sau sản phẩm!'
                            }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    {/* Camera trước */}
                    <Col span={6}>
                        <Form.Item
                            label="Camera trước"
                            name="selfie_camera"
                            rules={[{
                                required: true,
                                message: 'Vui lòng camera trước sản phẩm!'
                            }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    {/* Bộ nhớ ram  */}
                    <Col span={6}>
                        <Form.Item
                            label="Ram"
                            name="ram"
                            rules={[{
                                required: true,
                                message: 'Vui lòng nhập Ram sản phẩm!'
                            }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    {/* Bộ nhớ trong  */}
                    <Col span={6}>
                        <Form.Item
                            label="Bộ nhớ trong"
                            name="internal_memory"
                            rules={[{
                                required: true,
                                message: 'Vui lòng nhập bộ nhớ trong sản phẩm!'
                            }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    {/* CPU */}
                    <Col span={6}>
                        <Form.Item
                            label="CPU"
                            name="cpu"
                            rules={[{
                                required: true,
                                message: 'Vui lòng nhập CPU sản phẩm!'
                            }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    {/* GPU  */}
                    <Col span={6}>
                        <Form.Item
                            label="GPU"
                            name="gpu"
                            rules={[{
                                required: true,
                                message: 'Vui lòng nhập GPU sản phẩm!'
                            }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    {/* Dung lượng Pin  */}
                    <Col span={6}>
                        <Form.Item
                            label="Dung lượng PIN (mAh)"
                            name="battery"
                            rules={[{
                                required: true,
                                message: 'Vui lòng nhập dung lượng Pin sản phẩm!'
                            }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    {/* Số khe sim  */}
                    <Col span={6}>
                        <Form.Item
                            label="Sim"
                            name="sim"
                            rules={[{
                                required: true,
                                message: 'Vui lòng nhập số khe sim sản phẩm!'
                            }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    {/* Hệ điều hành  */}
                    <Col span={6}>
                        <Form.Item
                            label="Hệ điều hành"
                            name="os"
                            rules={[{
                                required: true,
                                message: 'Vui lòng nhập hệ điều hành sản phẩm!'
                            }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    {/* Nơi sản xuất */}
                    <Col span={6}>
                        <Form.Item
                            label="Nơi sản xuất"
                            name="made"
                            rules={[{
                                required: true,
                                message: 'Vui lòng nhập nơi sản xuất sản phẩm!'
                            }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    {/* Thời gian sản xuất  */}
                    <Col span={6}>
                        <Form.Item
                            label="Thời gian sản xuất"
                            name="time"
                            rules={[{
                                required: true,
                                message: 'Vui lòng thời gian sản xuất sản phẩm!'
                            }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    {/* Ảnh sản phẩm */}
                    <Col span={24}>
                        <Typography.Title level={4}>
                            Ảnh sản phẩm (Tối đa 10 ảnh)
                        </Typography.Title>
                    </Col>
                    <Col span={24}>
                        <Form.Item>
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
                                    listType="picture-card"
                                    style={{ marginBottom: 20 }}
                                // defaultFileList={fileList}

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
                            rules={[{
                                required: true,
                                message: 'Vui lòng nhập bài viết cho sản phẩm!'
                            }]}
                        >
                            <TextEditor />
                        </Form.Item>
                    </Col>

                    {/* Button tạo sản phẩm  */}
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Form.Item>
                            <Button
                                htmlType="submit"
                                type="primary"
                                loading={isLoading}
                                // loading
                                icon={<SaveOutlined />}
                            >
                                Cập nhật sản phẩm
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default DashboardAdminUpdateProduct
