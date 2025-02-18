import React, { useContext, useState } from 'react'
import styles from './payment.module.css'
import LayOut from '../../Components/LayOut/LayOut'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import ProductCard from '../../Components/Product/ProductCard'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat'
import { axiosInstance } from '../../API/axios'
import { Card } from '@mui/material'


function Payment() {

  const [{ user, basket }] = useContext(DataContext)
  // console.log("user", user)

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount
  }, 0)



  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount
  }, 0)
  const [cardError, setCardError] = useState(null)
  const [processing, setProcessing]= useState(false)
  const stripe = useStripe();
  const elements = useElements();


  const handleChange = (e) => {
    // console.log(e)
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("")
  }

  const handlePayment = async (e) => {
    e.preventDefault()
    try {
      setProcessing(true)
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=$(total*100)`,
      });
      // console.log(response.data) not working
      ///clint side  confirmation
      const clientSecret = response.data?.clientSecret;

      const {paymentIntent} = await stripe.confirmCardPayment(

        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement)
          }
        }
      )
      setProcessing(false)
      console.log(paymentIntent)  
    } catch (error) {
console.log(error)
setProcessing(false)
    }


  }
  return (
    <LayOut>
      {/* like header */}
      <div className={styles.payment__header}>Checkout ({totalItem}) items</div>
      {/* payment method */}
      <section className={styles.payment}>
        {/* address */}
        <div className={styles.flex}>
          <h3>Delivery Address</h3>
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
              basket?.map((item) => <ProductCard product={item} flex={true} />)
            }
          </div>
        </div>
        <hr />




        {/* card form */}

        <div className={styles.flex}>
          <h3>Payment Methods</h3>
          <div className={styles.payment__card__container}>
            <div className={styles.payment__details}>
              <form onSubmit={handlePayment}>
                {/* showing error */}
                {cardError && <small style={{ color: "red" }}>{cardError}</small>}
                {/* the card */}
                <CardElement onChange={handleChange} />
                <div className={styles.payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total order |</p>   <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {
                      processing? (

                        <div className={styles.loading}>
                          <ClipLoader color="gray" size={12}/>
                          <p>Please Wait...</p>
                        </div>
                      ):"Pay now"
                    }
                    
                    
                    
                    </button>
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
