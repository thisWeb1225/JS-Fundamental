# 非同步函數 async / await
saync / await 是 ES8 新增的語法  
它允許我們以同步的方式編寫非同步程式碼，讓我們更容易地管理異步操作，編寫出更清晰、簡潔、易讀的程式碼   
來看一個最簡單的例子  
```js
let p = new Promise((resolve, reject) 
  => setTimeout(resolve, 1000, 3)); 

p.then((x) => console.log(x)) // 一秒後 3
```
這個 promise 會在 1 秒後解決且數值為 3   
但我們必須要把處理結果的函數都放在 `.then()` 中  
有時候很不方便  

而 async / await 就是想解決 `.then()` 寫起來不方便的問題  
```js
async function asyncFn() { 
  let p = await new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, 3);
  });
  console.log(p); 
} 
asyncFn(); 
```
有沒有覺得更像接近平常寫程式的方式了  
而且也不用寫一堆的 `.then()`

簡單解釋上面的程式一就是
async 關鍵字告訴引擎說這個函數有非同步的程式碼  
而 await 會等待 promise 的結果，並暫停接下來的程式碼  
當結果回傳後才會繼續執行接下來的程式碼  

## async
async 可以用在聲明式、表達式、箭頭函數以及類的方法上

```js
async function a() {} 

let b = async function() {}; 

let c = async () => {}; 

class D { 
 async d() {} 
} 
```
且他會返回一個 promise 物件  
```js
async function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet('John')) //Promise {<fulfilled>: 'Hello, John!'}

greet('John')
  .then(result => console.log(result)); 
```
不知道你也沒有想過這個問題  
上面說 async 可以減少 `.then()`，那為甚麼 async 又要返回 promise 物件呢  
是因為在 JS 中，Promise 是用來處理非同步操作的標準方式  
而 async 函數本質上也是處理非同步的方式，所以返回的結果自然是 promise  

## await
await 只能用在 async function 內部  

await 會等待右側的 promise 處理完成並返回處理的結果    
如果 await 等待的不是 promise 則直接返回值本身

```js
async function asyncFn() { 
  let promise = await new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, 'promise');
  });

  let notPromise = await 'notPromise';
  console.log(promise, notPromise); 
} 
asyncFn();  // promise notPromise
```

補充：
JavaScript 在碰到 await 關鍵字時，會記錄在哪裡暫停執行。等
到 await 右邊的值可用了，JavaScript 會向消息隊列中推送一個任務
這個任務會恢復異步函數的執行

所以就算 await 右側不是 promise 函數時也會被當作非同步處理
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
這部份如果不太理解可以去看看 event loop

## 錯誤處理
要注意的是，await 只能接受成功的 promise，若是處理失敗就會報錯
```js
async function test() {
  let err = await Promise.reject('錯誤')
  console.log(err)
};

test()
// Uncaught (in promise) 錯誤
```
必須要使用 try...catch... 的方式去處理錯誤
```js
async function test(condition) {
  try {
    let p = await new Promise((resolve) => {
      if(condition) {
        resolve('成功')
      } else {
        throw new Error('錯誤');
      }
    });

    console.log(p)

  } catch(e) {
      console.log(e)
  }
}

test(true) // 成功
test(false)  //Error: 錯誤
```
## await 的限制
此外，await 不能用在巢狀函數(嵌套函數)中  

```js
async function test() { 
 function innerFn1() {
    return await Promise.resolve(2); 
 }

 const innerFn2 = function() {
    return await Promise.resolve(2); 
 }

 const innerfn3 = () => { 
    return await Promise.resolve(3); 
 }; 
}
test()
```
上面全部都不行

## 和 Promise 的比較

async/await 的優勢在處理多個 promise 組成的 then  
有點像 promise 進一步的優化  
下面我們來比較兩種寫法

```js

function fecthSomething(ms, data) { // 模擬非同步 
  return new Promise((resolve)=>{
    setTimeout(() => {
        resolve(data);
    }, ms);
  })
}

/*
* Promise
*/
let p1 = fecthSomething(1000, 'p1');
let p2 = fecthSomething(2000, 'p2');
p1.then((res) => {
  console.log(res)
  p2.then((res) => {
    console.log(res)
    console.log('all done')
  })
})
// p1
// p2
// 3 秒後 all done

/*
* async/await
*/
async function asyncAwaitFn() {
    let res1 = await fecthSomething(1000, 'a1');
    let res2 = await fecthSomething(2000, 'a2');
    console.log('all done' ,res1, res2);
}

asyncAwaitFn() // 3 秒後 all done a1 a2
```
有沒有感受到 async 和 promise 的差別呢？

## 小結
其實 async / await 就像是 promise.then() 的另一種寫法  
寫起來就像同步的程式碼，也更簡潔  
不過處理錯誤的方式要用 try...catch...  

不過 async 和 Promise 的寫法其實沒有誰一定比較好  
雖然 async 寫起來更簡潔，
但 Promis 有 all()、race()、allSettled() 等好用的寫法，
某些情況下 .then() 可能會比較方便和靈活  
所以要使用哪個還是看個人習慣和情境  

