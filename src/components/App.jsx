import React, { Component } from "react";
import PropTypes from 'prop-types'
// import { increment, decrement, addMsg } from "../redux/actions";

export default class App extends Component {

  static propTypes = {
    count:PropTypes.number.isRequired,
    msgs:PropTypes.array.isRequired,
    increment:PropTypes.func.isRequired,
    decrement:PropTypes.func.isRequired,
    addMsg:PropTypes.func.isRequired
  }
  increment = () => {
    const number = this.select.value * 1;
    this.props.increment(number);
  };
  decrement = () => {
    const number = this.select.value * 1;
    this.props.decrement(number);
  };
  addMsg = () => {
    const msg = this.input.value.trim();
    this.props.addMsg(msg);
  };
  render() {
    // const state = this.props.store.getState();
    const count = this.props.count;
    const msgs = this.props.msgs;
    return (
      <div className="App">
        <div>
          <p>click {count} times</p>
          <select ref={(select) => (this.select = select)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          &nbsp;
          <button onClick={this.increment}>add</button>&nbsp;
          <button onClick={this.decrement}>sub</button>&nbsp;
        </div>
        <div>
          <input type="text" ref={(input) => (this.input = input)} />
          <button onClick={this.addMsg}>add</button>
          <ul>
            { msgs.map((msg, index) => <li key={index}>{msg}</li>)}
          </ul>
        </div>
      </div>
    );
  }
}
