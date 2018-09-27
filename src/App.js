import React, { Component } from 'react';
import FetchUrl from './components/FetchUrl';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          
          <h1 className="App-title">HTML Tag analyzer</h1>
        </header>
        <FetchUrl subreddit="reactjs">
        
        </FetchUrl>
      </div>
    );
  }
}

export default App;
