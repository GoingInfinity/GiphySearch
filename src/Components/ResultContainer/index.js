import React, { Component } from "react";
import GiphyCards from "../GiphyCard";

import "./ResultContainer.scss";

export default class SearchContainer extends Component {
  constructor() {
    super();
    this.renderCards = this.renderCards.bind(this);
    this.updateLength = this.updateLength.bind(this);
  }

  renderCards() {
    return this.props.result.map((data, i) => {
      return (
        <GiphyCards
          link={data.url}
          gif={data.gif}
          key={i}
          styles={data.style}
        />
      );
    });
  }

  updateLength(i, left) {
    this.setState(function(currentState) {
      return {
        length: currentState.length + i,
        left: left
      };
    });
  }

  render() {
    return (
      <div className="container">
        <div className="cardContainer">{this.renderCards()}</div>
      </div>
    );
  }
}
