import React, { useEffect, useState } from "react";
import "./index.css"; // Import the CSS file

const EntryComponent = ({ entry }) => {
  const { datum, titel, spst, frei, uhrzeit } = entry;

  const entryStyle = {
    display: "flex",
    flexDirection: "row",
    border: "1px solid black",
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
    if (freiValue === "0") {
      return "#D6D6D6";
    } else if (freiValue > 0 && freiValue <= 5) {
      return "#D6D6D6";
    } else if (freiValue > 5 && freiValue <= 50) {
      return "#FF0000";
    } else {
      return "#000000";
    }
  };

  const getIconUrl = (freiValue) => {
    if (freiValue === "0") {
      return "https://cdn-icons-png.flaticon.com/512/4866/4866637.png";
    } else if (freiValue > 0 && freiValue <= 5) {
      return "https://cdn-icons-png.flaticon.com/512/4866/4866637.png";
    } else if (freiValue > 5 && freiValue <= 50) {
      return "https://cdn-icons-png.flaticon.com/512/2844/2844658.png";
    } else {
      return "https://cdn-icons-png.flaticon.com/512/18/18609.png";
    }
  };

  const spstnr = spst[0]?.spstnr[0] || "";

  const wochentagButtonStyle = {
    marginRight: "5px",
    padding: "5px",
    borderRadius: "5px",
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

const titleButtonStyle = {
  marginRight: "5px",
  padding: "5px",
  borderRadius: "5px",
  backgroundColor: getButtonBackgroundColor(spstnr),
  color: "white", 
};

  const freiTextStyle = {
    marginRight: "5px",
    padding: "5px",
    borderRadius: "5px",
    color: getFreiTextColor(frei),
    backgroundColor: frei === "0" ? "#D6D6D6" : "transparent",
  };

  const iconUrl = getIconUrl(frei);

  const iconStyle = {
    width: "30px",
    height: "30px",
    marginLeft: "5px",
  };

  let freiContent;
  if (frei === "0") {
    freiContent = "ausverkauft";
  } else if (frei === "1") {
    freiContent = `noch ${frei} Ticket verfügbar`;
  } else {
    freiContent = `noch ${frei} Tickets verfügbar`;
  }

const getWochentag = (datum) => {
  const weekdays = [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
  ];

  const dateString = datum[0];
  const dateParts = dateString.split(".");
  const day = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10);
  const year = parseInt(dateParts[2], 10);

  const date = new Date(year, month - 1, day);
  const wochentag = date.getDay();
  return weekdays[wochentag];
};


  const wochentag = getWochentag(datum);

  return (
    <div style={entryStyle}>
      <div style={wochentagButtonStyle}>{wochentag}</div>
      <div style={datumButtonStyle}>{datum}</div>
      <div style={uhrzeitButtonStyle}>{uhrzeit} Uhr</div>
      <div style={titleButtonStyle}>{titel}</div>
      <div style={freiTextStyle}>{freiContent}</div>
      <img src={iconUrl} alt="Icon" style={iconStyle} />
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
    <div>
      {data.map((entry, index) => (
        <EntryComponent key={index} entry={entry} />
      ))}
    </div>
  );
};

export default Ticketfetch;
