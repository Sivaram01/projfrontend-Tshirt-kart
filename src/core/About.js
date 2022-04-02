import React from 'react'
import '../styles.css'
import Base from './Base'

const About = () => {
  return (
    <Base title='About Us' description='Hola... Welcome to Tshirt Kart'>
    <div>
      <div className="container text-white">
        <div className="row text-center">
          <div className="col-md-12 mt-5">
             <div className="card text-white bg-dark">
               <div className="card-header text-white bg-success"></div>
               <div className="card-body">
                 <p>Tshirt Kart has found strong traction from leading textile manufacturers and brands for its fibre products. This also includes demand from value brands as well. Today, our startup claims to be having the capacity to process about 30 tonnes of agricultural waste every month. Though, the revenue details were not available.</p>
                  <p>It may surprise you to learn that the fashion industry is one of the world’s biggest polluters. Most of the clothes we wear are not environmentally friendly as it requires 9,000 litres of water to extract one kilogram of cotton fibre, as per various reports.</p>
                  <p>According to the team, all the fibres developed by Canvaloop today uses minimal amount of water, zero pesticides or insecticides, is created from naturally-occurring fibres of plants, and it also makes better use of the agricultural waste, which is put into high-value use instead of being burnt.</p>
                  <p>  There are other benefits for end-users who are using these fabrics such as anti-UV, anti-fungal, reduces the odour of clothes, it is anti-bacterial, adaptable, and it gets softer with every wash.The fibres developed by the startup also came at the opportune time as many leading textile and apparel brands were looking to bring sustainable fabric into their portfolio or processes.</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
    </Base>
  )
}

export default About