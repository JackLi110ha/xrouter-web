<template>
  <div class="py-2" v-if="site.locale_switcher">
    <b-button
      size="sm"
      class="mr-1"
      @click="changeLocale(lang)"
      :key="lang"
      v-for="lang in Object.keys($i18n.messages)"
    >{{lang | ucfirst}}</b-button>
  </div>
</template>

<script>
import types from "../store/types";
import { mapState } from "vuex";
export default {
  name:"LocaleSwitcher",
  computed: {
    ...mapState(["site"])
  },
  filters: {
    ucfirst(val) {
      return String(val)[0].toUpperCase() + String(val).slice(1);
    }
  },
  created(){
    console.log('国际化组件',this.$i18n);
    console.log('国际化组件',this.site.locale_switcher);
  },
  methods: {
    changeLocale(locale) {
      this.$store.commit(types.SET_LOCALE, locale);
    }
  }
};
</script>

