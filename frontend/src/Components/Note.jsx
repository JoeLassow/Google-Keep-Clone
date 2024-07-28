import axios from "axios";
import React from "react";
import Draggable from "react-draggable"
import DeleteIcon from '@mui/icons-material/Delete';

function Note(props) {

    function handleClick(){
        props.onClicked(props.id)
    }

    return (
        <Draggable>
            <div className="note">
                <form>
                    <h1>{props.title}</h1>
                    <p>{props.content}</p>
                    <button type="submit" onClick={handleClick}><DeleteIcon /></button>
                </form>
            </div>
        </Draggable>
    )
}

export default Note;