import React, { useContext, useState } from 'react';
import styles from './payment.module.css';
import LayOut from '../../Components/LayOut/LayOut';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from '../../Components/Product/ProductCard';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';
import { axiosInstance } from '../../API/axios';
import ClipLoader from "react-spinners/ClipLoader";
import { db } from '../../Utillity/firebase';
import { collection, doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
// import { create } from '@mui/material/styles/createTransitions';
import { Type } from '../../Utillity/action.type';
function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);
  const total = basket.reduce((amount, item) => (item.price * 100) * item.amount + amount, 0);

  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();


    try {
      setProcessing(true);

      // 1. we Create payment intent
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      const clientSecret = response.data?.clientSecret


      // 2.we Confirm payment
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        },
      });

      //3. Save to Firestore
      if (paymentIntent.status === "succeeded") {
        const ordersRef = collection(db, "users", user.uid, "orders");
        await setDoc(doc(ordersRef, paymentIntent.id), {
          basket: basket.map(item => ({
            id: item.id,
            title: item.title,
            price: item.price,
            amount: item.amount,
            image: item.image
          })),
          amount: paymentIntent.amount,
          created: paymentIntent.created,
          status: paymentIntent.status
        });

        // 4. here we will  Clear basket . ufff
        dispatch({ type: Type.EMPTY_BASKET });
      }
      // if (paymentIntent.status === "succeeded") {
      //   const ordersRef = collection(db, "users", user.uid, "orders")
      // }
      // await db
      //   .collection("users")
      //   .doc(user.uid)
      //   .collection("orders")
      //   .doc(paymentIntent.id)
      //   .set({
      //     basket: basket,
      //     amount: paymentIntent.amount,
      //     created: paymentIntent.created,
      //   })
      //dispatch({ type: Type.EMPTY_BASKET })

      setProcessing(false);
      navigate("/orders", { state: { msg: "you have placed a new Order" } });

    } catch (error) {
      console.error("Payment error:", error);
      setCardError(error.message);

    }

  };

  return (
    <LayOut>
      <div className={styles.payment__header}>Checkout ({totalItem}) items</div>

      <section className={styles.payment}>
        {/* Delivery Address Section */}
        <div className={styles.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>
        <hr />

        {/* Review Items Section */}
        <div className={styles.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                flex={true}
              />
            ))}
          </div>
        </div>
        <hr />

        {/* Payment Section */}
        <div className={styles.flex}>
          <h3>Payment Methods</h3>
          <div className={styles.payment__card__container}>
            <div className={styles.payment__details}>
              <form onSubmit={handlePayment}>
                {cardError && <div className={styles.error}>{cardError}</div>}

                <CardElement
                  onChange={handleChange}
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                      },
                      invalid: {
                        color: '#9e2146',
                      },
                    },
                  }}
                />

                <div className={styles.payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total order |</p>
                      <CurrencyFormat amount={total / 100} />
                    </span>
                  </div>
                  <button
                    type="submit"
                    disabled={processing || !stripe || !elements}
                  >
                    {processing ? (
                      <div className={styles.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Processing...</p>
                      </div>
                    ) : "Pay Now"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;