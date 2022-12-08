import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { showErrorMessage } from '../helpers/message';
import { showLoading } from '../helpers/loading';
import isEmpty from 'validator/lib/isEmpty';
import { signin } from '../api/auth';
import { setAuthentication, isAuthenticated } from '../helpers/auth';


const Signin = () => {
  
  let navigate = useNavigate();
  let str = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().role === "admin") {
      navigate('/admin/dashboard');
    } else if (isAuthenticated() && isAuthenticated().role === "user") {
      navigate('/user/dashboard');
    } else
    navigate('/signin');
  }, [navigate]);

  const [formData, setFormData] = useState({
    phoneNr: '',
    password: '',
    error: '',
    loading: false,
  })

  const { phoneNr, password, error, loading } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value, error: "" })
    // console.log(formData)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if ( isEmpty(phoneNr) || isEmpty(password) ) {
      setFormData({ ...formData, error: 'All fields are required' })
    } else if (!phoneNr.match(str)) {
      setFormData({ ...formData, error: 'Invalid phone Number' })
    } else {
      const { phoneNr, password } = formData;
      const data = {  phoneNr, password };
      setFormData({ ...formData, loading: true })
console.log(data);
      signin(data)
        .then (response => {
          setAuthentication(response.data.token, response.data.user)
          if (isAuthenticated() && isAuthenticated().role === "admin") {
            console.log('Redirect to admin dashboard')
            navigate('/')
          } else {
            console.log('Redirect to user dashboard')
            navigate('/')
          }
        })
        .catch(err => {
          console.log('Axios signin error', err)
        })
        
        
    }

  }

  const showSigninForm = () => (
              <div className='log-sign-main border-top'>
                  <div className="login">
                  <h1 className="text-center" style={{fontFamily: "'Open Sans', cursive"}}>BidOnBuy</h1>
                    {error && showErrorMessage(error)}
                    {loading && <div className="text-center pb-4">{showLoading()}</div>}
                    <form onSubmit={handleSubmit}>
                      <div className="form-outline mb-2">
                        <input name='phoneNr' value={phoneNr} onChange = {handleChange} type="text" id="form3Example3cg" placeholder='Enter Phone Number' className="form-control form-control-lg " style={{margin: "13px auto"}}required autoFocus/>
                      </div>
                      <div className="form-outline mb-2">
                        <input name='password' value={password} onChange = {handleChange} type="password" placeholder='Enter your Password' id="form3Example4cg" className="form-control form-control-lg " required/>
                        {/* <label className="form-label" htmlFor="form3Example4cg">Password</label> */}
                      </div>
                      <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-block button glow" style={{margin: "10px 0px"}}><span className='font-weight-bold text-white'>Login</span></button>
                      </div>
                      <p className="text-center text-muted mt-2 mb-0">Don't have a account? <Link to='/signup' className="fw-bold text-body" style={{fontSize: "16px", fontWeight: "700"}}><u>Register here</u></Link></p>
                    </form>
                  </div>
                </div>
  );
  return <div>
    
  {showSigninForm()} 

</div>;

}

export default Signin
