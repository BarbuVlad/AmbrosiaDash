import React, { useState, useEffect } from 'react'
import { GoogleMap,Marker,InfoWindow,HeatmapLayer} from '@react-google-maps/api';
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

let uradMonitorGetUrl = 'http://data.uradmonitor.com/api/v1/devices'
let opt = -1 // variabila pentru optiunile de adaugare markere/zone
let markerList=[]; // lista cu tipurile de markerele active, care trebuie sa fie afisate pe ecran

//optinile de adaugare zone/markere rosii---------------------------------------------------------------------------
const options = [
    { value: -1, label: 'None' },
    { value: 0, label: 'Place Markers' },
    { value: 1, label: 'Place Zones' },
    //{ value: 2, label: 'Edit Zones' },
];

//optiunile pentru triajul markerelor----------------------------------------------------------------------------------
const markerOption=[
    {id: 0,name :'Red'},
    {id: 1, name :'Blue'},
    {id: 2, name :'Yellow'},
    {id: 3, name :'Grey'},
    {id: 4, name :'Zone'},
    {id: 5, name:'Heatmap'}
]

// variabile pentru fiecare tip de marker----------------------------------------------------------------------------
const redMarkerVar=[];
const blueMarkerVar=[];
const yellowMarkerVar=[];
const greyMarkerVar=[];
const zoneVar=[];
let uradMonitorVar=[];
let heatmapData=[];



const center = {
    lat: 45.760696,
    lng: 21.226788
};


//postare pe server a markerelor (in caz de cors policy dezactivare/activare proxy)---------------------------------
function postToServer(lat,lng,url,radius) {

    const proxyurl =""// "https://cors-anywhere.herokuapp.com/" //folosesc un proxi ca sa evit eroarea

    axios.post(proxyurl+url,
        {
            "longitude":lng,
            "latitude":lat,
            "radius":radius,
        }
    ).then(console.log("LATLONG"))
}


//meniu pentru a adauga markere rosii sau zone pe harta -------------------------------------------------------------
export function DropDownMenu() {

    const[selectedOption,setSelectedOption] = useState(-1)
    const handleChange = selectedOption => {
        setSelectedOption(selectedOption)
        opt = selectedOption
        console.log(`Option selected:`, selectedOption);
        console.log("OPT: "+ opt.value)
    };

    return (
        <div className={'dropDown1'}>
        <Select
            value={selectedOption}
            onChange={handleChange}
            options={options}
            placeholder={"Options"}

        />
        </div>
    );

}


