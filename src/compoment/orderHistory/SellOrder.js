import React, { Component } from 'react';
import '../../index.css';
import { Table, Tag } from 'antd';
import { getDataFromAO } from '../../util/utils';
import { MUL, DEX_ADDRESS, BASEAMOUNT } from '../../util/constant';

const { Column } = Table;

class SellOrder extends Component {
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
    const orders = await getDataFromAO(DEX_ADDRESS, 'GetOrders', '');
    const buyOrders = orders.filter((order) => order.direction !== 1)
      .map((order, index) => {
        const price = order.price / MUL;
        const amount = parseInt(order.amount) / BASEAMOUNT;
        const time = new Date(order.time);
        const formattedTime = time.toLocaleString()
        return {
          key: index,
          amount,
          price,
          time: formattedTime,
          tags: ['SELL'],
        };
      });
    return buyOrders;
  }

  render() {
    const { data } = this.state;
    return (
      <Table dataSource={data}>
        <Column title="SELL ORDER" dataIndex="time" key="time" />
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
      </Table>
    );
  }
}

export default SellOrder;