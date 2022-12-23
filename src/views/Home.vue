<template>
  <div>
    
        <div class="row row-grid">
          <div class="col-lg-8">
            <!-- Badge -->
            <span class="badge badge-warning badge-pill"
              >Made with Bootstrap</span
            >
            <!-- Title -->
            <h2 class="my-4 text-white">Hello Xrouter user</h2>
            <b-table hover :fields="fields" :items="items" head-variant="light">
            </b-table>
          </div>
        </div>
        <!-- Milestones -->
        <div class="row mt-6">
          <div class="col-lg-12">
            <div class="row">
              <div class="col-sm-3">
                <div class="card shadow-lg rounded-lg border-0 mb-sm-0">
                  <div class="p-4 text-center text-sm-left">
                    <h3 class="mb-0">{{ mtotal }}</h3>
                    <p class="text-muted mb-0">Memory Total</p>
                  </div>
                </div>
              </div>
              <div class="col-sm-3">
                <div class="card shadow-lg rounded-lg border-0 mb-sm-0">
                  <div class="p-4 text-center text-sm-left">
                    <h3 class="mb-0">{{ mfree }}</h3>
                    <p class="text-muted mb-0">Memory Free</p>
                  </div>
                </div>
              </div>
              <div class="col-sm-3">
                <div class="card shadow-lg rounded-lg border-0 mb-sm-0">
                  <div class="p-4 text-center text-sm-left">
                    <h3 class="mb-0">{{utime}}</h3>
                    <p class="text-muted mb-0">Up Time</p>
                  </div>
                </div>
              </div>
              <div class="col-sm-3">
                <div class="card shadow-lg rounded-lg border-0 mb-sm-0">
                  <div class="p-4 text-center text-sm-left">
                    <h3 class="mb-0">{{ per }}</h3>
                    <p class="text-muted mb-0">CPU</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        { key: "id", label: "LAN" },
        { key: "name", label: "Direction" },
      ],
      items: [],
      cpu_total_prev: 0,
      cpu_idle_prev: 0,
      per: "",
      utime: "",
      mtotal: "",
      mfree: "",
      phystatus: "",
      timer:null,
    };
  },
  methods: {
    load_memory_info() {
      this.$http["get"]("system/get_meminfo.cgi").then(({ data }) => {
        var result = data;
        this.mtotal = result.total + " kB";
        this.mfree = result.free + " kB";
      });
    },
    load_uptime() {
      this.$http["get"]("system/get_uptime.cgi").then(({ data }) => {
        var result = data;
        this.utime = result.uptime + " seconds";
      });
    },
    load_cpu_stat() {
      this.$http["get"]("system/get_cpustat.cgi").then(({ data }) => {
        var result = data;
        var total =
          result.cpu.user +
          result.cpu.nice +
          result.cpu.system +
          result.cpu.idle +
          result.cpu.iowait +
          result.cpu.irq +
          result.cpu.softirq;
        if (this.cpu_total_prev != 0) {
          var total_delta = total - this.cpu_total_prev;
          var idle_delta = result.cpu.idle - this.cpu_idle_prev;
          var per = ((total_delta - idle_delta) / total_delta) * 100;
        } else {
          var per = ((total - result.cpu.idle) / total) * 100;
        }
        this.cpu_total_prev = total;
        this.cpu_idle_prev = result.cpu.idle;

        this.per = per.toFixed(2) + " %";
      });
    },
    load_phy_status() {
      this.$http["get"]("system/get_phy_status.cgi").then(({ data }) => {
        var result = data;
        if (!result.status) return;
        var html = [];
        var lan = 1;
        var stat = "",
          type = "";
        for (var i = 0; i < result.status.length; i++) {
          if (result.status[i].link) {
            stat = "Up " + result.status[i].speed + "Mbps";
            if (result.status[i].duplex) stat += " Full Duplex";
            else stat += " Half Duplex";
          } else stat = "Down";
          if (result.status[i].type == "lan") {
            type = "LAN" + lan;
            lan++;
          } else type = "WAN";
          html.push({
            id: type,
            name: stat,
          });
          // html += "<tr>";
          // html += type + ":";
          // html += `"${stat}"`;
          // if(i!=result.status.length-1){
          // 	html+=","
          // }
          // html += "</tr>";
        }

        // html += "</table>";
        // this.items={...html.split(',')};
        this.items = html;
        console.log("html", this.items);
      });
    },
  },
  created() {
    this.timer=setInterval(()=>{
    	this.load_memory_info();
    	this.load_uptime();
    	this.load_cpu_stat();
    	this.load_phy_status();
    }, 2000);
    // this.load_memory_info();
    // this.load_uptime();
    // this.load_cpu_stat();
    // this.load_phy_status();
  },
  destroyed(){
    clearInterval(this.timer);
  }
};
</script>
