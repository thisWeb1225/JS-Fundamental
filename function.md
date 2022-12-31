# 函數
JS函數有兩種常用的定義方式  
聲明式(陳述式)
```js
function sum (num1, num2) {
  return num1 + num2;
}
```
表達式
```js
let sum = function (num1, num2) {
  return num1 + num2;
};
```
- - -
## 箭頭函數 
ES6 新增的東西，使用方是很簡潔，很適合用在嵌入函數的場景  
基本上箭頭函數和函數表達式的行為是相同的
```js
let arrowSum = (num1, num2) => {
  return num1 + num2;
}
```
若箭頭函數的參數只有一個，可以不用括號  
只有沒有參數或是多個參數的時候需要使用小括號
```js
let double = x => {
  return x * 2;
}
```
相對的，箭頭函數也可以沒有大括號  
在沒有使用大括號的情況下，箭頭後面就只能有一行程式碼，而且會**自動返回值**  
下面兩個程式碼是完全相同的
```js
let sum = (num1, num2) => num1 + num2;
let sum = (num1, num2) => {
  return num1 + num2;
}
```
要注意的是，有大括號，需要return  
沒有大括號，自動 return

基本上，箭頭函數的優點是簡潔，在嵌入函數的場景很適合使用，比如說
```js
let arr = [1,2,3];
let arr2 = arr.map(i => i + 1)
console.log(arr2) // 2, 3, 4
```
上面的arr2寫法等於下面的寫法
```js
let arr2 = arr.map(function (i) {
  return i + 1;
})
```
明顯箭頭函數簡潔很多  
不過箭頭函數沒有 arguments, super 和 new.target，也不能作為構造函數，也沒有prototype屬性，所以說算是一個有利有弊的東西  
arguments、new.target 之後會再深入聊聊。
- - -
## 函數的參數、Argument
參數就是傳入給函數的值
```js
function sum (num1, num2) {
  return num1 + num2;
}
```
num1、num2 就是兩個參數  
JS其實不太關心參數的類型和個數，你可以傳好幾個參數進去，甚至不傳，也不會報錯，有優點也有缺點。  
之所以會這樣是因為，**參數在函數內部的表現為一個陣列**，也就是 arguments，他可以是空陣列，也可以有很多元素在陣列裡面。
因為 arguments 是函數內部的陣列，所以也可以用中括號去取值  
下面的例子，`num1`和`arguments[0]`是同一個東西
```js
function test (num1, num2) {
    console.log(num1);
    console.log(arguments[0]);
}
test(1,2) // 1, 1
```
(他們內存地址不同，只是同步而已，在嚴格模式下不會同步)  
由此可知，參數在JS裡只是方便開發者去使用函數，不寫參數其實不影響任何功能。

前面說 arguments 是函數內部的參數陣列，所以也有length屬性
```js
function howManyArgs() { 
 console.log(arguments.length); 
} 
howManyArgs("string", 45); // 2 
howManyArgs(); // 0 
howManyArgs(12); // 1 
```

