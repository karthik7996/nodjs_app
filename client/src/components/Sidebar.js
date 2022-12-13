import React, {useState, useEffect} from "react";

// ICONS
import * as FaIcons from "react-icons/fa"; //Now i get access to all the icons
import * as AiIcons from "react-icons/ai";
import {BiCategoryAlt} from "react-icons/bi"
import { IconContext } from "react-icons";

import { CgDetailsLess } from "react-icons/cg";

// ROUTING

import {NavLink, Link } from "react-router-dom";

// DATA FILE
import { getCategories } from '../api/category'


// STYLES
import "./css/navbar.css";

export default function Navbar() {
  const [sidebar, setSidebar] = useState(true);

  const showSidebar = () => setSidebar(!sidebar);
  const [categories, setCategories] = useState('')
  const [loading, setLoading] = useState(false);
  console.log(categories)
  useEffect(() => {
      loadCategories()
    }, [loading])
  const loadCategories = async () => {
      await getCategories()
      .then((response) => {
        setCategories(response.data)
        console.log('categories', response.data)
      }
      )
      .catch((error) => {
        console.log('loadCategories error', error)
      }
      )
    }
  return (
    <>
      <IconContext.Provider value={{ color: "#FFF" }}>
        {/* All the icons now are white */}
        <div className="navbar">
          <Link to="#" className="menu-bars text-decoration-none" onClick={showSidebar}>
            <CgDetailsLess/><span  className="text-white">All Categories</span>
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle pt-5 mb-5 ">
              <Link to="#" className="menu-bars pt-5 glow">
                <AiIcons.AiOutlineClose className="scale"/>
              </Link>
            </li>

            {categories.length>0 && categories.map((item, index) => {
              return (
                <li key={index} className="nav-text">
                  <a href={`/category/${item.name}`}>
                  <BiCategoryAlt/>
                    <span>{item.name}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}
