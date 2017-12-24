import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Simple from './01-simple';
import Interaction from './02-interaction';

import './index.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">React Keyframes Animation</h1>
          </header>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div className="sidenav">
              <ul>
                <li><Link to="/01-simple">Simple</Link></li>
                <li><Link to="/02-interaction">Interaction</Link></li>
              </ul>
            </div>
            <div style={{ flex: 1 }}>
              <Route path="/01-simple" component={Simple} />
              <Route path="/02-interaction" component={Interaction} />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
