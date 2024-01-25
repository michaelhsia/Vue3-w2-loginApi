import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

// axios 套件 -> 預設匯入
import axios from "axios";

// sweetalert2 套件 -> 預設匯入
import Swal from "sweetalert2";

// API baseUrl
const url = "https://ec-course-api.hexschool.io/v2";

// 流程：
// 1. 抓到 input 帳密
// 2. 點擊按鈕後，發請求 post 到資料庫
// 3. 把token根expired存到cookie
// 4. 確認已有 token 進入到產品列表
// 5. index.html 要在created 驗證是否有token存在cookie中，若沒有則location.href導入login.html

const app = createApp({
  data() {
    return {
      // 登入會用到的資料
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    loginPost() {
      axios
        .post(`${url}/admin/signin`, this.user)
        .then((res) => {
          // console.log(res.data);
          // 把回傳的 token 及 expired timestamp 用解構賦值方式存成同名變數
          const { token, expired } = res.data;

          // 把token 及 expired 存到 cookie
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;

          // 登入成功通知
          Swal.fire({
            title: "登入成功",
            icon: "success",
            showConfirmButton: false,
            timer: 1000,
          });

          // 把資料存到 cookie 後，頁面導到商品頁
          // 用 setTimeout 等通知跑完再跳商品頁
          setTimeout(() => (location.href = "index.html"), 1500);
        })
        .catch((err) => {
          // 加入 sweetalert2 登入錯誤通知
          Swal.fire({
            title: `${err.response.data.message}`,
            icon: "warning",
            showConfirmButton: false,
            timer: 1000,
          });
        });
    },
  },
});

app.mount("#app");
