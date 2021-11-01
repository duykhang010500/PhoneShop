import React, { useState } from 'react'
import {
    Breadcrumb,
    Col,
    Row,
    Input,
    Modal,
    Table,
    Space,
    Button,
    Form,
    Select,
    Upload,
    message,
    InputNumber
} from 'antd'

import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

import {
    HomeOutlined,
    CodeSandboxOutlined,
    InboxOutlined,
    PlusOutlined,
    LoadingOutlined
} from '@ant-design/icons'


const DashboardAminProducts = () => {

    //QUILL JS
    const theme = 'snow';
    const placeholder = 'Nhập nội dung chi tiết...';
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }, { list: 'ordered' }, { list: 'bullet' }, 'bold', 'italic', 'underline', { color: [] }, { background: [] }, 'image', 'video', 'clean'

            ]
        ],
    };
    const { quill, quillRef } = useQuill({ theme, placeholder, modules });

    const { Option } = Select
    const { Dragger } = Upload

    const [isVisibleModal, setIsVisibleModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState("")

    const props = {
        name: 'image',
        multiple: true,
        listType: 'picture',
        action: 'https://api.imgbb.com/1/upload?expiration=600&key=8c37ca908e1a1a4f5db86e4555a008c2',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} tải lên thành công`);
                console.log(info.file.response.data.display_url)
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },

    };

    function beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setLoading(true)
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => {
                setImageUrl(imageUrl)
                setLoading(false)
            }
            );
            console.log(info)
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );


    return (
        <Row
            gutter={[20, 10]}
        >
            <Col span={24}>
                <Breadcrumb
                    style={{
                        marginBottom: '2rem'
                    }}
                >
                    <Breadcrumb.Item
                        href="/admin"
                    >
                        <HomeOutlined />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        Sản phẩm
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        Quản lý sản phẩm
                    </Breadcrumb.Item>
                </Breadcrumb>
            </Col>
            <Col
                span={24}
                style={{ textAlign: 'right' }}
            >
                <Space>
                    <Button
                        size="large"
                        type="primary"
                        icon={<CodeSandboxOutlined />}
                        onClick={() => setIsVisibleModal(!isVisibleModal)}
                    >
                        Thêm sản phẩm
                    </Button>
                </Space>
            </Col>
            <Col span={24}>
                <Table />
            </Col>
            <Modal
                title="Tạo sản phẩm mới"
                visible={isVisibleModal}
                onCancel={() => setIsVisibleModal(false)}
                width={800}
                forceRender
                okText="Tạo"
                cancelText="Hủy bỏ"
            >
                <Form
                    layout="horizontal"
                    // style={{
                    //     padding: "0 5rem"
                    // }}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    labelAlign="right"
                >
                    <Form.Item
                        label="Tên sản phẩm"
                        rules={[{
                            required: true,
                            message: 'Vui lòng nhập tên sản phẩm'
                        }]}
                        name="name"
                    >
                        <Input
                            size="large"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Hãng sản xuất"
                        rules={[{
                            required: true,
                            message: 'Vui lòng chọn loại sản phẩm'
                        }]}
                        name="category"
                    >
                        <Select
                            size="large"
                        >
                            <Option
                                key="iphone"
                            >
                                Iphone
                            </Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Số lượng"
                        rules={[{
                            required: true,
                            message: 'Vui lòng nhập số lượng sản phẩm'
                        }]}
                        name="quantity"
                    >
                        <InputNumber
                            size="large"
                            style={{
                                width: "100%"
                            }}
                            defaultValue={1}
                            min={1}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Giá (VNĐ)"
                        rules={[{
                            required: true,
                            message: 'Vui lòng nhập giá sản phẩm'
                        }]}
                        name="price"
                    >
                        <Input
                            size="large"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Khuyến mại (%)"
                        name="discount"
                    >
                        <InputNumber
                            style={{
                                width: "100%"
                            }}
                            defaultValue={0}
                            size="large"
                            max={99}
                            min={0}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Đường dẫn"
                        name="slug"
                        rules={[{
                            required: true,
                            message: "Vui lòng nhập đường dẫn cho sản phẩm"
                        }]}
                    >
                        <Input
                            size="large"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Ảnh đại diện"
                        name="avatar"
                        rules={[{
                            required: true,
                            message: "Vui lòng chọn ảnh đại diện cho sản phẩm"
                        }]}
                    >
                        <Upload
                            name="image"
                            listType="picture-card"
                            className="avatar-uploader"
                            maxCount={1}
                            showUploadList={false}

                            action='https://api.imgbb.com/1/upload?expiration=600&key=8c37ca908e1a1a4f5db86e4555a008c2'
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                        >
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>

                    </Form.Item>
                    <Form.Item
                        label="Ảnh sản phẩm"
                        name="images"
                    >
                        <Dragger
                            {...props}
                        >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">
                                Bấm vào hoặc kéo thả các hình ảnh của sản phẩm vào đây
                            </p>

                        </Dragger>

                    </Form.Item>
                    <Form.Item
                        label="Bài viết chi tiết"
                        name="content"
                    >
                        <div style={{ width: 500, height: 300, marginBottom: "2rem" }}>
                            <div ref={quillRef} />
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </Row>
    )
}

export default DashboardAminProducts
