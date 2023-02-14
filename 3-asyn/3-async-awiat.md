# 非同步函數 async / await
saync / await 是 ES8 新增的語法  
讓同步方式寫的程式碼，能夠非同步執行  
來看一個最簡單的例子  
```js
let p = new Promise((resolve, reject) 
  => setTimeout(resolve, 1000, 3)); 

p.then((x) => console.log(x)) // 一秒後 3
```
這個 promise 會在 1 秒後解決且數值為 3   
但我們必須要把處理解果的函數都放在 `.then()` 中  
有時候很不方便

而 async / await 就是想解決非同步程式碼結構的問題  
先來看看上面的程式碼用 async / await 會寫成甚麼樣子
```js
async function asyncFn() { 
  let p = new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, 3);
  });
  console.log(await p); 
} 
asyncFn(); 
```
async 關鍵字告訴引擎說這個函數有非同步的程式碼  
而 await 會等待 promise 的結果  
並暫停接下來的程式碼  
當結果回傳後才會繼續執行接下來的程式碼  

## async

常見的應用場景如下  
有時候我們需要利用拿到的第一筆資料的內容，來去拿第二筆資料  
之前是用 `.then()` 來處理  
```js
function getSomeDataPromise(url) {
  return new Promise((resolve, reject) => {

    // 利用 url 獲取 yourDataf 的程式碼...

    if (success) {
      resolve(yourData);
    }
  })
}

// .then 處理
getSomeDataPromise(url)
  .then(data1 => {
    console.log(data1);
    return getSomeDataPromise(data1.url)
  })
  .then(data2 => {
    console.log(data2);
    return getSomeDataPromise(data2.url)
  })

// async / await 處理
async function getData(url) {
  let res1 = await getSomeDataPromise(url);
  let res2 = await getSomeDataPromise(res1.url);
  console.log(res1, res2)
}

getData('yourURL')
```
可以發現 async / await 的寫法就像同步函數


## 錯誤處理
await 只能接受 resolve() 回傳的值   
若是接受到 reject() 而沒有進行例外處理會直接報錯

```js
function createPromise(seconds, data, success = true) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve(data);
      }
      else {
        reject('err');
      }
    }, seconds * 1000);
  });
}

async function asyncGetData() {
  let p = await createPromise(1, '1', false);
  console.log(p);
}

asyncGetData();
        
// Uncaught (in promise) err
```
必須要加上 try...catch  像是
```js
async function asyncGetData() {
  try {
    let p = await createPromise(1, '1', false);
    console.log(p);
  }
  catch {
    console.log('err')
  }
}

asyncGetData();
// err
```

## 小結
其實 async / await 就像是 promise.then() 的另一種寫法  
寫起來更像同步的程式碼  
也可以將成功和失敗的處理分隔開來  



































比如說，下面程式碼的執行步驟是
```js
async function foo() { 
 console.log(2); 
 await null; 
 console.log(4); 
} 
console.log(1); 
foo(); 
console.log(3); 
// 1 
// 2 
// 3 
// 4
```
1. 控制台印出 1
2. 調用非同步函數 foo()
3. (在 foo() 中) 控制台印出 2
4. (在 foo() 中) await 關鍵字暫停執行，為立即可用的值 null 向消息隊列中添加一個任務；
5. foo()退出；
6. 控制台印出 3
7. 同步程式碼運行完畢
8. JS 從消息隊列取出任務
9. await 取得 null 值
10. ( 在 foo() 中)控制台印出 4

```js

```