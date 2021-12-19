import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Skeleton } from 'antd'
import { actGetDetailArticleAsync } from '../store/news/action'

const DetailPostNews = () => {
    const { slug } = useParams()
    const dispatch = useDispatch()
    const [firstLoading, setFirstLoading] = useState(true)

    useEffect(() => {
        dispatch(actGetDetailArticleAsync(slug))
            .finally(() => setFirstLoading(false))
    }, [])

    const detailPost = useSelector((state) => state.News.detailArticle)

    if (firstLoading) {
        return (
            <div className="mt-12">
                <div className="container">
                    <Skeleton
                        paragraph={{ rows: 10 }}
                    />
                </div>
            </div>
        )
    }

    if (!detailPost) {
        return null
    }

    return (
        <div className="mt-12">
            <div className="container">
                <div className="detail__post-wrapper box-sd1">
                    <div className="detail__post-title">
                        {
                            detailPost.name
                        }
                        <div className='detail__post-date'>{detailPost.created_at}</div>
                    </div>
                    <div className="detail__post-desc">
                        <div dangerouslySetInnerHTML={{
                            __html: detailPost.desc
                        }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailPostNews
