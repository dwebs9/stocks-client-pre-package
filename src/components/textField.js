import React, { Component, useState } from "react";

function Text_field(props) {
  const [innerIndustry, setInnerIndustry] = useState("");

  console.log("props");
  console.log(props);
  console.log(innerIndustry);

  return (
    <div>
      <form>
        <input
          aria-labelledby="industry-search"
          type="text"
          value={innerIndustry}
          id="containsThis"
          name="industry-search"
          onChange={(e) => setInnerIndustry(e.target.value)}
          // onChange={this.handleSearchChange}
        />
        <button
          id="search-button"
          block
          bsSize="small"
          //   disabled={this.validateForm()}
          onClick={() => props.onSearch(innerIndustry)}
          type="submit"
        >
          search
        </button>
      </form>
    </div>
  );
}

export default Text_field;
