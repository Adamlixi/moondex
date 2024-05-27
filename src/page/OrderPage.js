import React from 'react';
import DynamicChart from '../compoment/priceChart/DynamicChart2';
import OrderForm from '../compoment/order/OrderForm';
import OrderHistory from '../compoment/orderHistory/OrderHistory'
import './order.css';

class OrderPage extends React.Component {
  render() {
    return (
      <div>
        <div>
          <div className="content1">
            <DynamicChart />
            <OrderForm />
          </div>
          <div>
            <OrderHistory />
          </div> 
        </div>
      </div>
    );
  }
}

export default OrderPage;