<template>
  <div class="app login-container" >
    <div class="col-md-4 mt-200">
      <div class="card-group">
        <div class="card p-4">
          <div class="card-body">
            <h1>{{$t('actions.login')}}</h1>
            <form
              ref="form"
              class="form form-inline"
            >
              <template v-for="(field, name) in fields">
                <label
                  :for="'input_' + name"
                  class="m-1"
                  :key="name"
                  v-if="field.label !== false"
                >{{field.label}}</label>
                <b-form-field
                  class="m-1 mr-4"
                  :value="model[name]"
                  @input="setValue(name, arguments[0], arguments[1])"
                  :field="field"
                  :key="id + '_' +name"
                />
              </template>

              <slot name="actions">
                <b-button type="submit" variant="primary" ref="submitButton" @click="submit" class="mr-1">Submit</b-button>
              </slot>
            </form>
          </div>
        </div>
      </div>

      <locale-switcher class="text-center"></locale-switcher>
    </div>
  </div>
</template>

<script>
// import { types } from "../store";
import { mapState } from "vuex";
import LocaleSwitcher from "../components/LocaleSwitcher";

export default {
  name: "Login",
  components: { LocaleSwitcher },
  computed: {
    ...mapState(["auth", "site"]),
    fields() {
      return {
        username: {
          label: this.$t("fields.username"),
          placeholder: this.$t("fields.username"),
          icon: "icon-user"
        },
        password: {
          label: this.$t("fields.password"),
          placeholder: this.$t("fields.password"),
          icon: "icon-lock",
          type: "password"
        }
      };
    }
  },
  data() {
    return {
      model: {
        username: "",
        password: ""
      },
      errors: []
    };
  },
  methods: {
    setValue(name, value, lang) {
      this.$set(this.model[name], lang, value);
    },
    submit(data) {
      console.log('data',data);
      this.$snotify.error('请先登录')
      // this.$store.commit(types.SET_AUTH, data);
      // this.$store.dispatch(types.FETCH_SITE);
      this.$router.push({
        path: data.redirect || "/"
      });
    }
  },
  mounted() {}
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
