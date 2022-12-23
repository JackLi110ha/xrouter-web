<template>
  <div>
    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label="当前版本"
      label-for="input-default"
    >
      
      <b-alert show variant="light">{{curver}}</b-alert>
    </b-form-group>
    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label="编译时间"
      label-for="input-default"
    >
      <b-alert show variant="light">{{buildtime}}</b-alert>
    </b-form-group>
    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label="新版本"
      label-for="input-default"
    >
      <b-alert show variant="light">{{newver}}</b-alert>
    </b-form-group>
    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label="新版本编译时间"
      label-for="input-default"
    >
      <b-alert show variant="light">{{newbuildtime}}</b-alert>
    </b-form-group>
    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label="本地升级"
      label-for="input-default"
    >
      <b-form-file
        v-model="file"
        :state="Boolean(file)"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
      ></b-form-file>
    </b-form-group>
    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label="恢复出厂"
      label-for="input-default"
    >
      <b-form-checkbox
        id="checkbox-4"
        v-model="chb_reset_factory"
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
      label=""
      label-for="input-default"
    >
      <b-button variant="success" @click="btn_upgrade">开始升级</b-button>
    </b-form-group>
    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label=""
      label-for="input-default"
    >
      <b-form-textarea
        id="upinfo"
        v-model="upinfo"
        placeholder="Enter something..."
        rows="12"
        max-rows="6"
      ></b-form-textarea>
    </b-form-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      curver:"",
      buildtime:"",
      upinfo:"",
      chb_reset_factory:false,
      file: null,
    }
  },
  created() {
    this.get_fw_version();
  },
  methods: {
    get_fw_version(){
      this.$http["get"]("upgrade/get_fw_version.cgi")
        .then(({ data }) => {
          this.curver=data.version;
				  this.buildtime=data.buildtime;
        })
    },
    appendlog(log) {
			prev_log = this.upinfo + log;
			this.upinfo=prev_log;
			// var textarea = document.getElementById('upinfo');
			// textarea.scrollTop = textarea.scrollHeight;
		},
    upload_fw() {
			var fp = this.file;
			if (fp[0].files.length != 1)
				return;
			if (fp[0].files[0].size > 32 * 1024 * 1024) {
				this.appendlog("file too large, max 32 MB");
				return;
			}
			function progcb(prog) {
        this.upinfo=prev_log + log
			}
			function errcb() {
				appendlog("上传发生错误\n");
			}
			function okcb(result) {
				if (result.ret != 0) {
					appendlog("失败：" + result.desc + ", 系统错误：" + result.errstr);
				}
				else {
					$("#newver").text(result.swver);
					$("#newbuildtime").text(result.buildtime);
					appendlog("上传完毕，服务器固件校验ok\n");
				}
			}
			appendlog("发起上传 ...\n");
			upload_cgi("/cgi-bin/upgrade/upload_fw.cgi", "uploadform", progcb, errcb, okcb);
		},
    start_upload() {
			setlog("start ...\n");
			this.appendlog("清除旧固件...\n");
      this.$http["get"]("upgrade/clear_old_fw.cgi")
      .then(({ data }) => {
        this.appendlog("清除旧固件成功\n");
				this.upload_fw();
      }).catch(err=>{
        this.appendlog("清除旧的固件失败\n");
      })

		},
    start_upgrade() {
			var reset = this.chb_reset_factory ? "1" : "0";
      this.upinfo="start ...\n";
			ws_upload = new WebSocket("ws://" + window.location.host + "/cgi-bin/upgrade/upgrade.ws");
			ws_upload.onopen = function (evt) {
				appendlog("connection opened\n");
				ws_upload.send("cmd=upgrade&restore_default=" + reset);
			};
			ws_upload.onmessage = function (evt) {
				appendlog(evt.data);
			};
			ws_upload.onclose = function (evt) {
				appendlog("connection closed\n");

			};
			ws_upload.onerror = function (evt) {
				appendlog("connection error\n");
			}
		}
  },
};
</script>