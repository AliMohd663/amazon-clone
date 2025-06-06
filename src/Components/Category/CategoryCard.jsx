import React from 'react';
import styles from './Category.module.css'
import {Link} from 'react-router-dom'

const CategoryCard = ({ data }) => {
  // console.log(data)
  return (
    <div className={styles.category}>
      <Link to={`/category/${data.name}`}>
      <span>
      <h2>{data.title}</h2>
      </span>
      <img 
        src={data.imageLink}  
        alt={data.title} 
      />
     </Link>
    </div>
  );
};

export default CategoryCard;
