 <template>
  <div>
    <el-form ref="form" :model="form" label-width="60px" :rules="rulers">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="内容" class="editor" prop="content">
        <quillEditor v-model="form.content" :options="editorOption" class="my-editor"></quillEditor>
      </el-form-item>
      <el-form-item label="封面"></el-form-item>
      <el-form-item label="频道">
        <ttchannels></ttchannels>
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
export default {
  name: "pulishName",
  components: {
    quillEditor,
    ttchannels
  },
  data() {
    return {
      input: "",
      form: {
        title: "",
        content: ""
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
          this.$axios
            .post("/mp/v1_0/articles", {
              title: this.form.title,
              content: this.form.content,
              cover: {
                type: 1,
                images: [
                  "http://toutiao.meiduo.site/Fjl26KTE9-NFfkRzIZOner4yeqGl"
                ]
              },
              channel_id: 2
            })
            .then(res => {
              if (res.data.message.toLowerCase() == "ok") {
                this.$message.success("发布成功！");
                this.$router.push("/article");
              }
              console.log(res);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // }
  }
};
</script>

<style>
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


