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
      <h1>All Courses</h1>
      {courseMain()}
    </div>
  )
}

export default App;
