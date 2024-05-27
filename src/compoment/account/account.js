import React, { Component } from 'react';
import '../../index.css';
import { Table } from 'antd';
import { getAccountByAddress, getPublicKey } from '../../util/utils';
import { DEX_ADDRESS, BASEAMOUNT, BASECOIN } from '../../util/constant';

const { Column } = Table;

class Account extends Component {
  state = {
    data: [],
  };

  async componentDidMount() {
    const initialData = await this.fetchUserData();
    this.setState({ data: initialData });
    this.timer = setInterval(async () => {
      const userData = await this.fetchUserData();
      this.setState({ data: userData });
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }


  async fetchUserData() {
    const accout = await getAccountByAddress(DEX_ADDRESS, 'GetAccountByAddress', await getPublicKey());
    for (const key in accout) {
        if (accout[key].coin === BASECOIN) {
            accout[key].coin = "BASE"
        } else {
            accout[key].coin = "TEST"
        }
        var b = BigInt(accout[key].balance) / BigInt(BASEAMOUNT)
        accout[key].balance = b.toString()
    }
    return accout;
  }

  render() {
    const { data } = this.state;
    return (
      <Table dataSource={data}>
        <Column title="Coin" dataIndex="coin" key="coin" />
        <Column title="Balance" dataIndex="balance" key="balance" />
      </Table>
    );
  }
}

export default Account;