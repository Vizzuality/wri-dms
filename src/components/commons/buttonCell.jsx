import React, { PropTypes } from 'react';

const ButtonCell = ({ data, rowIndex, onClick, label }) => (
  <button type="button" className="alert button" onClick={() => onClick(data[rowIndex])}>{label}</button>
);
ButtonCell.propTypes = {
  data: PropTypes.array,
  rowIndex: PropTypes.number,
  columnKey: PropTypes.string,
  onClick: PropTypes.func,
  label: PropTypes.string,
};

export default ButtonCell;
