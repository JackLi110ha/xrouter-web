<template>
  <div>
    <!-- <b-row> -->
      <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white">
        <div class="container">
            <!-- Brand -->
            <a class="navbar-brand" href="index.html">
                <!-- <img alt="Image placeholder" src="assets/img/brand/dark.svg" id="navbar-logo"> -->
            </a>
            <!-- Toggler -->
            <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="true" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <!-- Collapse -->
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav mt-4 mt-lg-0 ml-auto">
                    <li class="nav-item ">
                        <a class="nav-link" href="index.html">Overview</a>
                    </li>
                    <li class="nav-item dropdown dropdown-animate" data-toggle="hover">
                        <a class="nav-link" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Pages</a>
                        <div class="dropdown-menu dropdown-menu-single">
                            <a href="index.html" class="dropdown-item">Homepage</a>
                            <a href="about.html" class="dropdown-item">About us</a>
                            <a href="contact.html" class="dropdown-item">Contact</a>
                            <div class="dropdown-divider"></div>
                            <a href="login.html" class="dropdown-item">Login</a>
                        </div>
                    </li>
                    <li class="nav-item ">
                        <a class="nav-link" href="docs/index.html">Docs</a>
                    </li>
                </ul>
                <!-- Button -->
                <a class="navbar-btn btn btn-sm btn-primary d-none d-lg-inline-block ml-3" href="https://github.com/webpixels/quick-website-ui-kit-demo/archive/master.zip">
                    Download Free
                </a>
                <!-- Mobile button -->
                <div class="d-lg-none text-center">
                    <a href="https://webpixels.io/themes/quick-website-ui-kit" class="btn btn-block btn-sm btn-warning">See more details</a>
                </div>
            </div>
        </div>
    </nav>
    <!-- </b-row> -->
    <b-row>
      <!-- <b-col class="h-scroll" :cols="6" md="3" lg="2" xl="2" 
      :class="{[`fold-${foldLevel}`]: true}">
        <b-sidebar :collapsed="collapsed"></b-sidebar>
      </b-col> -->


      <b-col class="h-scroll" style="overflow-x: auto;">
        <!-- <main class="pt-3"> -->
          <b-loading
            :active="$store.state.loading && $store.state.site.enable_loading"
            spinner="bar-fade-scale"
            style="height:100vh;"
          />
          <ol class="breadcrumb" v-if="false">
            <li class="breadcrumb-item" :key="index" v-for="(item, index) in path">
              <span class="active" v-if="isLast(index)">{{ item }}</span>
              <router-link :to="item" v-else>{{ item }}</router-link>
            </li>
          </ol>
          <div class>
            <custom-component :config="$store.state.site.header"></custom-component>
            <div class="px-2">
              <!-- <div class="page-header h2">
                <b-btn variant="light" class="mr-2" @click="toggleSidebar">
                  <i class="icon-menu"></i>
                </b-btn>
                <span v-if="$store.state.site.page_header" v-html="$store.state.site.page_header"></span>
              </div> -->
              <div class="page-body">
                <router-view class="animated fadeIn"/>
              </div>
            </div>
          </div>
          <b-footer v-if="$store.state.site.footer"/>
        <!-- </main> -->
      </b-col>
    </b-row>

    <!-- <b-file-manager></b-file-manager> -->
  </div>
</template>

<script>
// import BHeader from "../components/Header";
// import BSidebar from "../components/Sidebar";
import BFooter from "../components/Footer";
import { mapState } from "vuex";
// import BFileManager from "../components/FileManager";

export default {
  components: {
    // BSidebar,
    BFooter
    // BFileManager
  },
  computed: {
    ...mapState(["site"]),
    collapsed() {
      return this.foldLevel > 0;
    }
  },
  data() {
    return {
      path: [],
      header: "",
      foldLevel: 0
    };
  },
  watch: {},
  methods: {
    toggleSidebar() {
      if (++this.foldLevel > 2) {
        this.foldLevel = 0;
      }
    }
  },
  created() {}
};
</script>

<style lang="scss">
@import '../assets/css/quick-website.css';
@import '../assets/css/theme.bundle.css';
// @import '../assets/css//navbars/_navbar-dropdown.scss';
// @import '../assets/css//navbars/_navbar.scss';
.left-side {
  overflow: hidden;
}
.fold-0{
  max-width:16em;
}
.fold-1 {
  flex: 0 0 8em !important;
  text-align: center;
}
.fold-2 {
  flex: 0 0 0 !important;
  overflow:hidden;
  height: 0;
  padding:0;
}
.h-scroll {
  transition: all 0.2s;
  height: 100vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
/* main.main {
  margin-left: 200px;
  padding-bottom: 2em;
} */
</style>
