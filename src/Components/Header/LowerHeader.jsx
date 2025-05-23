import React from 'react'
import { LuMenu } from "react-icons/lu";
import styles from './Header.module.css'

function LowerHeader() {
  return (
    <div className={styles.lower__container}>
      <ul>
        <li>
        <LuMenu />
            <p>All</p>
        </li>
        <li>Today's Deals</li>
        <li>Custumer Service</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
    </div>
  )
}

export default LowerHeader
