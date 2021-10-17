
import React from 'react'
import { Link } from 'react-router-dom'
import {
    BsPhone,
    BsLaptop,
    BsTablet,
    BsWatch,
} from "react-icons/bs";
import { FaHeadphones } from "react-icons/fa";
import { IoIosFlash } from "react-icons/io";

const menu = [
    {
        icon: <BsPhone />,
        title: "Điện thoại",
        link: "/dien-thoai-di-dong"
    },
    {
        icon: <BsLaptop />,
        title: "Laptop"
    },
    {
        icon: <BsTablet />,
        title: "Tablet"
    },
    {
        icon: <BsWatch />,
        title: "Đồng hồ"
    },
    {
        icon: <FaHeadphones />,
        title: "Tai nghe"
    },
    {
        icon: <IoIosFlash />,
        title: "Giảm giá"
    }
]

const MenuHorizontal = () => {
    return (
        <div className="container">
            <ul className="list__menu-horizontal">
                {
                    menu.map((item, index) => {
                        return (
                            <li className="menu-item">
                                <Link to={item.link}>
                                    {item.icon}
                                    <span>
                                        {item.title}
                                    </span>
                                </Link>
                            </li>
                        )
                    })
                }

            </ul>
        </div>
    )
}

export default MenuHorizontal
