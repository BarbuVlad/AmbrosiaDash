import React, { useState, useEffect } from 'react'
import { GoogleMap,Marker,InfoWindow} from '@react-google-maps/api';
import Search from './Search'
import Locate from "./Locate"
import "@reach/combobox/styles.css";
import "./GMaps.css"
import axios from 'axios'
import ButtonGroup from "@material-ui/core/ButtonGroup";


let redPostUrl = 'http://92.87.91.16/backend_code/api/red_marker/create.php';
let redGetUrl = "http://92.87.91.16/backend_code/api/red_marker/read.php";
let redDeleteUrl = 'http://92.87.91.16/backend_code/api/red_marker/delete.php';


let blueGetUrl = 'http://92.87.91.16/backend_code/api/blue_marker/read.php';
let blueDeleteUrl = 'http://92.87.91.16/backend_code/api/blue_marker/delete.php';

let greyPostUrl='http://92.87.91.16/backend_code/api/grey_marker/create.php';
let greyGetUrl = 'http://92.87.91.16/backend_code/api/grey_marker/read.php';
let greyDeleteUrl = 'http://92.87.91.16/backend_code/api/grey_marker/delete.php';


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

function postToServer(lat,lng,url)
{
    const proxyurl = "https://cors-anywhere.herokuapp.com/" //folosesc un proxi ca sa evit eroarea

    axios.post(proxyurl+url,
        {
            "latitude":lat,
            "longitude":lng



        }
    ).then(console.log("LATLONG")
    )
}
function deleteMarkers(lat,lng,url) {

    //stergere din markers

    let data ={
        "latitude": lat.toString(),
        "longitude": lng.toString()

    }
    axios.delete(url,
        {
            data
        }

    ).then(
        data => console.log(data, " a fost sters")

    )
    console.log(lat,lng)


}
function getMarkersFromServer(url,markerID,setMarkers)
{
    axios.get(url)
        .then(
            res => {
                console.log(res.data.data);
                for (let i = 0; i < res.data.data.length; i++) {
                    markerID = i;


                    setMarkers((current) => [
                        ...current,
                        {
                            lng: parseFloat(res.data.data[i].longitude),
                            lat: parseFloat(res.data.data[i].latitude),
                            id: i,

                        },
                    ]);



                }

            }
        );
}


