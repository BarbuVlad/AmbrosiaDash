import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import "./NavBar.css"
import Login from "./Login";
import Maps from "./Maps";
// Each logical "route" has two components, one for
// the sidebar and one for the main area. We want to
// render both of them in different places when the
// path matches the current URL.

// We are going to use this route config in 2
// spots: once for the sidebar and once in the main
// content section. All routes are in the same
// order they would appear in a <Switch>.
const routes = [
    {
        path: "/",
        exact: true,
        sidebar: () => <div> </div>,
        main: () => <Login/>
    },
    {
        path: "/Components/Maps",
        sidebar: () => <div> </div>,
        main: () => <Maps/>
    },
    {
        path: "/shoelaces",
        sidebar: () => <div> </div>,
        main: () => <h2>Volunteers</h2>
    }
];

let NavBar =()=> {
    return (

        <Router>
            <div className={"PanelPos"}>
                <div className={"Panel"} >
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                        <li>
                            <div className={'b'}>
                                <Link to="/" >Login</Link>
                            </div>

                        </li>
                        <li>
                            <div className={'b'}>
                                <Link to="/Components/Maps">Maps</Link>
                            </div>

                        </li>
                        <li>
                            <div className={'b'}>
                                <Link to="/shoelaces">Volunteers</Link>
                            </div>

                        </li>
                    </ul>

                    <Switch>
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
                            // above, but different components this time.
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
