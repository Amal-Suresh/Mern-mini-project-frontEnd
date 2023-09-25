import React, { useRef } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { adminApi } from '../../../API/api'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { addUser } from '../../../utils/userSlice'

function AdminLogin() {

    const dispatch = useDispatch()

    const emailRef = useRef()
    const passRef = useRef()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()

            const admin = {
                email: emailRef.current.value,
                password: passRef.current.value
            }
            console.log(admin, "admin data");

            const response = await Axios.post(`${adminApi}login`, { admin })

            if (response.data.success) {

                dispatch(addUser({ id: response.data.admindata.id, name: response.data.admindata.name }))

                toast.success(response.data.message)


                localStorage.setItem("token", response.data.data.token)
                navigate("/admin")
            } else {

                toast.error(response.data.message)

            }

        } catch (error) {
            toast.error("Something went wrong")

        }
    }



    return (

        <div className='log-main-div' >
            <div className="log-div">
                <form action="" onSubmit={handleSubmit}>
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

export default AdminLogin