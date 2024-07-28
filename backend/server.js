import express from "express"
import bodyParser from "body-parser"
import pg from "pg"
import cors from "cors"
import env from "dotenv"

env.config()
const port = 5000
const app = express()

const db =  new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

db.connect()
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())

let todos = []
// async function getNotes() {
//     const response =  await db.query("SELECT title, content, note_id FROM notes")
//     console.log(response.data);
// }
// get all the saved notes from db
app.get("/api/getNotes", async(req,res) => {
    const response =  await db.query("SELECT title, content, note_id FROM notes")
    todos = response.rows
    res.json(todos)
})

// Add new notes
app.post("/api/addNote",  async (req,res) => {   
    const { title, content, note_id} = req.body   
    
    try {
        await db.query("INSERT INTO notes (title, content, note_id) VALUES( $1, $2, $3)", [title, content, note_id])
    } catch (error) {
        console.log(error);
    }
})



// Delete Notes 
app.post("/api/deleteNote", async (req,res) => {   
    const noteToBeDeleted = req.body.id
    await db.query("DELETE FROM notes WHERE note_id = $1", [noteToBeDeleted])
    res.status(200)   
});


app.listen(port, ()=> {
    console.log(`Server is listening on port ${port}`);
})