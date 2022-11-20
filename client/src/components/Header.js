import React from "react";
import {NavLink,Link} from 'react-router-dom'
import { isAuthenticated, logout } from '../helpers/auth';
import { withRouter } from "../helpers/withrouter";
import styled from  "styled-components";
import {BsSearch} from "react-icons/bs"
import {TbHeartHandshake} from "react-icons/tb"
import {CgProfile} from "react-icons/cg"

const Header = ({navigate}) => {
  
  const handleLogout = () => {
    logout(() => {
      navigate('/signin')
    })
  }
  const showNavigation  = () => (
    <>
    <NavLink to="/" >
        <p className="logoName"><span className="logoImage"><TbHeartHandshake/></span>BidOnBuy</p>
    </NavLink>
    <form>
        <input className="searchBar" type="text" placeholder='Find Cars, Mobile Phones and more...'/>
        <button className='searchBtn'><BsSearch /></button>
      </form>
    {!isAuthenticated() && (
      <div>
      <NavLink to="/signup">
    <button className='searchBtn'>Register</button>
    </NavLink>
    <NavLink to="/signin">
    <button className='loginBtn searchBtn'>Login</button>
    </NavLink>
      </div>

    )}

    {isAuthenticated() && isAuthenticated().role === "user" && (
      <div>
      <NavLink to="/user/dashboard">Dashboard</NavLink>
      <NavLink to="/profile"><CgProfile style={{marginRight: "0.5em",color:"white", fontSize: "3em"}}/></NavLink>

    <button className='loginBtn searchBtn' onClick={handleLogout}>Logout</button>
      </div>
      )}

    {isAuthenticated() && isAuthenticated().role === "admin" && (
      <>
      <NavLink to="/admin/dashboard">Dashboard</NavLink>
      <NavLink to="/profile"><CgProfile style={{marginRight: "0.5em",color:"white", fontSize: "3em"}}/></NavLink>
    <button className='loginBtn searchBtn' onClick={handleLogout}>Logout</button>
      </>
      )}
    </>
  )
  return <MainHeader id="header" className="header">{showNavigation()}</MainHeader>
}
const MainHeader = styled.header` 
`;
 

export default withRouter(Header);