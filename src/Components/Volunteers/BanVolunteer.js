import axios from "axios";



const deleteVolunteerURL = 'https://ambrosiaalert.xyz/backend_code/api/volunteer/delete.php';

export default function BanVolunteer(volunteerMail){

   axios.delete(deleteVolunteerURL,
        {
            volunteerMail
        }

    ).then(
        volunteerMail => console.log(volunteerMail, "Volunteer deleted successfully")

    )
}

