import React, { Component } from "react";
import { withFormik } from "formik";

import "./Searchbar.scss";

class SearchBar extends React.Component {
  render() {
    const { handleChange, values, handleSubmit, search } = this.props;

    return (
      <form className="searchContainer" onSubmit={handleSubmit}>
        <input
          placeholder="Search"
          id="search"
          type="text"
          value={values.search}
          onChange={handleChange}
          className="input"
        />
      </form>
    );
  }
}

export default withFormik({
  mapPropsToValues: () => ({
    search: ""
  }),
  handleSubmit: ({ search }, { props }) => {
    props.search(search, true);
  }
})(SearchBar);
