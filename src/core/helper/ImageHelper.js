import React from 'react'
import API from '../../backend';


const ImageHelper = ({product}) => {
  const imageUrl =  product ?  `${API}/product/photo/${product._id}` : "https://images.pexels.com/photos/189199/pexels-photo-189199.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  return (
    <div className="rounded p-2">
            <img
              src={imageUrl}
              alt="photo"
              style={{ maxHeight: "100%", maxWidth: "100%" }}
              className="mb-3 rounded"
            />
          </div>
  )
}
export default ImageHelper;