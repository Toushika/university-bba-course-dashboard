import React, { Component } from 'react';
import './App.css';
import Menu from './component/Menu';
import Routes from './component/Routes';

class App extends Component {
  render() {
    return (
      <div style={{margin:0,padding:0}}>
        <Menu />
        <Routes />
      </div>
    );
  }
}

export default App;
