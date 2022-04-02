import API from "../../backend";

//category calls
export const createCategory = (userId , token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
      method: "POST",
       headers: {
         Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
       },
       body: JSON.stringify(category)
    })
    .then(response => {
      return response.json()
    })
    .catch( err => console.log(err))
}

//get all categories
export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET"
  })
  .then(response => {
    return response.json()
  })
  .catch(err => console.log(err))
}


//get a category
export const getCategory = (categoryId) => {
   return fetch(`${API}/category/${categoryId}`, {
     method: "GET",
   })
   .then(response => {
     response.json()
   })
   .catch(err => console.log(err))
}

 //delete a category

   export const deleteCategory = ( categoryId ,userId, token ) => {
     return fetch(`${API}/category/${categoryId}/${userId}`, {
       method: "DELETE",
       headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
       }
     }).then(response => {
       return response.json()
     }).catch(err => console.log(err))
   }


 //update a category
   export const updateCategory = (categoryId, userId, token , category) => {
      return fetch(`${API}/category/${categoryId}/${userId}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "content-Type" : "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
      }).then(response => {
       return response.json()
      })
      .catch(err => console.log(err))
   }


//products calls...

//create a product
export const createProduct = (userId, token, product) => {
  return fetch(`${API}/product/create/${userId}`, {
    method: "POST",
     headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
     },
     body: product
  }).then(response => {
    return response.json()
  })
  .catch(err => console.log(err))
}

//get all product
export const getAllProducts = () => {
  return fetch(`${API}/products`, {
    method: "GET"
  })
  .then(response => {
    return response.json()
  })
  .catch(err => console.log(err))
}

// get single product
export const getAproduct = (productId) => {
  // console.log("product", productId)
return fetch(`${API}/product/${productId}`, {
  method: "GET",
})
.then(response => {
  return response.json()
})
.catch(err => console.log(err))
}

//update product
export const  updateProduct = (productId, userId, token, product) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "PUT",
     headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
     },
     body: product
  }).then(response => {
    return response.json()
  })
  .catch(err => console.log(err))
}

//delete a product
export const deleteProduct = (productId, userId, token,) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "DELETE",
     headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
     }
  }).then(response => {
    return response.json()
  })
  .catch(err => console.log(err))
}
