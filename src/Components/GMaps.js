import React, { useState, useEffect } from 'react'
import { GoogleMap,Marker,InfoWindow} from '@react-google-maps/api';
import Search from './Search'
import Locate from "./Locate"
import "@reach/combobox/styles.css";
import "./GMaps.css"
import axios from 'axios'
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { Polygon } from '@react-google-maps/api'


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

let zonePostUrl='';
let zoneGetUrl='';
let zoneDeleteUrl='';

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
}/*
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


}*/
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






    function countDecimals(number)
    {
        var char_array = number.toString().split(""); // split every single char
        var not_decimal = char_array.lastIndexOf(".");
        return (not_decimal<0)?0:char_array.length - not_decimal;
    }
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
        if(color=="red")
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
        if(color=="blue")
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
        if(color=="grey")
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
        if(color=="yellow")
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



    let alwaysGetMarkers =()=>{
        setRedMarkers([])
        setBlueMarkers([])
        setGreyMarkers([])
        setYellowMarkers([])
        //setZone([])
        getMarkersFromServer(redGetUrl,markerRedID,setRedMarkers);
        getMarkersFromServer(blueGetUrl,markerBlueID,setBlueMarkers);
        getMarkersFromServer(greyGetUrl,markerGreyID,setGreyMarkers);
        getMarkersFromServer(yellowGetUrl,markerYellowID,setYellowMarkers);
        //getMarkersFromServer(zoneGetUrl,zoneID,setZone);
        setTimeout(alwaysGetMarkers, 60 * 1000)
    }

    useEffect(() => {

        getMarkersFromServer(redGetUrl,markerRedID,setRedMarkers);
        getMarkersFromServer(blueGetUrl,markerBlueID,setBlueMarkers);
        getMarkersFromServer(greyGetUrl,markerGreyID,setGreyMarkers);
        getMarkersFromServer(yellowGetUrl,markerYellowID,setYellowMarkers);
        //getMarkersFromServer(zoneGetUrl,zoneID,setZone);
    },[]);



    const onMapClick = React.useCallback((e)=>{
        markerYellowID++;
        setYellowMarkers((current)=> [
            ... current,
            {

                lat : e.latLng.lat(),
                lng : e.latLng.lng(),
                id : markerYellowID,

            },
        ]);
//apelare addserver
        postToServer(e.latLng.lat(),e.latLng.lng(),yellowPostUrl)
    },[]);
    /*const onZoneLoad = polygon => {
        console.log("polygon: ", polygon);
    }*/
    /*  const polygonRef = React.useRef(null);
      const listenersRef = React.useRef([]);*/
    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);
    const panTo = React.useCallback(({lat, lng}) => {
        mapRef.current.panTo({lat, lng});
        mapRef.current.setZoom(14);

    }, []);
    /* asta tinea de polygon
    const onEdit = React.useCallback(() => {
         if (polygonRef.current) {
             const nextPath = polygonRef.current
                 .getPath()
                 .getArray()
                 .map(latLng => {
                     return { lat: latLng.lat(), lng: latLng.lng() };
                 });
             setPath(nextPath);
         }
     }, [setPath]);
     const onLoad = React.useCallback(
         polygon => {
             polygonRef.current = polygon;
             const path = polygon.getPath();
             listenersRef.current.push(
                 path.addListener("set_at", onEdit),
                 path.addListener("insert_at", onEdit),
                 path.addListener("remove_at", onEdit)
             );
         },
         [onEdit]
     );
     const onUnmount = React.useCallback(() => {
         listenersRef.current.forEach(lis => lis.remove());
         polygonRef.current = null;
     }, []);
 */
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

                                        deleteMarkers(convToTen(parseFloat(redSelected.lat)), convToTen(parseFloat(redSelected.lng)), redDeleteUrl, "red");



                                        /*setRedMarkers([])
                                        setTimeout(200)
                                        getMarkersFromServer(redGetUrl,markerRedID,setRedMarkers);*/
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

                                        /* setRedMarkers([])
                                         setTimeout(200)
                                         getMarkersFromServer(redGetUrl,markerRedID,setRedMarkers);*/
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
                                        deleteMarkers(convToTen(parseFloat(blueSelected.lat)),convToTen(parseFloat(blueSelected.lng)),blueDeleteUrl,"blue");

                                        /*setBlueMarkers([])
                                        setTimeout(200)
                                        getMarkersFromServer(blueGetUrl,markerBlueID,setBlueMarkers);*/
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
                                        deleteMarkers(convToTen(parseFloat(greySelected.lat)),convToTen(parseFloat(greySelected.lng)),greyDeleteUrl,"grey");

                                        /*setGreyMarkers([])
                                        setTimeout(200)
                                        getMarkersFromServer(greyGetUrl,markerGreyID,setGreyMarkers);*/
                                        setGreySelected(null);

                                    }}
                            >
                                Remove</button>
                        </div>



                    </InfoWindow>
                ) : null}
                //------------------------------------------------yellow
                {  yellowMarkers.map((markerYellow)=>(
                    markerYellowID++,


                        <Marker
                            key={markerYellowID}
                            icon = {{
                                url : "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_yellow.png",
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
                            <h2> Possible Ambrosia!</h2>


                            <button className={"removeYellow-marker"}
                                    onClick={()=>{
                                        console.log("deleted");
                                        deleteMarkers(convToTen(parseFloat(yellowSelected.lat)),convToTen(parseFloat(yellowSelected.lng)),yellowDeleteUrl,"yellow");

                                        /*setYellowMarkers([])
                                        setTimeout(200)
                                        getMarkersFromServer(yellowGetUrl,markerYellowID,setYellowMarkers);*/
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

                                        /* setYellowMarkers([])
                                         setTimeout(200)
                                         getMarkersFromServer(yellowGetUrl,markerYellowID,setYellowMarkers);*/
                                        setYellowSelected(null);


                                    }}
                            >For sure!</button>
                        </div>



                    </InfoWindow>
                ) : null}
                }
                {//polygon
                    /* {path.map((zone)=>(
                 <Polygon

                     editable
                     draggable
                     path={{lat1:parseFloat(zone.lat1),lng1:parseFloat(zone.lng1),lat2:parseFloat(zone.lat2),lng2:parseFloat(zone.lng2),lat3:parseFloat(zone.lat3),lng3:parseFloat(zone.lng3)}}
                     // Event used when manipulating and adding points
                     onMouseUp={onEdit}
                     // Event used when dragging the whole Polygon
                     onDragEnd={onEdit}
                     onLoad={onLoad}
                     onUnmount={onUnmount}
                 />



                 ))}*/}
                {zone.map((zone)=>(
                    zoneID++,


                        <Marker
                            key={zoneID}
                            position={{ lat: parseFloat(zone.lat), lng: parseFloat(zone.lng) }}
                            icon = {{
                                url : "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_green.png",

                                scaledSize: new window.google.maps.Size(30,60)}}
                            style={{opacity: 0.9}}
                            onClick={() => {
                                setZoneSelected(zone);
                                console.log(markerRedID)
                                console.log(zone.lat);

                            }}


                        />



                ))}
                {zoneSelected ? (

                    <InfoWindow

                        position={{ lat: zoneSelected.lat+0.0003, lng: zoneSelected.lng }}

                        onCloseClick={() => {
                            setZoneSelected(null);

                        }}
                    >
                        <div>
                            <h2> There IS Ambrosia!</h2>
                            <button className={"removeGrey-marker"}
                                    onClick={()=>{
                                        console.log("deleted");
                                        //deleteMarkers(convToTen(parseFloat(zoneSelected.lat)),convToTen(parseFloat(zoneSelected.lng)),zoneDeleteUrl,"zone");


                                        setZoneSelected(null);

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
