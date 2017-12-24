import React, { Component } from 'react';
import { Animation, keyframes } from './react-keyframes-animation';
import logo from './logo.svg';
import './App.css';

const transitionIn = {
  '0%': { width: 300, opacity: 0, height: 0 },
  '30%': { opacity: 1, height: 100 },
  '50%': { width: 500 },
  '70%': { height: 400, },
  '100%': { height: 400, },
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Animation keyframes={transitionIn} duration={4} fillMode="forward">
          {(interpolatedStyles) => {
            return (
              <div
                style={{
                  background: '#f7f7f7',
                  border: '1px solid #ececec',
                  width: interpolatedStyles.width || 300,
                  padding: 15,
                  opacity: interpolatedStyles.opacity,
                  transform: interpolatedStyles.panelTransform
                }}
              >
                <div>Panel Header</div>
                <div
                  style={{
                    background: interpolatedStyles.color,
                    height: interpolatedStyles.height,
                  }}
                />
                <div />
              </div>
            );
          }
          }
        </Animation>
      </div>
    );
  }
}

export default App;
