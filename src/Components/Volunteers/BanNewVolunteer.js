import axios from "axios";



const deleteNewVolunteerURL = 'http://92.87.91.16/backend_code/api/new_volunteer/delete.php'

export default function BanNewVolunteer(volunteerMail){

    axios.delete(deleteNewVolunteerURL,
        {
            volunteerMail
        }

    ).then(
        volunteerMail => console.log(volunteerMail," New volunteer deleted successfully")

    )
}



