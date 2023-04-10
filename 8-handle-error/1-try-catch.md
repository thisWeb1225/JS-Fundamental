# try-catch 錯誤處理

此篇筆記參考 <a href="https://www.books.com.tw/products/F014077744" target="_blank">JS 高等程序設計</a>所寫。

在 ES3 新增 `try/catch` 語句作為在 JS 處理錯誤的一種方式，基本語法如下:

```js
try {
  // 可能出現錯誤的程式碼
} catch (error) {
  // 出錯時要做什麼
}
```
如果 `try` 當中有發生錯誤，程式碼會立即退出執行，並跳到 `catch` 當中，任何有可能出錯的程式碼都應該放到 `try` 中。

`catch` 會接收一個錯誤參數，這個錯誤參數會有 `name` 和 `message` 屬性，`name` 是錯誤的類型，`message` 是錯誤的訊息，例如:

```js
try {
  fn();
} catch (error) {
  console.log(error);
  console.log(error.name);
  console.log(error.message);
}
// ReferenceError: fn is not defined
// ReferenceError
// fn is not defined
```
## finally 
`try/catch` 語句中有一個可選的 `finally` 子句，如果 `try` 程式碼運行完，會接著執行 `finally` 中的程式碼；如果有錯誤，則會在執行完 `catch` 中的程式碼後執行 `finally` 程式碼。

簡單說，無論如何都會在最後執行 `finally` 中的程式碼。

```js
try {
  console.log('try');
} catch (error) {
  console.log('error');
} finally {
  console.log('finally');
}
// try
// finally
```
要注意的是，`finally` 中的若有 `return` 語句，則 `try` 和 `catch` 中的 `return` 就會被忽略:

```js
try {
  return 'try';
} catch (error) {
  return 'error';
} finally {
  return 'finally';
}

// 永遠返回 finally
```

## 錯誤的類型
在出現錯誤時拋出的錯誤類型總共有 8 種
1. Error: 基礎類型，其他類型都會繼承此類型，瀏覽器很少會拋出這種錯誤類型，該類型主要是給開發者拋出自定義錯誤
2. InternalError: 在底層 JS 引擎出現異常時，瀏覽器會拋出此錯誤，如果真的發生這種錯誤，很可能程式碼哪裡錯誤或危險了。
3. EvalError: 在 eval() 函數發生異常時拋出此錯誤，基本上不把 `eval()` 當成函數調用就會拋出此錯誤。
4. RangeError: 在數字越界時拋出，例如定義陣列時設置不支持的長度，`let arr = new Array(-20)`
5. ReferenceError: 在 JS 找不到物件時會拋出此錯誤，通常是訪問不存在的變數而導致。
6. SyntaxError: JS 語法錯誤時拋出，例如 `a ++ b`
7. TypeError: 在變數不是預期類型，或訪問不存在的方法時拋出，例如 `'123'.reverse()`
8. URIError: 在使用 `encodeURI()` 或 `decodeURI()` 但傳入的 uri 格式錯誤時發生

在 `try/catch` 可以使用 `instanceof` 操作符來根據不同的錯誤類型做不同的處理:

```js
try {
  someFunction()
} catch (error) {
  if (error instanceof TypeError) {
    // 處理類型錯誤
  } else if (error instanceof ReferenceError) {
    // 處理引用錯誤
  } else {
    // 其他
  }
}
```

## try-catch 注意事項
當使用 `try-catch` 時，瀏覽器會認為錯誤被處理掉了，因此不會自動報錯。

此外，`try-catch` 最好用在**自己無法控制的錯誤**上，例如使用一個 JS 函式庫，而函式庫本身有會拋出錯誤，因為不能修改這個函式庫的程式碼，所就有必要通過 `try-catch` 把該函數調用包裝起來，對可能的錯誤進行處理。

如果你明確知道自己的程式碼可能會發生某種錯誤，那麼就不適合用 `try-catch` 包裝起來，**應該在函數內採取判斷以及相應措施**，例如一個函數需要傳入字符串，那就應該在函數內檢查參數型別。

## 自訂錯誤拋出
與 `try-catch` 對應的一個機制是 `throw` 操作符，用在任何時候拋出自定義的錯誤。

使用 `throw` 操作符時，程式碼會立即停止，除非 `try/catch` 捕獲拋出的值。

另外，可以通過內置的錯誤類型來模擬瀏覽器錯誤，每種錯誤類型的構造函數只能接收一個參數，就是錯誤消息，例如。
```js
throw new Error("Something bad happened."); 
throw new SyntaxError("I don't like your syntax."); 
throw new InternalError("I can't do that, Dave."); 
throw new TypeError("What type of variable do you take me for?"); 
throw new RangeError("Sorry, you just don't have the range."); 
throw new EvalError("That doesn't evaluate."); 
throw new URIError("Uri, is that you?"); 
throw new ReferenceError("You didn't cite your references properly."); 
```

也可以通過繼承 `Error`，創建自訂的錯誤類型，但必須提供 `name`、`message` 屬性:

```js
class CustomError extends Error { 
  constructor(message) { 
    super(message); 
    this.name = "CustomError"; 
    this.message = message; 
  } 
} 
```

## 何時拋出錯誤以及何時捕獲錯誤
在解釋函數為什麼失敗時，拋出自定義錯誤解釋是一個很有效的方式，例如有一個函數是取陣列的中位數，就可以在函數開頭判斷型別:

```js
function median(values) {
  if(!(values instanceof Array)) {
    throw new Error("median(): Arguments must be an array")
  }

  return return values.sort()[Math.floor(nums.length / 2)]; 
}
```

所以當你的某個函數會大量使用時，那麼就應該認真考慮拋出帶有詳細訊息的錯誤。並將捕獲和處理錯誤教給使用函數時的程式碼就好。

至於拋出錯誤與捕獲錯誤的區別，可以這樣想：應該只在確切知道接下來該做什麼的時候捕獲錯誤。**捕獲錯誤的目的是阻止瀏覽器以其默認方式響應**；**拋出錯誤的目的是為錯誤提供有關其發生原因的說明**

## 區分重大錯誤和非重大錯誤
在錯誤處理的策略中，最重要的一部份就是確認錯誤是否致命，非重大錯誤例如:
1. 不影響使用者操作
2. 只影響頁面的一小部分
3. 可以恢復
4. 重複相同操作的可以消除錯誤

基本上不太需要擔心非重大錯誤，盡量不要中斷使用者的體驗，除非是嚴重的錯誤，例如
1. 應用程序停止
2. 嚴重影響使用者的主要目標
3. 會導致其他錯誤發生

重大和非重大錯誤主要是依據使用者的體驗來決定，例如初始化
```js
for (let mod of mods) {
  mod.init()
}
```
乍看之下沒有問題，不過若是在初始化時期就發生錯誤並且沒有做處理，就會導致之後使用上的問題:
```js
for (let mod of mods) {
  try { 
    mod.init(); 
  } catch (error){ 
    // 處理錯誤
 } 
}
```

## 小結
前陣子在寫專案時發現自己對於錯誤處理這一塊不太清楚，所以就做了一篇筆記，錯誤處理是非常重要卻容易被忽視的一塊，所以在寫程式時都要注意哪些地方可能會發生錯誤，若是可以控制的地方就加上判斷和處理，若是無法控制的地方，例如函式庫的錯誤、伺服器端的錯誤，就要加上 `try-catch` 處理錯誤。