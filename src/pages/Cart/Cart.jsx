import React, { useContext } from 'react'

import LayOut from '../../Components/LayOut/LayOut'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import ProductCard from '../../Components/Product/ProductCard'
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat'
import { Link } from 'react-router-dom'
import styles from './cart.module.css'
import { Type } from '../../Utillity/action.type'
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";

function Cart() {
  const [{ basket, user, }, dispatch] = useContext(DataContext)

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount
  }, 0)
  // console.log(basket)

  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item
    })
  }
  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id
    })
  }



  return (
    <LayOut>
      <section className={styles.container}>
        <div className={styles.cart__container}>
          <h2>Hello</h2>
          <h3>Your shopping basket</h3>
          <hr />
          {
            basket?.length == 0 ? (<p>Opps ! No item in your cart</p>) : (basket?.map((item, i) => {
              return <section className={styles.card__product}>



                <ProductCard
                  key={i}
                  product={item}
                  renderDesc={true}
                  renderAdd={false}
                  flex={true}

                />
                <div className={styles.btn__container}>
                  <button className={styles.btn}  onClick={() => increment(item)}>
                  <MdKeyboardArrowUp />
                  </button>
                  <span>{item.amount}</span>
                  <button className={styles.btn}  onClick={() => decrement(item.id)}>
                  <MdKeyboardArrowDown />
                  </button>
                </div>
              </section>



            }))
          }
        </div>


        {basket?.length !== 0 && (
          <div className={styles.subtotal}>
            <div>
              <p>Subtotal ({basket?.length}item)</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/payments">Continue to checkout</Link>
          </div>

        )}


      </section>
    </LayOut>
  )
}

export default Cart
