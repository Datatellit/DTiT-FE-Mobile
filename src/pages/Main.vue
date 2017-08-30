<template>
    <f7-page class="page-navbar">
        <!-- Material Theme Navbar -->
        <f7-navbar>
            <f7-nav-left>
                <f7-link icon="icon-bars" open-panel="left"></f7-link>
            </f7-nav-left>
            <f7-nav-center sliding>首页</f7-nav-center>
            <f7-nav-right>
                <f7-link icon="icon-bars" open-panel="right"></f7-link>
            </f7-nav-right>
        </f7-navbar>
        <!-- Page Content -->
        <f7-block-title>欢迎来到DTiT-FE-Mobile APP</f7-block-title>
        <f7-block inner>
            <p>以下是一些简单的示例.</p>
        </f7-block>
        <f7-block-title>Navigation</f7-block-title>
        <f7-list>
            <f7-list-item link="/about/" title="F7路由方式加载About页面"></f7-list-item>
            <f7-list-item link="/form/" title="F7路由方式加载Form页面"></f7-list-item>
            <f7-list-item link="/dynamic-route/blog/45/post/125/?foo=bar#about"
                          title="Dynamic Route"></f7-list-item>
            <f7-list-item link="#" title="Vue组件加载登录页" @click="openLogin"></f7-list-item>
        </f7-list>
        <f7-block-title>Side Panels</f7-block-title>
        <f7-block>
            <f7-grid>
                <f7-col width="50">
                    <f7-button open-panel="left">Left Panel</f7-button>
                </f7-col>
                <f7-col width="50">
                    <f7-button open-panel="right">Right Panel</f7-button>
                </f7-col>
            </f7-grid>
        </f7-block>
        <f7-block-title>模态框</f7-block-title>
        <f7-block>
            <f7-grid>
                <f7-col width="50">
                    <f7-button open-popup="#popup">Popup</f7-button>
                </f7-col>
                <f7-col width="50">
                    <f7-button open-popover="#about-popover">Popover</f7-button>
                </f7-col>
            </f7-grid>
        </f7-block>
        <f7-block-title>安全认证</f7-block-title>
        <f7-block>
            <f7-grid>
                <f7-col width="50">
                    <f7-button @click="openAlertLogin">Login</f7-button>
                </f7-col>
                <f7-col width="50">
                    <f7-button @click="openAlertPassword">Input Password</f7-button>
                </f7-col>
            </f7-grid>
        </f7-block>
        <f7-block-title>提示</f7-block-title>
        <f7-block>
            <f7-grid>
                <f7-col width="33">
                    <f7-button @click="openAlert">Alert</f7-button>
                </f7-col>
                <f7-col width="33">
                    <f7-button @click="openPrompt">Prompt</f7-button>
                </f7-col>
                <f7-col width="33">
                    <f7-button @click="openConfirm">Confirm</f7-button>
                </f7-col>
            </f7-grid>
        </f7-block>
        <f7-block-title>情景模式</f7-block-title>
        <f7-block>
            <f7-grid>
                <f7-col v-for="(color,index) in layout"
                        :key="`layout_${index}`">
                    <f7-button @click="changeLayout(color)" v-text="color"></f7-button>
                </f7-col>
            </f7-grid>
        </f7-block>
        <f7-block-title>颜色，点击切换</f7-block-title>
        <f7-block>
            <f7-grid>
                <f7-col v-for="(color,index) in colors"
                        :key="`color_${index}`"
                        :style="`background-color:${color};height:20px`">
                    <div @click="changeColor(color)" class="full"></div>
                </f7-col>
            </f7-grid>
        </f7-block>
        <f7-popover id="about-popover">
            <!-- Popover content goes here -->
            <f7-block>
                <p>this is about info</p>
            </f7-block>
        </f7-popover>
    </f7-page>
</template>
<script>
  export default {
    name: 'Main',
    data: function () {
      return {
        colors: ['gray', 'white', 'black', 'lightblue', 'yellow', 'orange', 'pink', 'blue', 'green', 'red'],
        layout: ['default', 'white', 'dark']
      }
    },
    mounted: function () {
      console.log('Main Page init')
    },
    methods: {
      openLogin: function () {
        this.$emit('change', 'login')
      },
      openAlertLogin: function () {
        this.$f7.modalLogin('输入用户凭证', '安全验证', (u, p) => {
          console.log(u, p)
        })
      },
      openAlertPassword: function () {
        this.$f7.modalPassword('输入登录密码', '安全验证', (p) => {
          console.log(p)
        })
      },
      openAlert: function () {
        this.$f7.alert('您已经欠费了', '提示', () => {
          alert('您点了确定')
        })
      },
      openPrompt: function () {
        this.$f7.prompt('请输入你妹妹的邮箱地址', '输入提示', (info) => {
          alert('您输入了:' + info)
        }, () => {
          alert('您点了取消')
        })
      },
      openConfirm: function () {
        this.$f7.confirm('是否确定删除该用户', '删除提示', () => {
          alert('您点了确定')
        }, () => {
          alert('您点了取消')
        })
      },
      changeColor: function (color) {
        this.$hub.$emit('colorChange', color)
      },
      changeLayout: function (color) {
        this.$hub.$emit('layoutChange', color)
      }
    }
  }
</script>
<style>
    .full {
        width: 100%;
        height: 100%;
    }
</style>