import React, { useEffect, useRef, useState } from 'react';
import './AdminHome.css';
import Axios from 'axios';
import { adminApi } from '../../../API/api';
import { toast } from 'react-hot-toast';
import { removeUser } from '../../../utils/userSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';





function AdminHome() {
  const navigate = useNavigate()
  const dispatch =useDispatch()
  const [users, setUsers] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]);
  
  const findAllUser = async () => {
    try {
      const response = await Axios.get(`${adminApi}get-all-user`);
      if (response.data.success) {
        setUsers(response.data.user);
        setOriginalUsers(response.data.user); // Save the original user data in another state
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    findAllUser();
  }, []);

  const blockOrunblock = async (id) => {
    const response = await Axios.get(`${adminApi}block-unblock-user?id=${id}`);
    if (response.data.success) {
      setUsers(response.data.userdata);
      toast(response.data.message);
    }
  };

  const handlelogout =()=>{
    dispatch(removeUser()) 
    localStorage.clear(); 
    navigate('/admin/login')
  }

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
  
    if (searchTerm === "") {
      // If the search term is empty, show all the original users
      setUsers(originalUsers);
    } else {
      // Perform the search and update the users state with filtered results
      const updateData = originalUsers.filter((item) =>
        item.name.toLowerCase().includes(searchTerm)
      );
      setUsers(updateData);
    }
  };
  

  return (
    <div>
      <div>
        <h1>ADMIN DASHBOARD</h1>

      </div>
      
      <div><input type="text" placeholder='search user'  onChange={handleSearch}/>
      <button className='logout-btn' onClick={handlelogout} >logout</button>
      
      </div>

      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">NAME</th>
              <th scope="col">EMAIL</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users && users.map((user) => {
              return (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.status
                      ? <button className='block-btn' onClick={() => { blockOrunblock(user._id) }}>block</button>
                      : <button className='unblock-btn' onClick={() => { blockOrunblock(user._id) }}>unblock</button>}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminHome;
