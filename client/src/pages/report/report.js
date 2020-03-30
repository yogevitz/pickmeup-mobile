import React from 'react';
import Table from "../../components/Table";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import QRScanner from '../../QRScanner';

import { getAllShuttleRiders, markRider } from '../../proxy';

const columns = [
  { title: 'Name', field: 'riderName' },
  { title: 'ID', field: 'riderID' },
];

class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shuttleRiders: [],
      query: '',
      showScanner: false,
    };
    this.checked = [];
  }

  onSelectionChange = async selected => {
    const selectedIDs = selected.map(_ => _.riderID);
    let newChecked, newUnChecked;
    if (selectedIDs.length > this.checked.length) {
      newChecked = selectedIDs.filter(x => this.checked.indexOf(x) < 0);
      this.checked.push(...newChecked);
      newChecked.forEach(async checked => await markRider({
        shuttleID: '1',
        riderID: checked,
        date: '31/03/2020',
        direction: 'Morning',
        mark: '1',
      }));
    } else {
      newUnChecked = this.checked.filter(x => selectedIDs.indexOf(x) < 0);
      this.checked = this.checked.filter(_ => newUnChecked.indexOf(_) < 0);
      newUnChecked.forEach(async unChecked => await markRider({
        shuttleID: '1',
        riderID: unChecked,
        date: '31/03/2020',
        direction: 'Morning',
        mark: '0',
      }));
    }
  };

  getRiderRowData = rider => {
    const checked = rider.mark === '1';
    checked && this.checked.push(rider.riderID);
    return ({ ...rider, tableData: { checked } });
  };

  async componentDidMount() {
    let shuttleRiders = await getAllShuttleRiders(1);
    shuttleRiders = shuttleRiders.map(this.getRiderRowData);
    this.setState({ shuttleRiders: shuttleRiders });
  }

  handleScan = id => {
    this.setState({ query: id, showScanner: false });
  };

  onClickShowScanner = () => {
    this.setState({ showScanner: true });
  };

  render() {
    const { shuttleRiders, query, showScanner } = this.state;
    return (
      <Card>
        <CardHeader title={'Beer Sheva Morning Report'} />
        {
          showScanner
          ? <QRScanner onScan={this.handleScan} />
          :
            <Button variant="contained" onClick={this.onClickShowScanner}>
              Scan
            </Button>
        }
        <CardContent>
          <Table
            title=""
            columns={columns}
            selection={true}
            data={shuttleRiders}
            query={query}
            onSelectionChange={this.onSelectionChange}
          />
        </CardContent>
      </Card>
    );
  }
}

export default Report;
