 <template>
  <div>
    <el-form ref="form" :model="form" label-width="60px" :rules="rulers" v-loading="isLoading">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="内容" class="editor" prop="content">
        <quillEditor v-model="form.content" :options="editorOption" class="my-editor"></quillEditor>
      </el-form-item>
      <el-form-item label="封面">
        <el-radio-group v-model="form.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
        <!-- <el-row > -->
        <el-row v-if="form.cover.type>0">
          <el-col :span="8" v-for="(item,index) in form.cover.type" :key="index">
            <imgs @changePic="form.cover.images[item-1] = $event" ></imgs>
          </el-col>
        </el-row>
        <!-- </el-row> -->
      </el-form-item>
     


      <el-form-item label="频道">
        <ttchannels v-model="form.chanel_id"></ttchannels>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="danger">取消</el-button>
        <el-button type="primary" size="small" @click="uploading('form')">发表</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// require styles
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";

import ttchannels from "../../../components/ttchannels";

import imgs from "./component/imgs.vue";
export default {
  name: "pulishName",
  components: {
    quillEditor,
    ttchannels,
    imgs,
  },
  data() {
    return {
      activeName:'first',
      dialogVisible:false,
      isLeaving: false,
      isLoading: true,
      input: "",
      oldForm: "",
      form: {
        title: "",
        content: "",
        chanel_id: "",
        cover: {
          type: 1,
          images: []
        }
      },
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block"],

            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }], // superscript/subscript
            [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            [{ direction: "rtl" }], // text direction

            [{ size: ["small", false, "large", "huge"] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6, false] }],

            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ font: [] }],
            [{ align: [] }],

            ["clean"] // remove formatting button
          ]
        }
      },
      rulers: {
        title: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          { min: 5, max: 30, message: "长度在 5 到 30 个字符", trigger: "blur" }
        ],
        content: [
          { required: true, message: "请输入文章内容", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
   
    // 点击发表，发送请求，渲染页面
    uploading(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.$route.name == "publish-edit") {
            // 判断是否为编辑
            //发送请求，修改数据
            this.$axios
              .put(`/mp/v1_0/articles/${this.$route.params.id}`,
                this.form
                // title: this.form.title,
                // content: this.form.content,
                // cover: this.form.cover,
                // channel_id: this.form.chanel_id
              )
              .then(res => {
                // console.log(res);
                if (res.data.message.toLowerCase() == "ok") {
                  this.$message.success("编辑成功！");
                  this.isLeaving = true;
                  this.$router.push("/article");
                }
              });
          } else {
            this.$axios
              .post("/mp/v1_0/articles", this.form
                // title: this.form.title,
                // content: this.form.content,
                // cover: {
                //   type: 1,
                //   images: [
                //     "http://toutiao.meiduo.site/Fjl26KTE9-NFfkRzIZOner4yeqGl"
                //   ]
                // },
                // channel_id: this.form.chanel_id
              )
              .then(res => {
                if (res.data.message.toLowerCase() == "ok") {
                  this.$message.success("发布成功！");
                  this.isLeaving = true;
                  this.$router.push("/article");
                }
                // console.log(res);
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // }

    loadData() {
      // 获取传递过来的参数id
      // this.$route.params.id
      this.$axios
        .get(`/mp/v1_0/articles/${this.$route.params.id}`)
        .then(res => {
          this.form = res.data.data;
          this.form.cover = res.data.data.cover;

          this.oldForm = { ...this.form };
          // 数据加载完则转圈圈结束
          this.isLoading = false;
        });
    }
  },
  created() {
    // 如果是编辑页面，就需要将数据显示出来，
    if (this.$route.name == "publish-edit") {
      this.loadData();
    } else {
      // 是上传文章页面，则不需要转圈圈
      this.isLoading = false;
    }
  },
  watch: {
    "$route.params.id"(value) {
      if (value) {
        this.loadData();
      } else {
        this.form.title = "";
        this.form.content = "";
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    // 判断是否为编辑页面或者是发布页面
    // 判断是否有内容进行修改
    if (this.isLeaving) return next();
    if (this.$route.name == "publish-edit") {
      this.isLeaving = true;
      // 是否原值一样，如果没有编辑，则下一步
      if (
        this.form.title == this.oldForm.title &&
        this.form.content == this.oldForm.content
      ) {
        next();
      }
    } else {
      if (this.form.title == "" && this.form.content == "") {
        return next();
      }
    }
    // 确认是否跳转
    this.$confirm("该页面还有未保存的内容, 是否继续离开该页面?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        next();
      })
      .catch(() => {});
  }
};
</script>

<style lang='less' scoped>
/* 
.editor {
  height: 360px;
}
.my-editor {
  height: 300px;
} */
.ql-editor {
  height: 400px;
}

/* 好雨知时节,当春乃发生，随风潜入夜，润物细无声,野径云俱黑，江船火独明，晓看红湿处，花看锦官城 */
</style>


