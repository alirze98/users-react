import axios from "axios";
import { Component, createRef } from "react";
import Input from "./input";
import * as yup from 'yup'
import { Alert } from "bootstrap";

class Login extends Component {
  state = {
    account:{email:'',password:''},
    errors:[],
    success:[],
    sending:false
    
  }

  schema = yup.object().shape({
    email:yup.string().email('فرمت ایمیل صحیح نمی باشد').required('فیلد ایمیل الزامی می باشد'),
    password:yup.string().min(3,'پسورد حداقل باید سه کاراکتر باشد')
  })

  validate = async ()=>{
    try {
      const result = await this.schema.validate(this.state.account,{abortEarly:false})
      console.log(result);
      return result 
    } catch (error) {
      this.setState({errors:error.errors})
    } 


  }
  success = ()=>{
    this.setState({success:['شما با موفقیت وارد شدید']})
  }

  handleSubmit = async (e)=>{
    e.preventDefault();
    const result = await this.validate();
    if(result){
      try {
        this.setState({sending:true})
        const response = await axios.post('https://reqres.in/api/login',result)
        localStorage.setItem('token',response.data.token);
        window.location='/dashboard'
        this.setState({sending:false})
        this.success()
      } catch (error) {
        this.setState({errors:['ایمیل و پسورد همخانی ندارند']})
        this.setState({sending:false})
      }
    }
    
  }

  handleChange = ({currentTarget:input})=>{
   const account = {...this.state.account}
   account[input.name] = input.value
   this.setState({account})
  }

  render() {
    const {email,password} = this.state.account
    return (
      <form onSubmit={this.handleSubmit}>  
         {this.state.errors.length !== 0 ? (
          <div className="alert alert-danger">
            <ul>
              {this.state.errors.map((e,i)=>{
                return <li key={i}>{e}</li>
              })}
            </ul>
          </div>
         ):this.state.success.length !== 0 && (
          <div className="alert alert-success">
          <ul>
            {this.state.success.map((s,i)=>{
              return <li key={i}>{s}</li>
            })}
          </ul>
        </div>
         )}
         <Input
            id="email"
            name="email"
            className="form-control"
            type="text"
            value={email}
            onChange={this.handleChange}
            htmlFor='email'
            label='email'
          />
          <Input
            id="password"
            name="password"
            className="form-control"
            type="text"
            value={password}
            onChange={this.handleChange}
            htmlFor='password'
            label='password'
          />
          
        <button className="btn btn-lg btn-primary" disabled={this.state.sending}>submit</button>
      </form>
    );
  }
}

export default Login;

