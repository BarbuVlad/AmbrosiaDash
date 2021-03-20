import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import "./NavBar.css"
import Volunteers from "./Volunteers/Volunteers";
import GMaps from "./GMaps"
import mapsIcon from "../Icons/maps-icon.png"
import volIcon from "../Icons/vol-icon.png"
import logoAmb from "../Logo/AmbrosiaLogo.png"
import Login from "./Login"
import {DropDownMenu,CheckboxMarker}  from "./GMaps"
import Button from '@material-ui/core/Button';
import Redirect from "react-router-dom/es/Redirect";
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';


// Each logical "route" has two Ambrosia, one for
// the sidebar and one for the main area. We want to
// render both of them in different places when the
// path matches the current URL.

// We are going to use this route config in 2
// spots: once for the sidebar and once in the main
// content section. All routes are in the same
// order they would appear in a <Switch>.
const routes = [

    {
        path: "/Ambrosia/Maps",
        sidebar: () => <div> </div>,
        main: () => <GMaps/>,
        exact:true

    },
    {
        path: "/Ambrosia/Volunteers",
        sidebar: () => <div> </div>,
        main: () => <Volunteers/>
    },
    {
        path: "/Ambrosia/Login",
        sidebar: () => <div> </div>,
        main: () => <Login/>
    }
];
let handleLogOut = () => {
    localStorage.setItem('logged', 'unregistered')
    const logged = localStorage.getItem('logged')
    console.log(logged)


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
    return (

        <Router>

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
                                <Link to="/Ambrosia/Maps"> Maps</Link>

                            </div>

                        </li>
                        <li>
                            <div className={'b'}>
                                <img className={"vol-icon"} src={volIcon} alt ={"volIcon"}/>
                                <Link to="/Ambrosia/Volunteers"> Volunteers</Link>
                            </div>

                        </li>
                        <li><CheckboxMarker/></li>

                        <li>  <DropDownMenu/></li>





                    </ul>






                    <div className={'signOutBorder'}>
                        <ThemeProvider theme={theme}>
                        <ColorButton   variant={'outlined'} className={classes.margin} onClick={ () =>
                        {
                            handleLogOut();
                            window.location.reload(false);
                        }
                        }
                        >Sign out
                        </ColorButton>
                        </ThemeProvider>
                    </div>
                    <Switch>
                        <Redirect from="/" to="/Ambrosia/Maps"/>
                        {routes.map((route, index) => (
                            // You can render a <Route> in as many places
                            // as you want in your app. It will render along
                            // with any other <Route>s that also match the URL.
                            // So, a sidebar or breadcrumbs or anything else
                            // that requires you to render multiple things
                            // in multiple places at the same URL is nothing
                            // more than multiple <Route>s.
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                children={<route.sidebar />}
                            />
                        ))}
                    </Switch>
                </div>

                <div style={{ flex: 1, padding: "10px" }}>
                    <Switch>
                        {routes.map((route, index) => (
                            // Render more <Route>s with the same paths as
                            // above, but different Ambrosia this time.
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                children={<route.main />}
                            />
                        ))}
                    </Switch>
                </div>

            </div>
        </Router>
    );
}

export default NavBar;
