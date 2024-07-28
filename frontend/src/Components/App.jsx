import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CreateArea from "./CreateArea";
import Note from "./Note";
import axios from "axios"


function App() {    
    const [notes, setNotes] = useState([])

    // Getting all notes from db 
    useEffect(() => {
        const fetchTodos = async () => {
          try {
            const response = await axios.get('http://localhost:5000/api/getNotes');            
            setNotes(response.data)            
          } catch (error) {
            console.error(error);
          }
        };
        fetchTodos();
      }, []);

    
    
    async function deleteNote(id) {
      try {
        await axios.post(`http://localhost:5000/api/deleteNote`, {"id": id })        
    } catch (error) {
        console.log(error);
    }
    }

    return (
        <div>   
            <Header />
            <CreateArea />
            {notes.map((item, index) => {
                return <Note title={item.title} content={item.content} id={item.note_id} key={index} onClicked={deleteNote}/>
            })}
            <Footer />
        </div>

    )

}
export default App