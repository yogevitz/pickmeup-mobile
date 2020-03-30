import React from 'react';
import Table from "../../components/Table";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";

const columns = [
  { title: 'Name', field: 'name' },
  { title: 'ID', field: 'riderID' },
];

class Report extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card>
        <CardHeader title={'Beer Sheva 1 Morning Report'} />
        <CardContent>
          <Table
            columns={columns}
            data={[
              {
                name: 'Benjamin Netanyahu',
                riderID: '204787923',
              },
              {
                name: 'Benny Gantz',
                riderID: '319835517',
              },
              {
                name: 'Josh Elgrably',
                riderID: '315483923',
              },
              {
                name: 'Omer Perez',
                riderID: '318819201',
              },
              {
                name: 'Idan Koper',
                riderID: '382724423',
              },
              {
                name: 'Liron Lillian',
                riderID: '317628911',
              },
              {
                name: 'Shay Lasri',
                riderID: '311888822',
              },
              {
                name: 'Rotem Sela',
                riderID: '205678687',
              },
              {
                name: 'Dor Abargel',
                riderID: '311724423',
              },
              {
                name: 'Don Omar',
                riderID: '208908121',
              },
              {
                name: 'David Levi',
                riderID: '309823214',
              },
            ]}
            onSelectionChange={
              (rows) =>
                alert('Send POST http request: '
                + rows.length + ' rows: \r'
                + JSON.stringify(rows))
            }
          />
        </CardContent>
      </Card>
    );
  }
}

export default Report;
