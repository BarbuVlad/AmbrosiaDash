import React from "react";
import MUIDataTable from "mui-datatables";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import './Volunteers.css'
import GetAllVolunteers, {VolData}  from "./GetAllVolunteers";
import axios from "axios";



function Volunteers () {
    let Data = [];
    GetAllVolunteers();
    Data = VolData.map(vol => ([vol.uid, vol.first_name, vol.last_name, vol.address, vol.phone, vol.email, vol.type]))

    console.log("Data");
    console.log(Data);
    const columns = ["UID", "First Name", "Last Name", "Address", "Phone", "Email", "Type"];
    const options = {
        filterType: "dropdown",
        responsive: "scroll",
    }





        return (

            <MuiThemeProvider theme={myTheme}>

            <MUIDataTable
            className ={'table'}
                title={"List of Volunteers"}
                data ={Data}
                columns={columns}
                options={options}



            />
            </MuiThemeProvider>
        );



}

const myTheme = createMuiTheme({
    overrides: {

        MUIDataTable: {
            responsiveScroll: {
                maxHeight: "none"
            }

        }

    }

});
export  default Volunteers

