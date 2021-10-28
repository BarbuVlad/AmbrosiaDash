import React, {useState} from "react";
import {
    withRouter,
    Redirect,
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import "./NavBar.css"
import Volunteers from "./Volunteers/Volunteers";
import GMaps from "./Maps/GMaps"
import mapsIcon from "../Icons/maps-icon.png"
import volIcon from "../Icons/vol-icon.png"
import logoAmb from "../Logo/AmbLogo.png"
import Login from "./Login"
import CheckboxMarker from "./Maps/CheckBoxMarkers"
import DropDownMenu from './Maps/DropDownMenu';
import Button from '@material-ui/core/Button';

import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';


// Each logical "route" has two Ambrosia, one for
// the sidebar and one for the main area. We want to
// render both of them in different places when the
// path matches the current URL.

// We are going to use this route config in 2
// spots: once for the sidebar and once in the main
// content section. All routes are in the same
// order they would appear in a <Switch>.

let logged ;


const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText("#2b313d"),
        backgroundColor: "#2b313d",
        '&:hover': {
            backgroundColor: "#1fb299",
        },
    },
}))(Button);
const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#0062cc",
        },
    },
});

let NavBar =()=> {
    const classes = useStyles();
    console.log(logged);
    const [logout, setLogout] = useState(0); // check if the logout button was pressed
    const [reload, setReload] = useState(0)
    const [onMap,setOnMap] = useState(true)
    let handleLogOut = () => {
        localStorage.setItem('logged', 'unregistered')
        logged = localStorage.getItem('logged')
        setLogout(1); // if logout pressed set to 1, else remain 0


    }

    let handleOnMap=()=>{

       setOnMap(true);
       localStorage.setItem('onMaps', 'true')

    }
    let handleOnVolunteers=()=>{
        setOnMap(false);
        localStorage.setItem('onMaps', 'false')
    }
    let check = localStorage.getItem('onMaps');

    if(logout===1)//if it was pressed will return only the login screen, else, returns the whole navbar.
        return <Login/>
    else{

        return (

                <Router>
                    <div style={{ flex: 1, padding: "10px" }}>
                        <Switch>
                            <Route path="/"  exact component={GMaps}/>
                            <Route path="/AmbrosiaDash" component={GMaps}/>
                            <Route path="/Maps"  component={GMaps}/>
                            <Route path="/Volunteers" component={Volunteers}/>
                            <Route path="/Login"  component={GMaps}/>
                        </Switch>

                    </div>
                    <div className={"PanelPos"}>
                        <div className={"Panel"} >
                            <div className={"ambrosia-title"}>

                                <img className={"logo"} src={logoAmb} alt ={"logoAmb"}/>
                                Ambrosia Alert
                            </div>
                            <ul style={{ listStyleType: "none", padding: 0 }}>

                                <li>
                                    <div className={'b'}>
                                        <img className={"maps-icon"} src={mapsIcon} alt ={"mapsIcon"}/>
                                        <Link to="/Maps">
                                            <span onClick={handleOnMap}>Maps</span></Link>



                                    </div>

                                </li>
                                <li>
                                    <div className={'b'}>
                                        <img className={"vol-icon"} src={volIcon} alt ={"volIcon"}/>
                                        <Link to="/Volunteers">
                                            <span onClick={handleOnVolunteers}>Volunteers</span></Link>
                                    </div>

                                </li>
                                {check==='true' ?
                                    ( <li><DropDownMenu/></li>) :null}
                                {check==='true' ?
                                    ( <li><CheckboxMarker/></li> ) :null}






                            </ul>






                            <div className={'signOutBorder'}>
                                <ThemeProvider theme={theme}>
                                    <ColorButton   variant={'outlined'} className={classes.margin} onClick={ () =>
                                    {

                                        handleLogOut();

                                    }
                                    }
                                    >

                                        <Link style= {{color: 'white'}} to="/Login">
                                            Log Out
                                        </Link>

                                    </ColorButton>
                                </ThemeProvider>
                            </div>


                        </div>



                    </div>
                </Router>
            );
        }



}

export default NavBar;
