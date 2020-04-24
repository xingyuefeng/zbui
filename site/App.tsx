import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/home'
import Components from './pages/component'
import Layout from './components/Layout'
import './app.scss'

function App() {
  return (

    <Router>
      <Layout>
        <Route path="/" exact component={Home} />
        <Route path="/components" component={Components} />
      </Layout>
    </Router>

  );
}

export default App;
