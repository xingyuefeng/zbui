import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button } from './src';
import './src/styles/pure.less';

class Ceshi extends Component {
  render() {
    return (
      <Button>
      1234567777
      </Button>);
  }
}

ReactDOM.render(<Ceshi />, document.getElementById('app'));
