import React from "react";
import MUIDataTable from "mui-datatables";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import './Volunteers.css'
import GetAllVolunteers, {VolData}  from "./GetAllVolunteers";
import BanVolunteer from "./BanVolunteer";
import BanNewVolunteer from "./BanNewVolunteer";
import UpgradeVolunteer from "./UpgradeVolunteer";

let Data = [];
GetAllVolunteers();
let volunteer;



//obtin index pentru randul la care vreau sa modific tipul voluntarului

function Volunteers () {
    //Copiez datele din db in variabila locala
    Data = VolData.map(vol => ([vol.uid, vol.first_name, vol.last_name, vol.address, vol.phone, vol.email, vol.type]))

    const handleDeleteRow =(rowsDeleted) => {
       rowsDeleted.data.forEach(d => {
          // if(Data[d.dataIndex][6]==='Volunteer')
               UpgradeVolunteer(Data[d.dataIndex],'delete')
           //else
              // BanNewVolunteer(Data[d.dataIndex][5])
           }
       ); // array of all ids to to be deleted}

    }

    const handleRowClick = (rowData, rowMeta) => {

        volunteer = rowMeta.rowData;
        if(volunteer[6]==='New Volunteer')
        return (
            <button className={'button'}
                onClick={() => {
                    volunteer = rowMeta.rowData;
                    console.log(volunteer[5])
                    UpgradeVolunteer(volunteer,'confirm');
                    }
                }
            >
                Upgrade to VOLUNTEER
            </button>
        );

    }






    const columns = ["UID", "First Name", "Last Name", "Address", "Phone", "Email", "Type" ,{
                                                                                                name: "Action",
                                                                                                options: {
                                                                                                    filter: true,
                                                                                                    sort: false,
                                                                                                    empty: true,
                                                                                                    customBodyRender: handleRowClick
                                                                                                }
                                                                                             }
    ];

    const options = {
        filterType: "dropdown",
        responsive: "scroll",
        onRowsDelete: handleDeleteRow ,


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
export default Volunteers

