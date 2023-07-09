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
                            <Link to="/ticket">Ticket</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/ticket" element={<Ticketfetch />}></Route>
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

//Router
