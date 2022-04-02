import React, {useState} from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { Link } from "react-router-dom";

import { createCategory } from "./helper/adminapicall";


const AddCategory = () => {
  
     const [name, setName] = useState('');
      const [error, setError] = useState(false);
      const [success, setSuccess] = useState(false);

      const {user , token } = isAuthenticated();

     const handleChange = (event) => {
       setError('');
       setName(event.target.value)
     };

    const onSumbit = (event) => {
       event.preventDefault();
       setError('');
       setSuccess(false)
       //backend request fired
       createCategory(user._id, token, {name}).then(data => {
         if(data && data.error){
           setError(true);
         } else {
           setError('')
           setSuccess(true);
           setName("")
         }
       })
    }

     const successMsg = () => {
       if(success){
         return <h4 className="text-success"> Category created successfully </h4>
       }
     }
     const errorMsg = () => {
      if(error){
        return <h4 className="text-danger"> Failed to  create category </h4>
      }
     }

      const categoryForm = () => {
      return(
        <form>
        <div className="form-group">
           <p className="lead">Enter the category</p>
           <input onChange={handleChange} value={name} type="text" className="form-control my-3" autoFocus required placeholder="For Ex.summer" />
           <button onClick={onSumbit} className="btn btn-outline-info">Create category</button>
          </div>
      </form>
      )
      }
      const goBack = () => (
        <div className="mt-4">
          <Link className="btn btn-warning  mb-3" to='/admin/dashboard'>Admin Home</Link>
          </div>
      )

  return (
    <Base title="Create a Category here" description="Add a new category for new tshirts" className=" conatiner bg-success p-4">
            <div className="row bg-white rounded">
              <div className="col-md-8 offset-md-2"> 
              {successMsg()}
              {errorMsg()}
              {categoryForm()} 
              {goBack()} 
              </div>
              </div>
    </Base>

  )
}

export default AddCategory
