import React, { Component } from 'react';
import './App.css';


import EditDocument from './components/EditDocument'

class App extends Component {
  constructor (props) {
    super(props);
    this.state = { contents: "", title: null };
  }

  render () {
    return <EditDocument
      contents={this.state.contents}
      changeContents={(v) => this.setState({contents: v})}
      title={this.state.title}
      changeTitle={(v) => this.setState({title: v})}
    />
  }
}



export default App;
