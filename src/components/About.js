import React, { useContext, useEffect } from 'react'
import noteContext from '../Context/Notes/NoteContext'


const About = () => {
  const a = useContext(noteContext)
  
  useEffect(() => {
    a.update()

  }, [])
  return (
    <div>
      This is About {a.state.name} and he is in {a.state.class}
    </div>
  )
}

export default About