import axios from "axios";

export default function getMarkersFromServer(url,markerID,markersVar)
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