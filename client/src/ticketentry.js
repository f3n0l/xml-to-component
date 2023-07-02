import React, { useEffect, useState } from "react";

const MyComponent = () => {
    const [data, setData] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("/api/test");
            console.log(response);
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <h1>Data from server:</h1>
            <p>{data}</p>
        </div>
    );
};

export default MyComponent;
