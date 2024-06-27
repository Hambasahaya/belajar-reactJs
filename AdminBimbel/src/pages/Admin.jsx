import React from 'react';

import Admin from '../components/Admin';
import '../css/index.css';

export default function Admins() {
  const username = sessionStorage.getItem('username');
  if ( username!==null) {
    
  }else{
    window.location.href='/login'
  }
  return (
    <div className="main d-flex flex-column">
      <Admin />
</div>
  )
}
  

