
import Ads from "../components/Ads";
import Carousel from '../components/Carousel'
import BestSeller from "../components/BestSeller";
import BrandFeature from "../components/BrandFeature";

import { useSelector } from 'react-redux'

export default function HomePage() {

    const listNew = useSelector(state => state.Products.list)

    return (
        <section>
            {/* <Carousel /> */}
            <BrandFeature />
            <BestSeller title="MỚI NHẤT" product={listNew} />
            <Ads />
        </section>
    )
}