import React, { useEffect, useState } from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productURL } from '../../API/endpoint'
import ProductCard from '../../Components/Product/ProductCard'
import styles from './results.module.css'
import Loader from '../../Components/Loader/Loader'

function Results() {
  const  [results, setResults] = useState([])
  const [isLoading, setisLoading] = useState(false)

   const { categoryName } = useParams()
    
   useEffect(() =>{

    axios.get(`${productURL}/products/category/${categoryName}`)
    .then((response) =>{
      setResults(response.data)
      console.log(response.data)
      setisLoading(false)
    }).catch((error) =>{
      console.log(error)
      setisLoading(false)
    })
   }, [categoryName])

  
  return (
    <LayOut>
      
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>categoryName /{categoryName}</p>
        <hr />

        {
          isLoading? (<Loader/>) :(<div className={styles.products__container}>
            {results.map((product) => (
              <ProductCard
                key={product?.id}
                product={product}
                renderAdd={true}
              />
            ))}
          </div>)
        }
        
      </section>

    </LayOut>
  )
}

export default Results
