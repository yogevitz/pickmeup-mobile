import React from 'react';
import Table from "../../components/Table";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import QRScanner from '../../QRScanner';

import { getLiftRiders, setLiftRiderMark, getAllRiders } from '../../proxy';

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
      newChecked.forEach(async checked => await setLiftRiderMark({
        shuttleID: '65599946353',
        riderID: checked,
        date: '07-05-2020',
        direction: 'Afternoon',
        mark: '1',
      }));
    } else {
      newUnChecked = this.checked.filter(x => selectedIDs.indexOf(x) < 0);
      this.checked = this.checked.filter(_ => newUnChecked.indexOf(_) < 0);
      newUnChecked.forEach(async unChecked => await setLiftRiderMark({
        shuttleID: '65599946353',
        riderID: unChecked,
        date: '07-05-2020',
        direction: 'Afternoon',
        mark: '0',
      }));
    }
  };

  getRiderRowData = rider => {
    const checked = rider.mark === '1';
    checked && this.checked.push(rider.riderID);
    return ({ ...rider, tableData: { checked } });
  };

  filterMissingAndPresentRiders = rider => {
    return rider.mark === '0' || rider.mark === '1';
  };

  async componentDidMount() {
    const allRiders = await getAllRiders();
    let liftRiders = await getLiftRiders({ shuttleID: '65599946353', date: '07-05-2020', direction: 'Afternoon' });
    liftRiders = liftRiders
      .filter(this.filterMissingAndPresentRiders)
      .map(this.getRiderRowData);
    this.setState({ shuttleRiders: liftRiders, riders: allRiders });
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
  };

  onChooseNewRider = (event, newValue) => {
    console.log(newValue);
    this.setState({ riderToAdd: newValue })
  };

  render() {
    const { shuttleRiders, query, showScanner, isAddRiderShown, riders } = this.state;
    return (
      <Card style={{ backgroundColor: 'OldLace' }}>
        <CardHeader title={'Beer Sheva Afternoon'} />
        <CardContent>
          {showScanner
            ? (
              <div>
                <QRScanner onScan={this.handleScan} />
                <Button style={{ marginTop: '10px', marginBottom: '10px' }} variant="contained" onClick={this.onClickHideScanner}>
                  Hide Scanner
                </Button>
              </div>
            )
            : (
              <Button style={{ marginBottom: '30px' }} variant="contained" onClick={this.onClickShowScanner}>
                Scan
              </Button>
            )
          }
          {isAddRiderShown && (
              <div>
                <Grid container justify="center" spacing={1}>
                  <Grid item xs={8}>
                    <Autocomplete
                      id="rider-select"
                      options={riders.map(_ => `${_.name} (${_.riderID})`)}
                      getOptionLabel={(option) => option}
                      onChange={this.onChooseNewRider}
                      renderInput={(params) =>
                        <TextField {...params} label="Rider" variant="outlined" />}
                    />
                  </Grid>
                  <Grid item>
                    <Button style={{ marginTop: '10px', marginBottom: '20px' }} variant="contained" onClick={this.addRider}>
                      <AddIcon />
                    </Button>
                  </Grid>
                </Grid>
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
    );
  }
}

export default Report;
