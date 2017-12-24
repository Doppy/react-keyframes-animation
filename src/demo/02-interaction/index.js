
import React from 'react';
import _ from 'lodash';
import { Animation } from '../../lib';


class Interaction extends React.Component {

  state = {
    moveKeyframes: undefined,
  }

  handleClickStage = (e) => {
    
    // Get current x, y
    const currentX = _.get(this.state, 'moveKeyframes.100%.x', 0);
    const currentY = _.get(this.state, 'moveKeyframes.100%.y', 0);

    const toX = e.clientX - 200; // minus sidenav
    const toY = e.clientY - 190; // minus header
    
    this.setState({
      moveKeyframes: {
        '0%': { x: currentX, y: currentY, scale: 1.0 },
        '10%': { x: currentX, y: currentY, scale: 1.5 },
        '20%': { x: currentX, y: currentY, scale: 1.0 },
        '80%': { x: toX, y: toY, scale: 1.0 },
        '90%': { x: toX, y: toY, scale: 1.5 },
        '100%': { x: toX, y: toY, scale: 1.0 },
      }
    })
  }

  render() {
    const { moveKeyframes } = this.state;
    return (
      <div
        style={{ width: '100vw', height: 500, background: '#f7f7f7' }}
        onClick={this.handleClickStage}
      >
        <Animation keyframes={moveKeyframes} duration={1}>
          {(interpolatedStyles) => {
            const { scale, x, y } = interpolatedStyles;
            return (
              <div
                style={{
                  width: 50,
                  height: 50,
                  marginLeft: -25,
                  marginTop: -25,
                  background: 'salmon',
                  position: 'absolute',
                  borderRadius: '100%',
                  transform: `matrix(${scale}, 0, 0, ${scale}, ${x}, ${y})`,
                }}
              />
            );
          }
          }
        </Animation>
      </div>
    )
  }
}

export default Interaction;