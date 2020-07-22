import React,{ useRef } from 'react'
import {GoogleMap,} from '@react-google-maps/api';
import "@reach/combobox/styles.css";
import "./GMaps.css"
import "@reach/combobox/styles.css";
import Search from './Search'
import Locate from "./Locate"



const containerStyle = {
    width: 'relative',
    height: '100%',
    position: 'absolute',
    top: '0',
    right: '0',
    left: '160px'

};

const center = {
    lat: 45.760696,
    lng: 21.226788
};

function MyComponent() {


    const mapRef = useRef();

    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map
    }, []);

    const panTo = React.useCallback(({lat, lng}) => {
        mapRef.current.panTo({lat, lng});
        mapRef.current.setZoom(14);

    }, []);


    return (


        <GoogleMap
            id="map"
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onMapLoad}
        >
            <Locate panTo={panTo}/>
            <Search panTo={panTo}/>
            { /* Child components, such as markers, info windows, etc. */}
            <></>
        </GoogleMap>

    );

}

export default React.memo(MyComponent)

