import React, { useState, useEffect } from 'react'
import { GoogleMap,Marker,InfoWindow} from '@react-google-maps/api';
import Locate from "./Locate"
import "@reach/combobox/styles.css";
import "./GMaps.css"
import axios from 'axios'
import { Circle } from '@react-google-maps/api';
import Select from "react-select";
import { Multiselect} from "multiselect-react-dropdown";
//import Search from './Search'
let redPostUrl = 'http://92.87.91.16/backend_code/api/red_marker/create.php';
let redGetUrl = "http://92.87.91.16/backend_code/api/red_marker/read.php";
let redDeleteUrl = 'http://92.87.91.16/backend_code/api/red_marker/delete.php';

let blueGetUrl = 'http://92.87.91.16/backend_code/api/blue_marker/read.php';
let blueDeleteUrl = 'http://92.87.91.16/backend_code/api/blue_marker/delete.php';

let greyPostUrl='http://92.87.91.16/backend_code/api/grey_marker/create.php';
let greyGetUrl = 'http://92.87.91.16/backend_code/api/grey_marker/read.php';
let greyDeleteUrl = 'http://92.87.91.16/backend_code/api/grey_marker/delete.php';

//let yellowPostUrl='http://92.87.91.16/backend_code/api/yellow_marker/create.php';
let yellowGetUrl='http://92.87.91.16/backend_code/api/yellow_marker/read.php';
let yellowDeleteUrl='http://92.87.91.16/backend_code/api/yellow_marker/delete.php';

let opt = -1
let markerList=[];
const options = [
    { value: -1, label: 'None' },
    { value: 0, label: 'Place Markers' },
    //{ value: 1, label: 'Place Zones' },
    //{ value: 2, label: 'Edit Zones' },
];

const markerOption=[
    {id: 0,name :'Red'},
    {id: 1, name :'Blue'},
    {id: 2, name :'Yellow'},
    {id: 3, name :'Grey'},
    {id: 4, name :'Zone'}
]

const redMarkerVar=[];
const blueMarkerVar=[];
const yellowMarkerVar=[];
const greyMarkerVar=[];
const zoneVar=[];
let zonePostUrl='';
let zoneGetUrl='';
//let zoneDeleteUrl=''; util in momentul in care zonele o sa fie un obiect diferit fata de markerele rosii.

const center = {
    lat: 45.760696,
    lng: 21.226788
};

function postToServer(lat,lng,url)
{

    const proxyurl = "https://cors-anywhere.herokuapp.com/" //folosesc un proxi ca sa evit eroarea

    axios.post(proxyurl+url,
        {
            "longitude":lng,
            "latitude":lat
        }
    ).then(console.log("LATLONG"))
}

export function DropDownMenu() {

    const[selectedOption,setSelectedOption] = useState(-1)
    const handleChange = selectedOption => {
        setSelectedOption(selectedOption)
        opt = selectedOption
        console.log(`Option selected:`, selectedOption);
        console.log("OPT: "+ opt.value)
    };

    return (
        <Select
            value={selectedOption}
            onChange={handleChange}
            options={options}
            placeholder={"Options"}

        />
    );

}

export function CheckboxMarker() {
    const [selectedMarkers,setSelectedMakers] = useState(markerOption);

    const onSelect=(selectedMarkers)=>{
        markerList=selectedMarkers;
        console.log(markerList);
    }
    const onRemove=(selectedMarkers)=>{
        markerList=selectedMarkers;
    }
    return(
        <div className={'checkbox'}>
           <Multiselect
               options={selectedMarkers}
               displayValue="name"
               placeholder={"Select the markers"}
               onSelect={onSelect}
               onRemove={onRemove}

               />
        </div>
    )
}

