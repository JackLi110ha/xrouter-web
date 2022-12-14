<template>
  <div>
    <!-- Go Pro -->
    <div class="btn btn-block btn-dark text-truncate rounded-0 py-2 d-none d-lg-block" style="z-index: 1000;" target="_blank">
        
    </div>
    
		<locale-switcher class="text-center"></locale-switcher>
    
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white">
        <div class="container">
            <!-- Brand -->
            <a class="navbar-brand" href="index.html">
                <!-- <img alt="Image placeholder" src="../../assets/img/brand/dark.svg" id="navbar-logo"> -->
                LOGO
            </a>
            <!-- Toggler -->
            <button class="navbar-toggler" :class="{'collapsed':isShow!=true}" @click="isShow=!isShow" type="button" 
            data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" 
            :aria-expanded="isShow" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <!-- Collapse -->
            <div class="collapse navbar-collapse" :class="{'show':isShow==true}" id="navbarCollapse">
                <ul class="navbar-nav mt-4 mt-lg-0 ml-auto">
                    <li class="nav-item ">
                        <a class="nav-link" href="index.html">状态</a>
                    </li>
                    <li class="nav-item dropdown dropdown-animate" data-toggle="hover">
                        <a class="nav-link" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">设置</a>
                        <div class="dropdown-menu dropdown-menu-single">
                            <a href="index.html" class="dropdown-item">About</a>
                            <a href="about.html" class="dropdown-item">About us</a>
                            <a href="contact.html" class="dropdown-item">Contact</a>
                            <div class="dropdown-divider"></div>
                            <a href="login.html" class="dropdown-item">Login</a>
                        </div>
                    </li>
                    <li class="nav-item ">
                        <a class="nav-link" href="docs/index.html">开发者</a>
                    </li>
                </ul>
                <!-- Mobile button -->
                <!-- <div class="d-lg-none text-center">
                    <a href="https://webpixels.io/themes/quick-website-ui-kit" class="btn btn-block btn-sm btn-warning">See more details</a>
                </div> -->
            </div>
        </div>
    </nav>

		<section class="slice slice-lg pt-10 bg-primary">
        <!-- SVG separator -->
        <div class="shape-container shape-line shape-position-top shape-orientation-inverse">
            <svg width="2560px" height="100px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" x="0px" y="0px" viewBox="0 0 2560 100" style="enable-background:new 0 0 2560 100;" xml:space="preserve" class="">
                <polygon points="2560 0 2560 100 0 100"></polygon>
            </svg>
        </div>
        <!-- Container -->
        <div class="container">
            <div class="row row-grid">
                <div class="col-lg-8">
                    <!-- Badge -->
                    <span class="badge badge-warning badge-pill">Made with Bootstrap</span>
                    <!-- Title -->
                    <h2 class="my-4 text-white">Hello Xrouter user</h2>
                    <!-- Text -->
                    <p class="lead text-white lh-190">
                        123
                    </p>
                    <p class="lead text-white lh-190">
                        123
                    </p>
                    <p class="lead text-white lh-190">
                        123
                    </p>
                    <p class="lead text-white lh-190">
                        123
                    </p>
                </div>
            </div>
            <!-- Milestones -->
            <div class="row mt-6">
                <div class="col-lg-12">
                    <div class="row">
                        <div class="col-sm-3">
                            <div class="card shadow-lg rounded-lg border-0 mb-sm-0">
                                <div class="p-4 text-center text-sm-left">
                                    <h3 class="mb-0">1.27%</h3>
                                    <p class="text-muted mb-0">
                                        Memory Total
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="card shadow-lg rounded-lg border-0 mb-sm-0">
                                <div class="p-4 text-center text-sm-left">
                                    <h3 class="mb-0">55k</h3>
                                    <p class="text-muted mb-0">
                                        Memory Free
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="card shadow-lg rounded-lg border-0 mb-sm-0">
                                <div class="p-4 text-center text-sm-left">
                                    <h3 class="mb-0">98%</h3>
                                    <p class="text-muted mb-0">
                                        Up Time
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="card shadow-lg rounded-lg border-0 mb-sm-0">
                                <div class="p-4 text-center text-sm-left">
                                    <h3 class="mb-0">98%</h3>
                                    <p class="text-muted mb-0">
                                        CPU
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
		<Footer/>
  </div>
</template>

<script>
import LocaleSwitcher from "../components/LocaleSwitcher";
import Footer from "./Footer";
console.log('LocaleSwitcher',LocaleSwitcher);
export default {
  components: { LocaleSwitcher,Footer },
  data(){
    return {
      isShow:false
    }
  }
}
</script>
<!-- Preloader -->
<style lang='scss'>
// @import '../../assets/libs/@fortawesome/fontawesome-free/css/all.min.css';
@import '../../assets/css/quick-website.css';
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

    body>div.preloader {
        position: fixed;
        background: white;
        width: 100%;
        height: 100%;
        z-index: 1071;
        opacity: 0;
        transition: opacity .5s ease;
        overflow: hidden;
        pointer-events: none;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    body:not(.loaded)>div.preloader {
        opacity: 1;
    }

    body:not(.loaded) {
        overflow: hidden;
    }

    body.loaded>div.preloader {
        animation: hidePreloader .5s linear .5s forwards;
    }
</style>
