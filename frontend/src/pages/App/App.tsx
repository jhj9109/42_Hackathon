import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <div className="body">
        <header className="header common">header</header>
        <main className="main">
          <Outlet />
        </main>
        <footer className="footer common">footer</footer>
      </div>
    </div>
  );
}

export default App;
