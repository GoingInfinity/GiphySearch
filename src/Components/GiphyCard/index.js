import React, { Component } from "react";

import "./GiphyCards.scss";

const GiphyCard = prop => {
  // console.log("props", prop);
  return (
    <div id={prop.id} className="card" style={prop.styles}>
      <a href={prop.link}>
        <img src={prop.gif} />
      </a>
    </div>
  );
};

export default GiphyCard;
