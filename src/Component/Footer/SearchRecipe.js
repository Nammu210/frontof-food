import React from "react";
import "./searchRecipe.css";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const FooterSearchRecipe = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const APP_ID = "591bd3cd";
  const APP_KEY = "ee49bf3041e13fa627976b22e7cd9ebb";

  const getSearchRecipes = (searchQuery) => {
    axios
      .get(
        `https://api.edamam.com/search?q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=60`
      )
      .then((response) => setData(response.data.hits))
      .catch((error) => console.log("Error", error));
    console.log(data);
  };
  return (
    <>
      <div id="pink-searchbar">
        <div>
          <div id="pink-searchbar-container">
            <div id="pink-searchbar-search-bar-and-text-container">
              <div id="pink-searchbar-search-bar-and-text">
                <h3>I WANT TO MAKE</h3>
                <div id="pink-searchbar-search-bar">
                  <AiOutlineSearch fontSize="1.5rem" />
                  <input
                    type="search"
                    placeholder="Search here or try our suggestions below"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  ></input>
                  {/* <button onClick={() => getSearchRecipes(search)}>
                    SEARCH
                  </button> */}
                </div>
              </div>
            </div>
          </div>
          <div id="pink-searchbar-suggested">
            <div id="pink-searchbar-suggested-container">
              <div>
                <Link to=""><i>air fryer recipes</i></Link>
              </div>
              <div>
                <Link to=""><i> slow-cooker faves </i></Link>
              </div>
              <div>
                <Link to=""><i> top copycat recipes</i></Link>
              </div>
              <div>
                <Link to=""><i> japanese foods </i></Link>
              </div>
              <div>
                <Link to=""><i>weeknight eats</i></Link>
              </div>
              <div>
                <Link to=""><i>healthy lunches </i></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="pink-searchbar-search-search-data">
        {/* <h2>SEARCH RESULTS . . .</h2> */}
        <div id="pink-searchbar-search-search-data-container">
          <div id="pink-searchbar-search-search-data-cards-container">
            {data.map((element, index) => (
              <div id="pink-searchbar-search-search-data-cards">
                <Link to={`/details?q=${element.recipe.label}`}>
                  <img src={element.recipe.image} alt=""></img>
                </Link>
                <h3>{element.recipe.label}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterSearchRecipe;