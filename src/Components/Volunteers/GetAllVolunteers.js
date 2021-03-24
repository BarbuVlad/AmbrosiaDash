import axios from 'axios'
const volunteersUrl = 'http://92.87.91.16/backend_code/api/volunteer/read.php';
const newVolunteersUrl = 'http://92.87.91.16/backend_code/api/new_volunteer/read.php';
let index = -1;

export let VolData=[];


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
}


export default function GetAllVolunteers(){

     getVolunteers(volunteersUrl, 'Volunteer', VolData);
     getVolunteers(newVolunteersUrl, 'New Volunteer', VolData);

}
