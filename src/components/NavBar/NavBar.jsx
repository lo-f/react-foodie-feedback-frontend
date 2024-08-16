import { Link } from 'react-router-dom';
import styles from "./NavBar.module.css"
import Logo from '../../../public/images/logo.png'


const NavBar = ({ user, handleSignout }) => {
  return (
    <>
      { user ? (
        <nav className={styles.container}>
          <Link to='/'>
          <img src={Logo}/>
          </Link>

          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/myreviews">My Reviews</Link></li>
            <li><Link to="/restaurants">Restaurants</Link></li>
            <li><Link to="" onClick={handleSignout}>Sign Out</Link></li>
          </ul>
        </nav>
      ) : (
        <nav className={styles.container}>
        
          <Link to='/'>
          <img src={Logo}/>
          </Link>

          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/signin">Sign In</Link></li>
            <li><Link to="/signup" style={{backgroundColor:'#9beafa', color:'black', padding:'8px', borderRadius:'8%'}}>
                  Sign Up
                </Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  )
}

export default NavBar;