//triaj markere ------------------------------------------------------------------------------------------------------
export function CheckboxMarker() {
    // eslint-disable-next-line
    const [selectedMarkers,setSelectedMakers] = useState(markerOption);

    const onSelect=(selectedMarkers)=>{
        markerList=selectedMarkers;
        console.log(markerList);
    }
    const onRemove=(selectedMarkers)=>{
        markerList=selectedMarkers;
    }
    return(
        <div className={'checkbox1'}>
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


//stergere markere atat de pe harta cat si din db ---------------------------------------------------------------------
    function deleteMarkers(lat,lng,url,marker) {

            for(let i = 0; i < marker.length;i++)
            {
                if(convToTen(parseFloat(marker[i].lat)) === lat && convToTen(parseFloat(marker[i].lng))=== lng)
                {
                    marker.splice(i,1);
                }
            }
    //stergere markers din DB

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

    const [redSelected, setRedSelected] = useState(null);
    const [blueSelected, setBlueSelected] = useState(null);
    const [greySelected, setGreySelected] = useState(null);
    const [yellowSelected, setYellowSelected] = useState(null);
    const [zoneSelected,setZoneSelected]=useState(null); //util in momentul in care zonele o sa fie entitati diferite fata de markerele rosii.
    // eslint-disable-next-line
    const [reRender,setReRender]=useState(0);
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

//apeleaza tragerea markerelor din db la 1 secunda, in functie de -------------------------
// markerele selectate pentru afisiere
    function getFromUrad(url,markersVar)
    {
        axios.get(url,{
            headers: {
                'X-User-id':'6991',
                'X-User-hash':'49b776d3689ddddb5535e3920a17083b'
                }
        })
            .then(
                res => {
                     console.log(res.data);
                    for (let i = 0; i < res.data.length; i++) {

                        const setMarkers=
                            {
                                lng: parseFloat(res.data[i].longitude),
                                lat: parseFloat(res.data[i].latitude),
                                id: res.data[i].id,


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
                    console.log(markersVar);

                }
            );




    }



    let alwaysGetMarkers =  () => {
    let heatmapbool = false;
        markerList.forEach(list=>{
            if(list.id===0)
            {
                getMarkersFromServer(redGetUrl, markerRedID, redMarkerVar);

            }
            if(list.id===1)
            {
                getMarkersFromServer(blueGetUrl, markerBlueID, blueMarkerVar);
            }
            if(list.id===2)
            {
                getMarkersFromServer(yellowGetUrl, markerYellowID, yellowMarkerVar);

            }
            if(list.id===3)
            {
                getMarkersFromServer(greyGetUrl, markerGreyID, greyMarkerVar);
            }
            if(list.id===4)
            {
                getMarkersFromServer(redGetUrl, zoneID, zoneVar);
                console.log(typeof list.id)
            }
            if(list.id===5)
            {
                //date uradmonitor
                getFromUrad(uradMonitorGetUrl,uradMonitorVar)
                heatmapData=uradMonitorVar.map((marker) => (new window.google.maps.LatLng(parseFloat(marker.lat), parseFloat(marker.lng))))
                heatmapbool=true;
            }

            if(list.id!==5&&heatmapbool===false)
            {
                heatmapData=[];
                setReRender(markerList.length+Math.random());
            }



        })

        setReRender(markerList.length+Math.random());
        setTimeout(alwaysGetMarkers, 1000)
    }


//tragere markere de pe server in variabile locale------------------------------------------
   function getMarkersFromServer(url,markerID,markersVar)
    {
        axios.get(url)
            .then(
                res => {
                   // console.log(res.data.data);
                    for (let i = 0; i < res.data.data.length; i++) {
                        markerID = i;
                        const setMarkers=
                            {
                                lng: parseFloat(res.data.data[i].longitude),
                                lat: parseFloat(res.data.data[i].latitude),
                                id: i,
                                radius: parseFloat(res.data.data[i].radius)

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
                    console.log(markersVar);

                }
            );

        


    }


    useEffect(() => {

        markerList.forEach(list=>{
            if(list.id===0)
            {
                getMarkersFromServer(redGetUrl, markerRedID, redMarkerVar);
            }
            if(list.id===1)
            {
                getMarkersFromServer(blueGetUrl, markerBlueID, blueMarkerVar);
            }
            if(list.id===2)
            {
                getMarkersFromServer(yellowGetUrl, markerYellowID, yellowMarkerVar);
            }
            if(list.id===3)
            {

                getMarkersFromServer(greyGetUrl, markerGreyID, greyMarkerVar);
            }
            if(list.id===4)
            {
                getMarkersFromServer(redGetUrl, zoneID, zoneVar);
            }
            if(list.id===5)
            {
                //date uradmonitor
                getFromUrad(uradMonitorGetUrl,uradMonitorVar)
                heatmapData=uradMonitorVar.map((marker) => (new window.google.maps.LatLng(parseFloat(marker.lat), parseFloat(marker.lng))))

            }





        })

        alwaysGetMarkers();


    },[]);

//adaugare markere/zone pe harta la click------------------------------------------------------
    const onMapClick = React.useCallback((e) => {
        if(opt.value === 0){
            markerRedID++;
            const setMarkers= {
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
                id: markerRedID,
                radius:50,
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
            postToServer(e.latLng.lat(), e.latLng.lng(), redPostUrl,50)
        }
        if( opt.value === 1){
            markerRedID++;
            const setMarkers=
                {
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng(),
                    id: markerRedID,
                    radius: 50000
                }
            zoneVar.push(setMarkers)
//apelare addserver
            postToServer(e.latLng.lat(), e.latLng.lng(), redPostUrl,5000)


        }
    }, [markerRedID]);

//localizare-----------------------------------------------------------------------------------
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
                        id="map"
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={10}
                        onClick={onMapClick}
                        onLoad={onMapLoad}


                    >



                        <HeatmapLayer

                        data={[...heatmapData]}


                        />



                        <Locate panTo={panTo}/>
                        {
                            markerList.map((list) => ((list.id === 4) &&
                                zoneVar.map((marker) => (
                                    (marker.radius > 50) &&
                                    <Circle
                                        center={{
                                            lat: parseFloat(marker.lat),
                                            lng: parseFloat(marker.lng)
                                        }}
                                        radius={marker.radius}
                                        options={{
                                            fillColor: '#FF0000',
                                            strokeColor: "#8B0000"
                                        }}
                                        onClick={() => {
                                            setZoneSelected(marker);
                                            console.log("radius zone:" + marker.radius);
                                        }}
                                    />
                                ))))
                        }

                        {
                            zoneSelected ? (
                                <InfoWindow
                                    position={{lat: zoneSelected.lat + 0.0003, lng: zoneSelected.lng}}
                                    onCloseClick={() => {
                                        setZoneSelected(null);
                                    }}
                                >
                                    <div>
                                        <h2> Ambrosia <br/>on <br/>{zoneSelected.radius * 3.14} m<sup>2</sup>!</h2>
                                        <button className={"remove-marker"}
                                                onClick={() => {
                                                    console.log("deleted");
                                                    deleteMarkers(convToTen(parseFloat(zoneSelected.lat)), convToTen(parseFloat(zoneSelected.lng)), redDeleteUrl, "zone");
                                                    setZoneSelected(null);
                                                }}
                                        >
                                            Remove
                                        </button>
                                        <button className={"transform-marker"}
                                                onClick={() => {
                                                    console.log("transformat in gri");
                                                    const setMarkers =
                                                        {
                                                            lat: zoneSelected.lat,
                                                            lng: zoneSelected.lng,
                                                            id: markerGreyID,
                                                        }
                                                    let isInList = false;
                                                    greyMarkerVar.forEach(marker => {
                                                        if ((marker.lng === setMarkers.lng) && (marker.lat === setMarkers.lat)) {
                                                            isInList = true;
                                                            return;
                                                        }
                                                    })
                                                    if (!isInList) {
                                                        greyMarkerVar.push(setMarkers);
                                                    }

                                                    postToServer(zoneSelected.lat, zoneSelected.lng, greyPostUrl, null);
                                                    deleteMarkers(convToTen(parseFloat(zoneSelected.lat)), convToTen(parseFloat(zoneSelected.lng)), redDeleteUrl, "zone");
                                                    setZoneSelected(null);
                                                }}
                                        >Eradicated
                                        </button>
                                    </div>
                                </InfoWindow>
                            ) : null}
                        {/*---------------------------------------------------------------RED MARKER*/}
                        {markerList.map((list) => ((list.id === 0) &&
                            redMarkerVar.map((marker) => (markerRedID++,

                                (marker.radius <= 50) &&


                                <Marker

                                    key={markerRedID}
                                    position={{lat: parseFloat(marker.lat), lng: parseFloat(marker.lng)}}
                                    icon={{
                                        url: "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_redA.png",
                                        scaledSize: new window.google.maps.Size(25, 43)
                                    }}
                                    onClick={() => {
                                        setRedSelected(marker);
                                        console.log("radius red:" + marker.radius);

                                    }}
                                />


                            ))))
                        }
                        {redSelected ? (

                            <InfoWindow
                                position={{lat: redSelected.lat + 0.0003, lng: redSelected.lng}}
                                onCloseClick={() => {
                                    setRedSelected(null);
                                }}
                            >
                                <div>
                                    <h2> Ambrosia!</h2>
                                    <button className={"remove-marker"}
                                            onClick={() => {
                                                console.log("deleted");
                                                deleteMarkers(convToTen(parseFloat(redSelected.lat)), convToTen(parseFloat(redSelected.lng)), redDeleteUrl, redMarkerVar);
                                                setRedSelected(null);
                                            }}
                                    >
                                        Remove
                                    </button>
                                    <button className={"transform-marker"}
                                            onClick={() => {
                                                console.log("transformat in gri");
                                                const setMarkers =
                                                    {
                                                        lat: redSelected.lat,
                                                        lng: redSelected.lng,
                                                        id: markerGreyID,
                                                    }
                                                let isInList = false;
                                                greyMarkerVar.forEach(marker => {
                                                    if ((marker.lng === setMarkers.lng) && (marker.lat === setMarkers.lat)) {
                                                        isInList = true;
                                                        return;
                                                    }
                                                })
                                                if (!isInList) {
                                                    greyMarkerVar.push(setMarkers);
                                                }

                                                postToServer(redSelected.lat, redSelected.lng, greyPostUrl, null);
                                                deleteMarkers(convToTen(parseFloat(redSelected.lat)), convToTen(parseFloat(redSelected.lng)), redDeleteUrl, redMarkerVar);
                                                setRedSelected(null);
                                            }}
                                    >Eradicated
                                    </button>
                                </div>
                            </InfoWindow>
                        ) : null}

                        {/*-------------------------------------------------------------------------------------------BLUE MARKER*/}
                        {markerList.map((list) => ((list.id === 1) &&
                            blueMarkerVar.map((markerBlue) => (
                                // eslint-disable-next-line
                                markerBlueID++,
                                    <Marker
                                        key={markerBlueID}
                                        position={{lat: parseFloat(markerBlue.lat), lng: parseFloat(markerBlue.lng)}}
                                        icon={{
                                            url: "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_blueA.png",
                                            scaledSize: new window.google.maps.Size(25, 43)
                                        }}
                                        onClick={() => {
                                            setBlueSelected(markerBlue);
                                            console.log("id blue:" + markerBlue.id);
                                        }}
                                    />
                            ))))
                        }
                        {blueSelected ? (
                            <InfoWindow
                                position={{lat: blueSelected.lat + 0.0003, lng: blueSelected.lng}}
                                onCloseClick={() => {
                                    setBlueSelected(null);
                                }}
                            >
                                <div>
                                    <h2> Possibile <br/> Ambrosia!</h2>
                                    <button className={"removeBlue-marker"}
                                            onClick={() => {
                                                console.log("deleted");
                                                deleteMarkers(convToTen(parseFloat(blueSelected.lat)), convToTen(parseFloat(blueSelected.lng)), blueDeleteUrl, blueMarkerVar);
                                                setBlueSelected(null);
                                            }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </InfoWindow>
                        ) : null}
                        {/*----------------------------------------------------------------------------greyMARKER*/}
                        {markerList.map((list) => ((list.id === 3)) &&
                            greyMarkerVar.map((markerGrey) => (
                                // eslint-disable-next-line
                                markerGreyID++,
                                    <Marker
                                        key={markerGreyID}
                                        position={{lat: parseFloat(markerGrey.lat), lng: parseFloat(markerGrey.lng)}}
                                        icon={{
                                            url: "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_greyA.png",
                                            scaledSize: new window.google.maps.Size(25, 43)
                                        }}
                                        onClick={() => {
                                            setGreySelected(markerGrey);
                                            console.log("id grey:" + markerGrey.lat);
                                        }}
                                    />
                            )))}
                        {
                            greySelected ? (
                                <InfoWindow
                                    position={{lat: greySelected.lat + 0.0003, lng: greySelected.lng}}
                                    onCloseClick={() => {
                                        setGreySelected(null);

                                    }}
                                >
                                    <div>
                                        <h2> There was <br/> Ambrosia!</h2>
                                        <button className={"removeGrey-marker"}
                                                onClick={() => {
                                                    console.log("deleted");
                                                    deleteMarkers(convToTen(parseFloat(greySelected.lat)), convToTen(parseFloat(greySelected.lng)), greyDeleteUrl, greyMarkerVar);
                                                    setGreySelected(null);
                                                }}
                                        >
                                            Remove
                                        </button>
                                        <button className={"forSure-marker"}
                                                onClick={() => {
                                                    console.log("transformat in gri");
                                                    const setMarkers =
                                                        {
                                                            lat: greySelected.lat,
                                                            lng: greySelected.lng,
                                                            id: markerRedID,

                                                        }
                                                    let isInList = false;
                                                    redMarkerVar.forEach(marker => {
                                                        if ((marker.lng === setMarkers.lng) && (marker.lat === setMarkers.lat)) {
                                                            isInList = true;
                                                            return;
                                                        }
                                                    })
                                                    if (!isInList) {
                                                        redMarkerVar.push(setMarkers);
                                                    }

                                                    postToServer(greySelected.lat, greySelected.lng, redPostUrl, 50);
                                                    deleteMarkers(convToTen(parseFloat(greySelected.lat)), convToTen(parseFloat(greySelected.lng)), greyDeleteUrl, greyMarkerVar);
                                                    setGreySelected(null);
                                                }}
                                        >reappeared
                                        </button>
                                    </div>
                                </InfoWindow>
                            ) : null}
                        { /*------------------------------------------------yellow*/}
                        {markerList.map((list) => ((list.id === 2)) &&
                            yellowMarkerVar.map((markerYellow) => (
                                // eslint-disable-next-line
                                markerYellowID++,
                                    <Marker
                                        key={markerYellowID}
                                        icon={{
                                            url: "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_yellowA.png",
                                            scaledSize: new window.google.maps.Size(25, 43)
                                        }}
                                        position={{
                                            lat: parseFloat(markerYellow.lat),
                                            lng: parseFloat(markerYellow.lng)
                                        }}
                                        onClick={() => {
                                            setYellowSelected(markerYellow);
                                            console.log("id yellow" + markerYellow.lat);
                                        }}
                                    />
                            )))}
                        {yellowSelected ? (
                            <InfoWindow
                                position={{lat: yellowSelected.lat + 0.0003, lng: yellowSelected.lng}}
                                onCloseClick={() => {
                                    setYellowSelected(null);
                                }}
                            >
                                <div>
                                    <h2> Possible <br/> Ambrosia! </h2>
                                    <button className={"removeYellow-marker"}
                                            onClick={() => {
                                                console.log("deleted");
                                                deleteMarkers(convToTen(parseFloat(yellowSelected.lat)), convToTen(parseFloat(yellowSelected.lng)), yellowDeleteUrl, yellowMarkerVar);
                                                setYellowSelected(null);

                                            }}
                                    >
                                        Remove
                                    </button>
                                    <button className={"forSure-marker"}
                                            onClick={() => {
                                                console.log("transformat in rosu");
                                                const setMarkers =
                                                    {
                                                        lat: yellowSelected.lat,
                                                        lng: yellowSelected.lng,
                                                        id: markerRedID,
                                                    }
                                                let isInList = false;
                                                redMarkerVar.forEach(marker => {
                                                    if ((marker.lng === setMarkers.lng) && (marker.lat === setMarkers.lat)) {
                                                        isInList = true;
                                                        return;
                                                    }
                                                })
                                                if (!isInList) {
                                                    redMarkerVar.push(setMarkers);
                                                }

                                                postToServer(yellowSelected.lat, yellowSelected.lng, redPostUrl, 50);
                                                deleteMarkers(convToTen(parseFloat(yellowSelected.lat)), convToTen(parseFloat(yellowSelected.lng)), yellowDeleteUrl, yellowMarkerVar);
                                                setYellowSelected(null);
                                            }}
                                    >For sure!
                                    </button>
                                </div>
                            </InfoWindow>
                        ) : null}
                        }
                    </GoogleMap>



        </div>

    )
}

export default React.memo(MyComponent)

