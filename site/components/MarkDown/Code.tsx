import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { transform } from '@babel/standalone';
import * as zbui from 'zbui';


export default class Code extends Component {
  containerId: string;
  document: any;
  title?: string;
  source: any;
  constructor(props: any) {
    super(props);
    this.containerId = `${parseInt(Math.random() * 1e9 + '', 10).toString(36)}`;
  }

  componentDidMount() {
    const { children } = this.props;
    this.renderSource(children);
  }

  renderSource(codeMd: any) {
    const value = codeMd
      .replace(/import\s+\{\s+(.*)\s+\}\s+from\s+'zbui';/, 'const { $1 } = zbui;')
      .replace(/ReactDOM.render\(\s?([^]+?)(,\s?mountNode\s?\))/g, `
      ReactDOM.render(
        $1,
        document.getElementById('${this.containerId}'),
      )
    `);
    const { code } = transform(value, {
      presets: ['es2015', 'react'],
      plugins: ['proposal-class-properties'],
    });
    const args = ['React', 'ReactDOM', 'zbui', code];
    const argv = [React, ReactDOM, zbui];
    // eslint-disable-next-line no-new-func
    new Function(...args as any)(...argv);
  }


  render() {
    return (
      <div id={this.containerId} />
    );
  }
}
