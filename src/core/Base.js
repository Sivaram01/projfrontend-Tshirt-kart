import React from 'react'
import '../styles.css'
import Nav from './Nav'


const Base  = ({
  title = "My Title",
  description = "My description",
  className = " text-white p-4",
  children
}) => (
  <div>
    <Nav/>
    <div className="container-fluid">
       <div className="jumbotron  text-white text-center">
          <h2  className="display-5">{title}</h2>
           <p className="lead text-warning"> {description} </p>
         </div>
        <div className= {className}> {children} </div>
      </div>
      <footer className=" footer bg-dark mt-auto py-2">
        <div className="container-fluid bg-success text-white text-center">
           <h4>If you got any questions feel free to reach us out!</h4> 
          <div className="form-group">
          <input className='form-input' type="email" placeholder='Enter Your Email Here' /> <span><button className="btn-warning btn rounded mb-2 btn-hover">Contact Us</button></span>
          </div>
        </div>
        <div className="container text-center">
          <span className="text-muted"> <span className='text-success'>Amazing</span> place to shop your <span className='text-success'>Tshirts</span> </span>
          <p className='text-muted'>&copy; 2022 Copyright Tshirt Kart</p>
          </div>
        </footer>
  </div>
)

export default Base;