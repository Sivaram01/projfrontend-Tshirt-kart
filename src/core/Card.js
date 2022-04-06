import React, {useState} from 'react'
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from './helper/CartHelper';
import ImageHelper from './helper/ImageHelper';
import '.././styles.css';

   const  Card = ({product , addtoCart = true, removeFromCart = false , setReload = f => f , reload = undefined }) => {

    const [redirect , setRedirect] = useState(false);

    const cardTitle = product ? product.name  : "A photo from pexels"
    const cardDescription = product ? product.description  : "Default description"
    const cardPrice = product ? product.price  : "Default"


    const addToCart = () => {
      addItemToCart(product, () => setRedirect(true))
    }

    const  getAredirect = (redirect) => {
      if(redirect) {
        return <Redirect to='/cart' />
      }
    }


     const showAddToCart = (addtoCart) => {
         return(
           addtoCart && (
            <button
            onClick={addToCart}
            className="btn btn-outline-success btn-hover rounded mt-2 mb-2 w-100">
            Add to Cart
          </button>
           )
         )
     }
     const showRemoveFromCart = (removeFromCart) => {
         return(
           removeFromCart && (
            <button
            onClick={() => {
              removeItemFromCart(product._id);
              setReload(!reload)
            }}
            className="btn btn-outline-danger btn-hover rounded mt-2 mb-2 w-100">
            Remove from cart
          </button>
           )
         )
     }

    return (
      <div className="card text-white bg-dark  mb-3 card-hover ">
        <div className="card-header lead  bg-success">{cardTitle} </div>
        <div className="card-body">
          {getAredirect(redirect)}
         <ImageHelper product={product}/>
          <p className="lead bg-success  font-weight-normal text-wrap">
           {cardDescription}
          </p>
          <p className="btn btn-warning rounded  btn-sm px-4">$ {cardPrice} </p>
          <div className="row">
            <div className="col-12">
             {showAddToCart(addtoCart)}
            </div>
            <div className="col-12">
              {showRemoveFromCart(removeFromCart)}
            </div>
          </div>
        </div>
      </div>
    );
}

export default Card