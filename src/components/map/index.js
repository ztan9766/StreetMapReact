import React from "react";
import loadingGif from "./img/loading.gif";
import { initMap } from "../../actions/getMap";
import { initGeoCode, initZoom, locations } from "../../utils/locations";
import emitter from "../../utils/events"
import getVenues from "../../actions/getVenues"

import "./index.css";

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      failed: false,
      hideClass: "hide",
      initGeoCode: initGeoCode || {},
      initZoom: initZoom || 14,
      locations: locations || [],
      map: {},
      markers: []
    };
  }

  componentDidMount() {
    initMap()
      .then(() => {
        if (this.state.initGeoCode.lng && this.state.initGeoCode.lat) {
          let map = new window.google.maps.Map(document.getElementById("map"), {
            center: this.state.initGeoCode,
            zoom: this.state.initZoom
          });
          this.setState({
            map: map
          });
          this.renderMarkers(this.state.locations);
        }
      })
      .catch(e => {
        console.log(e);
        this.setState({
          failed: true
        });
      });
    this.setState({
      loading: false
    });
    this.eventEmitter = emitter.addListener("updateMarkers", locations =>{
      this.cleanMarkers()
      this.renderMarkers(locations)
    });
    this.eventEmitter = emitter.addListener("showInfo", location => {
      for (const marker of this.state.markers) {
        let position = new window.google.maps.LatLng(location.lat, location.lng)
        marker.position.lat() === position.lat() && marker.position.lng() === position.lng() && new window.google.maps.event.trigger( marker, 'click' );
      }
    });
  }

  async renderMarkers(locations) {
    let infowindow = new window.google.maps.InfoWindow();
    let map = this.state.map
    let _markers = [];
    for (const markerData of locations) {
      let marker = new window.google.maps.Marker({
        position: new window.google.maps.LatLng(markerData.lat, markerData.lng),
        map: map
      });
      let venues = await getVenues(markerData.lat, markerData.lng)
      let html = markerData.content + this.getVenuesHtml(venues)
      window.google.maps.event.addListener(
        marker,
        "click",
        (marker => {
          return function() {
            infowindow.setContent(html);
            infowindow.open(map, marker);
          };
        })(marker)
      );
      _markers.push(marker);
    }
    this.setState({
      markers: _markers
    });
  }

  getVenuesHtml (venues){
    if(!venues || venues.length === 0) return "<h5>No Foursquare venue available now.</h5>"
    let html = `<div class="venues"><h5>Total venues: ${venues.length}</h5><ul>`;
    for (const venue of venues) {
      html +=  `<li><p>${venue.name}${venue.location.address ? "</p><p>Address: " + venue.location.address + "</p>" : ""}</p></li>`;  
    }
    html += `</ul></div>`
    return html
  }

  cleanMarkers (){
    for (const marker of this.state.markers) {
      marker.setMap(null)
    }
  }

  render() {
    return (
      <div className="map-wrapper">
        <div id="map" role="map">
          {this.state.loading ? (
            <div className={this.state.loading ? "" : this.state.hideClass}>
              <img src={loadingGif} alt="Loading"/>
            </div>
          ) : !this.state.failed ? (
            ""
          ) : (
            <div>Map Loading failed!</div>
          )}
        </div>
      </div>
    );
  }
}
