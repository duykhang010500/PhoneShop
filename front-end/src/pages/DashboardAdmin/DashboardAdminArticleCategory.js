import React, { useState, useEffect } from 'react'
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
} from 'antd'
import {
    HomeOutlined,
    EditOutlined,
    DeleteOutlined,
    PlusCircleOutlined
} from '@ant-design/icons'

import { useDispatch, useSelector } from 'react-redux'
import { actCreateCategoryAsync, actDeleteCategory, actGetCategoryListAsync, actUpdateCategory } from '../../store/news/action'

const DashboardAdminArticleCategory = () => {

    // Khởi tạo 
    const [formAdd] = Form.useForm()
    const [formEdit] = Form.useForm()
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false)
    const [isShowModalAdd, setIsShowModalAdd] = useState(false)
    const [isShowModalUpdate, setIsShowModalUpdate] = useState(false)
    const [isConfirmLoadingAdd, setIsConfirmLoadingAdd] = useState(false)
    const [categorySelected, setCategorySelected] = useState(null)

    useEffect(() => {
        setIsLoading(true)
        dispatch(actGetCategoryListAsync())
            .then(() => {
                setIsLoading(false)
            })
    }, [dispatch])

    //Lấy danh sách các chủ đề
    const categoryList = useSelector(state => state.News.categoryList)
    if (!categoryList) {
        return null
    }

    //Các cột trong bảng
    const columns = [
        {
            title: '#Id',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Tên chủ đề',
            dataIndex: 'name',
            key: 'name'
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
            title: 'Mô tả ngắn',
            dataIndex: 'desc',
            key: 'desc'
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (item, record) => (
                <Space>
                    <Tooltip title="Cập nhật">
                        <Button
                            type="primary"
                            icon={<EditOutlined />}
                            shape="circle"
                            onClick={() => {
                                setIsShowModalUpdate(true)
                                setCategorySelected(record)
                                formEdit.setFieldsValue({
                                    name: record.name,
                                    slug: record.slug,
                                    desc: record.desc
                                })
                            }}
                        >
                        </Button>
                    </Tooltip>
                    <Tooltip title="Xoá">
                        <Popconfirm
                            placement="topRight"
                            title={`Xoá chủ đề ${record.name}`}
                            onConfirm={() => handleDeleteCategory(record.slug)}
                        >
                            <Button
                                type="primary"
                                danger
                                icon={<DeleteOutlined />}
                                shape="circle"
                            >
                            </Button>
                        </Popconfirm>
                    </Tooltip>
                </Space>
            )
        }
    ]

    //Tạo chủ đề
    const handleSubmitFormAdd = () => {
        formAdd.validateFields()
            .then((values) => {
                setIsConfirmLoadingAdd(true)
                dispatch(actCreateCategoryAsync(values))
                    .then(res => {
                        if (res.ok) {
                            message.success(res.message)
                            formAdd.resetFields()
                        } else {
                            message.error(res.message)
                        }
                        dispatch(actGetCategoryListAsync())
                    })
                    .finally(() => {
                        setIsConfirmLoadingAdd(false)
                    })
            })
    }

    //Xoá chủ đề
    const handleDeleteCategory = (slug) => {
        setIsLoading(true)
        dispatch(actDeleteCategory(slug))
            .then((res) => {
                if (res.ok) {
                    message.success(res.message)
                }
                dispatch(actGetCategoryListAsync())
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    //Cập nhật chủ đề
    const handleUpdateCategory = () => {
        formEdit.validateFields()
            .then((values) => {
                setIsLoading(true)
                dispatch(actUpdateCategory(categorySelected.slug, values))
                    .then((res) => {
                        if (res.ok) {
                            message.success(res.message)
                        }
                        dispatch(actGetCategoryListAsync())
                            .then(() => {
                                setIsShowModalUpdate(false)
                                setIsLoading(false)

                            })
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
                        Quản lý chủ đề
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

            {/* Modal tạo chủ đề  */}
            <Modal
                title="Tạo chủ đề mới"
                visible={isShowModalAdd}
                onCancel={() => setIsShowModalAdd(false)}
                onOk={handleSubmitFormAdd}
                // destroyOnClose
                confirmLoading={isConfirmLoadingAdd}
            >
                <Form
                    layout="vertical"
                    form={formAdd}
                >
                    <Form.Item
                        label="Tên chủ đề"
                        name="name"
                        rules={[{
                            required: true,
                            message: 'Hãy nhập tên chủ đề!'
                        }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Đường dẫn"
                        name="slug"
                        rules={[{
                            required: true,
                            message: 'Hãy nhập đường dẫn của chủ đề!'
                        }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Mô tả ngắn"
                        name="desc"
                        rules={[{
                            required: true,
                            message: 'Hãy nhập mô tả ngắn của chủ đề!'
                        }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>

            {/* Modal update chủ đề */}
            <Modal
                title={`Cập nhật chủ đề ${categorySelected && categorySelected.id}`}
                visible={isShowModalUpdate}
                onCancel={() => setIsShowModalUpdate(false)}
                onOk={handleUpdateCategory}
            >
                <Form
                    layout="vertical"
                    form={formEdit}
                >
                    <Form.Item
                        label="Tên chủ đề"
                        name="name"
                        rules={[{
                            required: true,
                            message: 'Hãy nhập tên chủ đề!'
                        }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Đường dẫn"
                        name="slug"
                        rules={[{
                            required: true,
                            message: 'Hãy nhập đường dẫn của chủ đề!'
                        }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Mô tả ngắn"
                        name="desc"
                        rules={[{
                            required: true,
                            message: 'Hãy nhập mô tả ngắn của chủ đề!'
                        }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>

            {/* Bảng danh sách chủ đề  */}
            <Col span={24}>
                <Table
                    loading={isLoading}
                    columns={columns}
                    dataSource={categoryList}
                    rowKey={(record) => record.id}
                />
            </Col>
        </Row>
    )
}

export default DashboardAdminArticleCategory
