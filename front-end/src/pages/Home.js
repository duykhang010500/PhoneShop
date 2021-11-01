
import Ads from "../components/Ads";
import Carousel from '../components/Carousel'
import BestSeller from "../components/BestSeller";
import Subscription from "../components/Subscription";
import MenuHorizontal from "../components/MenuHorizontal";
import BrandFeature from "../components/BrandFeature";

export default function HomePage() {
    return (
        <section>
            {/* <MenuHorizontal /> */}
            {/* <Carousel /> */}
            {/* <BrandFeature /> */}
            {/* <Ads /> */}
            <BestSeller title="BÁN CHẠY NHẤT" />
            <BestSeller title="Apple" />
            <BestSeller title="Samsung" />
            {/* <Subscription /> */}
        </section>
    )
}