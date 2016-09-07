import React, { PropTypes } from 'react';

const InputForm = ({ input, label, type, meta: { touched, error } }) => {
  let classInputError = '';
  if (touched && error) {
    classInputError = 'is-invalid-input';
  }
  return (
    <div>
      <label>
        {label}
      </label>
      <input {...input} placeholder={label} type={type} className={classInputError} />
      {touched && error && <span className="form-error is-visible">{error}</span>}
    </div>
  );
};

InputForm.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  options: PropTypes.array,
  meta: PropTypes.object,
};

export default InputForm;
