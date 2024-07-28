import React, { useState } from "react";
import axios from "axios"
import { v4 as uuidv4 } from 'uuid';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import { Zoom } from "@mui/material";

function CreateArea(props) {
    const [userInput, setUserInput] = useState({
        title: "",
        content: ""
    })
    const [styling, setStyles] = useState(false)

    function handleChange(event){        
        const { name, value} = event.target
        setUserInput((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    async function handleClick(event) {
        // make a post request to our server     
        const noteWithId = {...userInput, note_id: uuidv4() }          
        try{            
            await axios.post("http://localhost:5000/api/addNote", noteWithId)
        } catch (error) {
            console.log(error);
        }         
        
        setUserInput({
            title: "",
            content: ""
        })
    }
    function handleTextAreaClick() {
        setStyles(true)
    }
    return (
        <form className="create-note">
            {styling?<input 
                value={userInput.title} 
                onChange={handleChange}
                name="title"
                placeholder="Enter a Note Title">
            </input>: null}
            <textarea 
                onClick={handleTextAreaClick}
                value={userInput.content} 
                onChange={handleChange}
                name="content" 
                placeholder="Enter the notes Content" 
                rows={styling?"3":"1"}>
            </textarea>
            <Zoom in={styling}>
                <Fab type="submit" onClick={handleClick}><AddIcon /></Fab>
            </Zoom>
        </form>
    )
}
export default CreateArea