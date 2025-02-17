import React, { useState, useContext } from 'react'
import styles from './Signup.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../Utillity/firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import { Type } from '../../Utillity/action.type'
import { ClipLoader } from 'react-spinners'


function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false
  })
  const [{ user }, dispatch] = useContext(DataContext)
  const navigate = useNavigate()

  // console.log(user)




  const authHandler = async (e) => {
    e.preventDefault();
    // console.log(e.target.name)
    if (e.target.name == "signin") {
      //firebase auht
      setLoading({ ...loading, signIn: true })
      signInWithEmailAndPassword(auth, email, password).then((userInfo) => {

        dispatch({
          type: Type.SET_USER,
          user: userInfo.user
        });
        setLoading({ ...loading, signIn: false })
        navigate("/")

      }).catch((err) => {
        setError(err.message);
        setLoading({ ...loading, signIn: false })
      })

    } else {
      setLoading({ ...loading, signUp: true })
      createUserWithEmailAndPassword(auth, email, password).then((userInfo) => {

        dispatch({
          type: Type.SET_USER,
          user: userInfo.user
        })
        setLoading({ ...loading, signUp: false })
      }).catch((err) => {
        setError(err.message);
        setLoading({ ...loading, signUp: false })

      })
      navigate("/")

    }
  }

  // console.log(password, email)
  return (

    <section className={styles.login}>

      {/* logo */}
      <Link to={"/"}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1206px-Amazon_logo.svg.png" alt="" />
      </Link>


      {/* form */}
      <div className={styles.login__container}>
        <h1>Sign In</h1>
        <form action="">

          <div>
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id='email' />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" />
          </div>
          <button type="submit" name="signin" onClick={authHandler} className={styles.login__signInbtn}>

            {
              loading.signIn ? (<ClipLoader color='#000' size={15}></ClipLoader>
              ) : (
                "Sign In"
              )}

          </button>

        </form>

        {/* agreement */}
        <p>
          Lorem ipsum dolor, AMAZONE FAKE CLONE adipisicing elit. Officiis natus quaerat dolorum repudiandae, nulla explicabo sunt tempore reiciendis velit!
        </p>

        {/* create account */}
        <button type="submit" name="signup" onClick={authHandler} className={styles.login__rgstrbtn}>
          {
            loading.signUp ? (<ClipLoader color='#000' size={15}></ClipLoader>
            ) : (
              "Creat your Amazon Account"
            )}

        </button>



        {
          error && <small style={{ paddingTop: "8px", color: "red" }}>{error}</small>
        }
      </div>


    </section>

  )
}

export default Auth;
