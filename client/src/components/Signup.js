import React, { useState, useEffect } from 'react'
import isEmpty from 'validator/lib/isEmpty';
import equals from 'validator/lib/equals';
import { showErrorMessage, showSuccessMessage } from '../helpers/message';
import { showLoading } from '../helpers/loading';
import {signup } from '../api/auth';
import { Link, useNavigate } from 'react-router-dom';
import './css/css.css'
import { setAuthentication, isAuthenticated } from '../helpers/auth';

const Signup = () => {

  let navigate = useNavigate();
  let str = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/
const [check, setCheck] = useState(false);
const handleCheck = (e) =>{
  setCheck(!check);
}
  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().role === 1) {
      navigate('/admin/dashboard');
    } else if (isAuthenticated() && isAuthenticated().role === 0) {
      navigate('/user/dashboard');
    } else
    navigate('/signup');
  }, [navigate]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNr: '',
    password: '',
    password2: '',
    location: '',
    error: '',
    success: false,
    loading: false
  })
  
  const { name, email, phoneNr,password, password2,location, error, success, loading } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, error: false, [e.target.name]: e.target.value, success: "", error: "" })
    // console.log(formData)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isEmpty(name) || isEmpty(phoneNr) || isEmpty(location)|| isEmpty(password) || isEmpty(password2)|| check) {
      setFormData({ ...formData, error: 'Fill all required fields' })
    } else if (!phoneNr.match(str)) {
      setFormData({ ...formData, error: 'Invalid phone Number' })
    } else if (!equals(password, password2)) {
      setFormData({ ...formData, error: 'Passwords do not match' })
    } else {
      const { name, email, password } = formData;
      const data = { name, email, phoneNr, password, location};
      setFormData({ ...formData, loading: true })
      signup(data)
        .then (response => {
          console.log('Axios signup success', response)
          setFormData({
            name: '',
            email: '',
            phoneNr: '',
            password: '',
            password2: '',
            location: '',
            success: response.data.successMessage,
            loading: false
          })
          navigate("/signin");
        })
        .catch(err => {
          console.log('Axios signup error', err)
          setFormData({...formData, loading: false, error: err.response.data.errorMessage})
        })


      console.log(data)
    }
    console.log(formData)
  }

  const showSignupForm = () => (
    <section className="vh-100 bg-image" style={{backgroundColor: "#282c34"}}>
        <div className="mask d-flex align-items-center h-100">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{borderRadius: '15px'}}>
                  <div className="card-body p-5">
                  <h1 className="text-center" style={{fontFamily: "'Lovers Quarrel', cursive"}}>BidOnBuy</h1>
                    {success && showErrorMessage(success)}
                    {error && showErrorMessage(error)}
                    {loading && ( <div className="text-center pb-4">{showLoading()}</div> )}
                    <form onSubmit={handleSubmit}>
                      <div className="form-outline mb-2">
                        <input name='name' value={name} onChange = {handleChange} type="text" id="form3Example1cg" placeholder='Full Name' className="form-control form-control-lg" required/>
                        <label className="form-label" htmlFor="form3Example1cg">Your Name**</label>
                      </div>
                      <div className="form-outline mb-2">
                        <input name='email' value={email} onChange = {handleChange} type="email" id="form3Example3cg" placeholder='Enter Email' className="form-control form-control-lg" />
                        <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
                      </div>
                      <div className="form-outline mb-2">
                      <input type="text" name='phoneNr' value={phoneNr} placeholder='Phone Number' onChange={handleChange} className="form-control form-control-lg" required/>
                        <label className="form-label" htmlFor="form3Example3cg">Your Phone Number**</label>
                      </div>
                      <div className="form-outline mb-2">
                        <input name='password' value={password} onChange = {handleChange} type="password" id="form3Example4cg" placeholder='Password' className="form-control form-control-lg" required/>
                        <label className="form-label" htmlFor="form3Example4cg">Password**</label>
                      </div>
                      <div className="form-outline mb-2">
                        <input name='password2' value={password2} onChange = {handleChange} type="password" id="form3Example4cdg" placeholder='Confirm Password' className="form-control form-control-lg" required/>
                        <label className="form-label" htmlFor="form3Example4cdg">Confirm password**</label>
                      </div>
                      <div className="form-outline mb-2">
                      <input type="text" name='location' value={location} placeholder="Current city" onChange={handleChange} id="form3Example4cdg" className="form-control form-control-lg" required/>
                        <label className="form-label" htmlFor="form3Example4cdg">Current city**</label>
                      </div>
                      <div className="form-check text-center pb-3">
                      <input className="form-check-input " style={{marginLeft: "-2rem"}} type="checkbox" defaultValue id="flexCheckDefault" onclick = {handleCheck}value={check} required/>
                        <label className="form-check-label " for="flexCheckDefault">
                         You agree to <a href="#!" className="text-body fw-bold"><u className='fw-bold'>Terms of service & Privacy Policy</u></a>
                        </label>
                      </div>
                      <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-block button">Register</button>
                      </div>
                      <p className="text-center text-muted mt-2 mb-0">Already have an account? <Link to='/signin' className="fw-bold text-body"><u>Login here</u></Link></p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
  return <div>
    
    {showSignupForm()} 
  
  </div>;
}

export default Signup
