import React from 'react';
import Navbar from '../components/Navbar';
import { Toaster } from 'react-hot-toast';
import '../styles/global.css';

export default function MainLayout({ children }) {
  return (
    <div className="app-root">
      <Navbar />
      <main className="app-main">{children}</main>
      <Toaster position="top-right" />
    </div>
  );
}
