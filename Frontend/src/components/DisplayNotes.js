import React, { useContext, useEffect, useRef, useState } from 'react';
import Noteitem from './Noteitem';
import noteContext from '../context/notes/NoteContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const DisplayNotes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote, filterTag, filterTitle } = context;
  const ref = useRef(null)
  const refClose = useRef(null)
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
  }

  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    toast("Edited Successfully");
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes()
    } else {
      navigate("/login");
    }

    // eslint-disable-next-line
  }, [])

  const filterByTitle = () => {
    // console.log("Filter by Title")
    filterTitle();
  }

  const filterByTag = () => {
    // console.log("Filter by Tag")
    filterTag();
  }

  return (
    <div className="row my-3">
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <h2>Your Notes</h2>
      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Sort By
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <Link className="dropdown-item btn btn-primary" to="#" onClick={filterByTitle}>Title</Link>
          <Link className="dropdown-item btn btn-primary" to="#" onClick={filterByTag}>Tag</Link>
        </div>
      </div>
      <div className="container mx-2">
        {notes.length === 0 && 'No notes to display'}
      </div>

      <div style={{ "display": "flex", "flexDirection": "row", "marginTop": "10px", "gap": "5px" }}>
        {notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} note={note} />
        })}
      </div>


      <ToastContainer />
    </div>
  );
};

export default DisplayNotes;
