// import React from "react";

import { connect } from "react-redux";
import * as all from "../redux/actions";
import App from "../components/App";
export default connect(
  (state) => ({
    count: state.count,
    msgs: state.msgs,
  }),
  { ...all }
)(App);
