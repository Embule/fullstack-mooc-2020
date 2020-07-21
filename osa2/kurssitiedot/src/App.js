import React from 'react';
import Course from './components/Course'

const App = ({course}) => {

  return (
    <div>
        <Course 
        key={course.id}
        course={course}/>
    </div>
  )
}

export default App;
