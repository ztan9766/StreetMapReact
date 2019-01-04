import React from 'react'
import './index.css'

export default class Filter extends React.Component {
  state = {
    title: "Burwood Locations"
  }
  filter(){
    const searchKey = document.getElementById('searchKey').value;
    if(searchKey) {

    }
  }
  render() {
    return (
      <div className="filter">
        <div className="filter-header">
          <h5>{ this.state.title }</h5>
        </div>
        <div className="filter-control">
          <input id="searchKey" type="text" placeholder="Station Locations"/>
          <button type="button" onClick={this.filter}>Filter</button>
        </div>
        <div className="filter-list"></div>
      </div>
    )
  }
}