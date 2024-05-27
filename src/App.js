import React, { Component } from 'react';
import './index.css';
import {connectWallet, setPublicKey} from './util/utils';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Button } from 'antd';
import Main from './page/MainPage';

class App extends Component {
//   state = {
//     isConnected: false,
//   };

//   componentDidMount() {
//     if (window.arweaveWallet !== null) {
//         setPublicKey()
//       this.setState({ isConnected: true });
//     }
//   }

//   handleConnect = () => {
//     connectWallet();
//     setPublicKey()
//     if (window.arweaveWallet !== null) {
//       this.setState({ isConnected: true });
//     }
//   };

  render() {
    return <Main />;
  }
}

export default App;