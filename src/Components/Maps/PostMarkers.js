import axios from "axios";

export default function postToServer(lat, lng, url, radius) {

    const proxyurl =""// "https://cors-anywhere.herokuapp.com/" //folosesc un proxi ca sa evit eroarea

    axios.post(proxyurl+url,
        {
            "longitude":lng,
            "latitude":lat,
            "radius":radius,
        }
    ).then(console.log("LATLONG"))
}