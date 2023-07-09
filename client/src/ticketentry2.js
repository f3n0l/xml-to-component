import React, { useEffect, useState } from "react";
import "./index.css"; // Import the CSS file

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
        backgroundColor: "lightgray", // Set the default background color to gray
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

const TicketfetchExtended = () => {
    const [data, setData] = useState([]);
    const [filterIndex, setFilterIndex] = useState(0);
    const [isFilterActive, setIsFilterActive] = useState(true);

    useEffect(() => {
        fetch("/api/xml") // Replace with your JSON endpoint
            .then((response) => response.json())
            .then((jsonData) => {
                console.log(jsonData.CATALOG.PLANT);
                setData(jsonData.CATALOG.PLANT); // Set the data state to jsonData.CATALOG.PLANT
            })
            .catch((error) => console.error("Error:", error));
    }, []);

    const filters = ["2", "Annual", "3", "3 - 5", "4", "6", "7"]; // Add "3 - 5" filter

    const handleFilterChange = () => {
        const newIndex = (filterIndex + 1) % filters.length;
        setFilterIndex(newIndex);
    };

    const handleToggleFilter = () => {
        setIsFilterActive((prevFilterState) => !prevFilterState);
    };

    const filteredData = Array.isArray(data)
        ? isFilterActive
            ? data.filter((entry) => entry.ZONE[0] === filters[filterIndex])
            : data
        : [];

    return (
        <div>
            <button onClick={handleFilterChange}>
                Cycle Filter (Current Filter: {filters[filterIndex]})
            </button>
            <button onClick={handleToggleFilter}>
                {isFilterActive ? "Deactivate Filters" : "Activate Filters"}
            </button>
            <div>
                {filteredData.map((entry, index) => (
                    <EntryComponent key={index} entry={entry} />
                ))}
            </div>
        </div>
    );
};

export default TicketfetchExtended;
