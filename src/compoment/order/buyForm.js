import React, {useState} from 'react';
import {
  Button,
  Form,
  Row,
  Col,
  InputNumber,
  Input
} from 'antd';
import './order.css'

import {BASECOIN, TESTCOIN, DEX_ADDRESS, BASEAMOUNT, MUL} from '../../util/constant'
import {AOCreateOrder, getResult} from '../../util/utils'

const BuyForm = () => {
    const [buyPrice, setBuyPrice] = useState('');
    const [buyAmount, setBuyAmount] = useState('');

    const handleSubmit = async () => {
        var price =  parseFloat(buyPrice)
        var priceI = BigInt(Math.floor(price * MUL))
        var fromAmount = priceI * BigInt(buyAmount) * BigInt(BASEAMOUNT) / BigInt(MUL)
        var toAmount = BigInt(buyAmount) * BigInt(BASEAMOUNT)
        console.log("FROM:" + fromAmount.toString())
        console.log("TO:" + toAmount.toString())
        var messageId = await AOCreateOrder(DEX_ADDRESS, BASECOIN, TESTCOIN, fromAmount.toString(), toAmount.toString())
        await getResult(DEX_ADDRESS, messageId)
        console.log('Buy price:', buyPrice);
        console.log('Buy amount:', buyAmount);
      };
    
    return (
    <>
      <Form.Item label="Purchase Price">
        <Row gutter={8}>
          <Col span={17}>
            <Input value={buyPrice} onChange={(e) => setBuyPrice(e.target.value)}/>
          </Col>
        </Row>
      </Form.Item>
      <Form.Item label="Purchase Quantity">
      <Row gutter={8}>
          <Col span={17}>
            <Input value={buyAmount} onChange={(e) => setBuyAmount(e.target.value)}/>
          </Col>
        </Row>
      </Form.Item>
      <Form.Item label = "Submit">
        <Button onClick={handleSubmit}>Submit</Button>
      </Form.Item>
      </>
  );
};

export default BuyForm;