import React, {useState, useEffect} from 'react';
import '../index.css';
import { Layout, Menu, theme, Button } from 'antd';
import OrderPage from './OrderPage';
import {connectWallet, getPublicKey} from '../util/utils'
const { Header, Content, Footer } = Layout;

const items = new Array(1).fill(null).map((_, index) => ({
  key: index + 1,
  label: `MOON DEX`,
}));
const logoUrl = "https://images.pexels.com/photos/15497752/pexels-photo-15497752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
const Main = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [publicKey, setPublicKey] = useState('');

  useEffect(() => {
    const fetchPublicKey = async () => {
      const key = await getPublicKey();
      setPublicKey(key);
    };
    fetchPublicKey();
  }, []);

  const handleConnectWallet = async () => {
    await connectWallet();
    const key = await getPublicKey();
    setPublicKey(key);
  };


  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        {/* <img src={logoUrl} alt="Logo" style={{ width: '150px', height: 'auto' }} /> */}
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />


        {publicKey ? (
          <span style={{ color: 'white' }}>
          {publicKey.slice(0, 6) + '...' + publicKey.slice(-4)}
          </span>
        ) : (
          <Button onClick={handleConnectWallet}>connectWallet</Button>
        )}
      </Header>
      <Content style={{ padding: '0 48px' }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 500,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <div>
          <OrderPage></OrderPage>
          </div>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default Main;