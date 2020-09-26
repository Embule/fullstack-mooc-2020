import React from 'react';

const Filter = ({filterNames}) => {
    return (
<form>
    Filter names
    <br />
    <input onChange={filterNames}  />
</form>
    )
}

export default Filter;