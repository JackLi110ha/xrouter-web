<template>
  <div>
    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label="Mode"
      label-for="input-default"
    >
      <b-form-select
        v-model="sel_mode"
        :options="modeOptions"
        @change="change_network_mode"
      ></b-form-select>
    </b-form-group>

    <!-- router -->
    <div v-if="div_rt">
      <b-form-group
        label-cols="4"
        label-cols-lg="2"
        label=""
        label-for="input-default"
      >
        WDS
      </b-form-group>
      <b-form-group
        label-cols="4"
        label-cols-lg="2"
        label="Wireless WAN"
        label-for="input-default"
      >
        <b-form-checkbox
          id="checkbox-6"
          v-model="rt_wds_enable"
          name="checkbox-6"
          value="true"
          unchecked-value="false"
          @change="change_rt_wds"
        >
          Enable
        </b-form-checkbox>
      </b-form-group>
      <div v-if="rt_wds">
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label="SSID"
          label-for="input-default"
        >
          <b-form-input v-model="rt_wds_ssid"></b-form-input>
        </b-form-group>
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label="Password"
          label-for="input-default"
        >
          <b-form-input v-model="rt_wds_pwd"></b-form-input>
        </b-form-group>
      </div>
      <b-form-group
        label-cols="4"
        label-cols-lg="2"
        label=""
        label-for="input-default"
      >
        WAN
      </b-form-group>
      <b-form-group
        label-cols="4"
        label-cols-lg="2"
        label="Protocol"
        label-for="input-default"
      >
        <b-form-select
          v-model="rt_wan_proto"
          :options="protocolOptions"
          @change="change_rt_wan_proto"
        ></b-form-select>
      </b-form-group>
      <div v-if="rt_wan_static">
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label="IP"
          label-for="input-default"
        >
          <b-form-input v-model="rt_wan_ip"></b-form-input>
        </b-form-group>
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label="Netmask"
          label-for="input-default"
        >
          <b-form-input v-model="rt_wan_netmask"></b-form-input>
        </b-form-group>
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label="Gateway"
          label-for="input-default"
        >
          <b-form-input v-model="rt_wan_gw"></b-form-input>(optional)
        </b-form-group>
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label="DNS"
          label-for="input-default"
        >
          <b-form-input v-model="rt_wan_static_dns1"></b-form-input>(optional)
        </b-form-group>
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label=""
          label-for="input-default"
        >
          <b-form-input v-model="rt_wan_static_dns2"></b-form-input>(optional)
        </b-form-group>
      </div>
      <div v-if="rt_wan_dhcp">
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label="DNS"
          label-for="input-default"
        >
          <b-form-input v-model="rt_wan_dhcp_dns1"></b-form-input>(optional)
        </b-form-group>
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label=""
          label-for="input-default"
        >
          <b-form-input v-model="rt_wan_dhcp_dns2"></b-form-input>(optional)
        </b-form-group>
      </div>
      <div v-if="rt_wan_pppoe">
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label="User"
          label-for="input-default"
        >
          <b-form-input v-model="rt_wan_user"></b-form-input>
        </b-form-group>
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label="Password"
          label-for="input-default"
        >
          <b-form-input v-model="rt_wan_pwd"></b-form-input>
        </b-form-group>
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label="DNS"
          label-for="input-default"
        >
          <b-form-input v-model="rt_wan_pppoe_dns1"></b-form-input>(optional)
        </b-form-group>
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label=""
          label-for="input-default"
        >
          <b-form-input v-model="rt_wan_pppoe_dns2"></b-form-input>(optional)
        </b-form-group>
      </div>
      <div v-if="rt_wan_other">
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label="NAT"
          label-for="input-default"
        >
         <b-form-checkbox
          id="checkbox-2"
          v-model="rt_wan_nat"
          name="checkbox-2"
          value="true"
          unchecked-value="false"
        >
          Enable
        </b-form-checkbox>
        </b-form-group>
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label="MTU"
          label-for="input-default"
        >
          <b-form-input v-model="rt_wan_mtu" v-if="rt_wan_mtu1"></b-form-input>
          <b-form-input v-model="rt_wan_mtu_pppoe" v-if="rt_wan_mtu_pppoe1"></b-form-input>
        </b-form-group>
      </div>
      <b-form-group
        label-cols="4"
        label-cols-lg="2"
        label=""
        label-for="input-default"
      >
        LAN
      </b-form-group>
      <b-form-group
        label-cols="4"
        label-cols-lg="2"
        label="IP"
        label-for="input-default"
      >
        <b-form-input v-model="rt_lan_ip"></b-form-input>
      </b-form-group>
      <b-form-group
        label-cols="4"
        label-cols-lg="2"
        label="Netmask"
        label-for="input-default"
      >
        <b-form-input v-model="rt_lan_netmask"></b-form-input>
      </b-form-group>
      <b-form-group
        label-cols="4"
        label-cols-lg="2"
        label="DHCP Server"
        label-for="input-default"
      >
        <b-form-checkbox
          id="checkbox-3"
          v-model="rt_lan_dhcp_server"
          name="checkbox-3"
          value="true"
          unchecked-value="false"
          @change="change_rt_dhcp"
        >
        </b-form-checkbox>Enable
      </b-form-group>
      <b-form-group
        label-cols="4"
        label-cols-lg="2"
        label="DHCP Range"
        label-for="input-default"
        v-if="rt_dhcp_range"
      >
        <b-form-input v-model="rt_lan_dhcp_pool_low"></b-form-input>
        -
        <b-form-input v-model="rt_lan_dhcp_pool_high"></b-form-input>
      </b-form-group>
    </div>

    <div v-if="div_ap">
      <b-form-group
        label-cols="4"
        label-cols-lg="2"
        label=""
        label-for="input-default"
      >
        WDS
      </b-form-group>
      <b-form-group
        label-cols="4"
        label-cols-lg="2"
        label="Wireless bridge"
        label-for="input-default"
      >
      <b-form-checkbox
        id="checkbox-4"
        v-model="ap_wds_enable"
        name="checkbox-4"
        value="true"
        unchecked-value="false"
        @change="change_ap_wds"
      >
      </b-form-checkbox>Enable
      </b-form-group>
      <div v-if="ap_wds">
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label="SSID"
          label-for="input-default"
        >
          <b-form-input v-model="ap_wds_ssid"></b-form-input>
        </b-form-group>
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label="Password"
          label-for="input-default"
        >
          <b-form-input v-model="ap_wds_pwd"></b-form-input>
        </b-form-group>
      </div>
      <b-form-group
        label-cols="4"
        label-cols-lg="2"
        label=""
        label-for="input-default"
      >
        LAN
      </b-form-group>
      <b-form-group
        label-cols="4"
        label-cols-lg="2"
        label="Protocol"
        label-for="input-default"
      >
        <b-form-select
          v-model="ap_proto"
          :options="ap_protoOptions"
          @change="change_ap_wan_proto"
        ></b-form-select>
      </b-form-group>
      <div v-if="ap_static">
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label="IP"
          label-for="input-default"
        >
          <b-form-input v-model="ap_ip"></b-form-input>
        </b-form-group>
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label="Gateway"
          label-for="input-default"
        >
          <b-form-input v-model="ap_gw"></b-form-input>
        </b-form-group>
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label="DNS"
          label-for="input-default"
        >
          <b-form-input v-model="ap_static_dns1"></b-form-input>(optional)
        </b-form-group>
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label=""
          label-for="input-default"
        >
          <b-form-input v-model="ap_static_dns2"></b-form-input>(optional)
        </b-form-group>
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label="DHCP Server"
          label-for="input-default"
        >
        <b-form-checkbox
        id="checkbox-5"
        v-model="ap_dhcp_server"
        name="checkbox-5"
        value="true"
        unchecked-value="false"
        @change="change_ap_dhcp"
      >
      </b-form-checkbox>Enable
        </b-form-group>
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label="DHCP Range"
          label-for="input-default"
          v-if="ap_dhcp_range"
        >
          <b-form-input v-model="ap_dhcp_pool_low"></b-form-input>
          -
          <b-form-input v-model="ap_dhcp_pool_high"></b-form-input>
        </b-form-group>
      </div>
      <div v-if="ap_dhcp">
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label="DNS"
          label-for="input-default"
        >
          <b-form-input v-model="ap_dhcp_dns1"></b-form-input>(optional)
        </b-form-group>
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label=""
          label-for="input-default"
        >
          <b-form-input v-model="ap_dhcp_dns2"></b-form-input>(optional)
        </b-form-group>
      </div>
    </div>

    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label=""
      label-for="input-default"
    >
     <b-button variant="success" @click="set_network_config">commit</b-button>
    </b-form-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      modeSelected: null,
      modeOptions: [
        { value: "router", text: "Router" },
        { value: "bridge", text: "Bridge" },
      ],
      ap_protoOptions: [
        { value: "static", text: "Static" },
        { value: "dhcp", text: "DHCP" },
      ],
      protocolSelected: null,
      protocolOptions: [
        { value: "none", text: "None" },
        { value: "static", text: "Static" },
        { value: "dhcp", text: "Dhcp" },
        { value: "pppoe", text: "Pppoe" },
      ],
      rt_wds: false,
      rt_wan_static: false,
      rt_wan_dhcp: false,
      rt_wan_pppoe: false,
      rt_wan_other: false,
      ap_wds: false,
      ap_static: false,
      ap_dhcp: false,
      rt_dhcp_range: false,
      ap_dhcp_range: false,
      status: "not_accepted",
      sel_mode: "",
      rt_wds_enable: "",
      rt_wds_ssid: "",
      rt_wds_pwd: "",
      rt_wan_proto: "",
      rt_wan_ip: "",
      rt_wan_netmask: "",
      rt_wan_gw: "",
      rt_wan_user: "",
      rt_wan_pwd: "",
      rt_wan_static_dns1: "",
      rt_wan_static_dns2: "",
      rt_wan_dhcp_dns1: "",
      rt_wan_dhcp_dns2: "",
      rt_wan_pppoe_dns1: "",
      rt_wan_pppoe_dns2: "",
      rt_wan_nat: "",
      rt_wan_mtu: "",
      rt_wan_mtu1: "",
      rt_wan_mtu_pppoe: "",
      rt_wan_mtu_pppoe1: "",
      rt_lan_ip: "",
      rt_lan_netmask: "",
      rt_lan_dhcp_server: "",
      rt_lan_dhcp_pool_low: "",
      rt_lan_dhcp_pool_high: "",
      ap_wds_enable: "",
      ap_wds_ssid: "",
      ap_wds_pwd: "",
      ap_proto: "",
      ap_ip: "",
      ap_netmask: "",
      ap_gw: "",
      ap_static_dns1: "",
      ap_static_dns2: "",
      ap_dhcp_dns1: "",
      ap_dhcp_dns2: "",
      ap_dhcp_server: "",
      ap_dhcp_pool_low: "",
      ap_dhcp_pool_high: "",

      div_ap: false,
      div_rt: false,
    };
  },
  created() {
    this.get_network_config();
  },
  methods: {
    change_rt_wds(){
      if(this.rt_wds_enable=="true"){
        this.rt_wds=true;
      }else {
        this.rt_wds=false;
      }
    },
    change_rt_wan_proto(){
      let wan_proto=this.rt_wan_proto;
      if (wan_proto == "pppoe") {
        this.rt_wan_mtu1=false;
        this.rt_wan_mtu_pppoe1=true;
			}
			else {
        this.rt_wan_mtu1=true;
        this.rt_wan_mtu_pppoe1=false;
			}
      this.rt_wan_static=false;
      this.rt_wan_dhcp=false;
      this.rt_wan_pppoe=false;

			if (wan_proto == "static") {
        this.rt_wan_static=true;
			}
			else if (wan_proto == "dhcp") {
        this.rt_wan_dhcp=true;
			}
			else if (wan_proto == "pppoe") {
        this.rt_wan_pppoe=true;
			}

			if (wan_proto == "none")
         this.rt_wan_other=false;
			else
        this.rt_wan_other=true;
    },
    change_rt_dhcp(){
      if (this.rt_lan_dhcp_server=="true")
			{
        this.rt_dhcp_range=true;
			}
			else
			{
        this.rt_dhcp_range=false;
			}
    },
    change_ap_wds()
		{ 
			if (this.ap_wds_enable=="true")
			{
        this.ap_wds=true;
			}
			else
			{
        this.ap_wds=false;
			}
		},
    change_ap_wan_proto()
		{
			var wan_proto = this.ap_proto;

			if (wan_proto == "static") {
        this.ap_static=true;
        this.ap_dhcp=false;
			}
			else if (wan_proto == "dhcp") {
        this.ap_static=false;
        this.ap_dhcp=true;
			}
			else {
        this.ap_static=false;
        this.ap_dhcp=false;
			}
		},
    change_ap_dhcp()
		{
			if (this.ap_dhcp_server=="true")
			{
        this.ap_dhcp_range=true;
			}
			else
			{
        this.ap_dhcp_range=false;
			}
		},
    change_network_mode() {
      var mode = this.sel_mode;
      if (mode == "router") {
        this.div_ap = false;
        this.div_rt = true;
        this.change_rt_wds();
        this.change_rt_wan_proto();
        this.change_rt_dhcp();
      } else if (mode == "bridge") {
        this.div_rt = false;
        this.div_ap = true;
        this.change_ap_wds();
        this.change_ap_wan_proto();
        this.change_ap_dhcp();
      }
    },
    get_network_config() {
      this.$http["get"]("network/get_network.cgi").then(({ data }) => {
        console.log("返回的数据", data);
        this.sel_mode = data.network.mode;
        /* router */
        this.rt_wds_enable = data.sta_wan.enable ? "true" : "false";
        this.rt_wds_ssid = data.sta_wan.ssid;
        this.rt_wds_pwd = data.sta_wan.psk;

        this.rt_wan_proto = data.wan.proto;
        this.rt_wan_ip = data.wan.ip;
        this.rt_wan_netmask = data.wan.netmask;
        this.rt_wan_gw = data.wan.gateway;
        this.rt_wan_user = data.wan.account;
        this.rt_wan_pwd = data.wan.password;
        this.rt_wan_static_dns1 = data.wan.dns1;
        this.rt_wan_static_dns2 = data.wan.dns2;
        this.rt_wan_dhcp_dns1 = data.wan.dhcp_dns1;
        this.rt_wan_dhcp_dns2 = data.wan.dchp_dns2;
        this.rt_wan_pppoe_dns1 = data.wan.pppoe_dns1;
        this.rt_wan_pppoe_dns2 = data.wan.pppoe_dns2;
        this.rt_wan_nat = data.wan.nat ? true : false;
        this.rt_wan_mtu = data.wan.mtu;
        this.rt_wan_mtu_pppoe = data.wan.mtu_pppoe;

        this.rt_lan_ip = data.lan.ip;
        this.rt_lan_netmask = data.lan.netmask;
        this.rt_lan_dhcp_server = data.lan.dhcp_server ? "true" : "false";
        this.rt_lan_dhcp_pool_low = data.lan.dhcp_pool_low;
        this.rt_lan_dhcp_pool_high = data.lan.dhcp_pool_high;

        /* bridge */
        this.ap_wds_enable = data.sta_wds.enable ? "true" : "false";
        this.ap_wds_ssid = data.sta_wds.ssid;
        this.ap_wds_pwd = data.sta_wds.psk;

        this.ap_proto = data.ap.proto;
        this.ap_ip = data.ap.ip;
        this.ap_netmask = data.ap.netmask;
        this.ap_gw = data.ap.gateway;
        this.ap_static_dns1 = data.ap.static_dns1;
        this.ap_static_dns2 = data.ap.static_dns2;
        this.ap_dhcp_dns1 = data.ap.dhcp_dns1;
        this.ap_dhcp_dns2 = data.ap.dhcp_dns2;
        this.ap_dhcp_server = data.ap.dhcp_server ? "true" : "false";
        this.ap_dhcp_pool_low = data.ap.dhcp_pool_low;
        this.ap_dhcp_pool_high = data.ap.dhcp_pool_high;

        this.change_network_mode();
      });
    },
    set_network_config(){
      var data = {};

			data.mode = this.sel_mode;

			if (data.mode == "router") {
				data.wds = this.rt_wds_enable ? 1 : 0;
				if (data.wds) {
					data.ssid = this.rt_wds_ssid;
					data.psk = this.rt_wds_pwd;
				}

				data.proto = this.rt_wan_proto;

				if (data.proto == "static") {
					data.wan_ip = this.rt_wan_ip;
					data.wan_netmask = this.rt_wan_netmask;
					data.wan_gateway = this.rt_wan_gw;
					data.mtu = this.rt_wan_mtu;
					data.dns1 = this.rt_wan_static_dns1;
					data.dns2 = this.rt_wan_static_dns2;
				}
				else if (data.proto == "dhcp") {
					data.dns1 = this.rt_wan_dhcp_dns1;
					data.dns2 = this.rt_wan_dhcp_dns2;
					data.mtu = this.rt_wan_mtu;
				}
				else if (data.proto == "pppoe") {
					data.dns1 = this.rt_wan_pppoe_dns1;
					data.dns2 = this.rt_wan_pppoe_dns2;
					data.pppoe_account = this.rt_wan_user;
					data.pppoe_password = this.rt_wan_pwd;
					data.mtu = this.rt_wan_mtu_pppoe;
				}

				if (data.proto != "none") {
					data.nat = this.rt_wan_nat ? 1 : 0;
				}

				data.lan_ip = this.rt_lan_ip;
				data.lan_netmask = this.rt_lan_netmask;
				data.dhcp_server = this.rt_lan_dhcp_server ? 1 : 0;
				if (data.dhcp_server) {
					data.dhcp_pool_low = this.rt_lan_dhcp_pool_low;
					data.dhcp_pool_high = this.rt_lan_dhcp_pool_high;
				}
			}
			else if (data.mode == "bridge") {
				data.wds = this.ap_wds_enable ? 1 : 0;
				if (data.wds) {
					data.ssid = this.ap_wds_ssid;
					data.psk = this.ap_wds_pwd;
				}

				data.proto = this.ap_proto;
				if (data.proto == "static") {
					data.wan_ip = this.ap_ip;
					data.wan_netmask = this.ap_netmask;
					data.wan_gateway = this.ap_gw;
					data.dns1 = this.ap_static_dns1;
					data.dns2 = this.ap_static_dns2;
					data.dhcp_server = this.ap_dhcp_server ? 1 : 0;
					if (data.dhcp_server) {
						data.dhcp_pool_low = this.ap_dhcp_pool_low;
						data.dhcp_pool_high = this.ap_dhcp_pool_high;
					}
				}
				else if (data.proto == "dhcp") {
					data.dns1 = this.ap_dhcp_dns1;
					data.dns2 = this.ap_dhcp_dns2;
				}
			}

      this.$http["post"]("network/set_network.cgi",data).then(({ data }) => {
        if(data.errno){
          this.$snotify.success("Commit network settings failed:\nerrno: " + result.errno + "\nerrstr: " + result.errstr + "\nreason: " + result.reason,{position:'centerTop'});
        }
      }).catch(result=>{
        this.$snotify.error(result.status + ": " + result.statusText,{position:'centerTop'});
      })
    }
  },
};
</script>