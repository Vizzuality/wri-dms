import React, { PropTypes } from 'react';
import { Cell } from 'fixed-data-table';

const TextCell = ({ rowIndex, data, columnKey, ...props }) => (
  <Cell {...props}>
    {data[rowIndex][columnKey]}
  </Cell>
);
TextCell.propTypes = {
  data: PropTypes.array,
  rowIndex: PropTypes.number,
  columnKey: PropTypes.string,
};

export default TextCell;
