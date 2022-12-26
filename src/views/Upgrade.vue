<template>
  <div>
    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label="当前版本"
      label-for="input-default"
    >
      <b-alert show variant="light">{{ curver }}</b-alert>
    </b-form-group>
    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label="编译时间"
      label-for="input-default"
    >
      <b-alert show variant="light">{{ buildtime }}</b-alert>
    </b-form-group>
    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label="新版本"
      label-for="input-default"
    >
      <b-alert show variant="light">{{ newver }}</b-alert>
    </b-form-group>
    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label="新版本编译时间"
      label-for="input-default"
    >
      <b-alert show variant="light">{{ newbuildtime }}</b-alert>
    </b-form-group>
    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label="本地升级"
      label-for="input-default"
    >
      <!-- <b-form-file
        v-model="file"
        :state="Boolean(file)"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
      ></b-form-file> -->
      <form enctype="multipart/form-data" id="uploadform">
        <input id="upfw" name="firmware" type="file" @change="start_upload" />
      </form>
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
      <b-button variant="success" @click="start_upgrade">开始升级</b-button>
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
import $ from "jquery";
export default {
  data() {
    return {
      curver: "",
      buildtime: "",
      upinfo: "",
      chb_reset_factory: false,
      file: null,
      newver: null,
      newbuildtime: null,
      ws_upload: "",
      prev_log: "",
    };
  },
  created() {
    this.get_fw_version();
  },
  methods: {
    get_fw_version() {
      this.$http["get"]("upgrade/get_fw_version.cgi").then(({ data }) => {
        this.curver = data.version;
        this.buildtime = data.buildtime;
      });
    },
    appendlog(log) {
      this.prev_log = this.upinfo + log;
      this.upinfo = this.prev_log;
      // var textarea = document.getElementById('upinfo');
      // textarea.scrollTop = textarea.scrollHeight;
    },
    errcb() {
      this.appendlog("上传发生错误\n");
    },
    okcb(result) {
      if (result.ret != 0) {
        this.appendlog("失败：" + result.desc + ", 系统错误：" + result.errstr);
      } else {
        this.newver = result.swver;
        this.newbuildtime = result.buildtime;
        this.appendlog("上传完毕，服务器固件校验ok\n");
      }
    },
    proglog(l) {
      this.upinfo = this.prev_log + l;
    },
    progcb(prog) {
      this.proglog(prog + "\n");
    },
    upload_fw() {
      var fp = $("#upfw");
      if (fp[0].files.length != 1) return;
      if (fp[0].files[0].size > 32 * 1024 * 1024) {
        this.appendlog("file too large, max 32 MB");
        return;
      }
      this.appendlog("发起上传 ...\n");
      this.upload_cgi(
        "/cgi-bin/upgrade/upload_fw.cgi",
        "uploadform",
        this.progcb,
        this.errcb,
        this.okcb
      );
    },
    upload_cgi(url, formid, progcb, errcb, okcb) {
      var ajaxObj = {
        url: url,
        type: "POST",
        data: new FormData($("#" + formid)[0]),
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        xhr: function () {
          var myXhr = $.ajaxSettings.xhr();
          if (myXhr.upload) {
            myXhr.upload.addEventListener(
              "progress",
              function (e) {
                if (e.lengthComputable)
                  progcb((100 * ((e.loaded * 1.0) / e.total)).toFixed(2) + "%");
              },
              false
            );
          }
          return myXhr;
        },
        error: errcb,
        success: okcb,
      };

      $.ajax(ajaxObj);
    },
    start_upload() {
      this.upinfo = "start ...\n";
      this.appendlog("清除旧固件...\n");
      this.$http["get"]("upgrade/clear_old_fw.cgi")
        .then(({ data }) => {
          this.appendlog("清除旧固件成功\n");
          this.upload_fw();
        })
        .catch((err) => {
          this.appendlog("清除旧的固件失败\n");
          this.upload_fw();
        });
    },
    start_upgrade() {
      var reset = this.chb_reset_factory ? "1" : "0";
      this.upinfo = "start ...\n";
      this.ws_upload = new WebSocket(
        "ws://" + window.location.host + "/cgi-bin/upgrade/upgrade.ws"
        // "ws://" + "47.91.141.191:8000" + "/cgi-bin/upgrade/upgrade.ws"
      );
      this.ws_upload.onopen =  (evt)=> {
        this.appendlog("connection opened\n");
        this.ws_upload.send("cmd=upgrade&restore_default=" + reset);
      };
      this.ws_upload.onmessage =  (evt)=> {
        this.appendlog(evt.data);
      };
      this.ws_upload.onclose =  (evt)=> {
        this.appendlog("connection closed\n");
      };
      this.ws_upload.onerror =  (evt)=> {
        this.appendlog("connection error\n");
      };
    },
  },
};
</script>