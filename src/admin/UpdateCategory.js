import React, {useState ,useEffect} from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { Link } from "react-router-dom";

import { updateCategory , getCategory } from "./helper/adminapicall";


const UpdateCategory = ({match}) => {
  
      const [values,setvalues] = useState({name:'',error:false,success:false})
      const{name,error,success}=values

      const {user , token } = isAuthenticated();

     const preload =(categoryId)=>{
       getCategory(categoryId).then(data=>{
         if(data && data.error){
          setvalues({...values,error:data.error})
      }else{
          setvalues({...values,name:data.name})
      }
  }
  )}

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const handleChange = (event) => {
    setvalues({...values,error:'', name:event.target.value})
  };


    const onSumbit = (event) => {
       event.preventDefault();
       //backend request fired
       updateCategory(match.params.categoryId,user._id,token,{name})
        .then(data=>{
          if(data.error){
        setvalues({...values,error:true,success:false})
        } else {
        setvalues({...values,error:false,success:true,name:''})
    }})
    }

     const successMsg = () => {
       if(success){
         return <h4 className="text-success"> Category updated successfully </h4>
       }
     }
     const errorMsg = () => {
      if(error){
        return <h4 className="text-danger"> Failed to  update category </h4>
      }
     }

      const categoryForm = () => {
      return(
        <form>
        <div className="form-group">
           <p className="lead">Enter the category</p>
           <input onChange={handleChange} value={name} type="text" className="form-control my-3" autoFocus required placeholder="For Ex.summer" />
           <button onClick={onSumbit} className="btn btn-outline-info rounded">update category</button>
          </div>
      </form>
      )
      }
      const goBack = () => (
        <div className="mt-4">
          <Link className="btn btn-warning rounded mb-3" to='/admin/dashboard'>Admin Home</Link>
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

export default UpdateCategory
