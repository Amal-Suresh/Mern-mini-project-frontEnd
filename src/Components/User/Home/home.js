
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import './home.css'
import { useDispatch } from 'react-redux'
import { removeUser } from '../../../utils/userSlice'
import store from '../../../utils/store'

const Home = () => {
    const navigate = useNavigate()
    const dispatch =useDispatch()
   
    

    const user=useSelector(store=>store.user.userD)
    const handleprofile=()=>{
        navigate('/profile')

    }
    const handlelogout= ()=>{
        dispatch(removeUser()) 
        localStorage.clear(); 
        navigate('/login')

    }
    const handlelogin=()=>{
        navigate('/login')

    }
    const handleregister=()=>{
        navigate('/register')

    }
    
    
    return (
        <div>
            {user.name?
            <div className="nav-div">
                <h2>HELLO, {user.name}</h2>
              
                <button onClick={handleprofile} >PROFILE</button>
                <button onClick={handlelogout} >LOGOUT</button>
              
            </div>:
            <div className="nav-div">
                <button onClick={handlelogin}>LOGIN</button>
                <button onClick={handleregister}>REGISTER</button>
            </div>
            }
            
            
        </div>
    )

}
export default Home