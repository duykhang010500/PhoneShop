import React from 'react'
import './style.scss'
import { Button } from 'antd'
import { SyncOutlined } from '@ant-design/icons'
const CompareButton = () => {
    return (
        <div className='btn-show-compare'>
            <Button
                type='primary'
                danger
                icon={<SyncOutlined spin />}
                size='large'

            >

            </Button>
        </div>
    )
}

export default CompareButton
