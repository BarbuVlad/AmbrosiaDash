import axios from "axios";


const url ='http://92.87.91.16/backend_cod/api/new_volunteer/validate.php';
const proxyurl = "https://cors-anywhere.herokuapp.com/" //folosesc un proxi ca sa evit eroarea
export default function UpgradeVolunteer(volunteer,type){
   axios.post(url,
       {
           "email_volunteer": volunteer[5],
           "markers_action": type,
       },
       {
           headers:{
               'Access-Control-Allow-Origin':'*',
               'Content-Type': 'text/html',
               'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With,Accept',
               'Access-Control-Allow-Credentials': 'true',
               'Access-Control-Max-Age': '1000',

           }
       },).then(res => console.log(res.data.message))
}