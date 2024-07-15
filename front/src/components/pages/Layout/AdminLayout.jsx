import React from 'react';

import Adminheader from '../Admin/Adminheader';
import Mainheader from '../Admin/Mainheader';
import { AdminProvider } from '../../../context/AdminContext';

const AdminLayout = ({children}) => {
    return (
    <AdminProvider>
      <div style={{display: 'flex'}}>
        <Adminheader />
        <div style={{width: '80%', backgroundColor: '#eee'}}>
            <Mainheader />
            {children}
        </div>
      </div>
    </AdminProvider>
    );
};

export default AdminLayout;