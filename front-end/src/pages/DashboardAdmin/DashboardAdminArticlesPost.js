import React, { useState, useEffect } from 'react'
import { useQuill } from 'react-quilljs'
import axios from 'axios'
import {
    Table,
    Breadcrumb,
    Tooltip,
    Button,
    Space,
    Popconfirm,
    Row,
    Col,
    Modal,
    Form,
    Input,
    message,
    Select,
    Typography,
    Upload,
    Image,
    Avatar
} from 'antd'
import {
    HomeOutlined,
    EditOutlined,
    DeleteOutlined,
    PlusCircleOutlined,
    SearchOutlined
} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import {
    actCreateArticleAsync,
    actDeleteArticleAsync,
    actGetArticleListAsync,
    actGetCategoryListAsync,
    actUpdateArticleAsync
} from '../../store/news/action'

const DashboardAdminArticlesPost = () => {

    const dispatch = useDispatch()
    const selector = useSelector((state) => state)
    const [formAdd] = Form.useForm()
    const [formEdit] = Form.useForm()
    const [isLoading, setIsLoading] = useState(false)
    const [isShowModalAdd, setIsShowModalAdd] = useState(false)
    const [isShowModalUpdate, setIsShowModalUpdate] = useState(false)
    const [isConfirmLoading, setIsConfirmLoading] = useState(false)
    const [articleSelected, setArticleSelected] = useState(null)
    // Cột
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id
        },
        {
            title: 'Ảnh minh hoạ',
            dataIndex: 'image',
            key: 'image',
            render: (image) => (
                <Avatar
                    src={image}
                    alt={image}
                    size="large"
                    shape="square"
                />
            )
        },
        {
            title: 'Tên bài viết',
            dataIndex: 'name',
            key: 'name',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
                return (
                    <div style={{ padding: 8 }}>
                        <Space direction='vertical'>
                            <Input
                                placeholder='Nhập tên bài viết'
                                value={selectedKeys}
                                onChange={(e) => {
                                    setSelectedKeys(e.target.value ? [e.target.value] : [])
                                    confirm({ closeDropdown: false })
                                }}
                                onPressEnter={() => confirm()}
                            />
                            <Space>
                                <Button
                                    onClick={() => confirm()}
                                    type='primary'
                                    size='small'
                                >
                                    Ok
                                </Button>
                                <Button
                                    onClick={() => clearFilters()}
                                    type='primary'
                                    size='small'
                                    danger
                                >
                                    Reset
                                </Button>
                            </Space>
                        </Space>
                    </div>
                )
            },
            filterIcon: () => <SearchOutlined />,
            onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase())
        },
        {
            title: 'Đường dẫn',
            dataIndex: 'slug',
            key: 'slug',
            render: (slug) => (
                <span>/{slug}</span>
            )
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (item, record) => (
                <Space size='middle'>
                    <Tooltip title="Cập nhật">
                        <Button
                            type="primary"
                            icon={<EditOutlined />}

                            onClick={() => {
                                setIsShowModalUpdate(true)
                                // handleGetDetailArticle(record.slug)
                                setArticleSelected(record)
                                formEdit.setFieldsValue({
                                    image: [{ url: record.image }],
                                    name: record.name,
                                    slug: record.slug,
                                    desc: record.desc,
                                    cate_article_id: record.cate_article_id
                                })
                            }}
                        >
                        </Button>
                    </Tooltip>
                    <Tooltip title="Xoá">
                        <Popconfirm
                            placement="topRight"
                            title={`Xoá bài viết ${record.name}`}
                            onConfirm={() => handleDeleteArticle(record.slug)}
                        >
                            <Button
                                type="primary"
                                danger
                                icon={<DeleteOutlined />}

                            >
                            </Button>
                        </Popconfirm>
                    </Tooltip>
                </Space>
            )
        }
    ]

    useEffect(() => {
        setIsLoading(true)
        dispatch(actGetCategoryListAsync())
        dispatch(actGetArticleListAsync()).then(() => setIsLoading(false))
    }, [])

    // Lấy danh sách bài viết
    const articleList = selector.News.articleList
    if (!articleList) {
        return null
    }

    // Lấy danh sách cate
    const categoryList = selector.News.categoryList
    if (!categoryList) {
        return null
    }

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    // Xoá bài viết
    const handleDeleteArticle = (slug) => {
        setIsLoading(true)
        dispatch(actDeleteArticleAsync(slug)).then((res) => {
            if (res.ok) {
                message.success(res.message)
                dispatch(actGetArticleListAsync())
            }
            setIsLoading(false)
        })
    }
    //Editor
    const TextEditor = () => {
        const { quill, quillRef } = useQuill({});
        useEffect(() => {
            if (quill) {
                // quill.clipboard.dangerouslyPasteHTML(text);
                if (articleSelected) {
                    quill.root.innerHTML = articleSelected.desc
                    formEdit.setFieldsValue({
                        desc: quill.root.innerHTML
                    })
                }
                quill.on('text-change', () => {
                    // console.log('Text change!');
                    // console.log(quill.root.innerHTML);
                    // setText(quill.root.innerHTML)
                    formAdd.setFieldsValue({
                        desc: quill.root.innerHTML
                    })
                    formEdit.setFieldsValue({
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

    //Tạo bài viêt
    const handleCreateArticle = () => {
        formAdd.validateFields()
            .then((values) => {
                // console.log(values)
                setIsConfirmLoading(true)
                const image = values.image[0].response.data.url
                const newObj = { ...values, image }
                console.log(newObj)
                dispatch(actCreateArticleAsync(newObj))
                    .then((res) => {
                        if (res.ok) {
                            message.success(res.message)
                            setIsShowModalAdd(false)
                            formAdd.resetFields()
                            dispatch(actGetArticleListAsync())
                        } else {
                            message.error(res.message)
                        }
                    })
                    .finally(() => setIsConfirmLoading(false))
            })
    }
    //Update bài viết
    const handleUpdateArticle = () => {
        formEdit.validateFields()
            .then((values) => {
                setIsConfirmLoading(true)
                let image
                if (values.image[0].response) {
                    image = values.image[0].response.data.display_url
                } else {
                    image = values.image[0].url
                }
                const newObj = { ...values, image }
                dispatch(actUpdateArticleAsync(articleSelected.slug, newObj))
                    .then((res) => {
                        if (res.ok) {
                            message.success(res.message)
                        }
                    })
                    .finally(() => {
                        dispatch(actGetArticleListAsync())
                        setIsConfirmLoading(false)
                        setIsShowModalUpdate(false)
                        setArticleSelected(null)
                    })
            })
    }

    return (
        <Row>
            {/* Breadcrumb  */}
            <Col span={24}>
                <Breadcrumb
                    style={{
                        marginBottom: '2rem'
                    }}
                >
                    <Breadcrumb.Item href="/admin">
                        <HomeOutlined />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        Tin tức
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        Quản lý bài viết
                    </Breadcrumb.Item>
                </Breadcrumb>
            </Col>

            {/* Btn tạo chủ đề */}
            <Col span={24} style={{ textAlign: 'right' }}>
                <Button
                    style={{ marginBottom: '2rem' }}
                    type="primary"
                    icon={<PlusCircleOutlined />}
                    onClick={() => setIsShowModalAdd(true)}
                >
                    Tạo mới
                </Button>
            </Col>

            {/* Modal tạo bài viết */}
            <Modal
                title={`Tạo bài viết mới`}
                visible={isShowModalAdd}
                onCancel={() => {
                    setIsShowModalAdd(false)
                    formAdd.resetFields()
                }}
                width={1200}
                onOk={handleCreateArticle}
                confirmLoading={isConfirmLoading}
            >
                <Form
                    form={formAdd}
                    layout="vertical"
                >
                    {/* Ảnh đại diện */}
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
                        // defaultFileList={fileList}
                        >
                            <Button >Click to upload</Button>
                        </Upload>
                    </Form.Item>
                    {/* Tên bài viết  */}
                    <Form.Item
                        name="name"
                        label="Tên bài viêt"
                    >
                        <Input />
                    </Form.Item>

                    {/* Nhóm chủ đề  */}
                    <Form.Item
                        name="cate_article_id"
                        label="Nhóm chủ đề"
                    >
                        <Select>
                            {
                                categoryList.map((item) => (
                                    <Select.Option
                                        value={item.id}
                                        key={item.id}
                                    >
                                        {item.name}
                                    </Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    {/* Đường dẫn  */}
                    <Form.Item
                        name="slug"
                        label="Đường dẫn"
                    >
                        <Input />
                    </Form.Item>

                    {/* Bài viết chi tiết  */}
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
                </Form>
            </Modal>

            {/* Modal cập nhật bài viết  */}
            <Modal
                title="Cập nhật"
                visible={isShowModalUpdate}
                onCancel={() => {
                    setIsShowModalUpdate(false)
                    setArticleSelected(null)

                }}
                width={1200}
                onOk={handleUpdateArticle}
                confirmLoading={isConfirmLoading}
            >
                <Form
                    form={formEdit}
                    layout="vertical"
                >
                    {/* Ảnh đại diện */}
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
                        // defaultFileList={fileList}
                        >
                            <Button >Click to upload</Button>
                        </Upload>
                    </Form.Item>
                    {/* Tên bài viết  */}
                    <Form.Item
                        name="name"
                        label="Tên bài viêt"
                    >
                        <Input />
                    </Form.Item>

                    {/* Nhóm chủ đề  */}
                    <Form.Item
                        name="cate_article_id"
                        label="Nhóm chủ đề"
                    >
                        <Select>
                            {
                                categoryList.map((item) => (
                                    <Select.Option
                                        value={item.id}
                                        key={item.id}
                                    >
                                        {item.name}
                                    </Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    {/* Đường dẫn  */}
                    <Form.Item
                        name="slug"
                        label="Đường dẫn"
                    >
                        <Input />
                    </Form.Item>

                    {/* Bài viết chi tiết  */}
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
                </Form>
            </Modal>
            {/* Bảng  */}
            <Col span={24}>
                <Table
                    loading={isLoading}
                    columns={columns}
                    dataSource={articleList}
                    rowKey={(record) => record.id}
                />
            </Col>
        </Row>
    )
}

export default DashboardAdminArticlesPost
