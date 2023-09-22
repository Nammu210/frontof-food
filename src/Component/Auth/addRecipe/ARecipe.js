import React from 'react'
import './aRecipe.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { AiOutlineCamera } from 'react-icons/ai'
import { AiFillCamera } from 'react-icons/ai'
import axios from 'axios'
import SearchRecipe from '../../Footer/SearchRecipe'
import { host } from '../../Utility/api'

const AddRecipe = () => {

    const [recipeTitle, setRecipeTitle] = useState('')
    const [recipeDescription, setRecipeDescription] = useState('')
    const [recipeCategory, setRecipeCategory] = useState('')
    const [recipePrepTime, setRecipePrepTime] = useState([])
    const [recipeCookTime, setRecipeCookTime] = useState([])
    const [recipeServes, setRecipeServes] = useState('')
    const [recipeIngredients, setRecipeIngredients] = useState('')
    const [recipeDirections, setRecipeDirections] = useState('')
    const [recipeSaveRecipeAs, setRecipeSaveRecipeAs] = useState('')


    const [selectedImage, setSelectedImage] = useState(null);

    const navigate = useNavigate()


    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const resp = await axios.put(`${host}/recipe/saverecipe`,{
           recipeTitle, recipeDescription, recipeCategory, recipePrepTime, recipeCookTime, recipeServes, recipeIngredients, recipeDirections, recipeSaveRecipeAs,
                
            });
               resp.then(res => {
                    if (res.data) {
                        alert("Your Recipe Added Successfully!!!")
                    }
                })
        }
        catch (err) {
            console.log(err)
            // alert("failed to upload")
        }
        navigate('/saverecipe')
    }


    return (
        <>
            <div id='useradded-recipe'>
                <div id='useradded-recipe-container'>
                    <h4>ADD A RECIPE</h4>
                    <input type='text' placeholder='Recipe Title' onChange={(e) => { setRecipeTitle(e.target.value) }}></input>
                    <textarea placeholder='Recipe Description' onChange={(e) => { setRecipeDescription(e.target.value) }}></textarea>
                    <h3>CATEGORIES</h3>
                    <hr />
                    <input type='text' placeholder='Ex : Mexican,Desert,Pudding,Brunch' onChange={(e) => { setRecipeCategory(e.target.value) }} id="useradded-recipe-category"/>
                    <div id='useradded-recipe-photo-timings'>
                        <div id='useradded-recipe-photo'>
                            {selectedImage === null ? 
                            <div id='useradded-recipe-photo-make-it-shine-camera-icon-one'>
                                <p>MAKE IT SHINE !!!</p>
                                <AiFillCamera id='useradded-recipe-photo-camera-icon-one' /></div> :
                                <div>
                                    <img alt="not found" src={URL.createObjectURL(selectedImage)} id='useradded-recipe-photo-recipe-image' />
                                </div>
                            }
                            <label for="files" id='useradded-recipe-photo-add-your-photo-btn'><AiOutlineCamera id='useradded-recipe-photo-camera-icon-two' />ADD YOUR PHOTO</label>
                            <input type='file' onChange={(event) => {
                                console.log(event.target.files[0]);
                                setSelectedImage(event.target.files[0]);
                            }} id='files'></input>
                        </div>
                        <div id='useradded-recipe-timings'>
                            <h5>PREP TIME :</h5>
                            <input type='text' onChange={(e) => { setRecipePrepTime(e.target.value) }}></input>
                            <select onChange={(e) => { setRecipePrepTime(e.target.value) }}>
                                <option value='minutes'>MINUTES</option>
                                <option value='hours'>HOURS</option>
                                <option value='days'>DAYS</option>
                            </select>
                            <h5>COOK TIME :</h5>
                            <input type='text' onChange={(e) => { setRecipeCookTime(e.target.value) }}></input>
                            <select onChange={(e) => { setRecipeCookTime(e.target.value) }}>
                                <option value='minutes' >MINUTES</option>
                                <option value='hours'>HOURS</option>
                                <option value='days'>DAYS</option>
                            </select>
                            <h5>SERVES :</h5>
                            <input type='text' onChange={(e) => { setRecipeServes(e.target.value) }}></input>
                        </div>
                    </div>
                    <h3>INGREDIENTS</h3>
                    <hr />
                    <p>Enter your ingredients one at a time or paste them into the box below and hit enter.</p>
                    <textarea placeholder='Ex : 1 tsp Cyenne Pepper' onChange={(e) => { setRecipeIngredients(e.target.value) }}></textarea>
                    <h3>DIRECTIONS</h3>
                    <hr />
                    <p>Enter your directions one step at a time or paste them into the box below and hit enter. Don’t worry, we will <br /> number them for you.</p>
                    <textarea placeholder='Ex : Place all ingredients in a blender' onChange={(e) => { setRecipeDirections(e.target.value) }}></textarea>
                    <h4>SAVE THIS RECIPE AS :</h4>
                    <div id='useradded-recipe-save-recipe-as'>
                        <div>
                        <input type='radio' id="public" name="saverecipeas" value="public" onChange={(e) => { setRecipeSaveRecipeAs(e.target.value) }}/>
                        <label for='public'>Public</label>
                        </div>
                        <div>
                        <input type='radio' id="private" name="saverecipeas" value="private" onChange={(e) => { setRecipeSaveRecipeAs(e.target.value) }}></input>
                        <label for='private'>Private</label>
                        </div>
                    </div>
                    <p>When you click Save, additional changes cannot be made until your recipe is published. <br /> By clicking Save, you agree to our <Link to='https://corporate.discovery.com/visitor-agreement/' target='_blank'>terms of service</Link></p>
                    <div id='useradded-recipe-submit-btn-cancel-text'>
                        <button onClick={handleSubmit}>SAVE</button>
                        <div>
                            <p>OR</p>
                            <p onClick={() => window.location.reload()}>CANCEL</p>
                        </div>
                    </div>
                </div>
            </div>
            <SearchRecipe/>
        </>
    )
}

export default AddRecipe