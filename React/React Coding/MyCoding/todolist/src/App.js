import React, { Component } from 'react';
import Main from './Components/Main.js';
import Input from './Components/Input.js';

class App extends Component {
  render() {
    return (
      <Main Form={ <Input/> } Childeren="기본 템플릿"/>
    );
  }
}

export default App;