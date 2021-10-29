
import Ads from "../components/Ads";
import Carousel from '../components/Carousel'
import BestSeller from "../components/BestSeller";
import Subscription from "../components/Subscription";
import MenuHorizontal from "../components/MenuHorizontal";

export default function HomePage() {
    return (
        <section>
            <MenuHorizontal />
            <Carousel />
            <BestSeller title="Bán chạy nhất" />
            <Ads />
            <BestSeller title="Apple" />
            <BestSeller title="Samsung" />
            <Subscription />
        </section>
    )
}