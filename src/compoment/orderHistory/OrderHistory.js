import React, { Component } from 'react';
import './Order.css';
import BuyOrder from './BuyOrder'
import SellOrder from './SellOrder'
import OrderUserCreate from './OrderUserCreate'
import Account from '../account/account';

class OrderHistory extends Component {
  // ... 在此处添加表单的状态和处理程序

  render() {
    return (
      <form className="bottom-form">
        <div>
          <BuyOrder></BuyOrder>
        </div>
        <div>
          <SellOrder></SellOrder>
        </div>
        <div>
          <OrderUserCreate></OrderUserCreate>
        </div>
        <div>
          <Account></Account>
        </div>
      </form>
    );
  }
}

export default OrderHistory;