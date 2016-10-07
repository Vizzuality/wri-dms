import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const LinkCell = ({ rowIndex, data, columnKey, basePath }) => (
  <Link to={`${basePath}/${data[rowIndex][columnKey]}`}>{data[rowIndex][columnKey]}</Link>
);
LinkCell.propTypes = {
  data: PropTypes.array,
  rowIndex: PropTypes.number,
  columnKey: PropTypes.string,
  basePath: PropTypes.string,
};

export default LinkCell;
