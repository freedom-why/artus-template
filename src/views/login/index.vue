<template>
  <div class="login-container ceshiStyle" :style="`background-image: url(${info.bgUrl || loginBg})`">
    <div class="login-box">
      <h5 class="title">{{ info.title }}</h5>
      <el-row class="login-box-style">
        <el-col :span="14">
          <el-carousel height="545px">
            <el-carousel-item v-for="item in info.swiperList" :key="item">
              <el-image class="banner-img" :src="item" fit="fill"></el-image>
            </el-carousel-item>
          </el-carousel>
        </el-col>
        <el-col :span="10">
          <div class="form-box">
            <h3>{{ info.logTitle }}</h3>
            <h5 class="login-title">用户登录</h5>
            <el-form ref="ruleForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
                     label-position="left" @keyup.enter.native="handleLogin">
              <div class="input-bg text-input">
                <el-form-item prop="username">
                  <input type="text" class="input-style" placeholder="请输入账户" v-model="loginForm.username"/>
                </el-form-item>
              </div>
              <div class="input-bg password-input">
                <el-form-item prop="password">

                  <input class="input-style" type="password" autocomplete="off" placeholder="请输入密码"
                         v-model="loginForm.password"/>
                </el-form-item>
              </div>
              <el-form-item>
                <el-button class="login-btn" loading-icon="Eleme" :loading="loading" @click.prevent="handleLogin">
                  登录
                </el-button>
              </el-form-item>

            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="foot-style">{{ info.footTitle }}</div>
  </div>
</template>


<script>
import { ref, reactive, toRefs } from 'vue'
import loginBg from '@/assets/images/login_bg.png'
import { useRouter } from 'vue-router'
import { ElMessage } from "element-plus"
// import {login} from '@/api'
export default {
  setup () {
    sessionStorage.removeItem('token')
    const $router = useRouter()
    const ruleForm = ref(null)
    const data = reactive({
      loading: false,
      loginForm: {
        password: '',
        username: '',
        code: '',
        "grant_type": "password"
      },
      loginRules: {
        password: [{required: true, message: "请输入用户名称", trigger: "blur"}],
        username: [{required: true, message: "请输入密码", trigger: "blur"}],
        // code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      },
    })
    const info = ref({
      swiperList: [],
      iconList: [],
      logoUrl: '',
      bgUrl: '',
      title: '',
      logTitle: 'Artus工业互联网',
    })
    const handleLogin = () => {
      ruleForm.value.validate((val) => {
        if (val) {
          $router.push({path: '/example'})
          // let filter = JSON.parse(JSON.stringify(data.loginForm))
          // filter.password = btoa(filter.password)
          // data.loading = true
          // login(filter).then(({access_token, token_type, username}) => {
          //   const token = token_type + access_token
          //   sessionStorage.setItem('token', token)
          //   $router.push({path: '/example'})
          // }).catch(() => {
          //   data.loading = false
          // })
        }
      })
    }
    return {...toRefs(data), handleLogin, ruleForm, info, loginBg}
  }
}
</script>
<style scoped>
.why-carousel--horizontal {
  overflow-x: hidden;
}
</style>
<style lang="scss">
$cursor: #fff;

::v-deep(.why-carousel__container) {
  width: 100%;
  height: 100% !important;
}

/* reset element-ui css */
.login-container {
  .login-box {
    .login-box-style {
      width: 1170px;
      margin: 30px auto 0;
      box-shadow: 0 0 15px #18273e;

      .banner-img {
        width: 100%;
        height: 100%;

        img {
          display: block;
          width: 100%;
          height: 545px;
        }
      }
    }

    .logo-top {
      padding: 26px 68px 26px;

      .go-the-official-website {
        text-decoration: none;
      }

      .item-content {
        i {
          display: inline-block;
          padding-left: 9px;
        }

        .item-num {
          font-family: Digital;
          font-size: 32px;
        }
      }

      .text-color {
        color: #ffffff;

        .svg-icon-font {
          font-size: 14px;
        }
      }

      .logo-img {
        display: block;
        width: 107px;
        height: auto;
      }
    }
  }

  .app-icon {
    position: absolute;
    bottom: 107px;
    right: 112px;

    .app-item {
      position: relative;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      // background-color: hsla(0, 0%, 100%, .07);
      color: hsla(0, 0%, 100%, .9);
      font-size: 14px;
      cursor: pointer;
      justify-content: center;

      // transition: background-color .5s;
      .url-box {
        // display:none;
        opacity: 0;
        flex-direction: column;
        position: absolute;
        top: -40px;
        left: 0;
        transition: all .3s;
        transform: translateY(100px);

      }

      .icon-box {
        flex-direction: column;
        transition: all .3s;

      }

      &:hover {
        .icon-box {
          opacity: 0;
          transform: translateX(100px);
        }

        .url-box {
          opacity: 1;
          transform: translateY(0px);

        }
      }
    }

    .app-item:nth-child(1) {
      .url-box {
        transform: translateY(-100px);

      }

      &:hover {

        .url-box {
          opacity: 1;
          transform: translateY(0px);

        }
      }
    }


  }

  .el-input {

    //display: inline-block;
    //height: 47px;
    //width: 85%;
    input {
      background: none !important;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      height: 47px;
      font-size: 16px;
      padding-left: 40px;
      caret-color: $cursor;
      color: #00b4ff;

      &::placeholder {
        color: #00b4ff;
      }

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #000000 inset !important;
        -webkit-text-fill-color: #00b4ff !important;
      }
    }

    .el-input__prefix {
      color: #00b4ff;
      font-size: 23px;
    }
  }

  .el-button {
    padding: 12px 20px !important;
    background: #4d86ff !important;

    span {
      font-family: PingFang SC;
      font-size: 18px;
    }
  }

  .el-form-item {
    /*border-bottom: 2px solid rgba(77, 134, 255, 0.2);*/
    background: rgba(0, 0, 0, 0.1);
    color: #454545;
  }
}

