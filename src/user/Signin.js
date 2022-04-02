import React , {useState} from 'react';
import Base from "../core/Base"
import { Link , Redirect} from 'react-router-dom';

import{signin, authenticate ,isAuthenticated} from '../auth/helper/index'


const Signin = () => {

  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false
  })

  const {email, password, error, loading, didRedirect} = values;
  const {user} = isAuthenticated()

  const handleChange = firstname => event => {
    setValues({...values , error: false , [firstname]: event.target.value})
  }

  const onSubmit = event => {
    event.preventDefault()
    setValues({...values, error: false, loading: true})
    signin({email, password})
    .then(data => {
      if(data && data.error){
        setValues({...values, error: data.error, loading: false})
      }
      else{
        authenticate(data, () => {
          setValues({
            ...values,
            didRedirect: true
          })
        })
      }
    })
    .catch(console.log("signin request failed"))
  }

 const performRedirect = () => {
   if(didRedirect){
     if(user && user.role === 1){
       return <Redirect to= '/admin/dashboard' />
     } else {
       return <Redirect to= '/user/dashboard' />
     }
   }
  if(isAuthenticated()){
    return <Redirect to='/'/>
  }
 }


 const loadingMsg = () => {
   return (
     loading && (
       <div className='alert alert-info'>
          <h2>Loading...</h2>
       </div>
     )
   );
 };

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

  const SignInForm = () => {
    return(
      <div className="row">
          <div className="col-md-6 offset-sm-3 text-left">
            <form>
              <div className="form-group"> 
                <label className='text-light'>Email</label>
                 <input  onChange={handleChange("email")} className='form-control' type="email" value={email} />
              </div>
              <div className="form-group"> 
                <label className='text-light'>Password</label>
                 <input onChange={handleChange("password")}  className='form-control' type="password" value={password} />
              </div>
               <button  onClick={onSubmit} className="btn  btn-success w-100 my-2">Sumbit</button>
            </form>
            </div>
        </div>
    )
  }
  return (
    <Base title='SignIn' description='Login to continue shopping'>
         {loadingMsg()}
         {errorMsg()}
        {SignInForm()}
        {performRedirect()}
        {/* <p className='text-white text-center'>{JSON.stringify(values)}</p> */}
    </Base>
  )
}

export default Signin;