import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import MiddleWareService from "../../services/middleware.service";

const UserNav = () =>
{
  const [showUserNav, setShowUserNav] = useState(false);
  const can = (permission) =>
  {
    MiddleWareService.can(permission).then((response) =>
    {
      return true;
    }).catch((error) =>
    {
      return false;
    });
  }

  useEffect(() =>
  {
    if (can("user-list"))
    {
      setShowUserNav(true);
    }
  }, []);

  return (
    showUserNav ? (
    <li className="nav-item">
      <Link to={"/user"} className="nav-link">
        User
      </Link>
    </li>
    ) : null
  );
}

export default UserNav;
