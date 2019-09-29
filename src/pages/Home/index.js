import React from 'react'
import style from './index.scss'
import { connect } from 'dva';
export function index(props) {
  return (
    <div className={style.home}>
      <div className={style.background}>
        <h1> Welcome to Order Now </h1>
        <h2> Choose Your Favourite Food, Now! </h2>
        <p>{props.text}</p>
      </div>
    </div>
  );
}

//connext home.js(model) and current component index.js(home component)
//和models下面的home.js相关连
export default connect (({ home }) => ({...home})) (index);
