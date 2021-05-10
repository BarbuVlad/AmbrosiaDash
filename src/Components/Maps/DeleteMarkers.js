import axios from 'axios'

export default function deleteMarkers(lat,lng,url,marker) {
    let convToTen =(num)=>  //conversie la 10 zecimale
    {
        return num.toFixed(10)
    }
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
    //const proxyurl = "https://cors-anywhere.herokuapp.com/" //folosesc un proxi ca sa evit eroarea
    axios.delete(url,
        {
            data
        }

    ).then(
        data => console.log(data, " a fost sters")

    )
    console.log(lat,lng)


}