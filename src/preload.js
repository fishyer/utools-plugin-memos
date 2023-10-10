'use strict';

const {
  utools
} = window;

const axios = require('axios');

const saveToDatabase = (content) => {
  const api=utools.dbStorage.getItem("api")
  const token=utools.dbStorage.getItem("token")
  console.log("api:"+api)
  console.log("token:"+token)
  if (!api) {
    //类似：https://memos.fishyer.com/api/v1/memo
    utools.showNotification('请先设置个人 API!');
    return
  }
  if (!token) {
    //类似：eyJhbGciOiJIUzI1********WdN2M1ZeB
    utools.showNotification('请先设置 Access-Token!');
    return
  }
  const data = JSON.stringify({
    "content": content,
    "visibility": "PRIVATE",
    "resourceIdList": [],
    "relationList": []
  });

  const config = {
    method: 'post',
    url: api,
    headers: { 
        'Authorization': 'Bearer '+token, 
        'User-Agent': 'Apifox/1.0.0 (https://apifox.com)', 
        'content-type': 'application/json', 
        'Accept': '*/*', 
        'Host': 'memos.fishyer.com', 
        'Connection': 'keep-alive'
    },
    data : data
  };

  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    // utools.showNotification('发送成功-Memos');
  })
  .catch(function (error) {
    console.log(error);
    utools.showNotification('发送失败-Memos');
  });

}

window.exports = {
  'set_api': {
    mode: 'list',
    args: {
      enter: () => {
        utools.subInputFocus();
      },
      search: (action, searchWord, callbackSetList) => {
        callbackSetList([{
          title: '确定',
          description: '设置 Memos API',
          icon: 'logo.png',
          value: searchWord,
        }]);
      },
      select: (action, itemData, callbackSetList) => {
        utools.dbStorage.setItem('api', itemData.value)
        utools.hideMainWindow();
        utools.showNotification('设置 个人API 成功！');
        utools.outPlugin();
      },
      placeholder: "输入API,类似:https://memos.fishyer.com/api/v1/memo"
    }
  },
  'set_token': {
    mode: 'list',
    args: {
      enter: () => {
        utools.subInputFocus();
      },
      search: (action, searchWord, callbackSetList) => {
        callbackSetList([{
          title: '确定',
          description: '设置 Memos Access-Token',
          icon: 'logo.png',
          value: searchWord,
        }]);
      },
      select: (action, itemData, callbackSetList) => {
        utools.dbStorage.setItem('token', itemData.value)
        utools.hideMainWindow();
        utools.showNotification('设置 Access-Token 成功！');
        utools.outPlugin();
      },
      placeholder: "输入Access-Token,类似:eyJhbG*******G9WNL3j_BJzaEqROE"
    }
  },
  'send_to_database': {
    mode: 'none',
    args: {
      enter: (action, callbackSetList) => {
        utools.hideMainWindow();
        const {
          payload
        } = action;
        saveToDatabase(payload)
        utools.outPlugin();
      },
    }
  },
  'add_to_database': {
    mode: 'list',
    args: {
      // 进入插件时调用（可选）
      enter: () => {
        utools.subInputFocus();
      },
      // 子输入框内容变化时被调用 可选 (未设置则无搜索)
      search: (action, searchWord, callbackSetList) => {
        callbackSetList([{
          title: '添加笔记到wucai',
          description: '随便记点什么吧',
          icon: 'logo.png',
          content: searchWord
        }]);
      },
      // 用户选择列表中某个条目时被调用
      select: (action, itemData, callbackSetList) => {
        utools.hideMainWindow();
        saveToDatabase(itemData.content)
        utools.outPlugin();
      },
      placeholder: "输入"
    }
  },
}