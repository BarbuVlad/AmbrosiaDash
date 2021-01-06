import React, { useState, useEffect } from 'react'
import { GoogleMap,Marker,InfoWindow} from '@react-google-maps/api';
import Search from './Search'
import Locate from "./Locate"
import "@reach/combobox/styles.css";
import "./GMaps.css"
import axios from 'axios'
import { Circle } from '@react-google-maps/api';
import Select from "react-select";


let redPostUrl = 'http://92.87.91.16/backend_code/api/red_marker/create.php';
let redGetUrl = "http://92.87.91.16/backend_code/api/red_marker/read.php";
let redDeleteUrl = 'http://92.87.91.16/backend_code/api/red_marker/delete.php';


let blueGetUrl = 'http://92.87.91.16/backend_code/api/blue_marker/read.php';
let blueDeleteUrl = 'http://92.87.91.16/backend_code/api/blue_marker/delete.php';

let greyPostUrl='http://92.87.91.16/backend_code/api/grey_marker/create.php';
let greyGetUrl = 'http://92.87.91.16/backend_code/api/grey_marker/read.php';
let greyDeleteUrl = 'http://92.87.91.16/backend_code/api/grey_marker/delete.php';

let yellowPostUrl='http://92.87.91.16/backend_code/api/yellow_marker/create.php';
let yellowGetUrl='http://92.87.91.16/backend_code/api/yellow_marker/read.php';
let yellowDeleteUrl='http://92.87.91.16/backend_code/api/yellow_marker/delete.php';
let opt = -1
const options = [
    { value: -1, label: 'None' },
    { value: 0, label: 'Place Markers' },
    //{ value: 1, label: 'Place Zones' },
    //{ value: 2, label: 'Edit Zones' },
];



let resizeZone=false;

let zonePostUrl='';
let zoneGetUrl='';
let zoneDeleteUrl='';


const center = {
    lat: 45.760696,
    lng: 21.226788
};
function centru (lat,lng)
{
    const center ={
        lat : lat,
        lng : lng
    }
    return center;
}

