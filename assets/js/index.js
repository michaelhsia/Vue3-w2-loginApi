import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

// axios 套件 -> 預設匯入
import axios from "axios";

// sweetalert2 套件 -> 預設匯入
import Swal from "sweetalert2";

// API baseUrl
const url = "https://ec-course-api.hexschool.io/v2";

// API path
const path = "michaelhsia";

// 從cookie取得token資料
const token = document.cookie.replace(
  /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
  "$1"
);

// 在發送請求時夾帶 headers 資料，放在全域的話，每次發請求都會自動夾帶
axios.defaults.headers.common["Authorization"] = token;

// 流程：
// 1. 抓到 input 帳密
// 2. 點擊按鈕後，發請求 post 到資料庫
// 3. 把token根expired存到cookie
// 4. 確認已有 token 進入到產品列表
// 5. index.html 要在created 驗證是否有token存在cookie中，若沒有則location.href導入login.html

const app = createApp({
  data() {
    return {
      products: [],
    };
  },
  methods: {
    // 未登入，所以跳回登入頁面
    backToLogin() {
      setTimeout(() => (location.href = "login.html"), 1500);
    },

    getProductData() {
      axios
        .get(`${url}/api/${path}/admin/products`)
        .then((res) => (this.products = res.data.products));
    },
  },
  created() {
    // 在created 時，驗證是否登入，如果沒通過驗證就跑 catch
    axios
      .post(`${url}/api/user/check`)
      .then((res) => this.getProductData())
      .catch((err) => {
        // 未登入的提醒
        Swal.fire({
          title: "你好像還沒登入~",
          icon: "warning",
          showConfirmButton: false,
          timer: 1000,
        });

        // 觸發 backToLogin
        this.backToLogin();
      });
  },
});

app.mount("#app");
