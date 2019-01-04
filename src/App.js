import React, { Component } from 'react';
import Header from './components/header'
import Filter from './components/filter'
import Map from './components/map'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Filter />
        <Header />
        <Map />
      </div>
    );
  }
}

export default App;
