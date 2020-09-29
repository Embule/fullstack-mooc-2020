import React from 'react';

const Form = ({ onSubmit, nameChange, name, numberChange, number }) => {

  return (
    <form 
    className="form"
    onSubmit={onSubmit}>
      <div>
        Name:
        <br />
          <input
          onChange={nameChange}
          value={name}
        />
      </div>
      <br />
      <div>
        Number:
        <br />
          <input
          onChange={numberChange}
          value={number}
        />
      </div>
      <div>
        <button className="add" type="submit">Add</button>
      </div>
    </form>
  );
}

export default Form;