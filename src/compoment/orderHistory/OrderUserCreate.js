import React, { Component } from 'react';
import '../../index.css';
import { Table, Tag, Button } from 'antd';
import { getOrderByAddress, getPublicKey, withDrawOrders } from '../../util/utils';
import { MUL, DEX_ADDRESS, BASEAMOUNT } from '../../util/constant';

const { Column } = Table;

class OrderUserCreate extends Component {
  state = {
    data: [],
  };

  async componentDidMount() {
    const initialData = await this.fetchData();
    this.setState({ data: initialData });
    this.timer = setInterval(async () => {
      const newData = await this.fetchData();
      this.setState({ data: newData });
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  async fetchData() {
    const orders = await getOrderByAddress(DEX_ADDRESS, 'GetOrdersUserCreate', await getPublicKey());
    const tt = {
        1:"BUY",
        2:"SELL"
    }
    const buyOrders = orders
      .map((order, index) => {
        const price = order.price / MUL;
        const amount = parseInt(order.amount) / BASEAMOUNT;
        const time = new Date(order.time);
        const formattedTime = time.toLocaleString()
        return {
          key: order.id,
          amount,
          price,
          time: formattedTime,
          tags: [tt[order.direction]],
        };
      });
    return buyOrders;
  }

  handleButtonClick = async (id) => {
    console.log('Clicked button with id:', id.toString());
    await withDrawOrders(DEX_ADDRESS ,id.toString())
  };

  render() {
    const { data } = this.state;
    return (
      <Table dataSource={data}>
        <Column title="OWN" dataIndex="time" key="time" />
        <Column title="amount" dataIndex="amount" key="amount" />
        <Column title="price" dataIndex="price" key="price" />
        <Column
          title="Tags"
          dataIndex="tags"
          key="tags"
          render={(tags) => (
            <>
              {tags.map((tag) => {
                let color = tag.length <= 3 ? 'green' : 'red';
                if (tag === 'loser') {
                  color = 'volcano';
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          )}
        />
        <Column title="WithDraw" key="WithDraw" render={(text, record) => (
            <Button onClick={() => this.handleButtonClick(record.key)}>
              Withdraw
            </Button>
          )} />
      </Table>
    );
  }
}

export default OrderUserCreate;