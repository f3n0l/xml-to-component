import React, { useEffect, useState } from "react";

const EntryComponent = ({ entry }) => {
    // Render the entry's data here
    return <div>{entry.title}</div>;
};

const Ticketfetch = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("/api/xml") // Replace with your JSON endpoint
            .then((response) => response.json())
            .then((jsonData) => {
                console.log(jsonData.CATALOG.PLANT);
                setData(jsonData.CATALOG.PLANT); // Adjust the property path to match your JSON structure
            })
            .catch((error) => console.error("Error:", error));
    }, []);

    return (
        <div>
            {data.map((entry, index) => (
                <EntryComponent key={index} entry={entry} />
            ))}
        </div>
    );
};

// map through entries & filter
// create component for each suiting entry

export default Ticketfetch;
