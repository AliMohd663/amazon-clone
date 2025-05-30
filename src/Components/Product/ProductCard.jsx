import React, { useContext } from 'react'
import Rating from '@mui/material/Rating'
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat'
import styles from './Product.module.css'
import { Link } from 'react-router-dom'
import { DataContext } from '../DataProvider/DataProvider'
import { Type } from '../../Utillity/action.type'

function ProductCard({ product, flex, renderDesc, renderAdd }) {
    const { image, title, id, rating, price, description } = product;

    const [state, dispatch] = useContext(DataContext)

//  console.log(state)

    const addToCart = () => {
        dispatch({
            type: Type.ADD_TO_BASKET,
            item: {
                image, title, id, rating, price, description
            }
        })
    }

    return (
        <div className={`${styles.card__container} ${flex ? styles.product__flexed : ''}`}>
            <Link to={`/products/${id}`}>
                <img 
                src={product.image} 
                alt={product.title} 
                onError={(e)=>{
                    e.target.src= '/fallback-image.jpg';
                }}/>
            </Link>

            <div>
                <h3>{title}</h3>

                {renderDesc && <div style={{ maxWidth: "750px" }}>{description}</div>}
                <div className={styles.rating}>
                    {/* rating */}
                    <Rating value={rating?.rate || 0} precision={0.1} />
                    {/* price */}
                    <small>{rating?.count}</small>
                </div>
                <div>
                    {/* price */}
                    <CurrencyFormat amount={price} />
                </div>

             {
                renderAdd &&  <button className={styles.button} onClick={addToCart}>
                add to cart
            </button>
             }

               
            </div>
        </div>
    )
}

export default ProductCard

