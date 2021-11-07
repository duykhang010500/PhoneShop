import React, {
    useState,
    useEffect
} from 'react'
import axios from 'axios'
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
import {
    HomeOutlined,
    CodeSandboxOutlined,
    InboxOutlined,
    PlusOutlined,
    LoadingOutlined,
    PlusCircleOutlined,
    DeleteOutlined,
    FormOutlined
} from '@ant-design/icons'

import {
    modules,
    placeholder,
    theme,
} from '../../helpers/textEditorHelper'

import { beforeUpload, draggerProps, getBase64 } from '../../helpers/uploadHelper';

const DashboardAminProducts = () => {

    //QUILL JS
    const { quill, quillRef } = useQuill({ theme, placeholder, modules });

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

    useEffect(() => {
        if (quill) {
            quill.on('text-change', () => {
                console.log('Text change!');
                console.log(quill.root.innerHTML);
                form.setFieldsValue({
                    content: quill.root.innerHTML
                })
            });
            quill.getModule('toolbar').addHandler('image', selectLocalImage)
        }
    }, [quill]);
    //End QUILL JS

    const { Option } = Select
    const { Dragger } = Upload
    const [isVisibleModal, setIsVisibleModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState("")

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
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const handleDraggerChange = (info) => {
        const { status } = info.file;
        if (status !== 'uploading') {
            // console.log('file', info.file, info.fileList);
            console.log('Upload xong')
            console.log('list upload', info.fileList)
            // console.log(info.fileList[0].response.data.display_url)
            const urls = info.fileList.map(item => item.response.data.display_url)
            console.log(urls)
            form.setFieldsValue({
                images_product: urls
            })
        }
        if (status === 'done') {
            message.success(`${info.file.name} tải lên thành công`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }

    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        console.log(values)
        //Submit here
    }

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
                        icon={<PlusCircleOutlined />}
                        onClick={() => setIsVisibleModal(!isVisibleModal)}
                    >
                        Thêm sản phẩm
                    </Button>
                </Space>
            </Col>
            <Col span={24}>
                <Table
                // columns={ }
                />
            </Col>
            <Modal
                title="Tạo sản phẩm"
                visible={isVisibleModal}
                onCancel={() => setIsVisibleModal(false)}
                onOk={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            form.resetFields();
                            handleSubmit(values);
                        })
                        .catch((info) => {
                            console.log('Validate Failed:', info);
                        });
                }}
                width={800}
                forceRender={true}
                okText="Tạo"
                cancelText="Hủy bỏ"
            >
                <Form
                    form={form}
                    layout="horizontal"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    labelAlign="right"
                >
                    <Form.Item
                        label="Ảnh đại diện"
                        name="image"
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
                        name="brand"
                    >
                        <Select
                            size="large"
                        >
                            <Option
                                key="iphone"
                                value={1}
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
                        initialValue={1}

                    >
                        <InputNumber
                            size="large"
                            style={{
                                width: "100%"
                            }}
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
                        <InputNumber
                            size="large"
                            style={{
                                width: "100%"
                            }}
                            min={1}
                            step={100000}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Khuyến mại (%)"
                        name="discount"
                        initialValue={0}
                        rules={[{
                            required: true,
                            message: 'Vui lòng nhập khuyến mại'
                        }]}
                    >
                        <InputNumber
                            style={{
                                width: "100%"
                            }}
                            // defaultValue={0}
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
                        label="Ảnh sản phẩm"
                        name="images_product"
                    >
                        <Dragger
                            {...draggerProps}
                            onChange={handleDraggerChange}
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
