# JavaScript 立即執行函數
立即執行函數又稱 IIFE(Immediately Invoked Function Expression)，對於初學者很容易把立即執行函數跟閉包搞混，也很多文章會將它們兩個混在一起說，會這樣是因為立即執行函數和閉包結合起來會很厲害。  

簡單說，立即執行函數就是**在宣告完函數後直接使用**，使用方法為：  
1. 用一個括號把函數刮起來後  
2. 馬上接一個小括號  

```js
(function() {
  console.log('IIFE');
})()
// IIFE
```
其實就等於

```js
function fn() {
  console.log('IIFE');
}
fn() // IIEF
```

而它也可以帶入參數:
```js
(function(message) {
  console.log(message)
})('hi')
// hi
```

## 立即執行函數可以做什麼？

若只是宣告完馬上使用使用函數，顯然沒有太大用處。它最厲害的地方其實是用來**模擬區塊作用域**，因為在 ES6 出現 `let`、`const` 以前，是沒有區塊作用域的，這在某些時候非常不方便，所以我們會使用立即執行函數來模擬區塊作用域，舉例來說:

[關於區塊作用域可以參考我之前寫的文章](https://thisweb.tech/javascript-block-scope-tdz/)

```js
for (var i = 0; i < 1; i++) { 
 console.log(i); // 0 1
}

console.log(i) // 1
```
若是用 `var`　宣告變數，則在 `for` 迴圈外部仍然可以讀取到變數 `i`。這不是一件好事，所以我們用 IIFE 解決:

```js
(function () { 
 for (var i = 0; i < 1; i++) { 
 console.log(i); // 0 1
 } 
})(); 
console.log(i); // 錯誤
```

現在比較少看到這種是因為 ES6 出現了 `let` 和 `const`，可以解決這個問題: 
```js
for (let i = 0; i < 1; i++) {
  console.log(i) // 0 1
}
console.log(i) // 錯誤
```

## 立即執行函數的應用 1 - 和閉包結合創造臨時獨立作用域
很多文章會將立即執行函數和閉包一起講是因為，他跟閉包結合可以**創建臨時獨立作用域**，例如我們想要創造一個計時器，但又不希望計時器裡面的變數 `count` 影響到外部，就可以:

[關於閉包可以參考我的這篇文章](https://thisweb.tech/javasrcipt-closure/)
```js
// 設置一個每秒執行一次的定時器
setInterval((function() {
  // 定義一個 IIFE
  let time = 0
  return function() {
    // 利用閉包來保留 time 變數的值，並在每次執行時增加 1
    console.log(++time)
  }
})(), 1000);

// 不會和下面互相影響
let time = 100;
console.log(time) // 100

// 開始計時
// 1
// 2 ...
```
像是上面這樣，每一秒計時一次，而內部的 `time` 又不會跟外部的變數互相影響。

## 立即執行函數的應用 2 - 解決變數名衝突
有些時候我們引入的函式庫，可能會有變數名稱衝突的問題，舉例來說 `jQuery` 是用 `$` 當作變數名稱，如果其他函式庫也是用 `$`，就會有衝突，此時可以傳入參數給立即執行函數來解決這個問題:

```js
// 假設其他函式庫占用 $
const $ = () => console.log("Not jQuery");

(function ($) {
   // 通過閉包限制作用域的變數名稱
   $(document).ready(function () {
     console.log("Hello jQuery");
   });
})(jQuery);
// Hello jQuery

$() // Not jQuery
```

以及在閉包提到的函式庫封裝，也是用立即執行函數來避免變數名稱的衝突:

```js
(function () {
  var jQuery = window.$ = function() {
    // Intialize
  }
})()
```

##　立即執行函數的應用 3 - 製作具有私有變數的物件
在 JS 中，沒有私有變數的概念，但我們可以透過立即執行函數創造獨立作用域來模擬私有變數:

```js
const module = (function() {
  let privateVar = "私有變數";

  function privateFunction() {
    console.log("這是私有函數");
  }

  return {
    publicVar: "公開變數",
    publicFunction: function() {
      console.log("這是公開函數");
      console.log("可以訪問私有變數：" + privateVar);
      privateFunction();
    }
  };
})();

module.publicFunction(); // 輸出：這是公開函式、可以訪問私有變數：私有變數、這是私有函數

console.log(module.publicVar); // 輸出：公開變數
console.log(module.privateVar); // 輸出：undefined
module.privateFunction(); // 輸出：錯誤，因為 privateFunction 是私有函式
```

## 小結
今天我們介紹了立即執行函數，簡單說就是宣告完函數後馬上使用，它最主要的功用有三個，第一個是**模擬塊級作用域**，第二個是**避免相同變數名的衝突**，第三個是**製作有私有變數的物件**，所以它並不只是單純馬上使用函數那麼簡單，不過因為 ES6 新增 `class` 類語法，大大減少了 IIFE 和閉包的使用率，不過很多舊的程式碼仍然是使用 IIFE 和閉包，所以它還是很重要的觀念喔！