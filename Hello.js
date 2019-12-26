import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';

class Weather extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <div>
        {this.state.name}
      </div>
    );
  }
}
export default Weather;
