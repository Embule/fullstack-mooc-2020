import React from 'react';

const Filter = ({filterNames}) => {
    return (
<form>
    filter shown with 
    <input onChange={filterNames}  />
</form>
    )
}

export default Filter;