import React from 'react';
import './App.css';
import Game from './tateti/tateti.js'

function App() {
  return (
    <body id='top' className="App">
        <nav id="mainNav" className="navbar navbar-expand-lg static-top bg-dark text-uppercase navbar-dark">
          <div className="container">
            <a className="navbar-brand" href="#top"> Ian Petraccaro Cantero</a>
            <button className='navbar-toggler'></button>
            <div className='collapse navbar-collapse'>
              <ul className='navbar-nav ms-auto'>
                <li className='nav-item'>
                  <a className='nav-link' href='#acerca-de'> Acerca de </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='#ta-te-ti'> Ta-Te-Ti </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <header className='text-center text-white masthead' style={{marginTop:'5%'}}> 
          <div id='acerca-de' className='container'>
          </div>
          <div id='ta-te-ti' className='container'>
            <React.StrictMode>
              <Game></Game>
            </React.StrictMode>
          </div>
        </header>
    </body>
  );
}

export default App;
