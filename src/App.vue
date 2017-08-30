<template>
    <!-- App -->
    <div id="app">

        <!-- Statusbar -->
        <f7-statusbar></f7-statusbar>

        <!-- Left Panel -->
        <f7-panel left reveal :layout="theme" :theme="color">
            <f7-view id="left-panel-view" navbar-through :dynamic-navbar="true">
                <f7-navbar title="Left Panel" sliding></f7-navbar>
                <f7-pages>
                    <f7-page>
                        <f7-block inner>
                            <p>Left panel content goes here</p>
                        </f7-block>
                        <f7-block-title>Load page in panel</f7-block-title>
                        <f7-list>
                            <f7-button raised @click="logout" text="登出"></f7-button>
                        </f7-list>
                        <f7-block-title>Load page in main view</f7-block-title>
                        <f7-list>
                            <f7-list-item link="/about/" title="About" link-view="#main-view"
                                          link-close-panel></f7-list-item>
                            <f7-list-item link="/form/" title="Form" link-view="#main-view"
                                          link-close-panel></f7-list-item>
                        </f7-list>
                    </f7-page>
                </f7-pages>
            </f7-view>
        </f7-panel>

        <!-- Right Panel -->
        <f7-panel right cover :layout="theme" :theme="color">
            <f7-view id="right-panel-view" navbar-through :dynamic-navbar="true">
                <f7-navbar title="Right Panel" sliding></f7-navbar>
                <f7-pages>
                    <f7-page>
                        <f7-block>
                            <p>Right panel content goes here</p>
                        </f7-block>
                        <f7-block-title>Load page in panel</f7-block-title>
                        <f7-list>
                            <f7-list-item link="/about/" title="About"></f7-list-item>
                            <f7-list-item link="/form/" title="Form"></f7-list-item>
                        </f7-list>
                        <f7-block-title>Load page in main view</f7-block-title>
                        <f7-list>
                            <f7-list-item link="/about/" title="About" link-view="#main-view"
                                          link-close-panel></f7-list-item>
                            <f7-list-item link="/form/" title="Form" link-view="#main-view"
                                          link-close-panel></f7-list-item>
                        </f7-list>
                    </f7-page>
                </f7-pages>
            </f7-view>
        </f7-panel>

        <!-- Main Views -->
        <f7-views :layout="theme" :theme="color">
            <!--navbar-through :dynamic-navbar="true"-->
            <f7-view id="main-view" main>
                <!-- Pages -->
                <f7-pages>
                    <transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutLeft">
                        <!-- mode='in-out' or mode='out-in' -->
                        <component :is="mainPage" @change="pageChange"></component>
                    </transition>
                </f7-pages>
            </f7-view>
        </f7-views>

        <!-- Popup -->
        <f7-popup id="popup">
            <f7-view navbar-fixed :layout="theme" :theme="color">
                <f7-pages>
                    <f7-page>
                        <f7-navbar title="Popup">
                            <f7-nav-right>
                                <f7-link close-popup>Close</f7-link>
                            </f7-nav-right>
                        </f7-navbar>
                        <f7-block>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, architecto.
                            Cupiditate laudantium rem nesciunt numquam, ipsam. Voluptates omnis, a inventore atque
                            ratione aliquam. Omnis iusto nemo quos ullam obcaecati, quod.
                        </f7-block>
                    </f7-page>
                </f7-pages>
            </f7-view>
        </f7-popup>

    </div>
</template>

<script>
  import Main from './pages/Main'
  import Login from './pages/Login'

  export default {
    data: function () {
      return {
        mainPage: 'index',
        theme: 'default',
        color: 'blue'
      }
    },
    props: ['title'],
    mounted: function () {
      // 判断是否登录，没有登录，则跳转到登录页
      if (!this.$d.getCookie('dtit_user')) {
        this.$nextTick(() => {
          // 使用组件方式加载
          this.mainPage = 'login'
          // 使用f7 router加载（不会走mounted周期函数）
          // this.$f7.views.main.router.load({url: "/login/"})
        })
      }
      this.$hub.$on('pageChange', (page) => {
        this.mainPage = page
      })
      this.$hub.$on('colorChange', (color) => {
        console.log('color changed')
        this.color = color
      })
      this.$hub.$on('layoutChange', (color) => {
        console.log('layout changed')
        this.theme = color
      })
    },
    components: {
      'index': Main,
      'login': Login
    },
    methods: {
      logout: function () {
        this.$d.clearCookie('dtit_user')
        this.mainPage = 'login'
        this.$f7.addNotification({title: '提示信息', message: '登出成功', hold: 1000})
        console.log(this.$f7)
        this.$f7.closePanel()
        // 测试一下好不好使
        this.$$.each([1, 2, 3], (index, value) => {
          console.log(index, value)
        })
      },
      pageChange: function (page) {
        this.mainPage = page
      }
    }
  }
</script>