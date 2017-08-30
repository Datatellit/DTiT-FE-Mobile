# DTiT-FE-Mobile

## 框架组成
* UI层
>* [Framework7](http://framework7.io/vue/) UI框架
* 数据处理
>* [Vue](https://cn.vuejs.org/) 处理数据与数据渲染
>* [axios](https://github.com/mzabriskie/axios) http请求类库(由于vue-resource已被废弃，使用vue作者推荐的http request类库)
>* [vue-axios](https://github.com/imcvampire/vue-axios) vue对axios的封装
* 自定义动画
>* [Animate](https://daneden.github.io/animate.css/) CSS3动画
* 其他第三方包
>* [dtitjs](https://github.com/Datatellit/dtit.js) 通用函数库
* 代码规范
>* [eslint](https://standardjs.com/) 代码规范使用eslint的standard模式
## 目录结构
```
 +---build      <webpack开发及发布构建脚本>
 +---config    <开发及发布配置选项文件，如本地端口，目录>
 +---dist   <生产环境上线目录>
 \---src     <Vue封装后的组件目录>
    +---assets     <资源目录，放入image,font等>
    +---css      <通用css文件放入此目录>
    +---page       <项目页面文件夹>
    +---components     <通用组件文件夹>
    \---App.vue     <首页框架模板>
    \---main.js      <入口函数>
    \---routes.js    <framework7的路由文件>
 +---static     <静态资源目录，如需要直接src或者link引入的，可放入>
 \---.babelrc   <babel的配置文件>
 \---.eslintrc.js   <eslint的配置文件>
 \---.eslintignore  <eslint忽略检查配置文件>
 \---.postcssrc.js  <自动补全css浏览器前缀>
 \---index.html     <入口文件index.html>
```

## 快速开始
### 为了可以快速使用本项目，您应至少了解以下技术
* 基础的前端知识(HTML,CSS,Javascript)
* [Vue](https://cn.vuejs.org/) 当下流行的MVVM框架
* [Framework7](http://framework7.io/vue/) UI及组件控制
* [axios](https://github.com/mzabriskie/axios) ajax网络请求库

### 快速开始这个项目，您需要了解以下信息
* Vue全局对象([lib/frame/vue-extend.js](https://github.com/Datatellit/DTiT-FE-Desktop-AdminLTE/blob/master/lib/frame/vue-extend.js))
> [```this.$d```](https://github.com/Datatellit/dtit.js) 通用函数类库，如需添加新函数，请提[Issues](https://github.com/Datatellit/dtit.js/issues)   
使用示例：  
```
this.$d.each(arr,function(value,key){
    console.log(key,value)
})
this.$d.setCookie("key","value")
....
```

> ```this.$$``` framework7的dom操作对象，基本与jquery相同
[文档参考](http://framework7.io/docs/dom.html)
```
//你看，是不是和jquery非常相似 ~ ~
this.$$('.something').on('click', function (e) {
    this.$$(this).addClass('hello').attr('title', 'world').insertAfter('.something-else');
});
//触发resize事件
this.$$(window).trigger('resize');
//还有跟jquery类似的each哦
this.$$.each(fruits, function (index, value) {
    alert(index + ': ' + element); 
});
//其他的还有非常多，自己看文档吧，哈哈    
```
> ```this.$config```    
```
 this.$setting.router //访问配置文件接口路由
 this.$setting.page //访问默认分页信息
```
> ```this.$hub```非父子组件通讯(同级组件通讯，或者更深的子级通讯)  
用于组件间的通讯，具体可参考[这里](https://cn.vuejs.org/v2/guide/components.html#非父子组件通信)
```
//eg. event
//组件A注册监听pageChange事件，由于$hub对象是全局的，所以可以在任何组件内触发该监听
this.$hub.$on('pageChange',(page)=>{
    console.log(page)
});
//组件B 触发组件A的pageChange事件
this.$hub.$emit('pageChange','index');

//eg. data
//组件A 将data放入hub
this.$hub.userInfo = {user:'abc',logo:'xxxx'};
//组件B 可以使用hub中的data
console.log(this.$hub.userInfo.user) //write abc
console.log(this.$hub.userInfo) //write {user:'abc',logo:'xxxx'}
/*在传递data过程中，如果userInfo被其他组件改变，组件B并不会自动更新userInfo，如需实时改变，请使用eg. event*/

```
> ```this.$http``` 发送ajax请求 [更多信息](https://github.com/mzabriskie/axios)
```
// Make a request for a user with a given ID
this.$http.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// Optionally the request above could also be done as
this.$http.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
//Performing a POST request
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
Performing multiple concurrent requests
 function getUserAccount() {
   return axios.get('/user/12345');
 }
 
 function getUserPermissions() {
   return axios.get('/user/12345/permissions');
 }
 
axios.all([getUserAccount(), getUserPermissions()])
.then(axios.spread(function (acct, perms) {
 // Both requests are now complete
}));
//添加全局请求拦截
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });
```

> ```this.$f7```  framework7实例(framework7的所有组件或router均在该对象下),未找到对该对象的详细说明文档，但可以在官方文档的各个组件中查看对应的使用方法 
实例结构如下，下面会讲解主要的，!!!以下方法未经一一验证!!!  
```
  {
  accordionClose:function (item) //折叠accordion,item可以使元素选择器
  accordionOpen:function (item) //展开accordion,item可以使元素选择器
  accordionToggle:function (item) //切换accordion状态,item可以使元素选择器
  addNotification:function (params)//添加一个提示信息,params查看：http://framework7.io/docs/notifications.html
  alert:function (text, title, callbackOk)//弹出alter
  openPanel:function (item,animated)//打开侧边栏,item可以使left或者right,animated是否有动画效果
  closeModal:function (modal, animated) //关闭模态框
  closeNotification:function (item, event) //关闭提示信息
  closePanel:function (animated) //关闭侧边栏
  confirm:function (text, title, callbackOk, callbackCancel) //打开confirm提示框
  formDeleteData:function (formId) //删除指定form表单数据
  formFromData:function (form, formData) //将数据载入form
  formFromJSON:function (form, formData) //将json载入form
  formGetData:function (formId) //获取form数据
  formToData:function (form) //将form数据转为data
  formToJSON:function (form) //将form数据转为json
  getSize:function () //获取页面size
  height:950 //页面高度
  width:1244 //页面的宽
  hideNavbar:function (navbarContainer, animated) //隐藏navbar
  hidePreloader:function () //隐藏preloader（加载框）
  hideProgressbar:function (container) //隐藏progressbar
  hideToolbar:function (toolbarContainer, animated) //隐藏toolbar
  loginScreen:function (modal, animated) //打开登录页面（必须定义才行）
  modal:function (params)//打开模态框，参数参见：http://framework7.io/docs/modal.html#custom-modals
  modalLogin:function (text, title, callbackOk, callbackCancel)//打开登录框,http://framework7.io/docs/modal.html#login-and-password
  modalPassword:function (text, title, callbackOk, callbackCancel)//打开密码框,http://framework7.io/docs/modal.html#login-and-password
  popover:function (modal, target, removeOnClose, animated, closeByOutside)
  popup:function (modal, removeOnClose, animated)
  prompt:function (text, title, callbackOk, callbackCancel) 
  setProgressbar:function (container, progress, speed) //设置progressbar状态
  showNavbar:function (navbarContainer, animated) //显示navbar
  showPreloader:function (title) //显示加载框
  showProgressbar:function (container, progress, color)//显示进图条
  showTab:function (tab, tabLink, animated, force) //显示tab
  showToolbar:function (toolbarContainer, animated) //显示工具栏
  sortableClose:function (sortableContainer) //关闭拖拽
  sortableOpen:function (sortableContainer)//允许拖拽
  sortableToggle:function (sortableContainer) //切换拖拽状态
  swipeoutClose:function (el, callback) //参见http://framework7.io/docs/swipeout.html#swipeout-javascript-api
  swipeoutDelete:function (el, callback)//参见http://framework7.io/docs/swipeout.html#swipeout-javascript-api
  swipeoutOpen:function (el, dir, callback)//参见http://framework7.io/docs/swipeout.html#swipeout-javascript-api
  swipeoutOpenedEl:undefined //当前Open的swipeout
  views:Array(4) //当前的所有视图，切换主视图路由使用views.main.router.load({url:'xxx'})
```

* 本项目包含的Demo,[在线预览](https://datatellit.github.io/DTiT-FE-Mobile/index.html),[更多示例参考官网](http://framework7.io/)
> App.vue  登录页  
> pages/Main  首页  
> pages/About.vue 关于页  
> pages/Login.vue 登录页  
> pages/Form.vue 基础表单页  
> pages/Dynamic.vue Framework7的动态路由  
![Gif预览](https://github.com/Datatellit/DTiT-FE-Desktop-AdminLTE/blob/master/dist/img/mobile_gif.gif)


## 关于组件加载与Framework7的路由
* 因为一些原因，项目并未采用vue-router来作为路由，而是采用了Framework7自己的router来进行普通页面切换，这会导致组件的生命周期无法再预期的时候进行触发，这里建议使用Framework7的页面生命周期来进行一些事情的处理
* 如果你一定需要使用Vue的生命周期，可以采用动态组件的方式实现，动态组件加载会完整的触发Vue组件的生命周期
* 如果你既要使用Vue的方式加载组件，又需要一些钩子函数来进行事件的处理，暂时我未想到更好的方式，我还在尝试禁用掉Framework7的router，启用vue-router，如果可以成功，那么将会完全使用vue-router来进行页面的加载

## 动画与换肤
* 项目引入了Animate.css，用于页面切换效果的实现，理论上用户无需在采用其他动画库，因为大部分的动画效果Animate都包含，如果有动画需求，应该尽量使用Animate
* 项目Demo中已经实现了换肤功能（包括夜间模式和日间模式），可实现轻松换肤 

## 注意事项
* 本项目是作为[dtit-cli](https://github.com/Datatellit/dtit-cli)的模板源，所以推荐使用[dtit-cli](https://github.com/Datatellit/dtit-cli)来进行模板框架生成，也可以直接进行download进行使用。
* 当前项目是基于Framework1.6.4版本，当前官方最新版本为2.0beta.1，所以有些组件本项目中并不支持，在官方升级Vue + Framework7版本到2.x时，本项目也会跟进升级 
* 如果项目中遇到问题，您可以给我们提[Issues](https://github.com/Datatellit/DTiT-FE-Mobile/issues)  

## WebStorm配置ESLint
* 配置ESLint检查  
![检查](https://datatellit.github.io/DTiT-FE-Desktop-AdminLTE/dist/img/eslint.png)
* 配置缩进为2  
![缩进](https://datatellit.github.io/DTiT-FE-Desktop-AdminLTE/dist/img/tab.png)

## 浏览器支持(暂未找到官方文档，此处待补充)
* Android   
* IOS   

## FAQ
* Framework7中没有找到我想要的插件
> 如果你需要获取更多的Vue插件，请尝试GitHub，关键字一般为[vue-xxxx](https://github.com/xiaokaike/vue-color)，但是为了风格统一，我们还是建议你优先使用Framework7的现有组件，另外Framework7也有自己的外部插件，[请参考这里](http://framework7.io/plugins/)
* 数据获取应该怎么写
> 数据获取使用的是Vue官方推荐的包axios，具体的使用细则，参见[axios](https://github.com/mzabriskie/axios)
* 为什么数据改变了，但是页面没有正确显示
> 查看你的赋值方式，如果是对象赋值，应使用```this.$set```进行赋值，具体以[Vue](https://cn.vuejs.org/)官方文档为准
* 为什么我打开的页面是一片空白
> 打开浏览器的Console窗口，查看是否有报错，一般页面全部空白，是Vue绑定存在错误，或语法存在错误，请仔细查找，并阅读[Vue](https://cn.vuejs.org/)官方文档
* 我有一个通用函数应该写在哪里
> 如果存在业务上的通用函数，应该自行建立相应的业务文件夹进行抽取，然后在main.js中挂载到Vue全局实例上，具体可参考[main.js](https://github.com/Datatellit/DTiT-FE-Mobile/src/main.js)
* 我想从一个页面跳转到另一个页面要要怎么写
> 本项目为SPA架构，所以与传统意义的跳转不同，通常是加载不同的组件实现，项目中提供了两种思路，一种是使用Vue中的动态加载组件方式，[参考这里](https://cn.vuejs.org/v2/api/#is),或者使用Framework7的router来进行页面载入，[参考这里](http://framework7.io/vue/navigation-router.html#router-api)


苏州数言信息技术有限公司-前端积累-Mobile端框架-F7+Vue

