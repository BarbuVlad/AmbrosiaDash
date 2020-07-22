import React from 'react'
import { GoogleMap,Marker,InfoWindow} from '@react-google-maps/api';
import Search from './Search'
import Locate from "./Locate"
import "@reach/combobox/styles.css";
import "./GMaps.css"



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
    const panTo = React.useCallback(({lat, lng}) => {
      mapRef.current.panTo({lat, lng});
      mapRef.current.setZoom(14);

  }, []);
    return (


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
            <Locate panTo={panTo}/>
            <Search panTo={panTo}/>
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

    )
}

export default React.memo(MyComponent)
