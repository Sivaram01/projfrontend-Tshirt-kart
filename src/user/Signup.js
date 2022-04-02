import React , {useState} from 'react';
import Base from "../core/Base"
import { Link } from 'react-router-dom';
import { signup } from '../auth/helper/index';


const Signup = () => {
 
  const [values , setValues] = useState({
    firstname : "",
    lastname: "",
    email : "",
    password : "",
    error : "",
    success : false
  });

  const {firstname ,lastname ,  email , password , error , success} = values


  const handleChange = firstname => event => {
    setValues({...values , error: false , [firstname]: event.target.value})
  }

  const onSumbit = event => {
    event.preventDefault()
    setValues({...values, error:false})
    signup({firstname , lastname ,email , password})
    .then(data => {
      if(data && data.error){
        setValues({...values , error: data.error , success: false})
      } else {
        setValues({
          ...values,
          firstname: "",
          lastname: "",
          email : "",
          password: "",
          error: "",
          success: true
        });
      }
    })
    .catch(console.log("Error in signup"));
  }

   const SignUpForm = () => {
     return(
       <div className="row">
           <div className="col-md-6 offset-sm-3 text-left">
             <form>
               <div className="form-group"> 
                 <label className='text-light'>FirstName</label>
                  <input onChange={handleChange('firstname')} value={firstname} className='form-control' type="text" />
               </div>
               <div className="form-group"> 
                 <label className='text-light'>LastName</label>
                  <input onChange={handleChange('lastname')} value={lastname} className='form-control' type="text" />
               </div>
               <div className="form-group"> 
                 <label className='text-light'>Email</label>
                  <input onChange={handleChange('email')} value={email} className='form-control' type="email" />
               </div>
               <div className="form-group"> 
                 <label className='text-light'>Password</label>
                  <input onChange={handleChange('password')} value={password} className='form-control' type="password" />
               </div>
                <button onClick={onSumbit} className="btn  btn-success w-100 my-2">Sumbit</button>
             </form>
             </div>
         </div>
     )
   }

   const successMsg = () => {
     return(
      <div className="row">
      <div className="col-md-6 offset-sm-3 text-left">
      <div className="alert alert-success" style={{display: success ? "" : "none"}}>
      New account was created successfully. please <Link to="/signin">Login Here</Link>
      </div>
      </div>
     </div>
     )
     
   }

   const errorMsg = () => {
     return(
      <div className="row">
      <div className="col-md-6 offset-sm-3 text-left">
      <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
      {error}
      </div>
      </div>
      </div>
     )
    
   }
  return (
    <Base title='SignUp' description='Hi kindly sign up to get shopping'>
      {successMsg()}
      {errorMsg()}
     {SignUpForm()}
       {/* <p className="text-white text-center">{JSON.stringify(values)} </p> */}
     </Base>
  )
}

export default Signup;