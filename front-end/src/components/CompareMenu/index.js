import React from 'react'
import { Link } from 'react-router-dom'
import './style.scss'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { actRemoveCompare, actRemoveAllCompare, actShowCompare } from '../../store/compare/action'
const CompareMenu = () => {
    const dispatch = useDispatch()
    const compareList = useSelector(state => state.Compare.compareList)
    return (
        <div className='compare-menu'>
            <ul className="list-compare">
                {
                    compareList.map((item) => (
                        <li className="list-compare-item">
                            <Link>
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    style={{ width: 60, heigth: 60, marginBottom: 10 }}

                                />
                            </Link>
                            <p className='fw-500'>
                                {item.name}
                            </p>
                            <span
                                style={{ cursor: 'pointer' }}
                                onClick={() => dispatch(actRemoveCompare(item.id))}
                            >
                                ×
                            </span>
                        </li>
                    ))

                }
            </ul>
            <div className="close-compare">
                <div
                    className="btn-hide-compare"
                    onClick={() => dispatch(actShowCompare())}
                >
                    Thu gọn
                </div>
                <Button
                    className="btn-compare"
                    type='primary'
                    style={{ cursor: 'pointer' }}
                    onClick={() => console.log('cc')}
                    disabled={compareList.length < 2}
                    href='/compare'
                >
                    So sánh ngay
                </Button>
                <span onClick={() => dispatch(actRemoveAllCompare())}>Xoá tất cả so sánh</span>
            </div>
        </div>
    )
}

export default CompareMenu
