import React, { useState, useEffect } from 'react'
import { GoogleMap,Marker,InfoWindow} from '@react-google-maps/api';
import Search from './Search'
import Locate from "./Locate"
import "@reach/combobox/styles.css";
import "./GMaps.css"
import axios from 'axios'
//

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

    let markerID=0;
    useEffect(() => {
    axios.get("http://92.87.91.16/backend_code/api/red_marker/read.php")
        .then(
            res => {
                console.log(res.data.data);
                for (let i = 0; i < res.data.data.length; i++) {
                    markerID=i;
                    setMarkers((current)=> [
                        ... current,
                        {
                            lng: parseFloat( res.data.data[i].latitude),
                            lat :  parseFloat(res.data.data[i].longitude),
                            id: i,

                        },
                    ]);
                }

            }
        );

    },[]);



const onMapClick = React.useCallback((e)=>{
        setMarkers((current)=> [
            ... current,
            {

                lat : e.latLng.lat(),
                lng : e.latLng.lng(),
               // time: new Date(),
                id : markerID,
            },
        ]);
    markerID++;
    },[]);

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);
    const panTo = React.useCallback(({lat, lng}) => {
      mapRef.current.panTo({lat, lng});
      mapRef.current.setZoom(14);

  }, []);

    return (


    <div>
        <h1>
            Ambrosia{" "}



        </h1>


            <GoogleMap
                id = "map"
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onClick={onMapClick}
                onLoad={onMapLoad}
            >

            <Locate panTo={panTo}/>
            <Search panTo={panTo}/>
                {  markers.map((marker)=>(
                    markerID++,


                    <Marker
                        key={markerID}
                        position={{ lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) }}
                        onClick={() => {
                            setSelected(marker);
                            console.log(markerID)
                            console.log(markers);
                        }}


                    />

                ))}

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
                                    console.log("deleted");

                                    }}
                            >
                                Remove</button>
                        </div>


                    </InfoWindow>
                ) : null}
                <></>
            </GoogleMap>
    </div>

    )
}

export default React.memo(MyComponent)
