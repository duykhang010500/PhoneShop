import { useEffect } from "react";
import { useDispatch } from 'react-redux'
import Ads from "../components/Ads";
import NewListProduct from "../components/NewListProduct";
import BrandFeature from "../components/BrandFeature";
import BestDiscount from '../components/BestDiscount'
import { actGetAllProductNotPaging, actGetBestDiscountAsync } from "../store/products/actions";
import Banner from "../components/Banner";

export default function HomePage() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(actGetAllProductNotPaging())
        dispatch(actGetBestDiscountAsync())
    }, [dispatch])

    return (
        <div className="home-page">
            <Banner />
            <BestDiscount />
            <BrandFeature />
            <NewListProduct
                title="SẢN PHẨM MỚI NHẤT"
            />
            <Ads />
        </div>
    )
}