import React, { useContext } from 'react'
import styles from "./Header.module.css"
import { FaSearch } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { FiShoppingCart } from "react-icons/fi";
import { CiLocationOn } from "react-icons/ci";
import LowerHeader from "./LowerHeader"
import { Link } from 'react-router-dom'
import { DataContext } from '../DataProvider/DataProvider';
import { auth } from '../../Utillity/firebase'




const Header = () => {


    const [{ user, basket }, dispatch] = useContext(DataContext)
    // console.log(basket.length)

    const totalItem = basket?.reduce((amount, item) => {
        return item.amount + amount
    }, 0)

    return (
        <section className={styles.fixed}>
            <section>
                <section>
                    <div className={styles.header__container}>
                        <div className={styles.logo__container}>
                            {/* logo */}
                            <Link to="/">
                                <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon loge" />
                            </Link>
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
                            <FaSearch size={38} />
                        </div>
                        {/* rigth side links */}
                        <div>
                            <div className={styles.order__container}>
                                <Link to="" className={styles.lanuage}>
                                    <img src="https://pngimg.com/uploads/flags/flags_PNG14655.png" alt="" />
                                    <select name="" id="">
                                        <option value="">EN</option>
                                    </select>
                                </Link>
                                {/* three components */}
                                <Link to={!user && "/Auth"}>
                                    <div>
                                        {
                                            user ? (

                                                <>
                                                    <p>Hello {user?.email?.split("@")[0]}</p>
                                                    <span onClick={() => auth.signOut()}>Sign Out</span>

                                                </>
                                            ) : (

                                                <>
                                                    <p>Hello, Sign In</p>
                                                    <span></span>
                                                </>
                                            )
                                        }
                                    </div>
                                </Link>
                                {/* order */}
                                <Link to="/Orders">
                                    <p>reuturns</p>
                                    <span>& Orders</span>
                                </Link>
                                {/* cart */}
                                <Link to="/Cart" className={styles.cart}>
                                    <FiShoppingCart size={35} />
                                    <span>{totalItem}</span>
                                </Link>

                            </div>

                        </div>
                    </div>
                </section>
            </section>
            <LowerHeader />

        </section>
    );
}
export default Header;