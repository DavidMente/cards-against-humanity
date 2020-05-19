import React, {FunctionComponent} from "react";
import {Link} from "react-router-dom";

const Navbar: FunctionComponent = () =>
  <nav className="navbar has-text-weight-bold has-text-white" role="navigation"
       aria-label="main navigation">
    <div className="navbar-brand">
      <Link className="navbar-item navbar-custom-link" to={'/'}>David's Cards Against Humanity App</Link>
    </div>
  </nav>;

export default Navbar
