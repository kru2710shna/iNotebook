import React, { useContext } from 'react';
import noteContext from "../Context/Notes/NoteContext";


export const Home = () => {
  const context = useContext(noteContext);
  const { notes, setNotes } = context;  

  return (
    <div className='container my-3'>
      <h1>Add Notes</h1>
      <div className='container'>
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
          </div>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
      <div>
        <h1>Your Notes</h1>
        {/* Safely render notes */}
        {Array.isArray(notes) && notes.length > 0 ? (
          notes.map((note) => (
            <div key={note._id}>{note.title}</div> // Use _id as key
          ))
        ) : (
          <p>No notes available</p>
        )}
      </div>
    </div>
  );
}

export default Home;
