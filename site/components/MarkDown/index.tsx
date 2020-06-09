import React, { Component } from "react";
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
// 设置高亮样式
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";
// 设置高亮的语言
// sass, scss, tsx
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";

import Code from './Code';

interface ICodeBlockState {
  html: string
}

class CodeBlock extends Component<{}, ICodeBlockState> {
  static propTypes = {
    value: PropTypes.string.isRequired,
    language: PropTypes.string
  };

  static defaultProps = {
    language: null
  };
  components: Map<any, any>;

  nodeList: any[];

  constructor(props: any) {
    super(props);
    // this.style = null;
    this.components = new Map();
    this.nodeList = [];
    this.state = {
      html: ''
    }
  }

  componentDidMount() {
    const { value } = this.props as any;
    SyntaxHighlighter.registerLanguage("jsx", jsx);
    SyntaxHighlighter.registerLanguage("javascript", javascript);
    this.components.clear();
    const id = parseInt(Math.random() * 1e9 + '', 10).toString(36);
    this.components.set(id, React.createElement(Code, this.props, value));
    this.setState({
      html: `<div id=${id}></div>`
    }, () => {

      this.renderDOM();
    })
  }
  renderDOM() {
    for (const [id, component] of this.components as any) {
      const div = document.getElementById(id);
      this.nodeList.push(div);
      if (div instanceof HTMLElement) {
        ReactDOM.render(component, div);
      }
    }
  }

  render() { 
    const { language, value } = this.props as any;
    return (
      <>
      <main dangerouslySetInnerHTML={{ __html: this.state.html }} />
      <figure className="highlight">

        <SyntaxHighlighter language={language} style={coy}>
          {value}
        </SyntaxHighlighter>
      </figure>
      </>
    );
  }
}

export default CodeBlock;