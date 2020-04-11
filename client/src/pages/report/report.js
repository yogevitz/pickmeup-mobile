import React from 'react';
import Table from "../../components/Table";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import QRScanner from '../../QRScanner';

import { getAllShuttleRiders, markRider, getAllRiders } from '../../proxy';

const columns = [
  { title: 'Name', field: 'riderName' },
  { title: 'ID', field: 'riderID' },
];

class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddRiderShown: false,
      shuttleRiders: [],
      riders: [],
      riderToAdd: null,
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
    const allRiders = await getAllRiders();
    let shuttleRiders = await getAllShuttleRiders(1);
    shuttleRiders = shuttleRiders.map(this.getRiderRowData);
    this.setState({ shuttleRiders: shuttleRiders, riders: allRiders });
  }

  handleScan = id => {
    this.setState({ query: id, showScanner: false });
  };

  onClickShowScanner = () => {
    this.setState({ showScanner: true });
  };

  onClickHideScanner = () => {
    this.setState({ showScanner: false });
  };

  handleAdd = async () => {
    this.setState({ isAddRiderShown: !this.state.isAddRiderShown });
    console.log('Add Rider');
  };

  onChooseNewRider = (event, newValue) => {
    console.log(newValue);
    this.setState({ riderToAdd: newValue })
  };

  render() {
    const { shuttleRiders, query, showScanner, isAddRiderShown, riders } = this.state;
    return (
      <div>
        <Card>
          <CardHeader title={'Beer Sheva Morning Report'} />
          {
            showScanner
            ? (
                <div>
                  <QRScanner onScan={this.handleScan} />
                  <Button style={{ marginTop: '10px' }} variant="contained" onClick={this.onClickHideScanner}>
                    Hide Scanner
                  </Button>
                </div>)
            :
              <Button variant="contained" onClick={this.onClickShowScanner}>
                Scan
              </Button>
          }
          <CardContent>
            {
              isAddRiderShown &&
              (
                <div>
                  <Autocomplete
                    id="rider-select"
                    options={riders.map(_ => `${_.name} (${_.sid})`)}
                    getOptionLabel={(option) => option}
                    onChange={this.onChooseNewRider}
                    renderInput={(params) =>
                      <TextField {...params} label="Rider" variant="outlined" />}
                  />
                  <Button style={{ marginTop: '10px', marginBottom: '20px' }} variant="contained" onClick={this.addRider}>
                    Add Rider
                  </Button>
                </div>
              )
            }
            <Table
              title=""
              columns={columns}
              selection={true}
              data={shuttleRiders}
              query={query}
              onSelectionChange={this.onSelectionChange}
              handleAdd={this.handleAdd}
            />
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default Report;
