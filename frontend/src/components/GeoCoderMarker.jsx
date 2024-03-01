import { Marker, Popup, useMap } from "react-leaflet";
import L from 'leaflet'
import "leaflet/dist/leaflet.css"
import icon from "leaflet/dist/images/marker-icon.png"
import iconShadow from "leaflet/dist/images/marker-shadow.png"
import { useEffect, useState } from "react";
import * as ELG from 'esri-leaflet-geocoder'

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
})

L.Marker.prototype.options.icons = DefaultIcon

const GeoCoderMarker = ({ address }) => {
  const map = useMap();
  const [position, setPosition] = useState([60, 19]);

useEffect(() => {
  ELG.geocode().text(address).run((err, results) => {
    if(results?.results?.length > 0) {
      const {lat, lng} = results.results[0].latlng
      setPosition([lat,lng])
      map.flyTo([lat,lng],6)
    }
  })
},[address])


  return (
    <Marker position={position} icon={DefaultIcon}>
      <Popup />
    </Marker>
  );
};

export default GeoCoderMarker;
