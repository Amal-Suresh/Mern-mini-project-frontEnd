import React,{useEffect} from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from '../Pages/Admin/home'
import Login from '../Pages/Admin/login'
import Axios from 'axios'
import { adminApi } from '../API/api'
import { useSelector   } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'





function Admin() {

  const dispatch = useDispatch()
  const checkIfAdmin = async(req,res)=>{
    try {
        const token =localStorage.getItem('token')
        const response = await Axios.post(`${adminApi}check-if-admin`,{token})
        if(response.data.success){
                dispatch(addUser({id:response.data.admindata.id,name:response.data.admindata.name}))
        }

    } catch (error) {    
    }
}
useEffect(() => {
  checkIfAdmin()
 
},[])
const admin =useSelector(store=>store.user.userD)
console.log(admin,"admin datas");


  return (
    <Routes>
        <Route path='/' element={admin.name?<Home/>:<Login/>}/>
        <Route path='/login' element={admin.name?<Home/>:<Login/>}/>
    </Routes>
  )
}

export default Admin