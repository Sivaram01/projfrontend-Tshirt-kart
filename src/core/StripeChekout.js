import React , {useState , useEffect} from 'react'
import { isAuthenticated } from '../auth/helper'
import { cartEmpty, loadCart } from './helper/CartHelper'
import { Link } from 'react-router-dom'
import StripeCheckoutButton from 'react-stripe-checkout'
import API from '../backend'
import { createOrder } from './helper/orderHelper'


 const StripeChekout = ({products , setReload = f => f, reload =undefined}) => {

   const [data, setData] = useState({
     loading: false,
     success: false,
     error: "",
     address: ""
   });


   const token = isAuthenticated() && isAuthenticated().token
   const userId = isAuthenticated() && isAuthenticated().user._id 

   const getFinalAmount = () => {
     let amount = 0;
     products.map(p => {
       amount = amount + p.price 
     })
     return amount
   }

   const makePayment = (token) => {
      const body = {
        token,
        products
      }
      const headers = {
        "Content-Type" : "application/json"
      }
      return fetch(`${API}/stripepayment` , {
        method: "POST",
        headers,
        body: JSON.stringify(body)
      }).then(response => {
         console.log(response)
      }).catch(err =>  console.log(err))
   };

   const showStripeButton = () => {
     return isAuthenticated() ? (
       <StripeCheckoutButton 
       stripeKey='pk_test_51KhqfbSE8QniQFnue3syyQCS0QHvErWjusSJuMgFZEOseoZIvuDxhq32jfiMziGOrOV4iLv54lcCfQ6abgAChiey00BI8q53P3' 
       token= {makePayment}
        amount={getFinalAmount() * 100} 
        name="Buy Tshirts"
        shippingAddress
        billingAddress
        >
        <button className='btn btn-success'>Pay with Stripe</button>
       </StripeCheckoutButton>
      
     ) : (
       <Link to= '/signin'> <button className='btn btn-warning'> signin </button> </Link>
     ) 
   }
   
  return (
    <div>
      <h3 className='text-white'> Stripe Checkout {getFinalAmount()}</h3>
       {showStripeButton()}
    </div>
  )
}


export default StripeChekout