import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

// import UserNav from "./navbar-list/user.navbar";
import MiddleWareService from "../services/middleware.service";

const Navbar = () =>
{

  const [showUserNav, setShowUserNav] = useState(false);
  const can = (permission) =>
  {
    MiddleWareService.can(permission).then((response) =>
    {
      return response.success

    }).catch((error) =>
    {
      return error.response.data.success
    });
  }

  // useEffect(() =>
  // // {
  // //   if (can("user-list"))
  // //   {
  // //     setShowUserNav(true);
  // //   }
  // }, []);



  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to={"/home"} className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/order"} className="nav-link">
            order
          </Link>
        </li>
        {/* {
          showUserNav ? ( <li className="nav-item"> <Link to={"/user"} className="nav-link"> User </Link> </li> ) : null  

        } */}
      </div>
    </nav>
  );
}

export default Navbar;