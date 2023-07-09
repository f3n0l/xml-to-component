import React, { useEffect, useState } from "react";
import "./index.css"; // Import the CSS file

const EntryComponent = ({ entry }) => {
    // Destructure the entry object to access its properties
    const { AVAILABILITY, BOTANICAL, COMMON, LIGHT, PRICE, ZONE } = entry;

    return (
        <div className="entry">
            {" "}
            {/* Apply the "entry" class */}
            <div className="property-button">{AVAILABILITY[0]}</div>
            <div className="property-button">{BOTANICAL[0]}</div>
            <div className="property-button">{COMMON[0]}</div>
            <div className="property-button">{LIGHT[0]}</div>
            <div className="property-button">{PRICE[0]}</div>
            <div className="property-button">{ZONE[0]}</div>
        </div>
    );
};

const TicketfetchExtended = () => {
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

    const filters = ["2", "Annual", "3", "4", "6", "7"]; // Removed "3-5" and "1"

    const handleFilterChange = () => {
        const newIndex = (filterIndex + 1) % filters.length;
        setFilterIndex(newIndex);
    };

    const filteredData = Array.isArray(data)
        ? data.filter((entry) => entry.ZONE[0] === filters[filterIndex])
        : [];

    return (
        <div>
            <button onClick={handleFilterChange}>
                Cycle Filter (Current Filter: {filters[filterIndex]})
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
