import React, { useState, useEffect } from 'react'
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps'
import * as ItemsMaps from '../maps.json'
import mapStyle from "../mapStyle";

function Map() {
  const [ selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedItem(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);
  return  (
    <GoogleMap 
      defaultZoom={16}
      defaultCenter={{ lat: 39.432282, lng: -9.217094 }}
      // defaultCenter={{ lat: 45.421532, lng: -75.697189 }}
      defaultOptions={{ styles: mapStyle }}
      >
      { ItemsMaps.features.map( mItems => (
        <Marker 
        key={mItems.properties.PARK_ID}
        position={{ 
          lat: mItems.geometry.coordinates[1],
          lng: mItems.geometry.coordinates[0]
        }}
        onClick={() => {
          setSelectedItem(mItems)
        }}
        icon={{
          url: `/img_marker.svg`,
          scaledSize: new window.google.maps.Size( 50, 50)
        }} 
        />
        ))}
        { selectedItem && (
          <InfoWindow 
          position={{ 
            lat: selectedItem.geometry.coordinates[1],
            lng: selectedItem.geometry.coordinates[0]
          }}
          onCloseClick={() => {
            setSelectedItem(null);
          }}
          > 
            <div>
              <h4> { selectedItem.properties.NAME } </h4>
              <p> { selectedItem.properties.DESCRIPTIO } </p>
            </div>
          </InfoWindow>
        )}
    </GoogleMap>
  );
}
const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function MyMap() {
  return <div  style={{ width: "100vw",  height: "100vh" }}>
      <WrappedMap  
      googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
      loadingElement={ <div style={{ height: "100%" }} />} 
      containerElement={ <div style={{ height: "100%" }} />} 
      mapElement={ <div style={{ height: "100%" }} />} 
      />
  </div>
}
