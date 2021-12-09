import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { actGetDetailArticleAsync } from '../store/news/action'

const DetailPostNews = () => {
    const { slug } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actGetDetailArticleAsync(slug))
    }, [])

    const detailPost = useSelector((state) => state.News.detailArticle)
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
