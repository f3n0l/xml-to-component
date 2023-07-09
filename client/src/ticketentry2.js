import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EntryComponent = ({ entry }) => {
    // Destructure the entry object to access its properties
    const { AVAILABILITY, BOTANICAL, COMMON, LIGHT, PRICE, ZONE } = entry;

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
        backgroundColor: "lightgray",
        borderRadius: "5px",
    };

    return (
        <div style={entryStyle}>
            <div style={buttonStyle}>{AVAILABILITY[0]}</div>
            <div style={buttonStyle}>{BOTANICAL[0]}</div>
            <div style={buttonStyle}>{COMMON[0]}</div>
            <div style={buttonStyle}>{LIGHT[0]}</div>
            <div style={buttonStyle}>{PRICE[0]}</div>
            <div style={buttonStyle}>{ZONE[0]}</div>
        </div>
    );
};

const TicketfetchExtended = () => {
    const [data, setData] = useState([]);
    const [filterValue, setFilterValue] = useState("4");

    useEffect(() => {
        fetch("/api/xml") // Replace with your JSON endpoint
            .then((response) => response.json())
            .then((jsonData) => {
                console.log(jsonData.CATALOG.PLANT);
                setData(jsonData.CATALOG.PLANT); // Set the data state to jsonData.CATALOG.PLANT
            })
            .catch((error) => console.error("Error:", error));
    }, []);

    const handleFilterChange = (value) => {
        setFilterValue(value);
    };

    const filteredData = Array.isArray(data)
        ? data.filter((entry) => entry.ZONE[0] === filterValue)
        : [];

    return (
        <div>
            <div>
                <button onClick={() => handleFilterChange("1")}>
                    Filter 1
                </button>
                <button onClick={() => handleFilterChange("2")}>
                    Filter 2
                </button>
                <button onClick={() => handleFilterChange("Annual")}>
                    Filter Annual
                </button>
                <button onClick={() => handleFilterChange("3")}>
                    Filter 3
                </button>
                <button onClick={() => handleFilterChange("4")}>
                    Filter 4
                </button>
                <button onClick={() => handleFilterChange("3-5")}>
                    Filter 3-5
                </button>
                <button onClick={() => handleFilterChange("6")}>
                    Filter 6
                </button>
                <button onClick={() => handleFilterChange("7")}>
                    Filter 7
                </button>
            </div>
            <div>
                {filteredData.map((entry, index) => (
                    <EntryComponent key={index} entry={entry} />
                ))}
            </div>
        </div>
    );
};

export default TicketfetchExtended;
