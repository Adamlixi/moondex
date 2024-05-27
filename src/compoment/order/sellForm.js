import React, {useState} from 'react';
import {
  Button,
  Form,
  InputNumber,
  Input,
  Row,
  Col,
} from 'antd';

import {BASECOIN, TESTCOIN, DEX_ADDRESS, BASEAMOUNT, MUL} from '../../util/constant'
import {AOCreateOrder, getResult, sendCoin, getTokenBalance} from '../../util/utils'

const SellForm = () => {
    const [sellAmount, setSellAmount] = useState('');
    const [sellPrice, setSellPrice] = useState('');
    const handleSubmit = async () => {
        var price =  parseFloat(sellPrice)
        var priceI = BigInt(Math.floor(price * MUL))
        var fromAmount = BigInt(sellAmount) * BigInt(BASEAMOUNT)    
        var toAmount = priceI * BigInt(sellAmount) * BigInt(BASEAMOUNT) / BigInt(MUL)
        console.log("FROM:" + fromAmount.toString())
        console.log("TO:" + toAmount.toString())
        var messageId = await AOCreateOrder(DEX_ADDRESS, TESTCOIN, BASECOIN, fromAmount.toString(), toAmount.toString())
        await getResult(DEX_ADDRESS, messageId)
        console.log('SELL price:', sellPrice);
        console.log('SELL amount:', sellAmount);
      };
  return (
    <>
     <Form.Item label="Selling Price">
      <Row gutter={8}>
          <Col span={17}>
            <Input value={sellPrice} onChange={(e) => setSellPrice(e.target.value)}/>
          </Col>
        </Row>
      </Form.Item>
      <Form.Item label="Selling Quantity">
        <Col span={17}>
        <Input value={sellAmount} onChange={(e) => setSellAmount(e.target.value)}/>
        </Col>
      </Form.Item>
      <Form.Item label = "Submit">
        <Button onClick={handleSubmit}>Submit</Button>
      </Form.Item>
    </>
  );
};

export default SellForm;