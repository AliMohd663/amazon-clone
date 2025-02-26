import React, { useContext, useEffect, useState } from 'react';
import styles from './orders.module.css';
import LayOut from '../../Components/LayOut/LayOut';
import { db } from '../../Utillity/firebase';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from '../../Components/Product/ProductCard';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot 
} from "firebase/firestore";

function Orders() {
  const [{ user }] = useContext(DataContext);
  const [orders, setOrders] = useState([]); 

  useEffect(() => {
    if (!user) {
      setOrders([]);
      return;
    }

    const fetchOrders = async () => {
      try {
        
        const ordersRef = collection(db, "users", user.uid, "orders");
        const q = query(ordersRef, orderBy("created", "desc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
          const ordersData = snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          }));
          console.log("Orders:", ordersData);
          setOrders(ordersData);
        });

        return () => unsubscribe();

      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();

  }, [user]); 
  return (
    <LayOut>
      <section className={styles.container}>
        <div className={styles.orders__container}>
          <h2>Your Orders</h2>
          {orders?.length == 0 && 
            <div>you have any order</div>
          }
          <div>
            {orders?.map((eachOrder, i) => ( 
              <div key={eachOrder.id}>
                <hr />
                <p>Order ID: {eachOrder.id}</p>
                <div className={styles.order__items}>
                  {eachOrder?.data?.basket?.map(order => (
                    <ProductCard 
                      flex={true}
                      product={order}
                      key={order.id}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;