function postToServer(lat,lng,url)
{

    const proxyurl = "https://cors-anywhere.herokuapp.com/" //folosesc un proxi ca sa evit eroarea

    axios.post(proxyurl+url,
        {
            "longitude":lng,
            "latitude":lat




        }
    ).then(console.log("LATLONG")
    )
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




function MyComponent() {




    let convToTen =(num)=>  //conversie la 10 zecimale
    {
        return num.toFixed(10)
    }

    //---------------------delte
    function deleteMarkers(lat,lng,url,color) {

        //remove locally from markers
        /*
                lat = convToTen(lat)
                lng = convToTen(lng)*/
        let j;
        let tempMarkers=[]
        //------------------------------------------------red
        if(color === "red")
            for(let i = 0; i < redMarkers.length;i++)
            {

                /*     console.log("lat: "+redMarkers[i].lat + "  "+ lat)
                     console.log("lng: "+ redMarkers[i].lng + "   "+lng)*/
                if(convToTen(parseFloat(redMarkers[i].lat)) === lat && convToTen(parseFloat(redMarkers[i].lng))=== lng)
                {
                    j=i;
                    for(let i=0;i<j;i++)
                        tempMarkers.push(redMarkers[i]);
                    for(let i=j+1;i< redMarkers.length;i++)
                        tempMarkers.push(redMarkers[i]);

                    setRedMarkers(tempMarkers)
                    console.log(" red ma"+ redMarkers)


                }
            }
        tempMarkers=[];
        //------------------------------------------blue
        if(color==="blue")
            for(let i = 0; i < blueMarkers.length;i++)
            {

                /*     console.log("lat: "+blueMarkers[i].lat + "  "+ lat)
                     console.log("lng: "+ blueMarkers[i].lng + "   "+lng)*/
                if(convToTen(parseFloat(blueMarkers[i].lat)) === lat && convToTen(parseFloat(blueMarkers[i].lng)) === lng)
                {
                    j=i;
                    for(let i=0;i<j;i++)
                        tempMarkers.push(blueMarkers[i]);
                    for(let i=j+1;i< blueMarkers.length;i++)
                        tempMarkers.push(blueMarkers[i]);

                    setBlueMarkers(tempMarkers)
                    console.log(" blue ma"+ blueMarkers)


                }
            }
        tempMarkers=[];
        //------------------------------------------grey
        if(color==="grey")
            for(let i = 0; i < greyMarkers.length;i++)
            {

                /*     console.log("lat: "+greyMarkers[i].lat + "  "+ lat)
                     console.log("lng: "+ greyMarkers[i].lng + "   "+lng)*/
                if(convToTen(parseFloat(greyMarkers[i].lat)) === lat && convToTen(parseFloat(greyMarkers[i].lng)) === lng)
                {
                    j=i;
                    for(let i=0;i<j;i++)
                        tempMarkers.push(greyMarkers[i]);
                    for(let i=j+1;i< greyMarkers.length;i++)
                        tempMarkers.push(greyMarkers[i]);

                    setGreyMarkers(tempMarkers)
                    console.log(" grey ma"+ greyMarkers)


                }
            }
        tempMarkers=[];
        //------------------------------------------yellow
        if(color==="yellow")
            for(let i = 0; i < yellowMarkers.length;i++)
            {

                /*     console.log("lat: "+yellowMarkers[i].lat + "  "+ lat)
                     console.log("lng: "+ yellowMarkers[i].lng + "   "+lng)*/
                if(convToTen(parseFloat(yellowMarkers[i].lat)) === lat && convToTen(parseFloat(yellowMarkers[i].lng)) === lng)
                {
                    j=i;
                    for(let i=0;i<j;i++)
                        tempMarkers.push(yellowMarkers[i]);
                    for(let i=j+1;i< yellowMarkers.length;i++)
                        tempMarkers.push(yellowMarkers[i]);

                    setYellowMarkers(tempMarkers)
                    console.log(" yellow ma"+ yellowMarkers)


                }
            }
        tempMarkers=[];
        //------------------------------------------zone
        if(color==="zone")
            for(let i = 0; i < zone.length;i++)
            {


                if(convToTen(parseFloat(zone[i].lat)) === lat && convToTen(parseFloat(zone[i].lng)) === lng)
                {
                    j=i;
                    for(let i=0;i<j;i++)
                        tempMarkers.push(zone[i]);
                    for(let i=j+1;i< zone.length;i++)
                        tempMarkers.push(zone[i]);

                    setZone(tempMarkers)
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
    const [zoneSelected,setZoneSelected]=useState(null);
    let zoneID=0;

    let markerRedID=0;
    let markerBlueID=0;
    let markerGreyID=0;
    let markerYellowID=0;


    let zoneOptionsTrue = {
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        clickable: true,
        draggable: false,
        editable: true,
        radius :zone.radius,
        visible: true,
        zIndex: 1
    }
    let zoneOptionsFalse = {
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        clickable: true,
        draggable: false,
        editable: false,
        radius:zone.radius,
        visible: true,
        zIndex: 1
    }
    const containerStyle = {
        width: 'relative',
        height: '100%',
        position:'absolute',
        top:'0',
        right:'0',
        left: '160px'

    };



    let test=0;
    const [edit,setEdit]=useState(0);
    function editZones() {

        if(opt.value === 2)
        {
            console.log("val opt "+ opt.value);



            return zoneOptionsTrue

        }
        else {



            return zoneOptionsFalse

        }

    }




    let alwaysGetMarkers =()=>{

        setRedMarkers([])
        setBlueMarkers([])
        setGreyMarkers([])
        setYellowMarkers([])
        setZone([])
        getMarkersFromServer(redGetUrl,markerRedID,setRedMarkers);
        getMarkersFromServer(blueGetUrl,markerBlueID,setBlueMarkers);
        getMarkersFromServer(greyGetUrl,markerGreyID,setGreyMarkers);
        getMarkersFromServer(yellowGetUrl,markerYellowID,setYellowMarkers);
        getMarkersFromServer(zoneGetUrl,zoneID,setZone);
        setTimeout(alwaysGetMarkers, 20 * 1000)
    }

    useEffect(() => {

        getMarkersFromServer(redGetUrl,markerRedID,setRedMarkers);
        getMarkersFromServer(blueGetUrl,markerBlueID,setBlueMarkers);
        getMarkersFromServer(greyGetUrl,markerGreyID,setGreyMarkers);
        getMarkersFromServer(yellowGetUrl,markerYellowID,setYellowMarkers);
        getMarkersFromServer(zoneGetUrl,zoneID,setZone);
        alwaysGetMarkers();

    },[]);


    const onMapClick = React.useCallback((e) => {
        if(opt.value === 0){
            markerRedID++;
            setRedMarkers((current) => [
                ...current,
                {

                    lat: e.latLng.lat(),
                    lng: e.latLng.lng(),
                    id: markerRedID,

                },
            ]);
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
    }, []);



    const onZoneLoad = circle => {
        console.log('Circle onLoad circle: ', circle)
    }

    const onZoneUnmount = circle => {
        console.log('Circle onUnmount circle: ', circle)
    }
    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);
    const panTo = React.useCallback(({lat, lng}) => {
        mapRef.current.panTo({lat, lng});
        mapRef.current.setZoom(14);

    }, []);
    function updateRadius() {
        let updatedRadius= 1000000;
       return  updatedRadius ;
    }
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

                {  redMarkers.map((marker)=>(
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



                ))}



                {  redMarkers.map((marker)=>(
                    markerRedID++,


                        <Marker
                            key={markerRedID}
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

                                        deleteMarkers(convToTen(parseFloat(redSelected.lat)), convToTen(parseFloat(redSelected.lng)), redDeleteUrl, "red");




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


                                        postToServer(redSelected.lat,redSelected.lng,greyPostUrl);

                                        deleteMarkers(convToTen(parseFloat(redSelected.lat)),convToTen(parseFloat(redSelected.lng)),redDeleteUrl,"red");


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
                                url : "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_blueA.png",
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
                //----------------------------------------------------------------------------grey MARKER
                {greyMarkers.map((markerGrey)=>(
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



                ))}
                {greySelected ? (

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
                                        setRedMarkers((current)=> [
                                            ... current,
                                            {

                                                lat : greySelected.lat,
                                                lng : greySelected.lng,
                                                id : markerGreyID,

                                            },
                                        ]);


                                        postToServer(greySelected.lat,greySelected.lng,redPostUrl);

                                        deleteMarkers(convToTen(parseFloat(greySelected.lat)), convToTen(parseFloat(greySelected.lng)), greyDeleteUrl, "grey");


                                        setGreySelected(null);


                                    }}
                            >reappeared</button>
                        </div>



                    </InfoWindow>
                ) : null}
                //------------------------------------------------yellow
                {  yellowMarkers.map((markerYellow)=>(
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


                ))}

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
                                        console.log("transformat in gri");
                                        setRedMarkers((current)=> [
                                            ... current,
                                            {

                                                lat : yellowSelected.lat,
                                                lng : yellowSelected.lng,
                                                id : markerRedID,

                                            },
                                        ]);


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

