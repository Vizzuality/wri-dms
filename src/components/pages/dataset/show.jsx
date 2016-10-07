import React, { PropTypes } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import DetailPanel from 'components/pages/dataset/tabs/detailPanel';
// import { Link } from 'react-router';

class DatasetShow extends React.Component {

  componentWillMount() {
    if (!this.props.dataset) {
      this.props.getDataset(this.props.params.id);
    }
  }

  onSelectTab(tab) {
    this.setState({ activeTab: tab });
  }

  render() {

    return (
      <Tabs>
        <TabList>
          <Tab>Detail</Tab>
          <Tab>Metadata</Tab>
          <Tab>Layers</Tab>
          <Tab>Widgets</Tab>
        </TabList>
        <TabPanel>
          <DetailPanel />
        </TabPanel>
        <TabPanel>
          <h2>Metadata</h2>
        </TabPanel>
        <TabPanel>
          <h2>Layers</h2>
        </TabPanel>
        <TabPanel>
          <h2>Widgets</h2>
        </TabPanel>
      </Tabs>

    );
  }

}

DatasetShow.propTypes = {
  dataset: PropTypes.object,
  getDataset: PropTypes.func,
  removeDataset: PropTypes.func,
  params: PropTypes.any,
};

export default DatasetShow;