function MyComponent() {
    const [redMarkers, setRedMarkers] = useState([]);
    const [blueMarkers,setBlueMarkers] = useState([]);
    const [greyMarkers,setGreyMarkers] = useState([]);

    const [redSelected, setRedSelected] = useState(null);
    const [blueSelected, setBlueSelected] = useState(null);
    const [greySelected, setGreySelected] = useState(null);

    let markerRedID=0;
    let markerBlueID=0;
    let markerGreyID=0;




    let alwaysGetMarkers =()=>{
        setRedMarkers([])

        setTimeout(alwaysGetMarkers, 60 * 1000)
    }

    useEffect(() => {

        getMarkersFromServer(redGetUrl,markerRedID,setRedMarkers);
        getMarkersFromServer(blueGetUrl,markerBlueID,setBlueMarkers);
        getMarkersFromServer(greyGetUrl,markerGreyID,setGreyMarkers);

    },[]);



    const onMapClick = React.useCallback((e)=>{
        markerRedID++;
        setRedMarkers((current)=> [
            ... current,
            {

                lat : e.latLng.lat(),
                lng : e.latLng.lng(),
                id : markerRedID,

            },
        ]);
//apelare addserver
        postToServer(e.latLng.lat(),e.latLng.lng(),redPostUrl)
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
                {  redMarkers.map((marker)=>(
                    markerRedID++,


                        <Marker
                            key={markerRedID}
                            position={{ lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) }}
                            onClick={() => {
                                setRedSelected(marker);
                                console.log(markerRedID)
                                console.log(marker.lat);
                            }}


                        />


                ))}

                {redSelected ? (

                    <InfoWindow

                        position={{ lat: redSelected.lat+0.0003, lng: redSelected.lng }}
                        onCloseClick={() => {
                            setRedSelected(null);

                        }}
                    >
                        <div>
                            <h2> Ambrosia!</h2>


                            <button className={"remove-marker"}
                                    onClick={()=>{
                                        console.log("deleted");
                                        deleteMarkers(redSelected.lat,redSelected.lng,redDeleteUrl);

                                        setRedMarkers([])
                                        getMarkersFromServer(redGetUrl,markerRedID,setRedMarkers);
                                        setRedSelected(null);

                                    }}
                            >
                                Remove</button>
                            <button className={"transform-marker"}
                                    onClick={()=>{
                                        console.log("transformat in gri");
                                        setGreyMarkers((current)=> [
                                            ... current,
                                            {

                                                lat : redSelected.lat,
                                                lng : redSelected.lng,
                                                id : markerGreyID,

                                            },
                                        ]);


                                        postToServer(redSelected.lng,redSelected.lat,greyPostUrl);

                                        deleteMarkers(redSelected.lat,redSelected.lng,redDeleteUrl);
                                        setRedMarkers([])
                                        getMarkersFromServer(redGetUrl,markerRedID,setRedMarkers);
                                        setRedSelected(null);


                                    }}
                                    >Eradicated</button>

                        </div>



                    </InfoWindow>
                ) : null}
                <></>
//-------------------------------------------------------------------------------------------BLUE MARKER
                {blueMarkers.map((markerBlue)=>(
                markerBlueID++,


                <Marker
                    key={markerBlueID}
                    position={{ lat: parseFloat(markerBlue.lat), lng: parseFloat(markerBlue.lng) }}
                    icon = {{
                        url : "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_blue.png",
                    scaledSize: new window.google.maps.Size(25,43)}}
                    onClick={() => {
                        setBlueSelected(markerBlue);
                        console.log(markerRedID)
                        console.log(markerBlue.lat);

                    }}


                />



                ))}
                {blueSelected ? (

                    <InfoWindow

                        position={{ lat: blueSelected.lat+0.0003, lng: blueSelected.lng }}
                        onCloseClick={() => {
                            setBlueSelected(null);

                        }}
                    >
                        <div>
                            <h2> Possibile Ambrosia!</h2>
                            <button className={"removeBlue-marker"}
                                    onClick={()=>{
                                        console.log("deleted");
                                        deleteMarkers(blueSelected.lat,blueSelected.lng,blueDeleteUrl);

                                        setBlueMarkers([])
                                        getMarkersFromServer(blueGetUrl,markerBlueID,setBlueMarkers);
                                        setBlueSelected(null);

                                    }}
                            >
                                Remove</button>
                        </div>



                    </InfoWindow>
                ) : null}
//----------------------------------------------------------------------------grey MARKER
                {greyMarkers.map((markerGrey)=>(
                    markerGreyID++,


                        <Marker
                            key={markerGreyID}
                            position={{ lat: parseFloat(markerGrey.lat), lng: parseFloat(markerGrey.lng) }}
                            icon = {{
                                url : "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_grey.png",
                                scaledSize: new window.google.maps.Size(25,43)}}
                            onClick={() => {
                                setGreySelected(markerGrey);
                                console.log(markerRedID)
                                console.log(markerGrey.lat);

                            }}


                        />



                ))}
                {greySelected ? (

                    <InfoWindow

                        position={{ lat: greySelected.lat+0.0003, lng: greySelected.lng }}
                        onCloseClick={() => {
                            setGreySelected(null);

                        }}
                    >
                        <div>
                            <h2> There was Ambrosia!</h2>
                            <button className={"removeGrey-marker"}
                                    onClick={()=>{
                                        console.log("deleted");
                                        deleteMarkers(greySelected.lat,greySelected.lng,greyDeleteUrl);

                                        setGreyMarkers([])
                                        getMarkersFromServer(greyGetUrl,markerGreyID,setGreyMarkers);
                                        setGreySelected(null);

                                    }}
                            >
                                Remove</button>
                        </div>



                    </InfoWindow>
                ) : null}
            </GoogleMap>
        </div>

    )
}

export default React.memo(MyComponent)
