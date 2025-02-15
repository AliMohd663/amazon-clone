import React from 'react'
import styles from "./header.module.css"
import { FaSearch } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { FiShoppingCart } from "react-icons/fi";
import { CiLocationOn } from "react-icons/ci";
import LowerHeader from "./LowerHeader"

const Header = () => {



    return (
        <>
            <section>
                <section>
                    <div className={styles.header__container}>
                        <div className={styles.logo__container}>
                            {/* logo */}
                            <a href="/">
                                <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon loge" />
                            </a>
                            {/* delivery */}
                            <span>
                                <TbTruckDelivery />
                            </span>
                            <div className={styles.delivery}>
                                <p>Deliverd to</p>
                            <CiLocationOn />

                                <span>Ethiopia</span>
                            </div>
                        </div>
                        <div className={styles.search}>

                            <select name="" id="">
                                <option value="">All</option>
                            </select>
                            <input type="text" id="" placeholder='search product' />
                            <FaSearch size={25} />
                        </div>
                        {/* rigth side links */}
                        <div>
                            <div className={styles.order__container}>
                                <a href="" className={styles.lanuage}>
                                    <img src="https://pngimg.com/uploads/flags/flags_PNG14655.png" alt="" />
                                    <select name="" id="">
                                        <option value="">EN</option>
                                    </select>
                                </a>
                                {/* three components */}
                                <a href="/Auth">
                                    
                                        <p>Sign In</p>
                                        <span>Account & Lists</span>
                                    
                                </a>
                                {/* order */}
                                <a href="/Orders">
                                    <p>reuturns</p>
                                    <span>& Orders</span>
                                </a>
                                {/* cart */}
                                <a href="/Cart" className={styles.cart}>
                                    <FiShoppingCart size={35}/>
                                    <span>0</span>
                                </a>

                            </div>

                        </div>
                    </div>
                </section>
            </section>
        <LowerHeader/>

        </>
    );
}
export default Header;