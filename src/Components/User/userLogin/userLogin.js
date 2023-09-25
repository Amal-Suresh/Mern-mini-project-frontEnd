import React from 'react'
import './userLogin.css'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addUser } from '../../../utils/userSlice'



import Axios from 'axios'
import { userApi } from '../../../API/api'
import toast from 'react-hot-toast'


function UserLogin() {
  const dispatch =useDispatch()


  

  const emailRef = useRef()
  const passRef = useRef()
  const navigate = useNavigate()

  const handleSubmit =async(e)=>{
    try {
      e.preventDefault()
     
      const user ={
        email:emailRef.current.value,
        password:passRef.current.value
      }
      console.log(user,"user data");

      const response= await  Axios.post(`${userApi}login`,{user})
      
      if(response.data.success){
        
        dispatch(addUser({id:response.data.userdata.id,name:response.data.userdata.name}))

        toast.success(response.data.message)
        

        localStorage.setItem("token",response.data.data.token)

          navigate("/")
      

        
      }else{
        
        toast.error(response.data.message)
        
      }

    } catch (error) {
      toast.error("Something went wrong")
      
    }
  }




  return (
    <div className='log-main-div' >
      <div className="log-div">
        <form action=""  onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div>
            <span >Email</span>
            <input ref={emailRef} type="email" placeholder="name@example.com" />
          </div>
          <div>
            <span >Password</span>
            <input ref={passRef} type="password" />
          </div>
          <div className='login-btn-div' >
            <button className="log-btn" type='submit'>Login</button>
          </div>
        </form>
      </div>


    </div>
  )
}

export default UserLogin