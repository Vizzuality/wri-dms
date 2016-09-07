import React, { PropTypes } from 'react';

const SelectForm = ({ input, label, options, meta: { touched, error } }) => {
  let classInputError = '';
  if (touched && error) {
    classInputError = 'is-invalid-input';
  }

  let optionsArray = [<option key={0}></option>];
  if (options) {
    options.map((el, index) => optionsArray.push(<option value={el.value} key={index + 1}>{el.label}</option>));
  }

  return (
    <div>
      <label>
        {label}
      </label>
      <select {...input} placeholder={label} className={classInputError}>
        {optionsArray}
      </select>
      {touched && error && <span className="form-error is-visible">{error}</span>}
    </div>
  );
};

SelectForm.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  options: PropTypes.array,
  meta: PropTypes.object,
};

export default SelectForm;
