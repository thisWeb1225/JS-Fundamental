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
ES6 新增的東西，使用方式很簡潔，很適合用在嵌入函數的場景  
基本上箭頭函數和函數表達式的行為是相同的
```js
let arrowSum = (num1, num2) => {
  return num1 + num2;
}
```
若箭頭函數的參數只有一個，可以不用括號  
下面兩個是完全相同的

```js
let double = (x) => {
  return x * 2;
};
let double = x => {
  return x * 2;
};
```
反之，只要沒有參數或是多個參數的時候需要使用小括號
```js
let multiple = (x, y) => {
  return x * y;
}
```

此外，箭頭函數也可以沒有大括號  
在沒有使用大括號的情況下，箭頭後面就只能有一行程式碼，而且會**自動返回(return)值**  
下面兩個程式碼是完全相同的
```js
let sum = (num1, num2) => num1 + num2;
let sum = (num1, num2) => {
  return num1 + num2;
}
```
簡單說，有大括號，需要return  
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
## 函數的參數、Arguments
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
### 箭頭函數中的參數
若函數是用箭頭函數定義，那麼會不能使用 arguments 關鍵字訪問參數，只能用命名參數訪問
```js
function foo() { 
 console.log(arguments[0]); 
} 
foo(5); // 5 
let bar = () => { 
 console.log(arguments[0]); 
}; 
bar(5); // ReferenceError: arguments is not defined
```
不過還是可以藉由下面的技巧把arguments給箭頭函數
```js
function test() {
  let a = () => {
    console.log(arguments[0])
  }
  a();
}

test(5); // 5
```
## 默認參數值
在ES5之前，要默認參數值可以用下面這個方法
```js
function test(num1) {
  num1 = typeof num1 === 'undefined' ? 10 : num1;
  //...
}
```
不過ES6之後不用那麼麻煩了，可以直接在寫默認值給參數
```js
function test(num1 = 10) {
  //...
}
```
上面兩個程式碼是完全相同的

比較特別的是，若命名參數有默認值，arguments不會跟著有默認值，arguments永遠以傳入的值為主，看個例子
```js
function test(num1 = 10) {
  num1 = 20;
  console.log(arguments[0])
}
test() // undefined
test(10) // 20
```
第一個 `test()`沒有傳參數，`arguments[0]`就沒有東西

### 默認參數不限於原始值或物件類型
也可以使用函數返回的值
```js
let version = 1;
function getVersion() {
  return version++
}

function makeComputer(name = 'apple', version = getVersion()) {
  console.log(`${name} ${version}`);
}

makeComputer() // 'apple 1'
makeComputer() // 'apple 2'
```

## 擴展運算子 Spread Operator
### 擴展參數
ES6 新增的 擴展運算子... ，可以很簡潔的操作或組合陣列，而他最有用的場景就是函數中的參數列表  

例如，有時候我們不想要傳入整個陣列到函數中，而是想要分別傳入陣列中的元素，此時就可以利用**擴展運算子**  
像是下面這個函數會返回所有傳入參數值的總和，就可以很簡潔的利用 ...
```js
function getSum() { 
 let sum = 0; 
 for (let i = 0; i < arguments.length; ++i) { 
 sum += arguments[i]; 
 } 
 return sum; 
} 

let arr1 = [1,2,3,4]
let total1 = getSum(..arr1) // 10
```

上面的例子是把參數擴展成一個一個的元素  
不過我們也可以利用擴展運算子，來把一個一個的元素收集成的陣列  
一樣拿上面的函數當例子，只是不同的寫法
```js
function getSum(...values) { 
 return values.reduce((x, y) => x + y, 0); 
} 
let total2 = getSum(1,2,3)); // 6
```
上面的例子把 1,2,3 三個獨立的參數合併成一個叫做 values 的陣列  
不過這種用法要注意的是，...value 會把剩下的參數全部變成一個陣列，也就是說若把 ...value 寫在第一個參數位置，那之後的參數都拿不到值了，像是
```js
let test(...nums, num1) {
  console.log(...num);
  console.log(num1);
}

let test(1,2,3,4)
// [1,2,3,4]
// undefined
```
所以一定要把擴展運算子寫在最後的參數
```js
let test(num1, ...nums) {
  console.log(...num);
  console.log(num1);
}

let test(1,2,3,4)
// [2,3,4]
// 1
```

## 函數聲明式和函數表達是的差別
前面有提到說 JS 裡有兩種常用定義函數的方式
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
事實上他們兩個有一點不同  
JS 引擎在執行任何程式碼前，會先讀取函數陳述式，也就是`function test() {...}` 這種，而聲明式 `let test = function() {...}` 則是程式碼執行到他時才會讀取  
這會有甚麼問題呢？來看看下面的例子
```js
console.log(sum(10, 10)); 
function sum(num1, num2) { 
 return num1 + num2; 
}
```
這個沒有問題，但是
```js
console.log(sum(10, 10)); 
let sum = function(num1, num2) { 
 return num1 + num2; 
}; 

```
就會報錯，因為 JS 引擎還沒讀取函數就先調用他了，  
簡單說就是 **陳述式會被函數提升(Hoisting)**  

### 函數表達式
那函數表達式有什麼特色呢？  
其實函數表達式就像是一個普通的變量和附值
```js
let num1 = 10;
let getSum = function {...}
```
兩個有點像對吧  
而這樣創建的函數叫做**匿名函數(anonymous function)**，因為 function 後面沒有名字

#### 函數陳述式的問題
```js
 if (condition) { 
 function sayHi() { 
 console.log('Hi!'); 
 } 
} else { 
 function sayHi() { 
 console.log('Yo!'); 
 } 
} 
```
上面這個程式碼看起來很正常，事實上他錯到不行，因為大部分瀏覽器會直接忽略 condition ，直接讀取第二個函數定義，就像是這樣
```js
function sayHi() {
  console.log('Hi!')
}
function sayHi() {
  console.log('Yo!')
}
```
第二個直接覆蓋第一個  
不過函數表達式卻沒有這個問題，因為它就像一般變量一樣
```js
let sayHi; 
if (condition) { 
 sayHi = function() { 
 console.log("Hi!"); 
 }; 
} else { 
 sayHi = function() { 
 console.log("Yo!"); 
 }; 
} 
```

