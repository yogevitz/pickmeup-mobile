import React, { Component } from "react";
import QrReader from "react-qr-reader";

export default class QRScanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 300,
    };
    this.handleScan = this.handleScan.bind(this);
  }
  handleScan(data) {
    if (data) {
      this.props.onScan(data);
    }
  }
  handleError(err) {
    console.error(err);
  }
  render() {
    return (
      <div>
        <QrReader
          delay={this.state.delay}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: "100%" }}
        />
      </div>
    );
  }
}