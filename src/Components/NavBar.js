import React from "react";
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

let logged = 'login successful';
let handleLogOut = () => {
    localStorage.setItem('logged', 'unregistered')
    logged = localStorage.getItem('logged')
   // console.log(logged)
    return(
        <div>
        <Router>
            <Switch>
                <Redirect from='/' to='/Login'/>
                <Route path="/Login">
                    <Login/>
                </Route>
            </Switch>

        </Router>
        </div>
    )


}

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

    return (

        <Router>
            <div style={{ flex: 1, padding: "10px" }}>
                <Switch>
                    <Route path="/"  exact component={GMaps}/>
                    <Route path="/Maps"  component={GMaps}/>
                    <Route path="/Volunteers" component={Volunteers}/>
                    <Route path="/Login"  component={Login}/>
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
                                <Link to="/Maps"> Maps</Link>



                            </div>

                        </li>
                        <li>
                            <div className={'b'}>
                                <img className={"vol-icon"} src={volIcon} alt ={"volIcon"}/>
                                <Link to="/Volunteers"> Volunteers</Link>
                            </div>

                        </li>
                        <li><CheckboxMarker/></li>

                        {/* eslint-disable-next-line react/jsx-no-undef */}
                        <li><DropDownMenu/></li>





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

export default NavBar;
