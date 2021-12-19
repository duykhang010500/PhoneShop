import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actGetArticleListAsync, actGetCategoryListAsync } from '../store/news/action'
import { Link } from 'react-router-dom'
import { Skeleton } from 'antd'


const shortDesc = (text, num = 20) => {
    if (text.length > num) {
        return text.split(' ').splice(0, num).join(' ') + '...'
    } else {
        return text
    }
}

const News = () => {

    const dispatch = useDispatch()
    const [isFetching, setIsFetching] = useState(false)

    useEffect(() => {
        setIsFetching(true)
        dispatch(actGetCategoryListAsync())
        dispatch(actGetArticleListAsync())
            .finally(() => setIsFetching(false))
    }, [])

    //Danh mục
    const newsCate = useSelector((state) => state.News.categoryList)
    //Bài viết mới
    const latestPost = useSelector((state) => state.News.articleList)

    if (isFetching) {
        return (
            <div className="container news-wrapper mt-12">
                <Skeleton
                    paragraph={{ rows: 4 }}
                    active
                />
                <Skeleton
                    paragraph={{ rows: 4 }}
                    active
                />
                <Skeleton
                    paragraph={{ rows: 4 }}
                    active
                />
            </div>
        )
    }

    return (
        <div className="news">
            <div className="container">
                <div className="news-wrapper">
                    <div className="news__title">
                        Bản tin công nghệ
                    </div>
                    {/* <ul className="news__cate">
                        {
                            newsCate.map((item) => (
                                <Link
                                    className="news__cate-item"
                                    to={item.slug}
                                    key={item.id}
                                >
                                    {item.name}
                                </Link>
                            ))
                        }
                    </ul> */}
                    <ul className="news__post">
                        {
                            latestPost.map((item) => (
                                <li
                                    className="news__post-item"
                                    key={item.id}
                                >
                                    <Link
                                        className="news__post-thumb"
                                        to={`/news/post/${item.slug}`}
                                    >
                                        <img src={item.image} alt={item.image} />
                                    </Link>
                                    <div className="news__post-desc">
                                        <Link
                                            className="news__post-desc--title"
                                            to={`/news/post/${item.slug}`}
                                        >
                                            {item.name}
                                        </Link>
                                        <span className="news__post-desc--created">
                                            {
                                                item.created_at
                                            }
                                        </span>
                                        <span className="news__post-desc--cate">
                                            {item.cate_article.name}
                                        </span>
                                        <div className="new__post-desc--detail">
                                            <div dangerouslySetInnerHTML={{
                                                __html: shortDesc(item.desc)
                                            }} />

                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default News
