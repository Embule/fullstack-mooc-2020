import React from 'react';

const Total = ({ course }) => {

    const parts = course.parts
    const total = parts.map(part =>
         part.exercises).reduce((accumulator, currentValue) => accumulator + currentValue)

    return (
        <div>
            <p>Total of {total} exercises</p>
        </div>
    );
}


export default Total;