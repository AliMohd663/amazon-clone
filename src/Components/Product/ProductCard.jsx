import React from 'react'
import Rating from '@mui/material/Rating'
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat'
import styles from './Product.module.css'
import{Link} from 'react-router-dom'

function ProductCard({ product, flex, renderDesc }) {
    const { image, title, id, rating, price, description } = product;

    return (
        <div className={`${styles.card__container} ${flex?styles.product__flexed : ''}` }>
            <Link to={`/products/${id}`}>
                <img src={image} alt="" />
            </Link>

            <div>
                <h3>{title}</h3>

            {renderDesc &&  <div style={{maxWidth:"750px"}}>{description}</div> }
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
                <button className={styles.button}>
                    add to cart
                </button>
            </div>
        </div>
    )
}

export default ProductCard

