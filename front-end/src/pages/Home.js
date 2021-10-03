
import BestSeller from "../components/BestSeller";
import MenuHorizontal from "../components/MenuHorizontal";
import Subscription from "../components/Subscription";
import Carousel from '../components/Carousel'
import Ads from "../components/Ads";

export default function HomePage() {
    return (
        <section>
            <MenuHorizontal />
            <Carousel />
            <BestSeller />
            <Ads />
            <BestSeller />

            <BestSeller />

            <Subscription />
        </section>
    )
}