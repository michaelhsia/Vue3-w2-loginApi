import{a as o,S as a}from"./sweetalert2.all-cf49095e.js";import{createApp as s}from"https://unpkg.com/vue@3/dist/vue.esm-browser.js";const e="https://ec-course-api.hexschool.io/v2",c="michaelhsia",r=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,"$1");o.defaults.headers.common.Authorization=r;const i=s({data(){return{products:[],temp:{}}},methods:{backToLogin(){setTimeout(()=>location.href="login.html",1500)},getProductData(){o.get(`${e}/api/${c}/admin/products`).then(t=>this.products=t.data.products).catch(t=>alert(`發生錯誤： ${t.response} 請檢查錯誤`))}},created(){o.post(`${e}/api/user/check`).then(t=>this.getProductData()).catch(t=>{a.fire({title:"你好像還沒登入~",icon:"warning",showConfirmButton:!1,timer:1e3}),this.backToLogin()})}});i.mount("#app");
