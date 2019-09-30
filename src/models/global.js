
export default {

  namespace: 'global',

  state: {
    userInfo: {
      email: null,
      pwd: null,
      key: null
    }
  },

  subscriptions: {},

  effects: {
    //dispatch user information
    *setUserInfo({payload}, {put}) {
      yield put({type: 'set_UserInfo', payload});
    }
  },

  reducers: {
    //set user information
    set_UserInfo (state, {payload}) {
      return { ...state, userInfo: payload };
    },
  },

};
