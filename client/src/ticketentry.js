import React, { useEffect, useState } from "react";

const Ticketfetch = () => {
    const [data, setData] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetch("/api/xml")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setData(data.message);
            })
            .then(() => setIsLoaded(true))
            .catch((error) => console.log("test", error));
    }, []);

    return (
        <div>
            <h1>Data from server:</h1>
            <p>{data}</p>
        </div>
    );
};

export default Ticketfetch;
