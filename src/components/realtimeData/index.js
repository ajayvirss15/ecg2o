import React from "react";
import { ref, onValue } from "firebase/database";
import { Table } from "react-bootstrap";
import StartFirebase from "../firebaseConfig/index";
import "./data.css"; 

const db = StartFirebase();

export class RealtimeData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      maxHeartRate: 0
    };
  }

  componentDidMount() {
    const dbRef = ref(db, "test");

    onValue(dbRef, (snapshot) => {
      let data = snapshot.val();
      if (!data) return;  
      let maxHeartRate = this.state.maxHeartRate;

      
      maxHeartRate = Math.max(maxHeartRate, data.hrate);

      let newRecord = {
        heartRate: data.hrate,
        ecg: data.ecg,
        loPlus: data['LO+'],
        loMinus: data['LO-']
      };

      this.setState((prevState) => ({
        tableData: [...prevState.tableData, newRecord],
        maxHeartRate: maxHeartRate
      }));
    });
  }

  render() {
    return (
      <Table className="table">
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Current</th>
            <th>Maximum</th>
          </tr>
        </thead>
        <tbody>
          {this.state.tableData.map((row, index) => (
            <React.Fragment key={index}>
              <tr>
                <td>Heart Rate:</td>
                <td>{row.heartRate} bpm</td>
                <td>{this.state.maxHeartRate} bpm</td>
              </tr>
              <tr>
                <td>ECG Signal:</td>
                <td>{row.ecg}</td>
                <td>N/A</td>
              </tr>
              <tr>
                <td>LO+:</td>
                <td>{row.loPlus ? 'Not Connected' : 'Connected'}</td>
                <td>N/A</td>
              </tr>
              <tr>
                <td>LO-:</td>
                <td>{row.loMinus ? 'Not Connected' : 'Connected'}</td>
                <td>N/A</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    );
  }
}