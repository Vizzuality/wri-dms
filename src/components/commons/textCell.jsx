import React, { PropTypes } from 'react';
import { Cell } from 'fixed-data-table';

const TextCell = ({ rowIndex, data, columnKey, ...props }) => {
  let value = data[rowIndex];
  const parts = columnKey.split('.');
  for (let i = 0, length = parts.length; i < length; i++) {
    if (!value) {
      value = null;
      break;
    }
    value = value[parts[i]];
  }
  return (
    <Cell {...props}>
      {value}
    </Cell>
  );
};
TextCell.propTypes = {
  data: PropTypes.array,
  rowIndex: PropTypes.number,
  columnKey: PropTypes.string,
};

export default TextCell;
