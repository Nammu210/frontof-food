import React, { useEffect, useState } from "react";
import { BsSave } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { host } from "../../../Utility/HostLink";

const AddRecipe = ({ item }) => {
  const [recipes, setRecipes] = useState([]);
  const token = localStorage.getItem("token");

  let { details } = useParams();

  useEffect(() => {
    getRecipes();
  }, [details]);

  
  const getRecipes = async () => {
    try {
      const response = await axios.get(
        `${host}/recipe/${details}`
      );
      // console.log(response.data);
      setRecipes(response.data);
      // setName(recipes[0].recipe.label)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const handleRecipe = () => {
    const API = `${host}/recipes/saverecipe`;

    axios
      .post(
        API,
        {
          userId,
          recipeName: recipes[0].recipe.label,
          recipe: recipes[0].recipe,
        },
        {
          headers: headers,
        }
      )
      .then((response) => {
        console.log(response);
        toast.success(`${recipes[0].recipe.label} added to saves`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <button onClick={() => handleRecipe(item)}>
        <BsSave />
      </button>
    </div>
  );
};

export default AddRecipe;
