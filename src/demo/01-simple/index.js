import React from 'react';
import { Animation } from '../../lib';

const productImage = require('./malte-wingen-381988.jpg');

const transitionIn = {
  '0%': { opacity: 0, y: 50, scale: 0.5, rotation: '0deg' },
  '40%': { scale: 0.5, opacity: 1, y: 0, rotation: '0deg' },
  '60%': { rotation: '360deg', scale: 0.5 },
  '80%': { scale: 1.0, y: 0, rotation: '360deg', shadow: 0 },
  '100%': { shadow: 16 },
};

class Simple extends React.Component {
  render() {
    return (
      <div className="content">
        <Animation keyframes={transitionIn} duration={1}>
          {(interpolatedStyles) => {
            const { opacity, scale, y, rotation, shadow } = interpolatedStyles;
            console.log(interpolatedStyles);
            return (
              <div
                style={{
                 width: 300,
                 transform: `rotate(${rotation})`
                }}
              >
                <div
                  className="card"
                  style={{
                    transform: `matrix(${scale}, 0, 0, ${scale}, 0, ${y})`,
                    opacity: opacity,
                    boxShadow: `0 ${shadow}px ${shadow}px rgba(0, 0, 0, 0.2)`,
                  }}
                >
                  <img src={productImage} style={{ width: '100%' }} />
                  <div style={{ padding: 15 }}>Nice Headphone</div>
                </div>
              </div>
            );
          }
          }
        </Animation>
      </div>
    )
  }
}

export default Simple;
