import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoadingUsers from './loading/loadingUsers';

class Users extends Component {
    state = {
        users : [],
        isLoading:true,
    }
    async componentDidMount(){
        const response = await axios.get('https://reqres.in/api/users');
        this.setState({users:response.data.data,isLoading:false})
         
    }
    render() {
        return (
            <>
                <button className="btn btn-lg btn-primary" onClick={this.handleCreate}>create</button>
                <div className="row">
                   {
                    this.state.isLoading?<LoadingUsers /> : this.state.users.map((user,index)=>{
                        return (
                            <div className='col-4 text-center p-5'>
                            <img src={user.avatar} style={{borderRadius:'50%',width:'100px'}} />
                            <Link to={`/users/${user.id}`}>
                            <h4>{user.first_name} {user.last_name}</h4>
                            </Link>
                            <h3>{user.email}</h3>
                            <button onClick={()=>{this.handleUpdate(user)}} className="btn btn-sm btn-primary m-2">update</button>
                            <button onClick={()=>{this.handleDelete(user)}} className="btn btn-sm btn-danger m-2">delete</button>
                        </div>
                        )

                    })
                   }
                </div>
            </>
        );
    }
    handleCreate = async ()=>{
         const newUser = {
            first_name:'ali',
            last_name:'hamidi',
            email:'alicamaroff@gamil.com',
            avatar:'https://picsum.photos/200/300'
         };
         const response = await axios.post('https://reqres.in/api/users',newUser)
         this.setState({users:[...this.state.users,response.data]})
    }
    handleUpdate = async (user)=>{
        const updatedUser = {
            first_name:'updated',
            last_name:'user',
            email:'updatedUser@gamil.com',
            avatar:'https://picsum.photos/200/300'
            
         };
        const response =  await axios.put(`https://reqres.in/api/users/${user.id}`,updatedUser)
        const updatedUsers = [...this.state.users];
        const index = updatedUsers.indexOf(user);
        updatedUsers[index]=updatedUser;
        this.setState({users:updatedUsers})

    }
    handleDelete = async (user)=>{
         const response = await axios.delete(`https://reqres.in/api/users/${user.id}`)
         const newUsers = this.state.users.filter(u=>{
            return u.id !== user.id
         })
         this.setState({users:newUsers})
    }
}

export default Users;