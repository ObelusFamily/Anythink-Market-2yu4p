import React from "react";
import logo from "../../imgs/logo.png";
import agent from "../../agent";
import { connect } from "react-redux";
import { SEARCH_BY_TITLE } from "../../constants/actionTypes";

const mapDispatchToProps = (dispatch) => ({
  searchTitle: (pager, payload, searchTerm) => {
    dispatch({ type: SEARCH_BY_TITLE, pager, payload, searchTerm });
  },
});

const Banner = (props) => {
  const [title, setTitle] = React.useState("");
  const [showSearch, setShowSearch] = React.useState(false);

  const handleChange = (e) => {
    const title = e.target.value;
    setTitle(title);
    if (title.length >= 3) {
      const itemsPromise = agent.Items.byTitle;
      props.searchTitle(itemsPromise, itemsPromise(title), title);
    } else {
      const itemsPromise = agent.Items.byTitle;
      props.searchTitle(itemsPromise, itemsPromise(""), undefined);
    }
  };

  const onClickGet = () => {
    setShowSearch(true);
  };

  return (
    <div className="banner text-white">
      <div className="container p-4 text-center">
        <img src={logo} alt="banner" />
        <div>
          <span id="get-part">
            A place to <span onClick={onClickGet}>get</span>{" "}
          </span>
          {showSearch && (
            <input
              id="search-box"
              type="text"
              placeholder="What is that you truly desire?"
              onChange={handleChange}
              value={title}
            ></input>
          )}
          <span> the cool stuff.</span>
        </div>
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(Banner);
