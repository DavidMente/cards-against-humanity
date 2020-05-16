import React, {FunctionComponent} from "react";
import {Link} from "react-router-dom";

const Navbar: FunctionComponent = () =>
  <nav className="navbar has-text-weight-bold has-text-white" role="navigation"
       aria-label="main navigation">
    <div className="navbar-brand">
      <div className="navbar-item">David's CAH game</div>
    </div>
    <div className="navbar-start">
      <Link className="navbar-item" to={'/'}>Home</Link>
    </div>
  </nav>;

export default Navbar
