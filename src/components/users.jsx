import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoadingUsers from './loading/loadingUsers';
import UsersContext from '../store/usersContext';


class Users extends Component {
    static contextType = UsersContext;
    state = {
        users : [],
        isLoading:true,
    }
    async componentDidMount(){
        this.context.getData();
        // const response = await axios.get('https://reqres.in/api/users');
        // // this.setState({users:response.data.data,isLoading:false})
        
         
    }
    render() {
        
        return (
            <>
                <button className="btn btn-lg btn-primary" onClick={this.context.onCreate}>create</button>
                <div className="row">
                   {
                    this.context.isLoading?<LoadingUsers /> : this.context.users.map((user,index)=>{
                        return (
                            <div className='col-4 text-center p-5'>
                            <img src={user.avatar} style={{borderRadius:'50%',width:'100px'}} />
                            <Link to={`/users/${user.id}`}>
                            <h4>{user.first_name} {user.last_name}</h4>
                            </Link>
                            <h3>{user.email}</h3>
                            <button onClick={()=>{this.context.onUpdate(user)}} className="btn btn-sm btn-primary m-2">update</button>
                            <button onClick={()=>{this.context.onDelete(user)}} className="btn btn-sm btn-danger m-2">delete</button>
                        </div>
                        )
                    })
                   }
                </div>
            </>
        );
    }
   
   
}

export default Users;