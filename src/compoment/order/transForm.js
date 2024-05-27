import React, {useState} from 'react';
import {
  Button,
  Form,
  Row,
  Col,
  InputNumber,
  Input
} from 'antd';

import {BASECOIN, TESTCOIN, DEX_ADDRESS, BASEAMOUNT} from '../../util/constant'
import {getResult, sendCoin, getTokenBalance, getPublicKey, withDrawAccount} from '../../util/utils'

const TransForm = () => {
    const [transferIntoBASE, setTransferIntoBASE] = useState("");
    const [transferIntoTEST, setTransferIntoTEST] = useState("");

    const [transferOutBASE, setTransferOutBASE] = useState("");
    const [transferOutTEST, setTransferOutTEST] = useState("");

    const sendToDex = async (coin, amount) => {
        console.log(coin)
        var sendAmount = BigInt(amount) * BigInt(BASEAMOUNT)

        var messageId = await sendCoin(coin, DEX_ADDRESS, sendAmount.toString())
        var r = await getResult(coin, messageId)
        console.log(r)
        var ans = await getTokenBalance(coin, await getPublicKey())
        console.log(ans)
    };
    const sendToAcc = async (coin, amount) => {
        console.log(coin)
        var sendAmount = BigInt(amount) * BigInt(BASEAMOUNT)
        var messageId = await withDrawAccount(DEX_ADDRESS , coin, sendAmount.toString())
    };
    
    return (
    <>
      <Form.Item label="Transfer in">
        <Row gutter={8}>
          <Col span={24}>
            <Input
              placeholder="Transfer BASE COIN amount"
              value={transferIntoBASE}
              onChange={(e) => setTransferIntoBASE(e.target.value)}
            />
          </Col>
          <Col span={6}>
            <Button onClick={() => sendToDex(BASECOIN, transferIntoBASE)}>BASE</Button>
          </Col>
          <Col span={24}>
            <Input
              placeholder="Transfer TEST COIN amount"
              value={transferIntoTEST}
              onChange={(e) => setTransferIntoTEST(e.target.value)}
            />
          </Col>
          <Col span={6}>
            <Button onClick={() => sendToDex(TESTCOIN, transferIntoTEST)}>TEST</Button>
          </Col>
        </Row>
        
      </Form.Item>
      <Form.Item label="Transfer out">
        <Row gutter={8}>
          <Col span={24}>
            <Input
              placeholder="Transfer BASE COIN amount"
              value={transferOutBASE}
              onChange={(e) => setTransferOutBASE(e.target.value)}
            />
          </Col>
          <Col span={6}>
            <Button onClick={() => sendToAcc(BASECOIN, transferOutBASE)}>BASE</Button>
          </Col>
          <Col span={24}>
            <Input
              placeholder="Transfer TEST COIN amount"
              value={transferOutTEST}
              onChange={(e) => setTransferOutTEST(e.target.value)}
            />
          </Col>
          <Col span={6}>
            <Button onClick={() => sendToAcc(TESTCOIN, transferOutTEST)}>TEST</Button>
          </Col>
        </Row>
        
      </Form.Item>
    </>
  );
};

export default TransForm;