import React from "react";
import Ticketfetch from "./ticketentry";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TicketfetchExtended from "./ticketentry2";

const Home = () => <h1>Welcome to the Home Page</h1>;

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
                            <Link to="/extended">Contact</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/ticket" element={<Ticketfetch />} />
                    <Route path="/extended" element={<TicketfetchExtended />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

//Router
