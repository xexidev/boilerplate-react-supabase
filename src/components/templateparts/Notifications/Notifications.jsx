import './Notifications.css'
import { useEffect, useContext, useState, useRef } from 'react'
import { NotificationsContext } from '../../../context/NotificationsContext'

export default function Notifications () {
  const { notification, setNotification } = useContext(NotificationsContext)
  const [showNotification, setShowNotification] = useState(false)

  const hideNotificationTimeoutRef = useRef(null)
  const resetNotificationTimeoutRef = useRef(null)

  useEffect(() => {
    setShowNotification(false)
    clearTimeout(hideNotificationTimeoutRef.current)
    clearTimeout(resetNotificationTimeoutRef.current)
    if (notification) {
      setShowNotification(true)
      hideNotificationTimeoutRef.current = setTimeout(() => {
        setShowNotification(false)
      }, 6500)
      resetNotificationTimeoutRef.current = setTimeout(() => {
        setNotification(null)
      }, 7500)
    }
  }, [notification])

  const handleClick = () => {
    setNotification(null)
  }

  return (
    <>
      { notification
        ? <div className={`top-notification ${showNotification ? 'visible' : ''} ${notification.type ? notification.type : ''}`}>
            <div className='close' onClick={handleClick}>✖</div>
            {notification.message}
          </div>
        : ''
      }
    </>
  )
}
