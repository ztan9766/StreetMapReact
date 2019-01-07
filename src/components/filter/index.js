import React from 'react'
import './index.css'
import { locations } from '../../utils/locations';
import emitter from "../../utils/events"
import closeImg from "./img/close.svg"

export default class Filter extends React.Component {
  state = {
    title: "Sydney Locations",
    locations: locations
  }
  toggleFilter(){
    let hasMini = false
    for (const className of document.documentElement.classList) {
      if(className === 'mini') hasMini = true;
    }
    document.documentElement.className = hasMini ?  '' : 'mini'
  }
  filter(e){
    if(typeof e === 'undefined' || e.keyCode === 13){
      const searchKey = document.getElementById('searchKey').value.toLowerCase();
      let result = [];
      if(searchKey) {
        for (const location of this.state.locations) {
          if(location.title.toLowerCase().indexOf(searchKey) > 0 || location.content.toLowerCase().indexOf(searchKey) > 0) result.push(location)
        }
      }else{
        result = locations
      }
      if(result !== this.state.locations){
        this.setState({
          locations: result
        })
        emitter.emit("updateMarkers",result)
      }
    }
  }
  render() {
    return (
      <div className="filter" role="filter">
        <div className="filter-header">
          <h5>{ this.state.title }</h5>
          <img className="close" src={closeImg} alt="close" tabIndex="-1" onClick={this.toggleFilter}/>
        </div>
        <div className="filter-control">
          <input id="searchKey" onKeyDown={(e) => this.filter(e)} type="text" placeholder="Station Locations"/>
          <button type="button" onClick={() => this.filter()} title="Filter"></button>
        </div>
        <div className="filter-list">
          <ul>
          {
            this.state.locations.map((location, index) => {
              return (
                <li key={index} onClick={ () => emitter.emit("showInfo",location) } tabIndex={index + 1}>
                  {location.title}  
                </li>
              )
            })
          }
          </ul>
        </div>
      </div>
    )
  }
}