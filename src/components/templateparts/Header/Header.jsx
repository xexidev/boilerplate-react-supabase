import { NavLink, Link } from 'react-router-dom'
import './Header.css'
import { useContext } from 'react'
import { UserContext } from '../../../context/UserContext'
import path from '../../../paths'

export default function Header () {
  const { isLoggedFromLocal, userEmailFromLocal, userLogout } = useContext(UserContext)
  return (
    <header>
      <h1>Title</h1>
      {
        isLoggedFromLocal
          ? <>
            <h2>Hola, {userEmailFromLocal}</h2>
            <ul className='user-nav'>
              <li onClick={userLogout}>Logout</li>
              <li><Link to={path.user} title='My Account'>My Account</Link></li>
            </ul>
            </>
          : ''
      }
      <nav>
        <ul className='main-nav'>
          <li><NavLink to={path.home} title='Homepage'>Home</NavLink></li>
          <li><NavLink to={path.userRegister} title='New account'>Register</NavLink></li>
          { isLoggedFromLocal
            ? <>
                <li><NavLink to={path.created.replace(':page', '1')} title='My elements'>My elements</NavLink></li>
                <li><NavLink to={path.create} title='Create new element'>New element</NavLink></li>
              </>
            : <li><NavLink to={path.userLogin} title='Login'>Login</NavLink></li>
          }
          <li><NavLink to={path.list.replace(':page', '1')} title='List'>List</NavLink></li>
        </ul>
      </nav>
    </header>
  )
}
