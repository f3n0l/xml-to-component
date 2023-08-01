import React, { useEffect, useState } from "react";
import "./index.css"; // Import the CSS file
// import { useParams } from "react-router-dom";

const EntryComponent = ({ entry }) => {
    const { datum, titel, uhrzeit, spst, frei, theaweb, genre } = entry;

    const entryStyle = {
        display: "flex",
        flexDirection: "row",

        marginBottom: "5px",
        padding: "5px",
    };

    const getButtonBackgroundColor = (spstnr) => {
        if (spstnr === "1") {
            return "#F49800";
        } else if (spstnr === "2") {
            return "#0E2C51";
        } else {
            return "lightgray";
        }
    };

    const getFreiTextColor = (freiValue) => {
        const freiNumber = Number(freiValue);
        if (freiNumber === 0) {
            return "#D6D6D6";
        } else if (freiNumber > 0 && freiNumber <= 5) {
            return "#D6D6D6";
        } else if (freiNumber > 5 && freiNumber <= 50) {
            return "#FF0000";
        } else {
            return "#000000";
        }
    };

    const getIconUrl = (freiValue) => {
        const freiNumber = Number(freiValue);
        if (freiNumber === 0) {
            return "https://uploads-ssl.webflow.com/63ea1b64fd88cb1067b6d627/6489b8617ae03fffc37cb13f_Doppelticket-frei-5.svg";
        } else if (freiNumber > 0 && freiNumber <= 5) {
            return "https://uploads-ssl.webflow.com/63ea1b64fd88cb1067b6d627/6489b8617ae03fffc37cb13f_Doppelticket-frei-5.svg";
        } else if (freiNumber > 5 && freiNumber <= 50) {
            return "https://uploads-ssl.webflow.com/63ea1b64fd88cb1067b6d627/6489b865d4ff2a8fe8e9a660_Doppelticket-frei-50.svg";
        } else {
            return "https://uploads-ssl.webflow.com/63ea1b64fd88cb1067b6d627/646dde73ae9c80790abd0b9e_Doppelticket.svg";
        }
    };

    const spstnr = spst[0]?.spstnr[0] || "";
    const verkaufStatus = theaweb[0]?.verkauf[0] || "";

    const deadline = new Date("2023-07-01"); // Replace with your desired deadline = VERKAUFSSTART
    const currentDate = new Date();

    //     const titleLinkHref =
    //         new Date() < deadline
    //             ? "https://freilichtbuehne-freudenberg.de/programm/countdown-spielzeit"
    //             : theaweb[0]?.verkauf[0] !== "N"
    //             ? `https://freilichtbuehne-freudenberg-tickets.de/THEAweb2/theaweb.php?modus=&canmobile=&modul=saalplan&skin=&param=${ident}`
    //             : undefined;
    // const ident = entry["@attributes"]?.ident;
    console.log(entry["$"].ident);
    const ident = entry["$"].ident || "";

    /////////////// CHANGE GENRE NAME
    const isGenreMatch =
        genre && genre.includes("Kindergarten- & Schulvorstellung");
    if (spstnr !== "1") {
        return null; // Don't render the component if spstnr is not 1
    }

    const titleLinkHref = isGenreMatch
        ? "https://freilichtbuehne-freudenberg.de/tickets/reservierung/formular-reservierung-kindergarten-schulvorstellungen"
        : new Date() < deadline
        ? "https://freilichtbuehne-freudenberg.de/programm/countdown-spielzeit"
        : verkaufStatus !== "N"
        ? `https://freilichtbuehne-freudenberg-tickets.de/THEAweb2/theaweb.php?modus=&canmobile=&modul=saalplan&skin=&param=${ident}`
        : undefined;

    const titleLinkStyle = {
        marginRight: "5px",
        padding: "5px",

        backgroundColor:
            new Date() >= deadline
                ? theaweb[0]?.verkauf[0] === "N"
                    ? "#D6D6D6"
                    : genre.includes("Event") || genre.includes("Gastspiel")
                    ? "#1C1C1C"
                    : getButtonBackgroundColor(spstnr)
                : genre.includes("Event") || genre.includes("Gastspiel")
                ? "#1C1C1C"
                : getButtonBackgroundColor(spstnr),
        color: "white",
        textDecoration: "none",
        pointerEvents:
            new Date() >= deadline || new Date() < deadline ? "auto" : "none",
    };

    const datumButtonStyle = {
        marginRight: "5px",
        padding: "5px",
        borderRadius: "5px",
    };

    const uhrzeitButtonStyle = {
        marginRight: "5px",
        padding: "5px",
        borderRadius: "5px",
    };

    const wochentagButtonStyle = {
        marginRight: "5px",
        padding: "5px",
        borderRadius: "5px",
    };

    const freiTextStyle = {
        marginRight: "5px",
        padding: "5px",
        borderRadius: "5px",
        color: getFreiTextColor(frei[0]),
    };

    const iconUrl = getIconUrl(frei[0]);

    const iconStyle = {
        width: "30px",
        height: "30px",
        marginLeft: "5px",
    };

    let freiContent;
    const freiNumber = Number(frei[0]);
    if (freiNumber === 0) {
        freiContent = "ausverkauft";
    } else if (freiNumber === 1) {
        freiContent = `noch ${freiNumber} Ticket verfügbar`;
    } else {
        freiContent = `noch ${freiNumber} Tickets verfügbar`;
    }

    const [day, month, year] = datum[0]?.split(".") || [];
    const dateObject = new Date(year, month - 1, day);
    const wochentag = dateObject.toLocaleDateString("de-DE", {
        weekday: "long",
    });

    const monthName = dateObject.toLocaleDateString("de-DE", { month: "long" });

    const formattedDatum = `${day}. ${monthName}`;

    return (
        <div class="mainContainer">
            <div style={entryStyle} class="entry">
                {" "}
                <div class="firstContainer">
                    <div style={wochentagButtonStyle} class="wochentag">
                        {wochentag}
                    </div>
                    <div
                        class="seperator"
                        //  style={separatorStyle}
                    >
                        |
                    </div>
                    {/* Add a separator div */}
                    <div style={datumButtonStyle} class="datum">
                        {formattedDatum}
                    </div>
                    <div
                        class="seperator"
                        //  style={separatorStyle}
                    >
                        |
                    </div>
                    <div style={uhrzeitButtonStyle} class="uhrzeit">
                        {uhrzeit} Uhr
                    </div>
                </div>{" "}
                <div class="secondContainer">
                    <a
                        class="titelLink"
                        href={
                            new Date() < deadline
                                ? "https://freilichtbuehne-freudenberg.de/programm/countdown-spielzeit"
                                : verkaufStatus !== "N"
                                ? (genre &&
                                      genre.includes(
                                          "Kindergarten- & Schulvorstellung"
                                      )) ||
                                  genre.includes("Event") ||
                                  genre.includes("Gastspiel")
                                    ? "https://freilichtbuehne-freudenberg.de/tickets/reservierung/formular-reservierung-kindergarten-schulvorstellungen"
                                    : `https://freilichtbuehne-freudenberg-tickets.de/THEAweb2/theaweb.php?modus=&canmobile=&modul=saalplan&skin=&param=${ident}`
                                : undefined
                        }
                        style={titleLinkStyle}
                    >
                        {titel}{" "}
                        <img
                            src="https://uploads-ssl.webflow.com/63ea1b64fd88cb1067b6d627/646dcb8c63dae48be19469c4_Chevron-rechts.svg"
                            alt="Icon"
                            style={{ maxHeight: "25px", height: "20px" }}
                            class="arrowIcon"
                        />
                    </a>
                    <div style={uhrzeitButtonStyle} class="genre">
                        {genre}
                    </div>
                </div>
                {new Date() >= deadline && verkaufStatus !== "N" && (
                    <>
                        {" "}
                        <div class="thirdContainer">
                            <div style={freiTextStyle} class="freieTickets">
                                {freiContent}
                            </div>
                            <img
                                src={iconUrl}
                                alt="Icon"
                                style={iconStyle}
                                class="ticketIcon"
                            />
                        </div>{" "}
                    </>
                )}
            </div>
        </div>
    );
};

const Ticketfetch = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("/api/xml") // Replace with your backend API endpoint
            .then((response) => response.json())
            .then((jsonData) => {
                console.log(jsonData);
                setData(jsonData.vst);
            })
            .catch((error) => console.error("Error:", error));
    }, []);

    return (
        <div class="mainContainer">
            {data.map((entry, index) => (
                <EntryComponent key={index} entry={entry} />
            ))}
        </div>
    );
};

export default Ticketfetch;
