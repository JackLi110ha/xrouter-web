<template>
  <div>
    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label=""
      label-for="input-default"
    >
      2.4G
    </b-form-group>
    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label="Access Point"
      label-for="input-default"
    >
      <b-form-checkbox
        id="checkbox-4"
        v-model="ap2g_enable"
        name="checkbox-4"
        value="true"
        unchecked-value="false"
      >
      </b-form-checkbox
      >Enable
    </b-form-group>
    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label="SSID"
      label-for="input-default"
    >
      <b-form-input v-model="ap2g_ssid"></b-form-input>
    </b-form-group>
    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label="Encryption"
      label-for="input-default"
    >
      <b-form-select
        v-model="ap2g_enc"
        :options="ap2g_encOptions"
      ></b-form-select>
    </b-form-group>
    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label="Password"
      label-for="input-default"
    >
      <b-form-input v-model="ap2g_psk"></b-form-input>
    </b-form-group>
    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label="Bandwidth"
      label-for="input-default"
    >
      <b-form-select
        v-model="phy2g_bw"
        :options="phy2g_bwOptions"
      ></b-form-select>
    </b-form-group>
    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label="Channel"
      label-for="input-default"
    >
      <b-form-select
        v-model="phy2g_channel"
        :options="phy2g_channelOptions"
      ></b-form-select>
    </b-form-group>
    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label="Tx Power"
      label-for="input-default"
    >
      <b-form-input v-model="phy2g_txpower"></b-form-input>(1-100)
    </b-form-group>

    <!-- 5G -->
    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label=""
      label-for="input-default"
    >
      5G
    </b-form-group>
    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label="Access Point"
      label-for="input-default"
    >
      <b-form-checkbox
        id="checkbox-4"
        v-model="ap5g_enable"
        name="checkbox-4"
        value="true"
        unchecked-value="false"
      >
      </b-form-checkbox
      >Enable
    </b-form-group>
    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label="SSID"
      label-for="input-default"
    >
      <b-form-input v-model="ap5g_ssid"></b-form-input>
    </b-form-group>
    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label="Encryption"
      label-for="input-default"
    >
      <b-form-select
        v-model="ap5g_enc"
        :options="ap5g_encOptions"
      ></b-form-select>
    </b-form-group>
    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label="Password"
      label-for="input-default"
    >
      <b-form-input v-model="ap5g_psk"></b-form-input>
    </b-form-group>
    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label="Bandwidth"
      label-for="input-default"
    >
      <b-form-select
        v-model="phy5g_bw"
        :options="phy5g_bwOptions"
      ></b-form-select>
    </b-form-group>
    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label="Channel"
      label-for="input-default"
    >
      <b-form-select
        v-model="phy5g_channel"
        :options="phy5g_channelOptions"
      ></b-form-select>
    </b-form-group>
    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label="Tx Power"
      label-for="input-default"
    >
      <b-form-input v-model="phy5g_txpower"></b-form-input> (1-100)
    </b-form-group>

    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label=""
      label-for="input-default"
    >
      <b-button variant="success" @click="set_wifi_config">commit</b-button>
    </b-form-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ap2g_enable: "",
      ap2g_ssid: "",
      ap2g_enc: "",
      ap2g_psk: "",
      phy2g_bw: "",
      phy2g_channel: "",
      phy2g_txpower: "",

      ap5g_enable: false,
      ap5g_ssid: "",
      ap5g_enc: "",
      ap5g_psk: "",
      phy5g_bw: "",
      phy5g_channel: "",
      phy5g_txpower: "",
      ap2g_encOptions: [
        { value: "none", text: "None" },
        { value: "WPA-PSK-CCMP", text: "WPA2PSK CCMP" },
        { value: "WPA-WPA2-PSK-CCMP", text: "WPAWPA2PSK CCMP" },
      ],
      ap5g_encOptions: [
        { value: "none", text: "None" },
        { value: "WPA-PSK-CCMP", text: "WPA2PSK CCMP" },
        { value: "WPA-WPA2-PSK-CCMP", text: "WPAWPA2PSK CCMP" },
      ],
      phy2g_bwOptions: [
        { value: "auto", text: "Auto" },
        { value: "20M", text: "20M" },
        { value: "40M", text: "40M" },
      ],
      phy5g_bwOptions: [
        { value: "auto", text: "Auto" },
        { value: "20M", text: "20M" },
        { value: "40M", text: "40M" },
        { value: "80M", text: "80M" },
      ],
      phy5g_channelOptions: [
        { value: "0", text: "Auto" },
        { value: "36", text: "36" },
        { value: "40", text: "40" },
        { value: "44", text: "44" },
        { value: "48", text: "48" },
        { value: "149", text: "149" },
        { value: "153", text: "153" },
        { value: "157", text: "157" },
        { value: "161", text: "161" },
        { value: "165", text: "165" },
      ],
      phy2g_channelOptions: [
        { value: "0", text: "Auto" },
        { value: "1", text: "1" },
        { value: "2", text: "2" },
        { value: "3", text: "3" },
        { value: "4", text: "4" },
        { value: "5", text: "5" },
        { value: "6", text: "6" },
        { value: "7", text: "7" },
        { value: "8", text: "8" },
        { value: "9", text: "9" },
        { value: "10", text: "10" },
        { value: "11", text: "11" },
        { value: "12", text: "12" },
        { value: "13", text: "13" },
      ],
    };
  },
  created() {
    this.get_wifi_config();
  },
  methods: {
    get_wifi_config() {
      this.$http["get"]("network/get_wifi.cgi")
        .then(({ data }) => {
          if (data.errno) {
            this.$snotify.error(
              "Fetch wifi config failed:\nerrno: " +
                data.errno +
                "\nerrstr: " +
                data.errstr +
                "\nreason: " +
                data.reason,
              { position: "centerTop" }
            );
            return;
          }

          this.ap2g_enable = data.ap2g.enable ? true : false;
          this.ap2g_ssid = data.ap2g.ssid;
          this.ap2g_enc = data.ap2g.encrypt;
          this.ap2g_psk = data.ap2g.psk;
          this.phy2g_bw = data.phy2g.bw;
          this.phy2g_channel = data.phy2g.channel;
          this.phy2g_txpower = data.phy2g.txpower;

          this.ap5g_enable = data.ap5g.enable ? true : false;
          this.ap5g_ssid = data.ap5g.ssid;
          this.ap5g_enc = data.ap5g.encrypt;
          this.ap5g_psk = data.ap5g.psk;
          this.phy5g_bw = data.phy5g.bw;
          this.phy5g_channel = data.phy5g.channel;
          this.phy5g_txpower = data.phy5g.txpower;
        })
        .catch((data) => {
          this.$snotify.error(
            "Fetch wifi config failed:\n" +
              data.status +
              ": " +
              data.statusText,
            { position: "centerTop" }
          );
          return;
        });
    },
    set_wifi_config(){
      var data = {};

			data.ap2g_enable = this.ap2g_enable ? 1 : 0;
			data.ap2g_ssid = this.ap2g_ssid;
			data.ap2g_encrypt = this.ap2g_enc;
			data.ap2g_psk = this.ap2g_psk;
			data.phy2g_bw = this.phy2g_bw;
			data.phy2g_channel = this.phy2g_channel;
			data.phy2g_txpower = this.phy2g_txpower;

			data.ap5g_enable = this.ap5g_enable ? 1 : 0;
			data.ap5g_ssid = this.ap5g_ssid;
			data.ap5g_encrypt = this.ap5g_enc;
			data.ap5g_psk = this.ap5g_psk;
			data.phy5g_bw = this.phy5g_bw;
			data.phy5g_channel = this.phy5g_channel;
			data.phy5g_txpower = this.phy5g_txpower;

      this.$http["post"]("network/set_wifi.cgi",data).then(({ data }) => {
        if(data.errno){
          this.$snotify.error("Commit wifi settings failed:\nerrno: " + data.errno + "\nerrstr: " + data.errstr + "\nreason: " + data.reason,{position:'centerTop'});
        }else {
          this.$snotify.success(data.status + ": " + data.statusText,{position:'centerTop'});
        }
      }).catch(data=>{
        this.$snotify.error(data.status + ": " + data.statusText,{position:'centerTop'});
      })
    }
  },
};
</script>