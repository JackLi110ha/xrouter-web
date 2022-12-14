<template>
  <div class="app login-container" >
    <div class="col-md-4 mt-200">
      <div class="card-group">
        <div class="card p-4">
          <div class="card-body">
            <h1>{{$t('actions.login')}}</h1>
            <b-form @submit="onSubmit" @reset="onReset">
              <b-form-group
                id="input-group-1"
                :label="$t('actions.password')"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="form.password"
                  type="password"
                  required
                  placeholder="Enter password"
                ></b-form-input>
              </b-form-group>

              <b-button type="submit" variant="primary">{{$t('actions.submit')}}</b-button>
              <b-button type="reset" variant="primary">{{$t('actions.logout')}}</b-button>
            </b-form>
          </div>
        </div>
      </div>

      <locale-switcher class="text-center"></locale-switcher>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import LocaleSwitcher from "../components/LocaleSwitcher";

export default {
  name: "Login",
  components: { LocaleSwitcher },
  computed: {
    ...mapState(["auth", "site"]),
  },
  data() {
    return {
      form: {
        password: '12345678',
      },
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      this.$http['post']('login.cgi', this.form)
      .then(({ data }) => {
        console.log('登陆成功',data);
        if(data.errno==0){
          this.$snotify.success('登录成功',{position:'centerTop'});
          this.$router.push({
          path: "/home"
        });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    },
    onReset(evt) {
      evt.preventDefault()
      this.$http['post']('logout.cgi')
      .then(({ data }) => {
        console.log('登出',data);
        if(data.errno==0){
          this.$snotify.success('登出成功',{position:'centerTop'});
        }
      })
      .catch((err) => {
        console.log(err);
      });
    },
  },
  mounted() {
    //  this.$snotify.success('登出成功',{position:'centerTop'});
  }
};
</script>

<style lang="scss">
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  background: url("../assets/img/loginbg.jpg") no-repeat;
      position: relative;
    background-size: 100% 100%;
    .mt-200 {
      position: absolute;
      top: 50%;
      margin-top: -200px;
    }
}
</style>
