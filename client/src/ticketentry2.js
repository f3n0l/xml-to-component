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

const Ticketfetch = () => {
    const [data, setData] = useState([]);
    const [filterIndex, setFilterIndex] = useState(0);

    useEffect(() => {
        fetch("/api/xml") // Replace with your JSON endpoint
            .then((response) => response.json())
            .then((jsonData) => {
                console.log(jsonData.CATALOG.PLANT);
                setData(jsonData.CATALOG.PLANT); // Set the data state to jsonData.CATALOG.PLANT
            })
            .catch((error) => console.error("Error:", error));
    }, []);

    const filters = ["1", "2", "Annual", "3", "4", "3-5", "6", "7"];

    const handleFilterChange = () => {
        const newIndex = (filterIndex + 1) % filters.length;
        setFilterIndex(newIndex);
    };

    const filteredData = Array.isArray(data)
        ? data.filter((entry) => entry.ZONE[0] === filters[filterIndex])
        : [];

    return (
        <div>
            <div>
                <div>Filter = {filters[filterIndex]}</div>
                <button onClick={handleFilterChange}>
                    Cycle Filter (Current Filter: {filters[filterIndex]})
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

export default Ticketfetch;
