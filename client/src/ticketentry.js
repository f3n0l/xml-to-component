import React, { useEffect, useState } from "react";

const EntryComponent = ({ entry }) => {
    // Render the entry's data here
    return <div>{entry.COMMON[0]}</div>;
};

const Ticketfetch = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("/api/xml") // Replace with JSON endpoint
            .then((response) => response.json())
            .then((jsonData) => {
                console.log(jsonData.CATALOG.PLANT);
                setData(jsonData.CATALOG.PLANT); // Adjust the property path to match JSON structure
            })
            .catch((error) => console.error("Error:", error));
    }, []);

    const filteredData = data.filter((entry) => entry.ZONE[0] === "4"); // Filter the data array based on the condition
    return (
        <div>
            {filteredData.map((entry, index) => (
                <EntryComponent key={index} entry={entry} />
            ))}
        </div>
    );
};

export default Ticketfetch;
