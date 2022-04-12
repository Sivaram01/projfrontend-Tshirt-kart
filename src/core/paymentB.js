import React , {useState, useEffect} from 'react'
import { cartEmpty, loadCart } from './helper/CartHelper'
// import { Link } from 'react-router-dom'

import { getmeToken, processPayment } from './helper/paymentBhelper'
import { createOrder } from './helper/orderHelper'
import { isAuthenticated } from '../auth/helper'

import DropIn from 'braintree-web-drop-in-react'

 const PaymentB = ({products , setReload = f => f , reload = undefined}) => {


   const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {}
   });


   const userId = isAuthenticated() && isAuthenticated().user._id;
   const token = isAuthenticated() && isAuthenticated().token;

    const getToken  = (userId, token) => {
            getmeToken(userId , token).then(info => {
              console.log("information", info)
              if(info.error){
                setInfo({...info, error: info.error})
              } else {
                const clientToken = info.clientToken
                setInfo({clientToken})
              }
            });
         };

    useEffect(() => {
     getToken(userId, token)
    }, [])
    
    const getFinalAmount = () => {
      let amount = 0;
      products.map(p => {
        amount = amount + p.price 
      })
      return amount
    }


    const onPurchase = () => {
      setInfo({loading: true})
      let nonce;
      let getNonce = info.instance
         .requestPaymentMethod()
         .then(data => {
           nonce = data.nonce
           const paymentData = {
             paymentMethodNonce: nonce,
             amount: getFinalAmount()
           };
           processPayment(userId , token , paymentData)
           .then(response => {
             setInfo({...info , success: response.success, loading: false})
             console.log('payment Success')
            const orderData = {
              products: products,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount
            }
            createOrder(userId , token , orderData);
            cartEmpty(() => {
              console.log("Did we got a crash?")
            });
            setReload(!reload)
           })
           .catch(error => {
             setInfo({loading: false , success: false})
             console.log("payment failed" , error)
           });
         });
    };

   
   const showbtdropIn = () => {
     return(
       <div>
         {info.clientToken !== null && products.length > 0 ? (
           <div>
           <DropIn
             options={{ authorization: info.clientToken }}
             onInstance={(instance) => (info.instance = instance)}
           />
           <button className='btn btn-success rounded btn-hover w-100' onClick={onPurchase}>Buy</button>
         </div>
         ) : ( <h3>please login or add something to cart</h3> ) }
       </div>
     )
   }


  return (
    <div className='mt-5 pt-5'>
      
     <h3 className='text-white'>Your Bill is {getFinalAmount()} $ </h3>
     <p className='text-white'> DemoCardId: 378282246310005</p>
     {showbtdropIn()}
    </div>
  )
}

export default PaymentB