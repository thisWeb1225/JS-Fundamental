# Promise 的其它方法
除了 `resolve()` 和 `reject()` 以外  
promise 還有其他好用的函數像是
1. all()
2. allSettled()
3. race()
4. finally()

和上次提到的 promise 連鎖不同  
`all()` 和 `race()` 是利用合成的方式來處理 promise  

## Promise.all()
`all()` 會將多個 promise 組合起來，等到全部的 promise 都完成執行後才會再執行`all()`  
用上次連鎖 promise 的例子
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

let p1 = createPromise(1, 'p1');
let p2 = createPromise(2, 'p2');
let p3 = createPromise(3, 'p3');

Promise.all([p1, p2, p3]).then(res => console.log(res))
// 3 秒後回傳 [p1, p2 ,p3]
```
因為用 Promise.all 回傳的資料順序和你傳入的順序相同的  
所以這個方法適合用在同時執行多個 API ，且希望回傳的順序照是你預期的情況  

但若中間有失敗的 promise，就只會回傳失敗的訊息   
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

let p1 = createPromise(1, 'p1');
let p2 = createPromise(2, 'p2', false);
let p3 = createPromise(3, 'p3');

Promise.all([p1, p2, p3])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
// 'err'
```

## Promise.allSettled()
這是 ES11 新增的語法  
是為了解決 `Promise.all()` 的缺點  

前面說 `Promise.all()` 失敗的時候只會返回失敗的訊息  
但有時候我們可能成功失敗的資料都需要拿到，這時就可以使用 `Promise.allSettled()`  
他會返回陣列並包含所有的訊息
拿前面的相同例子
```js
let p1 = createPromise(1, 'p1');
let p2 = createPromise(2, 'p2', false);
let p3 = createPromise(3, 'p3');

Promise.allSettled([p1, p2, p3])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
// [
// {status: 'fulfilled', value: 'p1'}, 
// {status: 'rejected', reason: 'err'},
// {status: 'fulfilled', value: 'p3'} 
// ]
```

## Promise.race()
和 'all()' 相反  
`race()` 是誰先執行完就回傳誰的結果  
一樣來看例子
```js
function createPromise(seconds, data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // console.log(data);
      resolve(data);
    }, seconds * 1000);
  });
}

let p1 = createPromise(1, 'p1');
let p2 = createPromise(2, 'p2');
let p3 = createPromise(3, 'p3');

Promise.race([p1, p2, p3]).then(res => console.log(res))
// 1 秒後回傳 p1
```
因為 p1 先完成就直接回傳 p1 的結果  
後面的就也不會執行，也就不會管後面是失敗還成功  

## Promise.prototype.finally()
finally() 是指 promise 結束後會執行的函式  

有時候我們希望不管 promise 是成功還失敗都執行一些東西  
就可以用到 finally()  
```js
function createPromise(seconds, data, success = true) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        console.log(data);
        resolve();  
      }
      reject('err');
    }, seconds * 1000);
  });
}


let p1 = createPromise(1, 'p1');
p1.then(() => createPromise(1, 'p2'))
  .then(() => createPromise(1, 'p3'))
  .then(() => createPromise(1, 'p4'))
  .catch((err) => console.log(err))
  .finally(() => console.log('done'));
```
不管成功失敗，最後都會回傳 done

## 補充 .then()
其實 .then 最多可以傳入兩個函數當作參數
第一個是接收成功的資料，第二個接受失敗的資料  
```js
function onResolved(id) { 
 setTimeout(console.log, 0, id, 'resolved');
} 
function onRejected(id) { 
 setTimeout(console.log, 0, id, 'rejected'); 
} 
let p1 = new Promise((resolve, reject) => setTimeout(resolve, 3000)); 
let p2 = new Promise((resolve, reject) => setTimeout(reject, 3000)); 

p1.then(() => onResolved('p1'), 
 () => onRejected('p1')); 
p2.then(() => onResolved('p2'), 
 () => onRejected('p2')); 

// 3秒後
// p1 resolved
// p2 rejected
```
和 .catch() 不同的是
.catch() 會跳過所有的 .then()
而 .then() 失敗之後還可以接其他的 .then 繼續執行其它函數

## 小結
這樣 promise 就差不多講完了  
希望你對 promise 有更了解一點

我覺得把 promise 當作一個替身的想法挺好理解的  
你覺得呢  

下一篇要來說說 async / await 
若是懂了 promise 那 await 的概念也很好理解了