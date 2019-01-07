import React from 'react'
import './index.css'
import hamburgerImage from './img/hamburger.svg'

export default class Header extends React.Component {
  toggleFilter(){
    let hasMini = false
    for (const className of document.documentElement.classList) {
      if(className === 'mini') hasMini = true;
    }
    document.documentElement.className = hasMini ?  '' : 'mini'
  }
  render() {
    return (
      <header>
        <div className="hamburger" onClick={this.toggleFilter}><img src={hamburgerImage} alt="hamburger"/></div>
      </header>
    )
  }
}