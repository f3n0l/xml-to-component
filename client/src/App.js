import React from "react";
import Ticketfetch from "./ticketentry";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const Home = () => <h1>Welcome to the Home Page</h1>;
const Contact = () => <h1>Contact Us</h1>;

const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/ticket">About</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route exact path="/" component={Home} />
                    <Route path="/ticket" component={Ticketfetch} />
                    <Route path="/contact" component={Contact} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

//Router
