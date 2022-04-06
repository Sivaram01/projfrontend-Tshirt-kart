import React, {useState , useEffect} from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getCategories, getAproduct, updateProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";



const UpdateProduct = ({match}) => {

  const {user , token } = isAuthenticated()

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getRedirect: false,
    formData: ""
  });

   const {name , description, price, stock,  categories , error, createdProduct, formData } = values

   const preload = (productId) => {
     getAproduct(productId).then(data => {
      //  console.log(data)
       if(data && data.error){
         setValues({...values, error: data.error})
       } else {
        preloadCategories()
         setValues({
            ...values,
            name: data.name,
            description: data.description,
            price: data.price,
            stock: data.stock,
            category: data.category._id,
            formData: new FormData(),
           
         });
       }
     })
   }

   const preloadCategories = () => {
    getCategories().then(data => {
      if(data && data.error){
          setValues({...values, error: data.error})
      } else {
        setValues({
          categories: data, formData: new FormData()
        })
      }
    })
   }

 useEffect(() => {
   preload(match.params.productId)
 })
 

 const onSubmit = (event) => {
  event.preventDefault();
   setValues({...values, error: "", loading: true})

   updateProduct(match.params.productId, user._id , token , formData).then(data => {
     if(data && data.error){
       setValues({...values, error: data.error})
     } else {
       setValues({...values, name: "" , description: "" , price: "", photo: "" , stock: "", loading: false, createdProduct: data.name})
     }
   })
}

   const handleChange = name => event => {
      const value = name === "photo" ? event.target.files[0] : event.target.value
      formData.set(name , value);
      setValues({...values, [name]: value})
   };

   

   const successMsg = () => (
      <div className="alert alert-success mt-3" style={{display: createdProduct ? "" : "none" }}>
           <h4>{updateProduct} updated successfully </h4>
        </div>

   )

   const errorMsg = () => {
     if(error){
       return(
        <div className="alert alert-danger mt-3">
        <h4 className="text-danger">Failed to update a product</h4>
     </div>
     )}

   }

   const updateProductForm = () => (
    <form >
      <span>Post photo</span>
      <div className="form-group mb-2">
        <label className="btn btn-success w-100">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group mb-2">
        <input
          onChange={handleChange("name")}
          name="name"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group mb-2">
        <textarea
          onChange={handleChange("description")}
          name="description"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group mb-2">
        <input
          onChange={handleChange("price")}
          name= "price"
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group mb-2">
        <select
          onChange={handleChange("category")}
          className="form-control"
          name="category"
          placeholder="Category"
        >
          <option>Select</option>
            {categories && categories.map((cate , index) => (
                 <option key={index} value ={cate._id}> {cate.name} </option>
            ))}
         
        </select>
      </div>
      <div className="form-group mb-2">
        <input
          onChange={handleChange("stock")}
          name="stock"
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>
      
      <button type="submit" onClick={onSubmit} className="btn btn-outline-success mb-2 rounded">
        update Product
      </button>
    </form>
  );

  return (
    <Base title="Add a product here" description="Welcome to product creation section" className="container bg-info p-4">
      <Link to='/admin/dashboard' className="btn btn-dark btn-sm mb-3">Admin Home</Link>
        <div className="row bg-dark text-white rounded">
           <div className="col-md-8 offset-md-2">
              {successMsg()}
              {errorMsg()}
               {updateProductForm()}
             </div>
          </div>
    </Base>
  )
}

export default UpdateProduct;