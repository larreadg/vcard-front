// src/components/NavbarAdmin.jsx

import { useEffect, useState } from "react"
import { useNavigate  } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react"
import { VCardIcon } from "../icons/VCardIcon"
import { jwtDecode } from 'jwt-decode'
import { Avatar } from "@nextui-org/react"
import { Tooltip } from "@nextui-org/tooltip";
import UserIcon from '../icons/UserIcon'
import MenuIcon from '../icons/MenuIcon'
import LogoutIcon from "../icons/LogoutIcon"

const NavbarAdmin = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate ()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const decoded = jwtDecode(token)
        setUser(decoded)
      } catch (error) {
        console.error('Error decoding token:', error)
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login')
  }

  return (
    <Navbar className=" h-16" isBordered={true}>
      <NavbarContent>
        <Avatar
          className=" cursor-pointer"
          size="sm"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          showFallback
          fallback={<MenuIcon className="w-4 h-4 text-white" />}
        />
        <NavbarBrand>
          <VCardIcon />
          <p className="font-bold text-inherit">VCard</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        { user && (
          <NavbarItem className='flex items-center gap-2'>
            <p className='text-right'>{user.usuario}</p>
            <Avatar className='' size='sm' showFallback fallback={
              <UserIcon className="w-4 h-4 text-white" fill="currentColor" size={20} />
            }/>
          </NavbarItem>
        )}
        <NavbarItem className='flex items-center gap-2'>
            <Tooltip content="Cerrar sesión">
                <Avatar
                color="primary"
                className='cursor-pointer'
                size='sm'
                onClick={handleLogout}
                showFallback
                fallback={<LogoutIcon className="w-4 h-4 text-white" />}
                />
            </Tooltip>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

NavbarAdmin.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  setIsSidebarOpen: PropTypes.func.isRequired,
}

export default NavbarAdmin
