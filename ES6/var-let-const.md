# ES6 的 let、const 和 var 的差別

在 JS 更新 ES6 以前，我們宣告變數都是使用 `var`，比如說 `var count = 0`，包括網路上很多舊的教學都是這樣使用的。

對於新手在自學 JS 的情況下，可能在網路上的文章或影片，一下看到 `var`，一下又看到 `let`、`const`，今天我就來幫助你搞清楚他們的差異。

## 變數提升 hoising
在開始之前，我們要先知道用 `var` 的一些特性，也就是**變數提升 Hoisting**。

他的意思是用 `var` 宣告的變數都會被提升到程式碼的最頂端，這會帶來什麼影響呢？來看下面的例子：
```js
console.log(a);
var a = 1;
```
你會發現控制台的輸出是 `undefined`，這是因為用 `var` 宣告的變數會等同於下面這樣：
```js
var a;
console.log(a);  // undefined
a = 1;
```
*備註：`undefined` 是 JS 裡的一種型別，並不會報錯，程式碼還是會繼續運行下去*

包括在函數或是迴圈中，用 `var` 宣告變數一樣有變數提升的效果：
```js
function hoisting() {
  console.log(b);
  var b = 2;
}

hoisting() // undefined

// 等同於

function hoisting() {
  var b;
  console.log(b);
  b = 2;
}
```
從上面的例子可以發現，只有宣告被提升，賦值並沒有跟著提升。

## 重複宣告變數
`var` 還有一個特性是，可以重複宣告相同的變數，比如說：
```js
var a = 1;
var a = 2;

console.log(a) // 2
```
看完了 `var`，我們來看看 `let` 和 `const` 吧！

## let const
`let` 和 `const` 是 ES6 之後才新增的東西，和 `var` 一樣是用來宣告變數的。

和 `var` 不同的是，它們既沒有變數提升，也不可以重複宣告變數，來看看下面的例子：
```js
console.log(a);
let a = 1;
// Uncaught SyntaxError: Unexpected identifier 'Uncaught'
```
會發現程式碼直接報錯了，這是因為，**變數在宣告之前，不應該使用它**，`const` 也是如此，所以 `let`、`const` 是沒有變數提升的。

除了沒有變數提升，他們也不能重複宣告：
```js
let b = 1;
let b = 2;
// Uncaught SyntaxError: Identifier 'b' has already been declared
```
重複宣告相同的變數會直接報錯，告訴你說 `b` 已經被宣告過。

### let 和 const 的差別
let 和 const 唯一的差別是，**const 在宣告賦值之後，就再也不能改變它的值了**，比如說：
```js
const c = 1;
c = 2;
// Uncaught TypeError: Assignment to constant variable.
```
會直接報錯。

除了不能更改值以外，要注意用 `const` 宣告變數的同時就要賦值了：
```js
// 錯誤
const d;
d = 1;

// 正確
const d = 1;
```

`const` 的好處是可以告訴其它工程師說，這個值是固定的，不能更改，也更增加程式的嚴謹性，在宣告不需要更改值的變數時，使用 const 是好習慣喔。

*(備註：`const` 是英文的 constants，意思是保持不變的)*

## var 的缺點
對於新手來說可能會覺得 `var` 比較好用，程式碼都不會報錯，

但也正是因為這樣，讓程式碼變得很不嚴謹，當專案比較大的時候，維護就會變得很困難，

比如說，我們在一開始宣告一個變數叫做 `userId`，中間經過一大串程式碼之後，我們很容易忘記 `userId` 有沒有被宣告過，

所以在後面要使用時，可能就會重複宣告了一次，像下面這樣：

```js
var userId = 1;

/**
 * 中間一堆程式碼
 */

var userId = 2;
```

這樣的程式碼會讓後續的維護變困難，因為不曉得這個 `userId` 的值到底是多少，也不清楚它的值是否能做更動，

所以在這種情況下，因為 id 的值通常是固定的，更建議使用 `const` 來宣告喔：
```js
const userId = 1;
```

## 結論
今天稍微講了 `var`、`let`、`const` 的差別，主要差在**變數提升**以及**重複宣告**，

如果你是自學前端的新手，趕快改掉使用 `var` 的習慣吧！用 `let` 和 `const` 會讓程式碼更嚴謹，維護上更容易！