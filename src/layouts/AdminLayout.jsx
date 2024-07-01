import { Outlet } from 'react-router-dom'
import NavbarAdmin from '../components/NavbarAdmin'
import SidebarAdmin from '../components/SidebarAdmin'
import { useState } from 'react'

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  return (
    <section className="flex flex-col min-h-screen overflow-x-hidden relative">
      <NavbarAdmin isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
      <SidebarAdmin isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
      <main className="flex-grow  p-4">
        <Outlet />
      </main>
    </section>
  )
}

export default AdminLayout
