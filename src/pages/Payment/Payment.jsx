import React, { useContext, useState } from 'react'
import styles from './payment.module.css'
import LayOut from '../../Components/LayOut/LayOut'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import ProductCard from '../../Components/Product/ProductCard'
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat'



function Payment() {

  const [{user, basket }] = useContext(DataContext)
  // console.log("user", user)

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount
  }, 0)



  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount
  }, 0)
const [cardError, setCardError] =useState(null)
const stripe= useStripe();
const element= useElements();


const handleChange = (e)=>{
  console.log(e)
e?.error?.message? setCardError(e?.error?.message): setCardError("")
}

  return (
    <LayOut>
      {/* like header */}
      <div className={styles.payment__header}>Checkout ({totalItem}) items</div>
      {/* payment method */}
      <section className={styles.payment}>
        {/* adrres */}
        <div className={styles.flex}>
<h3>Delivery Adress</h3>
<div>
  <div>{user?.email}</div>
  <div>123 React Lane</div>
  <div>Chicago, It</div>
</div>

        </div>
        <hr />


        {/* products */}
        <div className={styles.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {
              basket?.map((item)=><ProductCard product={item} flex={true}/>)
            }
          </div>
        </div>
        <hr />




        {/* card form */}

        <div className={styles.flex}> 
          <h3>Payment Methods</h3>
          <div className={styles.payment__card__container}>
            <div className={styles.payment__details}>
              <form action="">
                {/* showing error */}
                {cardError && <small style={{color: "red"}}>{cardError}</small>  }
                {/* the card */}
                <CardElement onChange={handleChange}/>
                <div className={styles.payment__price}>
                  <div>
                    <span style={{display: "flex", gap: "10px"}}>
                      <p>Total order |</p>   <CurrencyFormat amount={total}/>
                    </span>
                  </div>
                  <button>Pay now</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>



    </LayOut>
  )
}

export default Payment
