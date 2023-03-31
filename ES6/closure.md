# 閉包 Closure

閉包一直是初學 JS 新手的第一座大山，很多面試很愛考，雖然網路上很多文章在講閉包，但我覺得都講得太難了，於是我用最簡單的方式，整理了一篇閉包教學給你，

整篇文章會分這幾個部分：
1. 甚麼是閉包
2. 閉包可以做什麼
3. 閉包的缺點
4. 閉包的應用

由淺入深帶你吃透閉包。

## 甚麼是閉包
用最簡單的一句話說就是：**內部函數訪問外部函數的變數**，

仔細一點說就是，一個內部函數 `inner`，它在一個外部函數 `outer` 的裡面，並且它用到了它(函數 `inner`)外部的變數，例子如下：
```js
function outer() {
  let a = 1;
  return function inner() {
    console.log(a) // 訪問 inner 外部的變數
  }
}

let closure = outer();
closure() // 1
```
在 `outer` 我們先宣告變數 `a` 為 0，並且返回一個函數 `inner`，`inner` 會在控制台打印變數 `a`。  
因為 `inner` **訪問了它外部的變數** `a`，這樣就形成了一個閉包。  

再回去看那一句話：**內部函數訪問外部函數的變數**，是不是覺得很好理解了呢？接著我們來看看閉包可以幹嘛。

## 閉包可以做什麼
閉包最大的用處是做**私有變數**，舉例來說我們現在要做很多個記數器 `counter`，每個計數器都有自己的數字 `counts`，就可以利用閉包：
```js
function makeCounter() {
  let counts = 0;
  return function() {
    console.log(++counts);
  }
}

const counter1 = makeCounter();
counter1() // 1
counter1() // 2

const counter2 = makeCounter();
counter2() //1
counter1() //3
```
你可以發現 `counter1` 和 `counter2` 不會互相影響，這就是閉包的好處。

為什麼可以製作斯有變數，就要提到 JS 的回收機制。

## JS 回收機制
簡單說 JS 會把沒用到的變數回收，如果之後的程式碼還會用到，那就會留在記憶體中，而一般的函數在執行結束後，裡面的變數就會被回收，例如：
```js
function sayHi() {
  const message = 'hi';
  console.log(message);
}

sayHi()
```
當我們執行完 `sayHi` 函數後，`message` 就會被回收了；但在 `makeCounter` 例子中，JS 無法確定 `counts` 之後還會不會用到，所以就會一直保存在記憶體之中，造成閉包的發生。

## 閉包的缺點
其實閉包的缺點是它的優點造成的，因為變數不會被回收，會佔著記憶體，所以過度使用閉包會影響效能。

不過我們可以使用：
```js
couter1 = null;
```
來釋放記憶體。

## 閉包的應用 1 - 防止頻繁的觸發 Debounce
接下來說一些閉包的實際應用，這部分稍微難一點，可以花時間認真看一下，相信能讓你對閉包更了解。

第一個應用是防止頻繁觸發，有時候我們不希望函數在短時間內觸發多次，而是只觸發**最後一次**，這被稱為**防抖(Debounce)**，  
例如滾動頁面的觸發的函數，就可以利用閉包解決：
```js
function debounce(fn, delay) {
  let timer = null;

  // 返回匿名函數
  return function() {
    if (timer) {
      // timer 第一次執行後會被保存在記憶體中，不會被回收
      clearTimeout(timer);
      // 這裡才被回收
    }

    // 一段時間後觸發我們傳入的函數
    timer = setTimeout(() => {
      fn()
    }, delay)
  }
}

function scrollEvent() {
  console.log('觸發滾動事件');
}

const betterScroll = debounce(scrollEvent, 500);
document.addEventListener('scroll', betterScroll);
```
整段程式碼的解釋如下：
第一次滾動頁面時，觸發 `betterScroll` ，宣告外部變數 `timer` 值為 `null`，並回傳內部的匿名函數給 `betterScroll`，  
匿名函數內會設置 `setTimeout`，一段時間後執行 `scrollEvent`，若 500 毫秒內又滾動一次，則 `clearTimeout(timer)`，並重新設置 `setTimeout`，值到 500 毫秒內都沒有滾動才會執行 `scrollEvent`。

## 閉包的應用 2 - 防止頻繁的觸發 Throttle
和防抖相反，有時候我們只想觸發**第一次**，這稱為**節流(Throttle)**。實際應用如下：
```js
function throttle(fm, interval) {
  // last 為上一次觸發的時間
  let last = 0;

  // 返回匿名函數
  return function() {
    // 紀錄現在時間
    let now = new Date();
    if (now - last >= interval) {
      last = now;
      fn()
    }
  };
}

function scrollEvent() {
  console.log('觸發滾動事件');
}

const betterScroll = throttle(scrollEvent, 500);
document.addEventListener('scroll', betterScroll);
```

## 閉包的應用 3 - 封裝函式庫
相信你或多或少有聽過 JQuery，它也利用到了閉包的概念來封裝函式庫，避免變數全局汙染：
```js
(function() {
  var jQuery = window.$ = function() {
    // ...
  }
})()
```
它將 jQuery 掛載到 `window.$` 上，防止被回收，因為不會被回收，所以會一直存在記憶體中，這樣 $ 變數就成為了一個閉包，它可以在全局被訪問到，但內部的變數和方法卻是私有的，不會污染全局命名空間，達到函式庫封裝的效果。

## 結論
總而言之，閉包是**內部函數訪問外部變數**，它可以用來**製作私有變數**，常見的應用有**防抖、節流和封裝函式庫**。

希望這篇文章有幫助你學習閉包，有任何問題歡迎留言或是私訊我的 IG 跟我討論喔！