import React from 'react';
import Navbar from '../Navbar';

function MainLayout({ children }) {
  return (
    <div className="grid-container ">
      <header className="lg:pl-8 lg:pr-[2.25rem] md:px-6 ">
        <Navbar />
      </header>
      <main>{children}</main>
    </div>
  );
}

export default MainLayout;
