import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext"

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const { note ,updateNote} = props;
    return (
        <div className='col-md-3'>
            
            
            <div class="card my-3">
                
                    <div class="card-body">
                        <div className="d-flex align-items-center">
                        <h5 class="card-title">{note.title}</h5>
                        
                        <i class="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id)}}></i>
                        <i class="fa-regular fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
                        </div>
                        <p class="card-text">{note.description}</p>
                    </div>
            </div>
        </div>
    )
}

export default Noteitem