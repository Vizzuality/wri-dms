import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Table, Column, Cell } from 'fixed-data-table';
import TextCell from 'components/commons/textCell';
import ButtonCell from 'components/commons/buttonCell';
import LinkCell from 'components/commons/linkCell';
import datasetConfig from 'config/datasetConfig.json';

class DatasetList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filteredList: this.props.list,
      filters: {},
      columnWidths: {
        id: 300,
        name: 500,
        application: 100,
        provider: 100,
        status: 100,
        actions: 100,
      },
    };

    this.onColumnResizeEndCallback = this.onColumnResizeEndCallback.bind(this);
    this.deleteDataset = this.deleteDataset.bind(this);
  }

  componentWillMount() {
    if (!this.props.list) {
      this.props.getDatasets();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.list !== this.props.list) {
      this.filterList(this.state.filters, nextProps.list);
    }
    if (nextProps.app !== this.props.app) {
      this.props.getDatasets();
    }
  }

  onColumnResizeEndCallback(newColumnWidth, columnKey) {
    this.setState(({ columnWidths }) => ({
      columnWidths: {
        ...columnWidths,
        [columnKey]: newColumnWidth,
      },
    }));
  }


  onChangeFilter(filter, e) {

    let value = null;
    if (e.target.value) {
      value = e.target.value.toLowerCase();
    }

    const newState = Object.assign({}, this.state.filters, { [filter]: value });
    this.filterList(newState, this.props.list);
  }

  filterList(filtersObj, list) {
    const filters = Object.keys(filtersObj);
    const lengthFilters = filters.length;

    const filteredList = list.filter((dataset) => {
      for (let i = 0; i < lengthFilters; i++) {
        const key = filters[i];
        if (filtersObj[key]) {
          if (key === 'status') {
            if (filtersObj[key] && dataset.meta.status.toLowerCase().indexOf(filtersObj[key]) < 0) {
              return false;
            }
          } else if (dataset[key].toLowerCase().indexOf(filtersObj[key]) < 0) {
            return false;
          }
        }
      }
      return true;
    });

    this.setState({
      filters: filtersObj,
      filteredList,
    });
  }

  deleteDataset(dataset) {
    if (window.confirm('Sure you want to delete the dataset?')) {
      this.props.removeDataset(dataset.id);
    }
  }

  render() {
    const { columnWidths } = this.state;
    const optionsArray = [<option key={0} value="">All</option>];
    if (datasetConfig && datasetConfig.status) {
      datasetConfig.status.map((el, index) => {
        optionsArray.push(<option value={el} key={index + 1}>{el}</option>);
        return el;
      });
    }
    return (
      <div className="row">
        <form>
          <div className="row">
            <div className="medium-3 columns">
              <label>Filter by Name
                <input type="text" onChange={(e) => this.onChangeFilter('name', e)} />
              </label>
            </div>
            <div className="medium-3 columns">
              <label>Filter by Status
                <select onChange={(e) => this.onChangeFilter('status', e)}>
                  {optionsArray}
                </select>
              </label>
            </div>
            <div className="medium-6 columns">
              <Link to="/dataset/new" className="button">Create</Link>
            </div>
          </div>
        </form>
        {this.state.filteredList &&
          <Table
            rowsCount={this.state.filteredList.length}
            rowHeight={50}
            headerHeight={50}
            width={1200}
            height={480}
            onColumnResizeEndCallback={this.onColumnResizeEndCallback}
            isColumnResizing={false}
          >
            <Column
              columnKey="id"
              header={<Cell> Id </Cell>}
              cell={<LinkCell data={this.state.filteredList} basePath={window.location.pathname} />}
              width={columnWidths.id}
              isResizable
            />
            <Column
              columnKey="name"
              header={<Cell> Name </Cell>}
              cell={<TextCell data={this.state.filteredList} />}
              width={columnWidths.name}
              isResizable
            />
            <Column
              columnKey="application"
              header={<Cell> App </Cell>}
              cell={<TextCell data={this.state.filteredList} />}
              width={columnWidths.application}
              isResizable
            />
            <Column
              columnKey="provider"
              header={<Cell> Provider </Cell>}
              cell={<TextCell data={this.state.filteredList} />}
              width={columnWidths.provider}
              isResizable
            />
            <Column
              columnKey="meta.status"
              header={<Cell> Status </Cell>}
              cell={<TextCell data={this.state.filteredList} />}
              width={columnWidths.status}
              isResizable
            />
            <Column
              header={<Cell> Actions </Cell>}
              cell={<ButtonCell data={this.state.filteredList} onClick={this.deleteDataset} label="Delete" />}
              width={columnWidths.actions}
              isResizable
            />
          </Table>}
      </div>

    );
  }

}

DatasetList.propTypes = {
  list: PropTypes.array,
  getDatasets: PropTypes.func,
  removeDataset: PropTypes.func,
  app: PropTypes.string,
};

export default DatasetList;
