import NoteContext from "./NoteContext";
import React, { useState } from 'react';

const NoteState = (props) => {
  const notesInitial = [
    {
      "_id": "66ed307334e71ef771c80706",
      "title": "title2",
      "description": "description2",
      "tag": "high",
      "date": "2024-09-20T08:21:07.355Z",
      "__v": 0
    },
    {
      "_id": "66ede43da017edd953917753",
      "title": "title3",
      "description": "description3",
      "tag": "medium",
      "date": "2024-09-20T21:08:13.488Z",
      "__v": 0
    }
  ];

  const [notes, setNotes] = useState(notesInitial); // Change setnotes to setNotes

  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
}

export default NoteState;
