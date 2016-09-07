import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Table, Column, Cell } from 'fixed-data-table';
import TextCell from 'components/commons/textCell';

class DatasetList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filteredList: this.props.list,
      columnWidths: {
        id: 250,
        name: 500,
        application: 75,
        provider: 100,
        tags: 200,
        status: 75,
      },
    };

    this.onColumnResizeEndCallback = this.onColumnResizeEndCallback.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
  }

  componentWillMount() {
    if (!this.props.list) {
      this.props.getDatasets();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.list !== this.props.list) {
      this.setState({ filteredList: nextProps.list });
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

  onFilterChange(e) {
    if (!e.target.value) {
      this.setState({
        filteredList: this.props.list,
      });
    }

    const filterBy = e.target.value.toLowerCase();
    const filteredList = this.props.list.filter((dataset) => dataset.name.toLowerCase().indexOf(filterBy) >= 0);

    this.setState({
      filteredList,
    });
  }

  render() {
    const { columnWidths } = this.state;
    return (
      <div className="row">
        <form>
          <div className="row">
            <div className="medium-6 columns">
              <label>Filter by Name
                <input type="text" onChange={this.onFilterChange} />
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
              cell={<TextCell data={this.state.filteredList} />}
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
              columnKey="tags"
              header={<Cell> Tags </Cell>}
              cell={<TextCell data={this.state.filteredList} />}
              width={columnWidths.tags}
              isResizable
            />
            <Column
              columnKey="meta.status"
              header={<Cell> Status </Cell>}
              cell={<TextCell data={this.state.filteredList} />}
              width={columnWidths.status}
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
};

export default DatasetList;
