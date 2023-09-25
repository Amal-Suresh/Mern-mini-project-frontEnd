import './userRegister.css'
import React from 'react'
import { useRef } from 'react'
import axios from 'axios'
import {userApi } from '../../../API/api'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'


function Register() {
    
    const nameRef = useRef() 
    const emailRef = useRef() 
    const passwordRef = useRef() 
    const navigate =useNavigate()


    const handleSubmit= (e)=>{
        e.preventDefault()
        
        const user={
          name:nameRef.current.value,
          password:passwordRef.current.value,
          email:emailRef.current.value
        }

        console.log(nameRef.current.value);
        console.log(emailRef.current.value);
        console.log(passwordRef.current.value);

        (async()=>{
         try {
          console.log("datais erntering--------");
            await axios.post(`${userApi}register`,{user}).then((response)=>{
            if(response.data.sucess){
              toast.success(response.data.message)
              toast("Redirecting to Login Page")
              navigate("/login")
             
            }else{
              toast.error(response.data.message)
            }
          })
         } catch (error) {
          toast.error("Somthing went wrong")
          
         }
        })()
       


    }

    
  return (
    <div className='reg-main-div'>
     
       <div className='reg-div'>
      
          <form action="" onSubmit={handleSubmit} >
               <h1>Sign up </h1>
                <div>
                    <label htmlFor="">Name :</label><br/>
                    <input ref={nameRef} type="text" /> 
                </div>
                <div>
                    <label htmlFor="">Email :</label><br/>
                    <input ref={emailRef} type="text" /> 
                </div>
                <div>
                    <label htmlFor="">Password :</label><br/>
                    <input ref={passwordRef} type="text" /> 
                </div>
                <div> 
                    <button className='reg-btn' type='submit'>SUBMIT</button>
                </div>
          </form>
       </div>
    </div>
  )
}

export default Register