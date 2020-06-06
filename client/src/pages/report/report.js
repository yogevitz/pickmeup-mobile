import React from 'react';
import Table from "../../components/Table";
import { InfoAlert } from "../../components/InfoAlert";
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
  {
    title: 'שם', field: 'riderName',
    headerStyle: { textAlign: 'right' }, cellStyle: { textAlign: 'right' },
  },
  {
    title: 'ת״ז', field: 'riderID',
    headerStyle: { textAlign: 'right' }, cellStyle: { textAlign: 'right' },
  },
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
      isInfoAlertShown: false,
    };
    this.checked = [];
    this.infoAlertText = '';
  }

  onSelectionChange = async selected => {
    const selectedIDs = selected.map(_ => _.riderID);
    let newChecked, newUnChecked;
    if (selectedIDs.length > this.checked.length) {
      newChecked = selectedIDs.filter(x => this.checked.indexOf(x) < 0);
      this.checked.push(...newChecked);
      newChecked.forEach(async checked => await setLiftRiderMark({
        shuttleID: '69379352912',
        riderID: checked,
        date: '03-06-2020',
        mark: '1',
      }));
    } else {
      newUnChecked = this.checked.filter(x => selectedIDs.indexOf(x) < 0);
      this.checked = this.checked.filter(_ => newUnChecked.indexOf(_) < 0);
      newUnChecked.forEach(async unChecked => await setLiftRiderMark({
        shuttleID: '69379352912',
        riderID: unChecked,
        date: '03-06-2020',
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
    let liftRiders = await getLiftRiders({ shuttleID: '69379352912', date: '03-06-2020' });
    console.log(liftRiders);
    liftRiders = liftRiders
      .filter(this.filterMissingAndPresentRiders)
      .map(this.getRiderRowData);
    this.setState({ shuttleRiders: liftRiders, riders: allRiders });
  }

  handleScan = id => {
    const { shuttleRiders } = this.state;
    const rider = shuttleRiders.find(rider => rider.riderID === id);
    if (rider) {
      rider.tableData.checked = true;
      this.showInfoAlert(rider.riderName);
      this.setState({ shuttleRiders });
    }
  };

  showInfoAlert = riderName => {
    this.infoAlertText = `${riderName}`;
    this.setState({ isInfoAlertShown: true });
  };

  handleCloseInfoAlert = () => {
    this.setState({ isInfoAlertShown: false });
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
    const { shuttleRiders, query, showScanner, isAddRiderShown, riders, isInfoAlertShown } = this.state;
    return (
      <div dir="rtl">
        <InfoAlert
          isOpen={isInfoAlertShown}
          onClose={this.handleCloseInfoAlert}
          severity={'success'}
          text={this.infoAlertText}
        />
        <Card style={{ backgroundColor: 'OldLace' }}>
          <CardHeader title={'משמר הנגב צהריים'} />
          <CardContent>
            {showScanner
              ? (
                <div>
                  <QRScanner onScan={this.handleScan} />
                  <Button style={{ marginTop: '10px', marginBottom: '10px' }} variant="contained" onClick={this.onClickHideScanner}>
                    הסתר סורק
                  </Button>
                </div>
              )
              : (
                <Button style={{ marginBottom: '30px' }} variant="contained" onClick={this.onClickShowScanner}>
                  סריקה
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
              data={shuttleRiders.sort((a, b) => a.tableData.checked ? 1 : -1)}
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
