
import Ads from "../components/Ads";
import Carousel from '../components/Carousel'
import BestSeller from "../components/BestSeller";
import Subscription from "../components/Subscription";
import BrandFeature from "../components/BrandFeature";

export default function HomePage() {
    return (
        <section>
            {/* <Carousel /> */}
            <BrandFeature />
            <BestSeller title="MỚI NHẤT" />
            <Ads />
        </section>
    )
}