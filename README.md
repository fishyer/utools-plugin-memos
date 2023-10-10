# memos-utools 插件

![](src/logo.png)

## 开发目的

- 方便在电脑端快速记录，不同于 PopClip 插件的摘抄，这个是自己的主动输入
- 其实摘抄功能这个插件也是有的,是 sendToMemos 命令

## 开发文档

- [memos 项目说明](https://github.com/usememos/memos)
- [uTools 插件开发文档](https://u.tools/docs/developer/welcome.html#plugin-json)

## 插件使用流程

1-登录 Meoms 网页端，再从这样的 URL 生成自己的 API 链接：https://memos.fishyer.com/setting

获取的 API 类似: https://memos.fishyer.com/api/v1/memo

获取的 AccessToken 类似: eyJhbG**\*\*\***G9WNL3j_BJzaEqROE

2-下载 Meoms-utools 插件，为.upx 文件

[memos.upx](dist/memos-plugin-0.0.1.upx)

将这个文件拖动到 utools 的输入框即可点击安装(复制该文件，再打开 utools 等同于拖动)

3-配置 API ,命令为: setMeomsApi

4-配置 Token ,命令为: setMemosToken

5-快速添加 addToMeoms

## 演示动图

![](assets/memos-utools-演示.gif)

## 欢迎 Star

如果对你有用的话，不妨赏个 Star 吧，😄
