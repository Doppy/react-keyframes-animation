import React from 'react';
import _ from 'lodash';
import { interpolate, interpolateNumber } from 'd3-interpolate';

/* Reference */
// https://github.com/d3/d3-interpolate/blob/master/src/number.js
// https://github.com/animatedjs/animated/blob/master/src/Interpolation.js

const FRAME_PER_SEC = 60;

const transitionIn = {
  '0%': { opacity: 0, height: 0 },
  '30%': { width: 300, opacity: 1, height: 100 },
  '50%': { width: 500, height: 100 },
  '70%': { width: 500, height: 400, color: 'salmon' },
  '100%': { width: 500, height: 400, color: 'teal' },
};

const interpolateAt = (start, end, at, range) => {
  return (t) => {
    const scaledTime = (t  - at) / range;
    return interpolate(start, end)(scaledTime); // i(0.0), i(1.0)
  }
};

const getStartKey = (obj, t) => {
  return _.findLastKey(obj, (v, p) => parsePos(p) < t);
}

const getEndKey = (obj, t) => {
  return _.findKey(obj, (v, p) => parsePos(p) >= t);
}

const parsePos = (v) => 0.01 * parseFloat(v);

const interpolateTimeline = (obj) => {
  return (t) => {
    const _t = _.clamp(t, 0.0, 1.0);
    const start = getStartKey(obj, _t);
    const end = getEndKey(obj, _t);
    // console.log('startkey', _t, start, end);
    // if (t <= 0.1) return interpolateAt(obj['0%'], obj['10%'], 0.0, 0.1)(t);
    // if (t <= 0.8) return interpolateAt(obj['10%'], obj['80%'], 0.1, 0.7)(t);
    return interpolateAt(obj[start], obj[end], parsePos(start), parsePos(end) - parsePos(start))(_t);
  }
}

// Run
const interpolatedStyle = interpolateTimeline(transitionIn);


class Animation extends React.Component {

  static defaultProps = {
    duration: 1,
  }

  constructor(props) {
    super(props);

    this.state = {
      currentStyle: {
        opacity: 0,
        height: 0,
      },
    }
  }

  componentDidMount = () => {
    // let interpolatedStyle = interpolateAt(
    //   { opacity: 0, height: 0, color: 'red', },
    //   { opacity: 1, height: 400, color: 'yellow' },
    //   0.5,
    //   0.2,
    // );
    const interpolatedStyle = interpolateTimeline(transitionIn);

    console.log('interpolatedStyle', interpolatedStyle);
    console.log('0.0', interpolatedStyle(0.0));
    console.log('0.1', interpolatedStyle(0.1));
    console.log('0.2', interpolatedStyle(0.2));
    console.log('0.3', interpolatedStyle(0.3));
    console.log('0.4', interpolatedStyle(0.4));
    console.log('0.5', interpolatedStyle(0.5));
    console.log('0.6', interpolatedStyle(0.6));
    console.log('0.7', interpolatedStyle(0.7));
    console.log('0.8', interpolatedStyle(0.8));
    console.log('0.9', interpolatedStyle(0.9));
    console.log('1.0', interpolatedStyle(1.0));
    const totalFrame = this.props.duration * FRAME_PER_SEC;
    const inc = 1 / totalFrame;
    
    let c = 0;
    const interval = setInterval(() => {
      c += inc;
      this.setState({
        currentStyle: interpolatedStyle(c),
      });

      if (c >= 1.0) {
        clearInterval(interval);
      }
    }, 1000 / FRAME_PER_SEC);
  }

  render() {
    const { keyframes } = this.props;
    return (
      <div>
        {this.props.children(this.state.currentStyle)}
      </div>
    );
  }
}

export default Animation;
