import React from 'react'
import Part from './Part'

const Content = ({course}) => {
    return (
      <div>
    <ul>
        {course.parts.map(part => 
            <Part key={part.name} name={part.name} exercises={part.exercises} />
        )}
    </ul>
      </div>
    )
  }

  export default Content
  