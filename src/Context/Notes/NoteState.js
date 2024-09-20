import NoteContext from "./NoteContext";
import React, { useState } from 'react';


const NoteState = (props) => {
    const s1 = {
        "name": "useer1",
        "class" : "1"
    }
    const [state, setstate] = useState(s1)

    const update = () => {
        setTimeout(() => {
            setstate({
                "name" : "Larry",
                "class" : "9"
            })
        }, 1000)
    }

    
    return (
        <NoteContext.Provider value= {{state, update}}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState