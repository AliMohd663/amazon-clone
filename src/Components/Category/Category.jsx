import React from 'react';
import CategoryCard from './CategoryCard';
import { categories } from './categories';
import styles from './Category.module.css'
function Category() {
  return (
    <section className={styles.catagory__container}>
      {categories.map((infos) => (
        <CategoryCard 
          key={infos.id}  
          data={infos} 
        />
      ))}
    </section>
  );
}

export default Category;

