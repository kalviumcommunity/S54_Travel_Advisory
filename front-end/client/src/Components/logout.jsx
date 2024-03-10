import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Login from './Login';
import { AppContext } from "../Context/Parentcontext";
import { deleteCookie } from './Cookie';
const Navbar = () => {
  // const [login, setlogin] = useState(false);
  const{setislogin,login}=useContext(AppContext)
  const navigate = useNavigate();


  const handleLogin = () => {
    if (login) {
      // Log out
      localStorage.setItem("isLoggedIn", "false");
      setislogin(false);
      navigate("/login");
      alert("Your Logging Out")
      deleteCookie("JWT")
      deleteCookie("User")
      deleteCookie("password")
    } 
  };

  return (
    <div className='navbar' style={{
      display: "flex",
      justifyContent: "space-around",
      width: "100vw",
      boxShadow: "2px",
    }}>
      <div className="main" style={{
        display: "flex",
        justifyContent: "space-around",
        width: "70vw",
      }}>
        <Link style={{ textDecoration: "none", color: "black" }} to={"/"}>
          <h3>Home</h3>
        </Link>
        <Link style={{ textDecoration: "none", color: "black" }} to={"about"}>
          <h3>About</h3>
        </Link>
        <Link style={{ textDecoration: "none", color: "black" }} to={"Contact"}>
          <h3>Contact</h3>
        </Link>
        <div
        style={{
          display : login ? "none" : "block",
        }}>  <Link style={{ textDecoration: "none", color: "black" }} to={"Signup"}>
        <h3>Signup</h3>
      </Link>          </div>
        
        <button style={{ border: "none", color: "black" , backgroundColor:"#F0FFFF", cursor:"pointer" }} onClick={()=>{
          handleLogin();if(!login){
            navigate("Login")
            
          }
        }}>
          <h3>{login ? "Log Out" : "Log In"}</h3>
        </button>
        <Link style={{ textDecoration: "none", color: "black" }} to={"add"}>
          <h3>ADD PLACES</h3>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;