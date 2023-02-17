# Promise
先來對 Promise 有些認識
## Promise 是甚麼？
Promise 是一個對 **還未有結果的事物** 的一個替身，他不是前端才有的東西。  


## 為甚麼要有 Promise？
前面有說，我們不知道非同步的成是什麼時候會回傳東西過來  
這種不確定性讓我們沒辦法對他有很好的操作  
例如他傳回來失敗我們也無法知道，但 Promise 這個替身就可以很好的解決這個問題  

且若用回調函數來接收非同步回傳過來的資料會有**回調地獄的問題**  
除了回調地獄，回調函數也沒有一個規範，每個人的寫法都不一樣，造成使用和閱讀上的困難。
為了解決這些問題，有了 Promise 的誕生  
(大陸翻譯叫做 **期約**，台灣好像大多數都直接說 Promise)  

## 創建你的 Promise
要使用 Promise 的方法也很簡單
```js
let p = new Promise(() => {})
console.log(p) // Promise {<pending>}
```
因為 Promise 的特性，我們必須要傳一個函數當作參數給他，不然會報錯，這個等等會提到  

(複習：根據我們對class、建構式的理解，可以知道這個 p 是一個 Promise 的實例，而且應該會有自己的屬性和函式)  
(溫馨小提示：忘記箭頭函數的可以去之前的文複習喔)

## Promise 狀態
眼尖的你有發現前面 `console.log(p)` 後有一個 `{<pending>}`  
這是 Promise 的狀態，為甚麼要有這個狀態呢？  
還記得 Promise 是對不存在結果的一個替身嗎，這個狀態就是為了**形容這個結果**的！  

Promise 有三種狀態  
1. pending (待定)：還未回傳結果
2. fulfilled (兌現)：回傳成功，**又被稱為 resolved (解決)**
3. rejected (拒絕)：回傳失敗  

這樣我們就可以根據這三種狀態來去處理資料

## 處理 Promise 狀態
promise 的狀態是私有的，我們沒辦法透過
```js
p.PromiseState = 'pending'
```
這種方式來去修改，這也很好理解，因為如果可以這樣亂改那整個程式都要亂掉了  
所以前面才說要傳入一個函數當作參數，因為我們要像下面這樣  
在 Promise 的內部來去操作 Promise 的狀態
```js
function createPromise(success) {
  return new Promise((resolve, reject) => {

    // 處理資料...

    if (success) {
      resolve('資料回傳成功！')
    }
    else {
      reject('資料回傳失敗！')
    }

  })
}
```
接著我們先來自己操作 success 來試試看
```js
let p1 = createPromise(true);
console.log(p1); // Promise {<fulfilled>: '資料回傳成功！'}

let p2 = createPromise(false);
console.log(p2) // Promise {<rejected>: '資料回傳失敗！'}
```
上面的 resolve() 和 reject() 就是告訴 promise 現在是成功還是失敗  
有發現我們 console 出來後有顯示 fulfilled 和 rejected 嗎？　　
這就是成功和失敗的狀態  
而 Promise 的狀態只要一改變就沒辦法再變回去 pending 了

## .then()
那我們要怎麼使用取得回來的資料呢？  
只要使用 `.then()` 就可以了  
```js
p1 = createPromise(true)
  .then(data => console.log(data));
  // '資料回傳成功！'
```
`.then( )` 裡面要放一個函數
而這個函數的參數就是 resolve() 裡的資料

那這個 `.then` 到底是甚麼意思？ 
還記得上次回調函數的方式嗎，取得第一筆資料，**然後**再用第一筆資料的地址抓第二筆資料  
這個**然後**就是 `.then()`   
  
就像是 我先吃早餐，**然後**上班的 這個然後
這也是 promise 厲害的地方，他可以等 resolve() 結束
然後再做其他事情

## 如果回傳資料失敗怎麼辦？ .catch()
前面的 `.then()` 是成功才會調用，這也很好理解，都失敗了還有甚麼然後勒哈哈

所以我們要用 `.catch()` 來處理失敗的狀況  
catch 就是抓住錯誤的意思
```js
p2 = createPromise(false)
  .then(data => console.log(data))
  .catch(err => console.log(err));
  // '資料回傳失敗'
```
只要發生錯誤，就會直接執行 `catch()` 而跳過所有的 `.then()`

## 連鎖 promise 
有時候我們 promise 成功後想要執行東西  
執行成功後又想要執行其他東西，就可以不斷的 `.then()` 來做
```js
let p = new Promise((resolve, reject) => { 
 console.log('first'); 
 resolve(); 
}); 

p.then(() => console.log('second'))
  .then(() => console.log('third'))
  .then(() => console.log('fourth'));
// first 
// second 
// third 
// fourth
```
不過這沒什麼太大的意義  
因為直接寫同步的函數也可以做到
```js
(() => console.log('first'))(); 
(() => console.log('second'))(); 
(() => console.log('third'))(); 
(() => console.log('fourth'))(); 
```


連鎖 promise 厲害的地方是用在多個非同步程式碼    
在 .then() 的地方回傳一個新的 promise 
這樣就可以確保每個函數都會等待之前的 promise 完成  
為了方便，我們先寫一個製作 promise 的函數
```js
function createPromise(seconds, data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(data);
      resolve();
    }, seconds * 1000);
  });
}

let p1 = createPromise(1, 'p1');
p1.then(() => createPromise(1, 'p2'))
  .then(() => createPromise(1, 'p3'))
  .then(() => createPromise(1, 'p4'));
// p1 (1 秒後)
// p2 (2 秒後)
// p3 (3 秒後)
// p4 (4 秒後)
```


### 小練習
相信現在你對 promise 有一定的認識了
那我們來改一下上次的回調地獄看看會變怎樣  
先把 getSomeData() 改寫成 promise 的樣子  
記得我們要回傳新的 promise
```js
function getSomeData(url, callback) {

  // 利用 url 獲取 yourData

  callback(yourData);
}

function getSomeDataPromise(url) {
  return new Promise((resolve, reject) => {
    // 利用 url 獲取 yourData
    if (success) {
      resolve(yourData);
    }
    else {
      reject('獲取錯誤')
    }
  })
}
getSomeDataPromise(url)
  .then(data1 => {
    console.log(data1);
    return getSomeDataPromise(data1.url)
  })
  .then(data2 => {
    console.log(data2);
    return getSomeDataPromise(data2.url)
  })
  .then(data3 => {
    console.log(data3);
    return getSomeDataPromise(data3.url)
  })
  .catch(err => {
    console.log(err)
  })
```
是不是比之前的回調函數簡潔多了呢？