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
    InputNumber,
    Avatar
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
    useDispatch, useSelector
} from 'react-redux'

import {
    modules,
    placeholder,
    theme,
} from '../../helpers/textEditorHelper'

import { beforeUpload, draggerProps, getBase64 } from '../../helpers/uploadHelper';
import { actCreateProductAsync, actGetAllProductAsync } from '../../store/products/action';

const DashboardAminProducts = () => {

    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const { Option } = Select
    const { Dragger } = Upload
    const [isVisibleModal, setIsVisibleModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState("")

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
                    desc: quill.root.innerHTML
                })
            });
            quill.getModule('toolbar').addHandler('image', selectLocalImage)
        }
    }, [quill]);
    //End QUILL JS



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

    //Upload list image
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

    //GetListProduct
    const listProduct = useSelector((state) => state.Products.list)

    //
    const listBrand = useSelector((state) => state.Brands.list)
    if (!listBrand) {
        return null
    }

    //Columns

    const columns = [
        {
            title: 'Ảnh',
            render: (text, record) => (
                <Avatar
                    shape="square"
                    src={record.image}
                />
            )

        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Đường dẫn',
            dataIndex: 'slug',
            key: 'slug'
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price'
        },
        {
            title: 'Khuyến mại',
            dataIndex: 'discount',
            key: 'discount'
        },
        {
            title: 'Hành động',
            key: 'action',
            // render: (text, record) => (
            //     <Space>
            //         <Tooltip title="Xóa">
            //             <Popconfirm
            //                 placement="topRight"
            //                 title={`Xóa hãng ${record.name}`}
            //                 onConfirm={() => handleDeleteBrand(record.id)}
            //             >
            //                 <Button
            //                     type="primary"
            //                     danger
            //                     icon={<DeleteOutlined />}
            //                 >
            //                 </Button>
            //             </Popconfirm>
            //         </Tooltip>

            //         <Tooltip title="Cập nhật">
            //             <Button
            //                 type="primary"
            //                 icon={<FormOutlined />}
            //                 type="primary"
            //                 onClick={() => {
            //                     setShowFormUpdate(true)
            //                     setIdSelected(record.id)
            //                     form.setFieldsValue({
            //                         name: record.name,
            //                         slug: record.slug,
            //                         desc: record.desc
            //                     })
            //                 }}
            //             >
            //             </Button>
            //         </Tooltip>
            //     </Space>
            // )
        }
    ]

    //Create Product
    const handleSubmit = (values) => {
        console.log(values)

        dispatch(actCreateProductAsync(values)).then((res) => {
            if (res.ok) {
                message.success(res.message)
            } else {
                message.error(res.message)
            }
        }).finally(() => {
            dispatch(actGetAllProductAsync())

        })

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
                    columns={columns}
                    dataSource={listProduct}

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
                        name="id_brand"
                    >
                        <Select
                            size="large"
                        >
                            {
                                listBrand.map((item, index) => {
                                    return (
                                        <Option
                                            key={item.id}
                                            value={item.id}
                                        >
                                            {item.name}
                                        </Option>
                                    )
                                })
                            }
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
                        label="Màn hình"
                        name="screen"
                        rules={[{
                            required: true,
                            message: "Vui lòng nhập màn hình của sản phẩm"
                        }]}
                    >
                        <Input
                            size="large"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Camera trước"
                        name="rear_camera"
                        rules={[{
                            required: true,
                            message: "Vui lòng nhập camera trước của sản phẩm"
                        }]}
                    >
                        <Input
                            size="large"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Camera sau"
                        name="selfie_camera"
                        rules={[{
                            required: true,
                            message: "Vui lòng nhập camera sau sản phẩm"
                        }]}
                    >
                        <Input
                            size="large"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Ram"
                        name="ram"
                        rules={[{
                            required: true,
                            message: "Vui lòng nhập ram của sản phẩm"
                        }]}
                    >
                        <Input
                            size="large"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Bộ nhớ trong"
                        name="internal_memory"
                        rules={[{
                            required: true,
                            message: "Vui lòng nhập bộ nhớ trong của sản phẩm"
                        }]}
                    >
                        <Input
                            size="large"
                        />
                    </Form.Item>
                    <Form.Item
                        label="CPU"
                        name="cpu"
                        rules={[{
                            required: true,
                            message: "Vui lòng nhập CPU của sản phẩm"
                        }]}
                    >
                        <Input
                            size="large"
                        />
                    </Form.Item>
                    <Form.Item
                        label="GPU"
                        name="gpu"
                        rules={[{
                            required: true,
                            message: "Vui lòng nhập GPU của sản phẩm"
                        }]}
                    >
                        <Input
                            size="large"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Pin"
                        name="battery"
                        rules={[{
                            required: true,
                            message: "Vui lòng nhập Pin của sản phẩm"
                        }]}
                    >
                        <Input
                            size="large"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Sim"
                        name="sim"
                        rules={[{
                            required: true,
                            message: "Vui lòng nhập số sim của sản phẩm"
                        }]}
                    >
                        <Input
                            size="large"
                        />
                    </Form.Item>
                    <Form.Item
                        label="OS"
                        name="os"
                        rules={[{
                            required: true,
                            message: "Vui lòng nhập hệ điều hành của sản phẩm"
                        }]}
                    >
                        <Input
                            size="large"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Nơi sản xuất"
                        name="made"
                        rules={[{
                            required: true,
                            message: "Vui lòng nhập nơi sản xuất của sản phẩm"
                        }]}
                    >
                        <Input
                            size="large"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Thời gian sản xuất"
                        name="time"
                        rules={[{
                            required: true,
                            message: "Vui lòng nhập thời gian sản xuất sản phẩm"
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
                        name="desc"
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
