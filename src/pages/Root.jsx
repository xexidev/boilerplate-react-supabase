import './Root.css'
import { Outlet } from 'react-router-dom'
import Header from '../components/templateparts/Header/Header'
import Footer from '../components/templateparts/Footer/Footer'
import Notifications from '../components/templateparts/Notifications/Notifications'
import { UserProvider } from '../context/UserContext.jsx'
import { NotificationsProvider } from '../context/NotificationsContext.jsx'

export default function Root () {
  return (
    <NotificationsProvider>
      <UserProvider>
        <div className='root'>
          <Notifications />
          <Header />
          <main>
            <Outlet/>
          </main>
          <Footer />
        </div>
      </UserProvider>
    </NotificationsProvider>
  )
}
