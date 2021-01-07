import React, {Component} from "react";
import MUIDataTable from "mui-datatables";
import axios from 'axios'
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import './Volunteers.css'



class Volunteers extends Component {
    constructor(props) {

        super(props)

        this.state = {

            ProductData: [
                {
                    uid:'',
                    address:'',
                    first_name:'',
                    last_name:'',
                    phone:'',
                    location:'',
                    email:''

                }
            ],
            VolData : [],




        }

    }

    del = ()=>
    { /*
        axios.delete('http://92.87.91.16/backend_code/api/volunteer/delete.php')
            .then
            (

            )
    */
        //trebuie setat mereu daca sunt mai putini decat in Product Data
        console.log("STERS")
    }




    componentDidMount() {

        axios.get('http://92.87.91.16/backend_code/api/volunteer/read.php')
            .then(response => {

                console.log("Asa arata datele:",response.data.data);

                this.setState({

                    ProductData: response.data.data

                });

              //  console.log("PData",this.state.ProductData[4].first_name)

                for (let x = 0;x<this.state.ProductData.length;x++)
                {
                    this.setState({
                        VolData: [...this.state.VolData,

                               [
                                   this.state.ProductData[x].uid,
                                   this.state.ProductData[x].first_name,
                                   this.state.ProductData[x].last_name,
                                   this.state.ProductData[x].address,
                                   this.state.ProductData[x].phone,
                                   this.state.ProductData[x].email,

                        ]]
                    })


                }

                console.log("Voldata in state : " + this.state.VolData)

                console.log("State:   " + this.state.ProductData)

            });

    }




    render() {



console.log("Voldata: " + this.state.VolData)
        const columns = ["UID", "First Name", "Last Name","Address","Phone","Email"];


        const options = {
            filterType: "dropdown",
            responsive: "scroll",

            onRowsDelete: (rowsDeleted)=>{
                console.log("datele: ",rowsDeleted)
               const data1 = this.props.data;
            //    const idsToDelete = rowsDeleted.data.map(d => data1[d.dataIndex]) // array of all ids to to be deleted
           console.log("onRowsDelete: ",rowsDeleted.data)
             //   console.log("DATA: ",rowsDeleted.data)

                for(let i=0; i<rowsDeleted.data.length;i++)
                {
                    console.log("Index in BD: ",this.state.VolData[rowsDeleted.data[i].index][0])


                    let data = {
                      //  'uid': (i+1).toString()
                        'uid':this.state.VolData[rowsDeleted.data[i].index][0]
                    }
                    console.log("DATA este: ",data.uid)
                    axios.delete('http://92.87.91.16/backend_code/api/volunteer/delete.php',

                        {
data

                        }

                    )
                        .then(
                            dat => console.log(dat)
                        )
               //     console.log("Index in BD: ",this.state.VolData[rowsDeleted.data[i].index][0])


                }







            }
        };



        return (

            <MuiThemeProvider theme={myTheme}>
            <MUIDataTable
            className ={'table'}
                title={"List of Volunteers"}
                data ={this.state.VolData}
              //  data={this.state.ProductData}
                columns={columns}
                options={options}
            onRowsDelete = {
                console.log("sters")
            }
            />
            </MuiThemeProvider>
        );
    }


}

const myTheme = createMuiTheme({
    overrides: {
        MUIDataTable: {
            responsiveScroll: {
                maxHeight: "none"
                // overflowY: 'scroll',
            }
        }
    }
});
export  default Volunteers

