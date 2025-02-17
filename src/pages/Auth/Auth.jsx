import React from 'react'
import styles from './Signup.module.css'
import { Link } from 'react-router-dom'

function Auth() {
  return (

    <section className={styles.login}>

      {/* logo */}
      <Link>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1206px-Amazon_logo.svg.png" alt="" />
      </Link>


      {/* form */}
      <div className={styles.login__container}>
        <h1>Sign In</h1>
        <form action="">

          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id='email' />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <button className={styles.login__signInbtn}>Sign In</button>

        </form>

        {/* agreement */}
      <p>
        Lorem ipsum dolor, AMAZONE FAKE CLONE adipisicing elit. Officiis natus quaerat dolorum repudiandae, nulla explicabo sunt tempore reiciendis velit!
      </p>

{/* create account */}
<button className={styles.login__rgstrbtn}>Creat your Amazon Account</button>

      </div>


    </section>

  )
}

export default Auth;
