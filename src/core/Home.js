import React , {useState, useEffect} from 'react'
import Base from './Base'
import Card from './Card'


import { getAllProducts } from './helper/coreapicalls'


export default function Home() {
  
   const [products , setProducts] = useState([])
   const [error , setError] = useState(false)

   const loadAllproducts = () => {
     getAllProducts().then(data => {
       if(data && data.error){
         setError(data.error);
       } else {
         setProducts(data);
       }
     });
   };

   useEffect(() => {
     loadAllproducts()
   }, [])
   
   


  return (
    <Base  title= "Welcome To Tshirt Kart" description='Shop Your Favorite Tshirts'>
      <div className="row text-center">
          {/* <h1 className="text-white"></h1> */}
          <div className="row">
             {products.map((product , index) => {
               return(
                 <div key={index} className="col-4 mb-4">
                   <Card product={product} />
                  </div>
               )
             })}
            </div>
        </div>
    </Base>
  )
}
