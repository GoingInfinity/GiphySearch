import React, { Component } from "react";
import { render } from "react-dom";
import axios from "axios";

import SearchBar from "./Components/Searchbar";
import ResultContainer from "./Components/ResultContainer";
import "./App.scss";

class App extends Component {
  constructor() {
    super();
    this.state = {
      api: "G2qZhZjn3gyCOYvog25ew1RWncFKPqyx",
      url: "https://api.giphy.com/v1/gifs/search?q=",
      result: [],
      offset: 0,
      searchString: "",
      left: 0
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  // componentDidMount() {
  //   const { searchString } = this.state;
  //   document.addEventListener("scroll", e => {
  //     let windowHeight =
  //       e.path[1].window.innerHeight + e.path[1].window.scrollY + 100;
  //     if (windowHeight >= document.body.offsetHeight) {
  //       this.handleSearch(searchString, false);
  //     }
  //   });
  // }

  handleSearch(input, status) {
    const { api, url, result, offset, searchString, left } = this.state;
    console.log("input");
    const string = status ? input.replace(/[\s]/g, "+") : searchString;
    let currTop = 0;
    let currLeft = left;
    let currOffset = status ? 0 : offset;
    const resultArray = status ? [] : [].concat(result);
    if (input === "" && searchString === "") return;
    if (input === "" && status === true) return;

    axios(`${url}${string}&api_key=${api}&limit=25&offset=${currOffset}`)
      .then(res => {
        for (let key in res.data.data) {
          if (resultArray.length >= 4) {
            currTop =
              Number(resultArray[resultArray.length - 4].height) +
              Number(resultArray[resultArray.length - 4].style.top) +
              10;
          }
          resultArray.push({
            url: res.data.data[key].url,
            gif: res.data.data[key].images.fixed_width.url,
            height: res.data.data[key].images.fixed_width.height,
            style: {
              top: currTop,
              left: currLeft
            }
          });
          currLeft += 210;
          if (currLeft >= 800) currLeft = 0;
        }
        return resultArray;
      })
      .then(res => {
        this.setState(prevState => {
          return {
            searchString: string,
            result: res,
            offset: status ? prevState.offset + 25 : 0,
            // offset: status ? 0 : prevState.offset + 5,
            left: currLeft
          };
        });
      })
      .catch(error => {
        console.log("error", error);
        return error;
      });
  }

  render() {
    // console.log("state: ", this.state);
    const { searchString, result } = this.state;
    let apiSearched = result.length === 0;
    return (
      <div className="container">
        <header>
          <a href="">GIPHY SEARCH</a>
          <SearchBar search={this.handleSearch} />
        </header>
        <div className="main">
          {apiSearched ? (
            <div className="text">start searching!</div>
          ) : (
            <ResultContainer result={this.state.result} />
          )}
        </div>
        <footer>
          {!apiSearched && (
            <div onClick={this.handleSearch}>
              <i class="fas fa-chevron-circle-down fa-3x" />
            </div>
          )}
        </footer>
      </div>
    );
  }
}

render(<App />, document.getElementById("app"));
