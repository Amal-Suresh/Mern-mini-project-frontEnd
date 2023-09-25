import {Routes,Route} from 'react-router-dom'
import { useEffect } from 'react'
import Home from '../Pages/User/home'
import Register from '../Pages/User/register'
import Login from '../Pages/User/login'
import Profile from '../Pages/User/profile'
import Axios from 'axios'
import { userApi } from '../API/api'
import { useSelector   } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'




const User =()=>{

    const dispatch =useDispatch()

    const checkIfUser = async(req,res)=>{
        try {
            const token =localStorage.getItem('token')
            const response = await Axios.post(`${userApi}check-if-user`,{token})
            if(response.data.success){
                    dispatch(addUser({id:response.data.userdata.id,name:response.data.userdata.name}))
            }

        } catch (error) {    
        }
    }
    useEffect(() => {
        checkIfUser()
       
    },[])
    
    const user =useSelector(store=>store.user.userD)
    return(
        <Routes>
            <Route path='/' element={user.name? <Home/>:<Login/>}/>
            <Route path="/register" element={!user.name?<Register/>:<Home/>}/>
            <Route path="/login" element={user.name?<Home/>:<Login/>}/>
            <Route path="/profile" element={user.name?<Profile/>:<Login/>} />
        </Routes>
    )

}

export default User

