<template>
  <div>
    <div
      class="
        btn btn-block btn-dark
        text-truncate
        rounded-0
        py-2
        d-none d-lg-block
      "
      style="z-index: 1000"
      target="_blank"
    >
      <locale-switcher class="text-right"></locale-switcher>
    </div>

    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white">
      <div class="container">
        <!-- Brand -->
        <a class="navbar-brand" href="index.html">
          <!-- <img alt="Image placeholder" src="../../assets/img/brand/dark.svg" id="navbar-logo"> -->
          LOGO
        </a>
        <!-- Toggler -->
        <button
          class="navbar-toggler"
          :class="{ collapsed: isShow != true }"
          @click="isShow = !isShow"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          :aria-expanded="isShow"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <!-- Collapse -->
        <div
          class="collapse navbar-collapse"
          :class="{ show: isShow == true }"
          id="navbarCollapse"
        >
          <ul class="navbar-nav mt-4 mt-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/home">状态</router-link>
            </li>
            <li class="nav-item dropdown dropdown-animate" data-toggle="hover">
              <a
                class="nav-link"
                href="#"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                >设置</a
              >
              <div class="dropdown-menu dropdown-menu-single">
                <router-link class="nav-link" to="/internet">Internet</router-link>
                <router-link class="nav-link" to="/ipv6">IPv6</router-link>
                <router-link class="nav-link" to="/home">WiFi</router-link>
                <router-link class="nav-link" to="/home">Firewall</router-link>
                <router-link class="nav-link" to="/home">Upgrade</router-link>
              </div>
            </li>
            <li class="nav-item dropdown dropdown-animate" data-toggle="hover">
              <a
                class="nav-link"
                href="#"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                >开发者</a
              >
              <div class="dropdown-menu dropdown-menu-single">
                <router-link class="nav-link" to="/home">Log</router-link>
                <router-link class="nav-link" to="/home">System</router-link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <section class="slice slice-lg pt-10">
      <!-- SVG separator -->
      <div
        class="
          shape-container
          shape-line
          shape-position-top
          shape-orientation-inverse
        "
      >
        <svg
          width="2560px"
          height="100px"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          preserveAspectRatio="none"
          x="0px"
          y="0px"
          viewBox="0 0 2560 100"
          style="enable-background: new 0 0 2560 100"
          xml:space="preserve"
          class=""
        >
          <polygon points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
      <!-- Container -->
      <div class="container">
            <router-view></router-view>
      </div>
    </section>


    <Footer />
  </div>
</template>

<script>
import LocaleSwitcher from "../components/LocaleSwitcher";
import Footer from "./Footer";
console.log("LocaleSwitcher", LocaleSwitcher);
export default {
  components: { LocaleSwitcher, Footer },
  data() {
    return {
      isShow: false,
      
      
    };
  },
  created() {
    
  },
  methods: {
    
  },
};
</script>
<!-- Preloader -->
<style lang='scss'>
// @import '../../assets/libs/@fortawesome/fontawesome-free/css/all.min.css';
@import "../../assets/css/quick-website.css";
</style>
<style>
@keyframes hidePreloader {
  0% {
    width: 100%;
    height: 100%;
  }

  100% {
    width: 0;
    height: 0;
  }
}

body > div.preloader {
  position: fixed;
  background: white;
  width: 100%;
  height: 100%;
  z-index: 1071;
  opacity: 0;
  transition: opacity 0.5s ease;
  overflow: hidden;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

body:not(.loaded) > div.preloader {
  opacity: 1;
}

body:not(.loaded) {
  overflow: hidden;
}

body.loaded > div.preloader {
  animation: hidePreloader 0.5s linear 0.5s forwards;
}
.table {
  background-color: white;
}
</style>
