import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'

import Ads from "../components/Ads";
import Carousel from '../components/Carousel'
import NewListProduct from "../components/NewListProduct";
import BrandFeature from "../components/BrandFeature";
import BestDiscount from '../components/BestDiscount'
import { actGetAllProductAsync, actGetBestDiscountAsync } from "../store/products/actions";

export default function HomePage() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actGetAllProductAsync())
        dispatch(actGetBestDiscountAsync())
    }, [dispatch])

    const listNew = useSelector(state => state.Products.list)
    const listDiscount = useSelector(state => state.Products.listBestDiscount)
    const descListDiscount = listDiscount.slice().reverse()
    // console.log(descListDiscount)
    return (
        <section>
            {/* <Carousel /> */}
            <BrandFeature />
            <BestDiscount
                title="GIẢM GIÁ TỐT"
                product={descListDiscount}
            />
            <Ads />
            <NewListProduct
                title="SẢN PHẨM MỚI NHẤT"
                product={listNew}
            />
        </section>
    )
}