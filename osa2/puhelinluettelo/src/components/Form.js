import React from 'react';

const Form = ({ onSubmit, nameChange, name, numberChange, number }) => {

  return (
    <form onSubmit={onSubmit}>
      <div>
        name:
        <br />
          <input
          onChange={nameChange}
          value={name}
        />
      </div>
      <div>
        number:
        <br />
          <input
          onChange={numberChange}
          value={number}
        />

      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

export default Form;