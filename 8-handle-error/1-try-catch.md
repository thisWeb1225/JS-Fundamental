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
const fn = () => {
  try {
    return 'try';
  } catch (error) {
    return 'error';
  } finally {
    return 'finally';
  }
}
// 永遠返回 finally

let a = fn(); // a = finally
```

## try-catch 注意事項
當使用 `try-catch` 時，瀏覽器會認為錯誤被處理掉了，因此不會自動報錯。舉例來說

```js
try {
  fn();
} catch (error) {
  console.log(error);
}

let a = 1;
console.log(a) 

// ReferenceError: fn is not defined
// 1
```

以上程式碼因為使用了 try-catch，儘管瀏覽器發現了 fn 尚未宣告，他仍會認為我們把這個錯誤處理掉了，而不報錯繼續執行下面的 `console.log(a)`。

所以大部分的錯誤應該讓底層自己去處理即可，不需要每個地方都套上 try-catch。


## 自訂錯誤拋出

與 `try-catch` 對應的一個機制是 `throw` 操作符，用在任何時候拋出自定義的錯誤。語法為:

```js
throw new ErrorType('error message')
```

在 try 裡面使用 `throw` 操作符時，程式碼會立即跳到 `catch` 當中執行錯誤捕捉。
而在 catch 裡面使用 `throw` 操作符時，瀏覽器會報錯，並將程式碼立即停止。

```js
const bigThen10 = (num) => {
  try {
    if (num < 10) throw new Error('num is too small');
    else console.log('good')
  } catch(err) {
    console.log(err)
  }
}

bigThen10(1);
// Error: num is too small
//    at bigThen10

// 不會停止程式碼
bigThen10(11); // good
```

反之在 catch 使用 `throw` 就會讓瀏覽器報錯，停止程式碼

```js
const bigThen10 = (num) => {
  try {
    if (num < 10) throw new Error('num is too small');
    else console.log('good')
  } catch(err) {
    throw new Error(err);
  }
}

bigThen10(1);
// Uncaught Error: num is too small
//    at bigThen10

// 不會執行以下程式碼
bigThen10(11);
```

## 錯誤的類型

瀏覽器內置的錯誤類型總共有 8 種:
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

可以通過內置的錯誤類型來模擬瀏覽器錯誤，每種錯誤類型的構造函數只能接收一個參數，就是錯誤消息，例如。
```js
throw new Error("Something bad happened."); 
throw new SyntaxError("I don't like your syntax."); 
throw new InternalError("I can't do that."); 
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


## 什麼時候要用 try-catch
由於使用 `try-catch` 時，瀏覽器不會自動報錯，所以在某些情況下，可以直接讓瀏覽器去處理，能夠及時停止程式碼。並不需要在每個地方都加上 `try-catch`

我總結兩個適合使用 try-catch 的場景:
1. 不希望程式碼停止，能夠自行處理錯誤
2. 想拋出更詳盡的錯誤提示

### 不希望程式碼停止，能夠自行處理錯誤
如果會出錯的地方並不影響使用者體驗，那就可以使用 try-catch 來處理，舉例來說，若網站有一個功能是從伺服器加載並顯示使用者的資料。在某些情況下，獲取資料時可能會發生錯誤，但這個錯誤可能不影響使用者體驗，所以希望不中斷應用程式，讓使用者繼續使用，就可以使用 `try-catch`

```js
async function loadUserProfile() {
  try {
    const response = await fetch('https://api.example.com/user/profile');
    const data = await response.json();
    // 顯示使用者資料到畫面
    displayUserProfile(data);
  } catch (error) {
    // 在控制台輸出錯誤訊息
    console.log('無法加載使用者資料:', error);
    // 顯示一個錯誤訊息給使用者
    showErrorToUser('無法加載使用者資料，請稍後再試。');
  }
}
function displayUserProfile(user) {
  // 顯示使用者資料到畫面
}
function showErrorToUser(message) {
  // 顯示錯誤訊息給使用者
}
```

### 想拋出更詳盡的錯誤提示

在解釋函數為什麼失敗時，拋出自定義錯誤解釋是一個很有效的方式，例如有一個函數是取陣列的中位數，就可以在函數開頭判斷型別:

```js
function median(values) {
  if(!(values instanceof Array)) {
    throw new Error("Function median(): Arguments must be an array")
  }

  return values.sort()[Math.floor(values.length / 2)]; 
}
```

所以當你的某個函數會大量使用時，那麼就可以考慮拋出帶有詳細訊息的錯誤，讓每個使用的人都知道哪裡有錯誤。

某些函式庫在這方面做得很好，用起來就會很舒服

至於何時拋出錯誤與捕獲錯誤，可以這樣想，應該只在確切知道接下來**該做什麼**的時候捕獲錯誤。**捕獲錯誤的目的是阻止瀏覽器報錯並繼續執行程式碼**；**而拋出錯誤的目的是提供詳細得錯誤發生原因並停止程式碼**。

## 區分重大錯誤和非重大錯誤

最後，在錯誤處理的策略中，很重要的一部份就是確認錯誤是否致命，非重大錯誤例如:
1. 不影響使用者操作
2. 只影響頁面的一小部分
3. 可以恢復
4. 重複相同操作的可以消除錯誤

基本上不太需要擔心非重大錯誤，盡量不要中斷使用者的體驗，除非是嚴重的錯誤，例如
1. 應用程序停止
2. 嚴重影響使用者的主要目標
3. 會導致其他錯誤發生

重大和非重大錯誤主要是依據使用者的體驗來決定，只要不影響使用者的主要體驗，就盡量不要中斷網頁。

## 小結
前陣子在寫專案時發現自己對於錯誤處理這一塊不太清楚，所以就做了一篇筆記整理，錯誤處理是重要卻容易被忽視的一塊，所以在寫程式時要注意哪些地方可能會發生錯誤，並將錯誤訊息寫得詳細，以後維護會更便捷。