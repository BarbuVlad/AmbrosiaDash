import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
    width: 'relative',
    height: '100%',
    position:'absolute',
    top:'0',
    right:'0',
    left: '160px'

};

const center = {
    lat: 45.760696,
    lng: 21.226788
};

function MyComponent() {
    return (
        <LoadScript
            googleMapsApiKey="AIzaSyCiqc443J4Axm0tZ_ECjOMOgRrwu56zTVA"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
            >
                { /* Child components, such as markers, info windows, etc. */ }
                <></>
            </GoogleMap>
        </LoadScript>
    )
}

export default React.memo(MyComponent)