function MyComponent() {

    let convToTen =(num)=>  //conversie la 10 zecimale
    {
        return num.toFixed(10)
    }

    //---------------------delte
    function deleteMarkers(lat,lng,url,color) {

        //------------------------------------------------red
        if(color === "red")
            for(let i = 0; i < redMarkerVar.length;i++)
            {
                if(convToTen(parseFloat(redMarkerVar[i].lat)) === lat && convToTen(parseFloat(redMarkerVar[i].lng))=== lng)
                {

                    redMarkerVar.splice(i,1);
                    setRedMarkers(redMarkerVar)
                    console.log(" red ma"+ redMarkers)


                }
            }

        //------------------------------------------blue
        if(color==="blue")
            for(let i = 0; i < blueMarkerVar.length;i++)
            {
                if(convToTen(parseFloat(blueMarkerVar[i].lat)) === lat && convToTen(parseFloat(blueMarkerVar[i].lng)) === lng)
                {
                    blueMarkerVar.splice(i,1);
                    setBlueMarkers(blueMarkerVar)
                    console.log(" blue ma"+ blueMarkers)
                }
            }

        //------------------------------------------grey
        if(color==="grey")
            for(let i = 0; i < greyMarkerVar.length;i++)
            {
                if(convToTen(parseFloat(greyMarkerVar[i].lat)) === lat && convToTen(parseFloat(greyMarkerVar[i].lng)) === lng)
                {
                    greyMarkerVar.splice(i,1);
                    setGreyMarkers(greyMarkerVar)
                    console.log(" grey ma"+ greyMarkers)
                }
            }

        //------------------------------------------yellow
        if(color==="yellow")
            for(let i = 0; i < yellowMarkerVar.length;i++)
            {
                if(convToTen(parseFloat(yellowMarkerVar[i].lat)) === lat && convToTen(parseFloat(yellowMarkerVar[i].lng)) === lng)
                {
                    yellowMarkerVar.splice(i,1);
                    setYellowMarkers(yellowMarkerVar)
                    console.log(" yellow ma"+ yellowMarkers)
                }
            }

        //------------------------------------------zone
        if(color==="zone")
            for(let i = 0; i < zone.length;i++)
            {
                if(convToTen(parseFloat(zone[i].lat)) === lat && convToTen(parseFloat(zone[i].lng)) === lng)
                {
                    zoneVar.splice(i,1);
                    setZone(zoneVar)
                    console.log(" zone"+ zone)
                }
            }

        //stergere din markers(DB)

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
    const [redMarkers, setRedMarkers] = useState([]);
    const [blueMarkers,setBlueMarkers] = useState([]);
    const [greyMarkers,setGreyMarkers] = useState([]);
    const [yellowMarkers,setYellowMarkers] = useState([]);
    const [redSelected, setRedSelected] = useState(null);
    const [blueSelected, setBlueSelected] = useState(null);
    const [greySelected, setGreySelected] = useState(null);
    const [yellowSelected, setYellowSelected] = useState(null);
    const [zone,setZone]=useState([]);
    //const [zoneSelected,setZoneSelected]=useState(null); util in momentul in care zonele o sa fie entitati diferite fata de markerele rosii.
    let zoneID=0;
    let markerRedID=0;
    let markerBlueID=0;
    let markerGreyID=0;
    let markerYellowID=0;

    const containerStyle = {
        width: 'relative',
        height: '100%',
        position:'absolute',
        top:'0',
        right:'0',
        left: '160px'

    };


    let alwaysGetMarkers = () => {
        getMarkersFromServer(redGetUrl, markerRedID, redMarkerVar);
        getMarkersFromServer(blueGetUrl, markerBlueID, blueMarkerVar);
        getMarkersFromServer(greyGetUrl, markerGreyID, greyMarkerVar);
        getMarkersFromServer(yellowGetUrl, markerYellowID, yellowMarkerVar);
        getMarkersFromServer(zoneGetUrl, zoneID, zoneVar);
        setTimeout(alwaysGetMarkers, 3000)
    }

   function getMarkersFromServer(url,markerID,markersVar)
    {
        axios.get(url)
            .then(
                res => {
                    console.log(res.data.data);
                    for (let i = 0; i < res.data.data.length; i++) {
                        markerID = i;
                        const setMarkers=
                            {
                                lng: parseFloat(res.data.data[i].longitude),
                                lat: parseFloat(res.data.data[i].latitude),
                                id: i,
                            }
                        let isInList=false;

                        markersVar.forEach(marker =>{
                            if((marker.lng === setMarkers.lng) &&(marker.lat === setMarkers.lat) ){
                                isInList=true;
                                return;
                            }
                        })
                        if(!isInList){
                            markersVar.push(setMarkers);
                        }
                    }
                }
            );

        markerList.map((list)=>((list.id===0))&&
            setRedMarkers(markersVar),
        )
        markerList.map((list)=>((list.id===1))&&
            setBlueMarkers(markersVar),
        )
        markerList.map((list)=>((list.id===2))&&
            setYellowMarkers(markersVar),
        )
        markerList.map((list)=>((list.id===3))&&
            setGreyMarkers(markersVar),
        )
        markerList.map((list)=>((list.id===4))&&
            setZone(markersVar),
        )

    }

    useEffect(() => {

        getMarkersFromServer(redGetUrl,markerRedID,redMarkerVar);
        getMarkersFromServer(blueGetUrl,markerBlueID,blueMarkerVar);
        getMarkersFromServer(greyGetUrl,markerGreyID,greyMarkerVar);
        getMarkersFromServer(yellowGetUrl,markerYellowID,yellowMarkerVar);
        getMarkersFromServer(zoneGetUrl,zoneID,zoneVar);
        alwaysGetMarkers();

// eslint-disable-next-line
    },[]);

    const onMapClick = React.useCallback((e) => {
        if(opt.value === 0){
            markerRedID++;
            const setMarkers= {
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
                id: markerRedID,
            }
            let isInList=false;

            redMarkerVar.forEach(marker =>{
                if((marker.lng === setMarkers.lng) &&(marker.lat === setMarkers.lat) ){
                    isInList=true;
                    return;
                }
            })
            if(!isInList){
                redMarkerVar.push(setMarkers);
            }
            
//apelare addserver
            postToServer(e.latLng.lat(), e.latLng.lng(), redPostUrl)
        }
        if( opt.value === 1)
        {
            zoneID++;
            setZone((current) => [
                ...current,
                {

                    lat: e.latLng.lat(),
                    lng: e.latLng.lng(),
                    id: zoneID,
                    radius: 500,

                },
            ]);
//apelare addserver
            postToServer(e.latLng.lat(), e.latLng.lng(), zonePostUrl)
        }
    }, [markerRedID, zoneID]);

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
            <GoogleMap
                id = "map"
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onClick={onMapClick}
                onLoad={onMapLoad}
            >
                <Locate panTo={panTo}/>
                {
                    markerList.map((list)=>((list.id===4))&&
                    redMarkerVar.map((marker)=>(// eslint-disable-next-line
                    markerRedID++,
                        <Circle
                            center={{
                                lat: parseFloat(marker.lat),
                                lng: parseFloat(marker.lng)

                            }}
                            radius={500}
                            options={{fillColor:'#FF0000',
                                strokeColor:"#8B0000"}}
                        />
                )))}
                {   markerList.map((list)=>((list.id===0))&&
                    redMarkerVar.map((marker)=>(

                        <Marker

                            key={markerRedID++}
                            position={{ lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) }}
                            icon = {{
                                url : "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_redA.png",
                                scaledSize: new window.google.maps.Size(25,43)}}
                            onClick={() => {
                                setRedSelected(marker);
                                console.log(markerRedID)
                                console.log(marker.lat);

                            }}
                        />

                )))
                }
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
                                        deleteMarkers(convToTen(parseFloat(redSelected.lat)), convToTen(parseFloat(redSelected.lng)), redDeleteUrl, "red");
                                        setRedSelected(null);
                                    }}
                            >
                                Remove</button>
                            <button className={"transform-marker"}
                                    onClick={()=>{
                                        console.log("transformat in gri");
                                        const setMarkers=
                                            {
                                                lat : redSelected.lat,
                                                lng : redSelected.lng,
                                                id : markerGreyID,
                                            }
                                        let isInList=false;
                                        greyMarkerVar.forEach(marker =>{
                                            if((marker.lng === setMarkers.lng) &&(marker.lat === setMarkers.lat) ){
                                                isInList=true;
                                                return;
                                            }
                                        })
                                        if(!isInList){
                                            greyMarkerVar.push(setMarkers);
                                        }
                                        setGreyMarkers(greyMarkerVar)
                                        postToServer(redSelected.lat,redSelected.lng,greyPostUrl);
                                        deleteMarkers(convToTen(parseFloat(redSelected.lat)),convToTen(parseFloat(redSelected.lng)),redDeleteUrl,"red");
                                        setRedSelected(null);
                                    }}
                            >Eradicated</button>
                        </div>
                    </InfoWindow>
                ) : null}

                {/*-------------------------------------------------------------------------------------------BLUE MARKER*/}
                { markerList.map((list)=>((list.id===1))&&
                    blueMarkerVar.map((markerBlue)=>(// eslint-disable-next-line
                    markerBlueID++,
                        <Marker
                            key={markerBlueID}
                            position={{ lat: parseFloat(markerBlue.lat), lng: parseFloat(markerBlue.lng) }}
                            icon = {{
                                url : "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_blueA.png",
                                scaledSize: new window.google.maps.Size(25,43)}}
                            onClick={() => {
                                setBlueSelected(markerBlue);
                                console.log(markerRedID)
                                console.log(markerBlue.lat);
                            }}
                        />
                )))}
                {blueSelected ? (
                    <InfoWindow
                        position={{ lat: blueSelected.lat+0.0003, lng: blueSelected.lng }}
                        onCloseClick={() => {
                            setBlueSelected(null);
                        }}
                    >
                        <div>
                            <h2> Possibile <br/>  Ambrosia!</h2>
                            <button className={"removeBlue-marker"}
                                    onClick={()=>{
                                        console.log("deleted");
                                        deleteMarkers(convToTen(parseFloat(blueSelected.lat)),convToTen(parseFloat(blueSelected.lng)),blueDeleteUrl,"blue");
                                        setBlueSelected(null);
                                    }}
                            >
                                Remove</button>
                        </div>
                    </InfoWindow>
                ) : null}
                {/*----------------------------------------------------------------------------greyMARKER*/}
                { markerList.map((list)=>((list.id===3))&&
                    greyMarkerVar.map((markerGrey)=>(// eslint-disable-next-line
                    markerGreyID++,
                        <Marker
                            key={markerGreyID}
                            position={{ lat: parseFloat(markerGrey.lat), lng: parseFloat(markerGrey.lng) }}
                            icon = {{
                                url : "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_greyA.png",
                                scaledSize: new window.google.maps.Size(25,43)}}
                            onClick={() => {
                                setGreySelected(markerGrey);
                                console.log(markerRedID)
                                console.log(markerGrey.lat);
                            }}
                        />
                )))}
                {
                    greySelected ? (
                    <InfoWindow
                        position={{ lat: greySelected.lat+0.0003, lng: greySelected.lng }}
                        onCloseClick={() => {
                            setGreySelected(null);

                        }}
                    >
                        <div>
                            <h2> There was  <br/>  Ambrosia!</h2>
                            <button className={"removeGrey-marker"}
                                    onClick={()=>{
                                        console.log("deleted");
                                        deleteMarkers(convToTen(parseFloat(greySelected.lat)),convToTen(parseFloat(greySelected.lng)),greyDeleteUrl,"grey");
                                        setGreySelected(null);
                                    }}
                            >
                                Remove</button>
                            <button className={"forSure-marker"}
                                    onClick={()=>{
                                        console.log("transformat in gri");
                                        const setMarkers=
                                            {
                                                lat : greySelected.lat,
                                                lng : greySelected.lng,
                                                id : markerRedID,

                                            }
                                        let isInList=false;
                                        redMarkerVar.forEach(marker =>{
                                            if((marker.lng === setMarkers.lng) &&(marker.lat === setMarkers.lat) ){
                                                isInList=true;
                                                return;
                                            }
                                        })
                                        if(!isInList){
                                            redMarkerVar.push(setMarkers);
                                        }
                                        setRedMarkers(redMarkerVar)
                                        postToServer(greySelected.lat,greySelected.lng,redPostUrl);
                                        deleteMarkers(convToTen(parseFloat(greySelected.lat)), convToTen(parseFloat(greySelected.lng)), greyDeleteUrl, "grey");
                                        setGreySelected(null);
                                    }}
                            >reappeared</button>
                        </div>
                    </InfoWindow>
                ) : null}
                { /*------------------------------------------------yellow*/}
                {   markerList.map((list)=>((list.id===2))&&
                    yellowMarkerVar.map((markerYellow)=>(// eslint-disable-next-line
                    markerYellowID++,
                        <Marker
                            key={markerYellowID}
                            icon = {{
                                url : "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_yellowA.png",
                                scaledSize: new window.google.maps.Size(25,43)}}
                            position={{ lat: parseFloat(markerYellow.lat), lng: parseFloat(markerYellow.lng) }}
                            onClick={() => {
                                setYellowSelected(markerYellow);
                                console.log(markerYellowID)
                                console.log(markerYellow.lat);
                            }}
                        />
                )))}
                {yellowSelected ? (
                    <InfoWindow
                        position={{ lat: yellowSelected.lat+0.0003, lng: yellowSelected.lng }}
                        onCloseClick={() => {
                            setYellowSelected(null);
                        }}
                    >
                        <div>
                            <h2>   Possible   <br/>  Ambrosia!  </h2>
                            <button className={"removeYellow-marker"}
                                    onClick={()=>{
                                        console.log("deleted");
                                        deleteMarkers(convToTen(parseFloat(yellowSelected.lat)),convToTen(parseFloat(yellowSelected.lng)),yellowDeleteUrl,"yellow");
                                        setYellowSelected(null);

                                    }}
                            >
                                Remove</button>
                            <button className={"forSure-marker"}
                                    onClick={()=>{
                                        console.log("transformat in rosu");
                                        const setMarkers=
                                            {
                                                lat : yellowSelected.lat,
                                                lng : yellowSelected.lng,
                                                id : markerRedID,
                                            }
                                        let isInList=false;
                                        redMarkerVar.forEach(marker =>{
                                            if((marker.lng === setMarkers.lng) &&(marker.lat === setMarkers.lat) ){
                                                isInList=true;
                                                return;
                                            }
                                        })
                                        if(!isInList){
                                            redMarkerVar.push(setMarkers);
                                        }
                                        setRedMarkers(redMarkerVar)
                                        postToServer(yellowSelected.lat,yellowSelected.lng,redPostUrl);
                                        deleteMarkers(convToTen(parseFloat(yellowSelected.lat)), convToTen(parseFloat(yellowSelected.lng)), yellowDeleteUrl, "yellow");
                                        setYellowSelected(null);
                                    }}
                            >For sure!</button>
                        </div>
                    </InfoWindow>
                ) : null}
                }
            </GoogleMap>
        </div>

    )
}

export default React.memo(MyComponent)

