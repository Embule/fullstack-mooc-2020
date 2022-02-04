import React from 'react'
import Part from './Part'
import Total from './Total'

const Content = ({ course }) => {
  return (
    <div>
      <p>
        {course.parts.map(part =>
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        )}
      </p>
      <Total course={course} />
    </div>
  )
}

export default Content
