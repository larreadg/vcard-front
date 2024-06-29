import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Admin/Dashboard'
import Login from '../pages/Admin/Login'
import ProtectedRouteAdmin from '../components/ProtectedRouteAdmin'
import RealmList from '../pages/Admin/Realm/RealmList'
import UsuarioList from '../pages/Admin/Usuario/UsuarioList'
import RealmCreate from '../pages/Admin/Realm/RealmCreate'
import RealmEdit from '../pages/Admin/Realm/RealmEdit'
import UsuarioCreate from '../pages/Admin/Usuario/UsuarioCreate'
import UsuarioEdit from '../pages/Admin/Usuario/UsuarioEdit'
import AdminLayout from '../layouts/AdminLayout'

function AdminRoutes() {
  return (
    <Routes>
        <Route path="login" element={<Login />} />
        <Route element={<ProtectedRouteAdmin />}>
            <Route element={<AdminLayout />}>
              <Route path="" element={<Dashboard />} />
              <Route path="dominio">
                  <Route index element={<RealmList />} />
                  <Route path="create" element={<RealmCreate />} />
                  <Route path="edit/:id" element={<RealmEdit />} />
              </Route>
              <Route path="usuario">
                  <Route index element={<UsuarioList />} />
                  <Route path="create" element={<UsuarioCreate />} />
                  <Route path="edit/:id" element={<UsuarioEdit />} />
              </Route>
            </Route>
        </Route>
    </Routes>
  )
}

export default AdminRoutes
