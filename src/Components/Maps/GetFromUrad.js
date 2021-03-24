import axios from "axios";

export default function getFromUrad(url,markersVar)
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