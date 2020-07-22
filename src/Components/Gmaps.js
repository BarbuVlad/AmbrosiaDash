import React from 'react'
import { GoogleMap, LoadScript ,Marker,InfoWindow} from '@react-google-maps/api';
import {Popup} from "react-leaflet";
import axios from "axios";



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
    const [markers, setMarkers] = React.useState([]);
    const [selected, setSelected] = React.useState(null);
    const onMapClick = React.useCallback((e)=>{
        setMarkers((current)=> [
            ... current,
            {

                lat : e.latLng.lat(),
                lng : e.latLng.lng(),
                time: new Date(),

            },
        ]);

    },[]);

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);
    return (
        <LoadScript
            googleMapsApiKey="AIzaSyCiqc443J4Axm0tZ_ECjOMOgRrwu56zTVA"
        >
    <div>
        <h1>
            Ambrosia{" "}
            <span role = "img" aria-label="redmarker" >

            </span>
        </h1>


            <GoogleMap
                id = "map"
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onClick={onMapClick}
                onLoad={onMapLoad}


            >
                { markers.map((marker)=>(


                    <Marker
                        key={`${marker.lat}-${marker.lng}-${marker.Date}`}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        onClick={() => {
                            setSelected(marker);

                        }}


                    />
                )) }

                {selected ? (

                    <InfoWindow

                        position={{ lat: selected.lat+0.00003, lng: selected.lng }}
                        onCloseClick={() => {
                            setSelected(null);
                        }}
                        >
                        <div>
                            <h2> Ambrozie!</h2>
                            <button className={"remove-marker"}
                                    onClick={()=>{

                                    }}
                            >
                                Remove</button>
                        </div>


                    </InfoWindow>
                ) : null}
                <></>
            </GoogleMap>
    </div>

        </LoadScript>
    )
}

export default React.memo(MyComponent)