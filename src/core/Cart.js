import React , {useState, useEffect} from 'react'
import Base from './Base'
import Card from './Card'
import { loadCart } from './helper/CartHelper'
import StripeChekout from './StripeChekout'
import PaymentB from './paymentB'


const Cart = () =>  {
  
   const [products , setProducts] = useState([])
   const [reload , setReload] = useState(false)

    useEffect(() => {
      setProducts(loadCart());
    }, [reload])
    
    
   const loadAllproducts = (products) => {
     return(
       <div className='mb-4'>
         <h2 className="text-info py-4"> Selected Items</h2>
         {products.map((product , index) => {
           return (
             <Card key={index} product={product} removeFromCart={true} addtoCart={false} setReload={setReload} reload={reload} />
           )
         })}
       </div>
     )
   }
   const loadCheckout = () => {
     return(
       <div>
         <h2 className="text-white">checkout</h2>
       </div>
     )
   }
 
   

  return (
    <Base title= "Your Items" description='Ready to checkout'>
      <div className="row text-center">
         <div className="col-6 "> {products.length > 0 ? loadAllproducts(products) : (<h3>No Products Found in cart</h3>) } </div>
         <div className="col-6"> 
         {/*  stripe payment gateway method (optinal) */}
         {/* <StripeChekout products = {products} setReload={setReload} />  */}
          
          {/* Braintree payment gateway method*/}

           <PaymentB products = {products} setReload={setReload} />
          </div>
        </div>
    </Base>
  )
}

export default Cart;