import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.scss';
import NavBar from './NavBar';
import Home from './Home';
import { Layout} from 'antd';

const { Header, Content} = Layout;

function IndexPage() {
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <NavBar />
    </Header>

      <Content className={styles.content}>
        <Home/>
      </Content>
  </Layout>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
