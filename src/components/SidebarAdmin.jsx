// src/components/SidebarAdmin.jsx

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { VCardIcon } from '../icons/VCardIcon';

const SidebarAdmin = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <>
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsSidebarOpen(false)}></div>
      )}
      <div className={`bg-dark-background fixed top-0 left-0 h-full w-64  p-4 transform transition-transform duration-300 ease-in-out z-50 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <header className='flex items-center mb-4'>
            <VCardIcon />
            <p className="font-bold text-inherit">VCard</p>
        </header>
        <nav>
          <ul>
            <li className="mb-2">
              <Link to="/admin" className="block p-2" onClick={() => setIsSidebarOpen(false)}>Inicio</Link>
            </li>
            <li className="mb-2">
              <Link to="/admin/dominio" className="block p-2" onClick={() => setIsSidebarOpen(false)}>Dominios</Link>
            </li>
            <li className="mb-2">
              <Link to="/admin/usuario" className="block p-2" onClick={() => setIsSidebarOpen(false)}>Usuarios</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

SidebarAdmin.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  setIsSidebarOpen: PropTypes.func.isRequired,
};

export default SidebarAdmin;
