"use client";

import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import './globals.css';

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default Layout;
