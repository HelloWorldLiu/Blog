# 前端規範

- 縮排 2 格（tab／空白）
- 雙引號
- 大括號、分號都要寫
- 能換行就換行，一行不要拖太長
- 路徑用 **@** 開頭（從 /src 下開始算）不要寫相對路徑 **../../**

PS. 之後補上 eslint，commit 之前都跑一下 format

## 命名

- 駝峰（API 來的欄位可保留底線）
- 盡量不簡寫（每個人習慣不同，可能會看不懂）
- views/、components/ 檔名大寫開頭：FileName.vue
- （css）自訂的 class 可以命名為 **ivy-xxx** 跟套件的 class 做區別
- 變數盡量寫清楚、標明意義，避免出現 data、payload、result... 這種大眾化可能重複的單字
- bool 用 isXxx、hasXxx、canXxx、shouldXxx
- function 用動詞＋名詞（若用名詞＋過去式動詞，比較像在監聽某件事已完成的狀態）

以下僅供參考

- fetch：從遠端（API）獲取資料  
  Ex：fetchCourses()
- load：從本地端加載資料  
  Ex：loadLanguage()
- get：（從 store）取資料
- calculate：計算後的結果  
  Ex：calculateScore()
- show：顯示物件  
  Ex：showModal()、showDialog()
- set：寫資料（進 store）
- create：
- update：
- edit：
- remove：將資料之間的關係移除，資料本身還是存在
- delete／destroy：將資料刪除
- on：監聽子層事件
- handle：

## 範例檔案

> views/_ViewExample.vue  
> components/_componentsExample.vue

- 新增檔案時可複製貼上這兩支  
  保持 components、mixins、props、data… 這些屬性順序一致，維護時比較好找

- style 一律加 scoped，樣式只套用於同一支 .vue 檔  
  若要下全域 class，請放在 App.vue（這支不加 scoped）或 @import scss／css

## 其它

- 判斷式盡量用肯定句

- 重要的屬性、判斷式、顯示與否、邏輯相關、事件寫前面，樣式＆其他往後丟，修改時比較好找

```html
<el-menu :default-active="menuIndex" mode="horizontal" router>
  <el-menu-item
    v-for="(menu, index) in menuList"
    :key="index"
    :route="menu.route"
    :index="String(index + 1)"
    class="hidden-sm-and-down"
  >
    某某功能
  </el-menu-item>
  <el-menu-item v-if="isLogin" @click="logout" index="6">
    <el-button type="success" class="ivy-xxx xxx">
      登出
    </el-button>
  </el-menu-item>
</el-menu>
```

- 切換路徑給 name，不要寫字串 "/xxx"  
  （路徑規則可能會改、但 name 通常不太會變）

```js
this.$router.push({
  name: "Home",
});
```

- 資料 init 時，數字可以給 0、字串給 ""、陣列給 []...（型別對應一下）

- 表單資料可建一個 form 把資料裝好，以區隔畫面上其他資料

```js
export default {
  data: {
    // 表單資料另外裝好
    form: {
      name: "",
      account: "",
      password: "",
    },

    // 課程列表
    courseList: [],
    // 新聞列表
    newsList: [],
  },
};
```

- 表單範例如下  
  submit 可觸發原生 HTML 的檢查機制、多一層保障，當然我們還是要再詳細 validate  
  這樣做就不用再特地綁 enter 事件（會走原生的機制但被攔截）

```html
<el-form @submit.prevent.native="submit">
  <el-input v-model="form.name" required></el-input>
  <el-button native-type="submit">
    submit
  </el-button>
</el-form>
```

```js
export default {
  data() {
    return {
      form: {
        name: "",
      },
    };
  },

  methods: {
    submit() {
      // validate
      // call API
    },
  },
};
```

- if else 太多時改用 switch case

- 非同步可使用 async／await 把程式碼攤平

## Git

commit 時可加個類別，讓夥伴有心理準備、知道要用什麼觀點來查看這個改動

以下僅供參考

- feature: 新增／修改功能

```git
feature: 登入頁面＆功能串接
```

- document: 文件、註解

```git
document: 補充 README.md
```

- fix: 修改小 bug

```git
fix: 變數 typo
```

- adjust: 小調整（內部調整，不改可能也沒差的那種）
- refactor: 大調整（可能改動到接口）、重構、改善

## Vuex

- 盡量都加上 namespaced 拆乾淨
- 按照 state、getters、mutations、actions 的順序放，維護時比較好找
- 只能透過 mutations 改變 state
- 在 views 和 components 只能 dispatch actions、不要直接 commit mutations
- 以 **mapState**／**mapGetters**／**mapActions**  
  取代  
  return this.$store.state／return this.$store.getters／this.$store.dispatch
- ...mapState／...mapGetters／...mapActions 寫在 computed／methods 最前面，才不會沒注意到

## API 統一管理

放在 /apis 下，可依據後端 controller 拆檔

```js
// 舉例 user.js
import ApiService from "@/common/api.service";

export default {
  login(email, password) {
    return ApiService.post("login", {
      email,
      password,
    });
  },

  logout() {
    return ApiService.post("logout");
  },
};
```

- 若使用在 vuex 的 actions 中  
  （資料有共用的話）

```js
// 舉例 user.modules.js
import userApi from "@/apis/user";

const actions = {
  async logout({ commit }) {
    await userApi.logout();

    JwtService.destroyToken();

    commit("setToken", null);
  },
};
```

- 若使用在一般 views 或 components 中  
  （獨立資料可以放在 data 就好）

```js
// 舉例某個列表頁
import xxxApi from "@/apis/xxx";

async mounted() {
  const res = await xxxApi.getList();

  this.list = res.data;
}
```
