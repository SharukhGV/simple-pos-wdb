// import { Link,NavLink } from "react-router-dom";
// import Logout from "./Logout";


// function NavigationBar({ loginUsername, toggleLOGIN, settoggleLOGIN, accessToken }) {




//   return (
//     <div expand="lg" className="navigationBAr" >
//         {/* <Navbar.Brand ><Link to="/"><img style={{ width: "50px", height: "50px" }} src={telescopeHome}></img></Link></Navbar.Brand> */}

//         {!!toggleLOGIN ? <NavLink to="/"><strong className="loginregisterwords">Home</strong></NavLink> : null}<span> </span>
//         {!toggleLOGIN ? <NavLink to="/login"><strong className="loginregisterwords">Login</strong></NavLink> : null}<span> </span>
//         {!toggleLOGIN ?<NavLink to="/signup"><strong className="loginregisterwords">Register</strong></NavLink> : null}<span> </span>
//         {!toggleLOGIN ?<NavLink to="/itemnewform"><strong className="loginregisterwords">New item</strong></NavLink> : null}

//     </div>
//   );
// }

// export default NavigationBar

import { NavLink } from "react-router-dom";
// import brainHeart from "./brainHeart.png";
import { Link } from "react-router-dom";
function Nav({ toggleTheme, theme, setTheme }) {


  let activeStyle = {
    textDecoration: "none",
    color: "beige",
  };

  let nonactiveStyle = {
    textDecoration: "none",

    color: "limegreen",
  };

  return (
    <span>

      <nav className="navBar">
        <ul className="no-bullets">


          {/* <li style={{ top: "5px", left: "5px" }}><Link to="/"><img className="brain"
            style={{
              maxWidth: "35px"
            }}
            src={brainHeart}
            alt="home logo button"
          /></Link></li> */}

          <li>
            <NavLink
              className="links"
              to="/receipts"
              exact="true"
              style={({ isActive }) => (isActive.isActive ? activeStyle : nonactiveStyle)}
            >
              All Receipts
            </NavLink>
          </li>

          <li>
            {" "}
            <NavLink
              className="links"
              to="/receipts/new"
              exact="true"
              style={({ isActive }) => (isActive.isActive ? activeStyle : nonactiveStyle)}
            >
              New Form
            </NavLink>
          </li>

          <li>
            {" "}
            <NavLink
              className="links"
              to="/storeinfo"
              exact="true"
              style={({ isActive }) => (isActive.isActive ? activeStyle : nonactiveStyle)}
            >
              Store Info
            </NavLink>
          </li>
        </ul>
      </nav></span>
  );
}

export default Nav;
