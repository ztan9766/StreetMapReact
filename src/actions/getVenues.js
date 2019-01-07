import { Promise } from "q";

export default function getVenues (lat, lng) {
  const foursquareApi = "https://api.foursquare.com/v2/";
  const secret = "BJETUD1ZGW1WGLCM0UQ5SX1R34JBLOAZ451YOA0J43BS5GZG";
  const id = "GJQDC2XRSYDOLNBSRO1B2WUXFFRW42RP13OVITPQYZUGVIC3";
  const date = new Date()
  const headers = {
    'Accept': 'application/json'
  }
  //use geo location find venues around it
  return new Promise((res, rej) => {
    fetch(`${foursquareApi}venues/search?client_id=${id}&client_secret=${secret}&ll=${lat},${lng}&v=${date.toJSON().substr(0, 11).replace(/[-T]/g, '')}`, { headers })
      .then(res => res.json())
      .then(data => {
        res(data.response.venues)
      })
      .catch(error => rej(error))
  })
}