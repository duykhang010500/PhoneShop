import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import Ads from "../components/Ads";

import NewListProduct from "../components/NewListProduct";
import BrandFeature from "../components/BrandFeature";
import BestDiscount from '../components/BestDiscount'
import { actGetAllProductAsync, actGetBestDiscountAsync } from "../store/products/actions";
import Banner from "../components/Banner";




export default function HomePage() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actGetAllProductAsync())
        dispatch(actGetBestDiscountAsync())
    }, [dispatch])

    const selector = useSelector(state => state)
    const listDiscount = selector.Products.listBestDiscount.data
    const listNew = selector.Products.list
    if (!listDiscount || !listNew) {
        return null
    }

    return (
        <div className="home-page">
            <Banner />
            <BestDiscount
                product={listDiscount}
            />
            <BrandFeature />
            <NewListProduct
                title="SẢN PHẨM MỚI NHẤT"
                product={listNew}
            />
            <Ads />
        </div>
    )
}