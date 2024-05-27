import React, { useState } from 'react';
import {
  Form,
  Radio,
  Card
} from 'antd';

import BuyForm from './buyForm';
import SellForm from './sellForm';
import TransForm from './transForm';

const OrderForm = () => {
  const [tradeType, setTradeType] = useState('transfer');

  return (
    <Card size='default' style={{padding:'0px', width:'500px', height: '500px'}}>
        <Form
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 25 }}
          layout="horizontal"
          initialValues={{ size: 'large' }}
          size={'large'}
          style={{ maxWidth: 380 }}
        >

        <Form.Item label="Transaction Type">
            <Radio.Group defaultValue={'trans'}>
              <Radio.Button value="trans" onClick={() =>  setTradeType("trans")}>Transfer</Radio.Button>
              <Radio.Button value="buy" onClick={() => setTradeType("buy")}>Buy</Radio.Button>
              <Radio.Button value="sell" onClick={() =>  setTradeType("sell")}>Sell</Radio.Button>
            </Radio.Group>
        </Form.Item>
        <div className='formType'>
        <GetForm props = {tradeType}></GetForm>
        </div>
        </Form>
    </Card>
  );
};

function GetForm(props) {
    if (props['props'] === 'sell') {
        return <SellForm />;
    } else if (props['props'] === 'buy') {
        return <BuyForm />;
    } else {
        return <TransForm />;
    }
}

export default OrderForm;