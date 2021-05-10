import axios from 'axios'
import {decode as base64_decode, encode as base64_encode} from 'base-64';
const volunteersUrl = 'https://ambrosiaalert.xyz/backend_code/api/volunteer/read.php';
const newVolunteersUrl = 'https://ambrosiaalert.xyz/backend_code/api/new_volunteer/read.php';
let index = -1;

export let VolData=[];
const username = 'AA_user'
const password = 'ambrosiaAlertPass321'
const authHeader = 'Basic ' + base64_encode(`${username}:${password}`);
const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')
const proxyurl = "https://cors-anywhere.herokuapp.com/" //folosesc un proxi ca sa evit eroarea

 function getVolunteers(url,type) {

     axios.get(url)
        .then(response => {

            for (let x = 0; x < response.data.data.length; x++) {
                index++;
                const volData =
                    {
                        uid: index,
                        first_name: response.data.data[x].first_name,
                        last_name: response.data.data[x].last_name,
                        address: response.data.data[x].address,
                        phone: response.data.data[x].phone,
                        email: response.data.data[x].email,
                        type: type
                    }
                // console.log(volData)
                let isInList = false;
                VolData.forEach(vol => {
                    if (vol.email === volData.email) {
                        isInList = true;
                        return;
                    }
                })

                if(!isInList){
                VolData.push(volData);
                 }
            }


        })
         .catch(err=>{
             console.log(err)
         })
}


export default function GetAllVolunteers(){

     getVolunteers(volunteersUrl, 'Volunteer', VolData);
     getVolunteers(newVolunteersUrl, 'New Volunteer', VolData);

}
