import React from 'react';
import styles from './Category.module.css'

const CategoryCard = ({ data }) => {
  return (
    <div className={styles.category}>
      <h2>{data.title}</h2>
      <img 
        src={data.imageLink}  
        alt={data.title} 
      />
     
    </div>
  );
};

export default CategoryCard;
