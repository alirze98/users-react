import  { Component } from 'react';
import Navbar from './components/navbar';
import Users from './components/users';
import {Route,Routes,Navigate} from 'react-router-dom'
import Login from './components/login';
import Register from './components/register';
import Home from './components/home';
import User from './components/user';
import NotFound from './components/notFound';
import Dashboard from './components/dashboard';
import Logout from './components/logout';
import axios from 'axios';
import Protect from './components/protect';

class App extends Component {
    state = {
        user:null
    }
    componentDidMount(){
        const token = localStorage.getItem('token')
        if (!token) {
            this.setState({user:null})
            return
        }
        // const response = await axios.post('reqres.in/api/userbytoken',{token})
        const response ={
            data:{
                user:{
                    name:'mohamad',
                    email:'mohammad@gmail.com'
                }
            }
        }
        if(!response.data.user){
            this.setState({user:null})
            return
        }
        this.setState({user:response.data.user})
    }
    
    render() {
        return (
            <>
              <Navbar user={this.state.user} />
              <div className='container mt-3'>
              <Routes>
              <Route path='/users/:id' element={<User />} /> 
              <Route path='/users' element={<Users />} />
              <Route path='/login' element={<Login />} />
              <Route path='/dashboard' element={localStorage.getItem("token")?<Dashboard />:<Navigate to='/login' replace />} />
              <Route path='/logout' element={<Logout />} />
              <Route path='/register' element={<Register />} />
              <Route path='/' element={<Home />} />
              <Route path='not-found'  element={<NotFound />} />
              <Route path='*' element={<Navigate to='not-found' replace />} />
              </Routes>
              </div>
            </>
        );
    }
}

export default App;