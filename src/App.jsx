import React, { useContext, useEffect } from 'react'
import Routing from './pages/Routing'
import { DataContext } from './Components/DataProvider/DataProvider'
import { Type } from './Utillity/action.type'
import { auth } from './Utillity/firebase'

function App() {

  const [{ user }, dispatch] = useContext(DataContext)

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser)
        dispatch({
          type: Type.SET_USER,
          user: authUser
        })
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        })
      }


    })
  }, [])



  return (

    <Routing />


  )
}

export default App
