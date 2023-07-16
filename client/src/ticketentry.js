import React, { useEffect, useState } from "react";
import "./index.css"; // Import the CSS file

// see new repo "ticketshop" for more complex filter functionality
// simple fetch and map operation from XML to JSON coversion



const EntryComponent = ({ entry }) => {
    // Destructure the entry object to access its properties
    const { AVAILABILITY, BOTANICAL, COMMON, LIGHT, PRICE, ZONE } = entry;

    // Get the numeric value from the PRICE property
    const priceValue = parseFloat(PRICE[0].substring(1));

    // Determine the background color for the PRICE button
    let priceButtonStyle = {};
    if (priceValue >= 0 && priceValue < 4) {
        priceButtonStyle.backgroundColor = "lightgreen";
    } else if (priceValue >= 4 && priceValue < 6) {
        priceButtonStyle.backgroundColor = "lightyellow";
    } else if (priceValue >= 6) {
        priceButtonStyle.backgroundColor = "lightcoral";
    }

    // Style for the entry component
    const entryStyle = {
        display: "flex",
        flexDirection: "row",
        border: "1px solid black",
        marginBottom: "5px",
        padding: "5px",
    };

    // Style for the property buttons
    const buttonStyle = {
        marginRight: "5px",
        padding: "5px",
        borderRadius: "5px",
        backgroundColor: "lightgray",
    };

    return (
        <div style={entryStyle}>
            <div style={buttonStyle}>{AVAILABILITY[0]}</div>
            <div style={buttonStyle}>{BOTANICAL[0]}</div>
            <div style={buttonStyle}>{COMMON[0]}</div>
            <div style={buttonStyle}>{LIGHT[0]}</div>
            <div style={{ ...buttonStyle, ...priceButtonStyle }}>
                {PRICE[0]}
            </div>
            <div style={buttonStyle}>{ZONE[0]}</div>
        </div>
    );
};

const Ticketfetch = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("/api/xml") // fetch from json endpoint
            .then((response) => response.json())
            .then((jsonData) => {
                console.log(jsonData.CATALOG.PLANT);
                setData(jsonData.CATALOG.PLANT); // Set the data state 
            })
            .catch((error) => console.error("Error:", error));
    }, []);

    const filteredData = Array.isArray(data)
        ? data.filter((entry) => entry.ZONE[0] === "4")
        : [];

    return (
        <div>
            {filteredData.map((entry, index) => (
                <EntryComponent key={index} entry={entry} />
            ))}
        </div>
    ); // maps through entries
};

export default Ticketfetch;
