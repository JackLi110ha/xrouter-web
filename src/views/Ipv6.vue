<template>
  <div>
    <!-- router -->
    <div v-if="mode_rt">
      <b-form-group
        label-cols="4"
        label-cols-lg="2"
        label="Proto"
        label-for="input-default"
      >
        <b-form-select
          v-model="rt_proto"
          :options="rt_protoOptions"
          @change="change_rt_proto"
        ></b-form-select>
      </b-form-group>
      <div v-if="rt_wan_dhcpv6">
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label="Request Address"
          label-for="input-default"
        >
          <b-form-select
            v-model="rt_wan_reqaddr"
            :options="rt_wan_reqaddrOptions"
          ></b-form-select>
        </b-form-group>
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label="Request Prefix"
          label-for="input-default"
        >
          <b-form-input v-model="rt_wan_reqprefix"></b-form-input
          >(no/auto/32-64)
        </b-form-group>
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label="DNS"
          label-for="input-default"
        >
          <b-form-input v-model="rt_wan_dhcpv6_dns1"></b-form-input>(optional)
        </b-form-group>
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label=""
          label-for="input-default"
        >
          <b-form-input v-model="rt_wan_dhcpv6_dns2"></b-form-input>(optional)
        </b-form-group>
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label="RA"
          label-for="input-default"
        >
          <b-form-checkbox
            v-model="rt_ra"
            name="checkbox-6"
            value="true"
            unchecked-value="false"
            
          >
            Enable
          </b-form-checkbox>
        </b-form-group>
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label="DHCPv6 Server"
          label-for="input-default"
        >
          <b-form-checkbox
            v-model="rt_dhcpv6_srv"
            name="checkbox-6"
            value="true"
            unchecked-value="false"
            
          >
            Enable
          </b-form-checkbox>
        </b-form-group>
      </div>
      <div v-if="rt_wan_static">
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label="Address"
          label-for="input-default"
        >
          <b-form-input v-model="rt_wan_addr"></b-form-input>
        </b-form-group>
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label="Gateway"
          label-for="input-default"
        >
          <b-form-input v-model="rt_wan_gw"></b-form-input>
        </b-form-group>
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label="Prefix"
          label-for="input-default"
        >
          <b-form-input v-model="rt_wan_prefix"></b-form-input>
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
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label="RA"
          label-for="input-default"
        >
          <b-form-checkbox
            v-model="rt_static_ra"
            name="checkbox-6"
            value="true"
            unchecked-value="false"
            
          >
            Enable
          </b-form-checkbox>
        </b-form-group>
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label="DHCPv6 Server"
          label-for="input-default"
        >
          <b-form-checkbox
            v-model="rt_st_dhcpv6_srv"
            name="checkbox-6"
            value="true"
            unchecked-value="false"
            
          >
            Enable
          </b-form-checkbox>
        </b-form-group>
      </div>
    </div>


    <!-- bridge -->
    <div v-if="mode_br">
      <b-form-group
        label-cols="4"
        label-cols-lg="2"
        label=""
        label-for="input-default"
      >
        <p class="lead text-primary opacity-8">
          Note: The device in Bridge mode
        </p>
      </b-form-group>
      
      <b-form-group
        label-cols="4"
        label-cols-lg="2"
        label="Proto"
        label-for="input-default"
      >
        <b-form-select
          v-model="br_proto"
          :options="br_protoOptions"
          @change="change_br_proto"
        ></b-form-select>
      </b-form-group>
      <div v-if="br_wan_dhcpv6">
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label="Request Address"
          label-for="input-default"
        >
          <b-form-select
            v-model="br_wan_reqaddr"
            :options="br_wan_reqaddrOptions"
          ></b-form-select>
        </b-form-group>
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label="Request Prefix"
          label-for="input-default"
        >
          <b-form-input v-model="br_wan_reqprefix"></b-form-input>(no/auto/32-64)
        </b-form-group>
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label="DNS"
          label-for="input-default"
        >
          <b-form-input v-model="br_wan_dhcpv6_dns1"></b-form-input>(optional)
        </b-form-group>
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label=""
          label-for="input-default"
        >
          <b-form-input v-model="br_wan_dhcpv6_dns2"></b-form-input>(optional)
        </b-form-group>
      </div>
      <div v-if="br_wan_static">
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label="Address"
          label-for="input-default"
        >
          <b-form-input v-model="br_wan_addr"></b-form-input>
        </b-form-group>
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label="Gateway"
          label-for="input-default"
        >
          <b-form-input v-model="br_wan_gw"></b-form-input>
        </b-form-group>
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label="Prefix"
          label-for="input-default"
        >
          <b-form-input v-model="br_wan_prefix"></b-form-input>
        </b-form-group>
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label="DNS"
          label-for="input-default"
        >
          <b-form-input v-model="br_wan_static_dns1"></b-form-input>(optional)
        </b-form-group>
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label=""
          label-for="input-default"
        >
          <b-form-input v-model="br_wan_static_dns2"></b-form-input>(optional)
        </b-form-group>
         <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label="RA"
          label-for="input-default"
        >
          <b-form-checkbox
            v-model="br_ra"
            name="checkbox-6"
            value="true"
            unchecked-value="false"
            
          >
            Enable
          </b-form-checkbox>
        </b-form-group>
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label="DHCPv6 Server"
          label-for="input-default"
        >
          <b-form-checkbox
            v-model="br_dhcpv6_srv"
            name="checkbox-6"
            value="true"
            unchecked-value="false"
            
          >
            Enable
          </b-form-checkbox>
        </b-form-group>
      </div>
    </div>
    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label=""
      label-for="input-default"
    >
     <b-button variant="success" @click="set_ipv6_config">commit</b-button>
    </b-form-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      modeOptions: [
        { value: "none", text: "None" },
        { value: "static", text: "Static" },
        { value: "dhcpv6", text: "DHCPv6" },
      ],
      br_protoOptions: [
        { value: "none", text: "None" },
        { value: "static", text: "Static" },
        { value: "dhcpv6", text: "DHCPv6" },
      ],
      rt_wan_reqaddrOptions: [
        { value: "slaac", text: "SLAAC" },
        { value: "slaac+iana", text: "SLAAC + IANA" },
      ],
      br_wan_reqaddrOptions: [
        { value: "slaac", text: "SLAAC" },
        { value: "slaac+iana", text: "SLAAC + IANA" },
      ],
      rt_proto: "",

      rt_wan_reqaddr: "",
      rt_wan_reqprefix: "",
      rt_wan_dhcpv6_dns1: "",
      rt_wan_dhcpv6_dns2: "",

      rt_wan_addr: "",
      rt_wan_gw: "",
      rt_wan_prefix: "",
      rt_wan_static_dns1: "",
      rt_wan_static_dns2: "",

      rt_ra: "",
      rt_dhcpv6_srv: "",
      rt_static_ra: "",
      rt_st_dhcpv6_srv: "",

      mode_rt: false,
      br_wan_dhcpv6: false,
      br_wan_static: false,

      br_proto: "",

      br_wan_reqaddr: "",
      br_wan_reqprefix: "",
      br_wan_dhcpv6_dns1: "",
      br_wan_dhcpv6_dns2: "",

      br_wan_addr: "",
      br_wan_gw: "",
      br_wan_prefix: "",
      br_wan_static_dns1: "",
      br_wan_static_dns2: "",
      br_ra: false,
      br_dhcpv6_srv: false,

      mode_br: true,
    };
  },
  created() {
    this.get_ipv6_config();
  },
  methods: {
    change_rt_proto() {
      var proto = this.rt_proto;
      if (proto == "none") {
        this.rt_wan_dhcpv6=false;
        this.rt_wan_static=false;
      } else if (proto == "static") {
        this.rt_wan_dhcpv6=false;
        this.rt_wan_static=true;
      } else if (proto == "dhcpv6") {
        this.rt_wan_dhcpv6=true;
        this.rt_wan_static=false;
      }
    },
    change_br_proto()
		{
			var proto = this.br_proto;
			if (proto == "none") {
				this.br_wan_dhcpv6=false;
				this.br_wan_static=false;
			}
			else if (proto == "static") {
				this.br_wan_dhcpv6=false;
				this.br_wan_static=true;
			}
			else if (proto == "dhcpv6") {
				this.br_wan_dhcpv6=true;
				this.br_wan_static=false;
			}
		},
    get_ipv6_config() {
      this.$http["get"]("network/get_ipv6.cgi").then(({ data }) => {
        if (data.errno) {
          this.$snotify.error(
            "Fetch IPv6 config failed:\nerrno: " +
              result.errno +
              "\nerrstr: " +
              result.errstr +
              "\nreason: " +
              result.reason,
            { position: "centerTop" }
          );
          return;
        }

        if (data.network.mode == "router") {
          this.rt_proto = data.wan6.proto6;

          this.rt_wan_reqaddr = data.wan6.reqaddr;
          this.rt_wan_reqprefix = data.wan6.reqprefix;
          this.rt_wan_dhcpv6_dns1 = data.wan6.dhcp6_dns1;
          this.rt_wan_dhcpv6_dns2 = data.wan6.dhcp6_dns2;

          this.rt_wan_addr = data.wan6.addr6;
          this.rt_wan_gw = data.wan6.gateway6;
          this.rt_wan_prefix = data.wan6.prefix6;
          this.rt_wan_static_dns1 = data.wan6.static_dns1;
          this.rt_wan_static_dns2 = data.wan6.static_dns2;

          this.rt_ra = data.lan6.ra ? true : false;
          this.rt_dhcpv6_srv = data.lan6.dhcpv6_server ? true : false;
          this.rt_static_ra = data.lan6.static_ra ? true : false;
          this.rt_st_dhcpv6_srv = data.lan6.static_dhcpv6_server ? true : false;

          this.change_rt_proto();
          this.mode_rt = true;
        } else if (data.network.mode == "bridge") {
          this.br_proto = data.ap6.proto6;

          this.br_wan_reqaddr = data.ap6.reqaddr;
          this.br_wan_reqprefix = data.ap6.reqprefix;
          this.br_wan_dhcpv6_dns1 = data.ap6.dhcp6_dns1;
          this.br_wan_dhcpv6_dns2 = data.ap6.dhcp6_dns2;

          this.br_wan_addr = data.ap6.addr6;
          this.br_wan_gw = data.ap6.gateway6;
          this.br_wan_prefix = data.ap6.prefix6;
          this.br_wan_static_dns1 = data.ap6.static_dns1;
          this.br_wan_static_dns2 = data.ap6.static_dns2;
          this.br_ra = data.ap6.ra ? true : false;
          this.br_dhcpv6_srv = data.ap6.dhcpv6_server ? true : false;

          this.change_br_proto();
          this.mode_br = true;
        }
      });
    },
    set_ipv6_config()
		{
			var data = {};

			if (this.mode_rt) {
				data.mode = "router";
				data.proto6 = this.rt_proto

				if (data.proto6 == "dhcpv6") {
					data.reqaddr = this.rt_wan_reqaddr
					data.reqprefix = this.rt_wan_reqprefix
					data.dns1 = this.rt_wan_dhcpv6_dns1
					data.dns2 = this.rt_wan_dhcpv6_dns2
					data.ra = this.rt_ra ? 1 : 0;
					data.dhcpv6_server = this.rt_dhcpv6_srv ? 1 : 0;
				}
				else if (data.proto6 == "static") {
					data.addr6 = this.rt_wan_addr
					data.gateway6 = this.rt_wan_gw
					data.prefix6 = this.rt_wan_prefix
					data.dns1 = this.rt_wan_static_dns1
					data.dns2 = this.rt_wan_static_dns2
					data.ra = this.rt_static_ra ? 1 : 0;
					data.dhcpv6_server = this.rt_st_dhcpv6_srv ? 1 : 0;
				}
			}
			else if (this.mode_br) {
				data.mode = "bridge";
				data.proto6 = this.br_proto

				if (data.proto6 == "dhcpv6") {
					data.reqaddr = this.br_wan_reqaddr
					data.reqprefix = this.br_wan_reqprefix
					data.dns1 = this.br_wan_dhcpv6_dns1
					data.dns2 = this.br_wan_dhcpv6_dns2
				}
				else if (data.proto6 == "static") {
					data.addr6 = this.br_wan_addr
					data.gateway6 = this.br_wan_gw
					data.prefix6 = this.br_wan_prefix
					data.dns1 = this.br_wan_static_dns1
					data.dns2 = this.br_wan_static_dns2
					data.ra = this.br_ra ? 1 : 0;
					data.dhcpv6_server = this.br_dhcpv6_srv ? 1 : 0;
				}
			}

      this.$http["post"]("network/set_ipv6.cgi",data).then(({ data }) => {
        if(data.errno){
          this.$snotify.success("Commit ipv6 settings failed:\nerrno: " + result.errno +
						"\nerrstr: " + result.errstr + "\nreason: " + result.reason,{position:'centerTop'});
        }else {
          this.$snotify.success(data.status + ": " + data.statusText,{position:'centerTop'});
        }
      }).catch(result=>{
        this.$snotify.error(result.status + ": " + result.statusText,{position:'centerTop'});
      })
		}
  },
};
</script>