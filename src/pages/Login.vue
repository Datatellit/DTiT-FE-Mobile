<template>
    <f7-page login-screen>
        <!--<f7-navbar title="登录页"></f7-navbar>-->
        <f7-login-screen-title>Login</f7-login-screen-title>
        <f7-list form>
            <f7-list-item>
                <f7-label>Username</f7-label>
                <f7-input name="username" v-model="username" placeholder="Username" type="text"></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>Password</f7-label>
                <f7-input name="password" v-model="password" type="password" placeholder="Password"></f7-input>
            </f7-list-item>
        </f7-list>
        <f7-list>
            <f7-list-button title="Sign In" close-login-screen @click="login"></f7-list-button>
            <f7-list-label>
                <p>Click Sign In to close Login Screen</p>
            </f7-list-label>
        </f7-list>
    </f7-page>
</template>
<script>
  export default {
    data () {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      login: function () {
        this.$d.setCookie('dtit_user', {username: this.username, password: this.password})
        // f7路由加载
        // this.$f7.views.main.router.load({url: '/index/'})
        this.$f7.addNotification({title: '提示信息', message: '登录成功', hold: 1000})
        // 组件加载
        this.$emit('change', 'index')
      }
    },
    mounted () {
      console.log('login mounted init')
    }
  }
</script>
<style>
</style>