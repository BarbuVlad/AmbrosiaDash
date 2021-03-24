import axios from "axios";



const deleteVolunteerURL = 'http://92.87.91.16/backend_code/api/volunteer/delete.php';

export default function BanVolunteer(volunteerMail){

   axios.delete(deleteVolunteerURL,
        {
            volunteerMail
        }

    ).then(
        volunteerMail => console.log(volunteerMail, "Volunteer deleted successfully")

    )
}