.sidentify-style {
  display: flex;
  align-items: center;
  margin: 10px 0;

  .why-input__wrapper {
    background: none;
    box-shadow: 0 0 0 1px #dcdfe6 inset !important;
    border-radius: 4px;
  }

  input {
    color: #a4abb3;
  }
}

</style>

<style lang="scss" scoped>

.login-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  .form-box {
    padding: 54px 0 54px;
    height: 545px;
    margin: auto;
    background-color: #ffffff;
    background-size: 100% 100%;

    h3 {
      color: #4593E9;
      font-size: 34px;
      text-align: center;
      margin: 0;
      letter-spacing: 2px;
    }

    .login-title {
      font-size: 20px;
      color: #5c6166;
      text-align: center;
      position: relative;
      padding: 35px 0 48px;
      margin: 0;

      &::before {
        content: " ";
        position: absolute;
        left: 46.5%;
        bottom: 28px;
        width: 36px;
        height: 4px;
        background: #4da1ff;
        border-radius: 4px;
      }
    }

    .title-img {
      display: block;
      margin: 0 61px 54px;
    }
  }

  .login-form {
    max-width: 100%;
    overflow: hidden;

    .el-form-item {
      background: #ffffff;
      margin-bottom: 0;
    }

    .input-bg {
      width: 384px;
      height: 70px;
      // background-size: 384px 80px;
      display: block;
      margin: 0 auto 15px;
      padding-left: 15px;

      .input-style {
        width: 384px;
        height: 80px;
        /*-webkit-text-fill-color: #ffffff !important;*/
        outline: none;
        border: none;
        padding: 20px 30px 20px 45px;
        color: #a4abb3;
        background: transparent;
        font-size: 14px;
        //letter-spacing: 2px;
      }
    }

    .text-input {
      background: url("../../assets/images/input.png") no-repeat;
    }

    .password-input {
      background: url("../../assets/images/password-input.png") no-repeat;
    }

    .login-btn {
      outline: none;
      border: none;
      color: #ffffff;
      width: 382px;
      height: 78px;
      background: url("../../assets/images/btn.png") no-repeat center;
      font-size: 18px;
      letter-spacing: 5px;
      display: block;
      margin: 0 auto 0;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  .title {
    /*font-family: PingFang SC;*/
    font-weight: 500;
    font-size: 34px;
    margin: 91px auto 20px auto;
    text-align: center;
    color: #fefeff;
    letter-spacing: 1.7px;
    /*background: linear-gradient(0deg, #4D86FF 25.9033203125%, #00B4FF 100%);*/
    /*-webkit-background-clip: text;*/
    /*-webkit-text-fill-color: transparent;*/
  }
}

.foot-style {
  position: absolute;
  color: #837f7f;
  font-size: 12px;
  bottom: 0;
  padding: 10px;
  width: 100%;
  border-top: 1px solid hsla(0, 0%, 100%, .16);
  text-align: center;
}

</style>


