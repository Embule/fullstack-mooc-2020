import React from 'react';
import Course from './components/Course'

const App = ({ courses }) => {

  const courseMain = () =>
    courses.map(course =>
      <Course
        key={course.id}
        course={course}
      />
    )

  return (
    <div>
      {courseMain()}
    </div>
  )
}

export default App;
