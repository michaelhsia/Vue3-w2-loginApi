import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import axios from "axios";

// API baseUrl
const url = "https://ec-course-api.hexschool.io/v2";

// 流程：
// 1. 抓到input帳密
// 2. 點擊按鈕後，發請求post到資料庫
// 3. 把token根expired存到cookie
// 4. 確認已有token進入到產品列表

const app = createApp({
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    getApi() {
      axios
        .post(`${url}/admin/signin`, this.user)
        .then((res) => console.log(res.data));
    },
  },
});

app.mount("#app");
