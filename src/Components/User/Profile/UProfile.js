import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import Axios from 'axios'
import { userApi } from '../../../API/api'
import './UProfile.css'

function UProfile() {
    const userid = useSelector(store => store.user.userD.id)
    const [user, setUser] = useState("")
    const [image, setImage] = useState(null);
    const [imgs, setImgs] = useState();
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [editStat, setEditStat] = useState(false)
    const navigate =useNavigate()

    const findUser = async () => {
        try {

            const response = await Axios.get(`${userApi}fetch-user?id=${userid}`)


            if (response.data.success) {
                setUser(response.data.user)
                setImgs(response?.data?.user?.image)

                console.log(response.data.user, "userdattaaa");
            }

        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        findUser()

    }, [])

    const handleedit = () => {

        setEditStat(!editStat)

    }
    const handleImage = (event) => {
        const file = event.target.files[0];
        setImage(file);

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(email, name, 999999999);
        const formdata = new FormData();
        formdata.append('email', email); // Append email to the formdata
        formdata.append('name', name); // Append name to the formdata
        formdata.append('image', image); 
        formdata.append('id', userid);// Append the image file to the formdata

        const response = await Axios.post(`${userApi}edit-user`, formdata, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        if(response.data.success){
            setUser(response.data.updatedUser)
            setEditStat(!editStat)
        }

        console.log(image, "imageeeeeee");


    }

console.log(imgs,'imagesssssss');

    return (
        <div className='main'>

            {!editStat ? <div className='user-profile-div'>
                <h1>User Profile</h1>
                <img  className='proimage' src={`${userApi}profileimage/${imgs}`}alt="user img" />
                <h4>name:{user.name}</h4>
                <h4>email:{user.email}</h4>
                <div>
                    <button  className='edit-btn' onClick={handleedit}>EDIT DETAILS</button>
                    <button className='home-btn' onClick={()=>{navigate('/')}}>BACK TO HOME</button>
                </div>

            </div> : <div >
                <h1>Edit details</h1>
                <form className='edit-div' onSubmit={handleSubmit}>
                    <img className='proimage' src={`${userApi}profileimage/${imgs}`} alt="User avatar" />
                    <input type="text" defaultValue={user.name} name="name" onChange={(e) => { setName(e.target.value) }} placeholder="Enter your name" />
                    <input type="text" defaultValue={user.email} name="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Enter your email" />
                   
                    <input type="file" onChange={handleImage} name="img" />
                    <button className='edit-btn' type="submit">Submit</button>
                </form>
            </div>}



        </div>
    )
}

export default UProfile