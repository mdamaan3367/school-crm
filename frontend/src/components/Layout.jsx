import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>School Enquiry CRM</h1>
          <span>Track and manage your admission enquiries in one place</span>
        </div>
      </header>
      <main className="app-content">{children}</main>
    </div>
  );
};

export default Layout;
