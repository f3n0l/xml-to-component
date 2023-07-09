import React from "react";
import Ticketfetch from "./ticketentry";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TicketfetchExtended from "./ticketentry2";

const Home = () => <h1>XML to React Component</h1>;

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
                            <Link to="/ticket">One Filter</Link>
                        </li>
                        <li>
                            <Link to="/extended">All Filters</Link>
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
