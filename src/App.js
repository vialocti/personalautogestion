import React from 'react'
import './App.css';
import { AuthProvider } from './contexts/AuthContext';

import RoutesAsistencia from './routes/RoutesAsistencia'


function App() {
  
  return (
    
    <AuthProvider>
      <RoutesAsistencia />
    </AuthProvider>
      
    
  );
}

export default App;
