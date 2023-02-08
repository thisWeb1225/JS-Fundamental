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
之所以會這樣是因為，**參數在函數內部的表現為一個陣列**，這個陣列的名字就是 arguments，他可以是空陣列，也可以有很多元素在陣列裡面。
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
function test1() { 
 console.log(arguments[0]); 
} 
test1(5); // 5 
let test2 = () => { 
 console.log(arguments[0]); 
}; 
test2(5); // ReferenceError: arguments is not defined
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
let total1 = getSum(...arr1) // 10
```
### 蒐集參數
上面的例子是把參數擴展成一個一個的元素  
不過我們也可以利用擴展運算子，來把一個一個的元素收集成的陣列  
一樣拿上面的函數當例子，只是不同的寫法
```js
function getSum(...values) { 
 return values.reduce((x, y) => x + y, 0); 
} 
let total2 = getSum(1,2,3); // 6
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

## 補充：函數聲明式和函數表達式的差別
前面有提到說 JS 裡有兩種常用定義函數的方式
聲明式(陳述式)
```js
function sum (num1, num2) {
  console.log(num1 + num2);
}
```
表達式
```js
const sum = function (num1, num2) {
  console.log(num1 + num2);
};
```
表達式也很常搭配箭頭函數去做使用
```js
const sum = (num1, num2) => {
  console.log(num1 + num2)
}
```
事實上聲明式和表達是他們兩個有一點不同  
JS 引擎在執行任何程式碼前，會先讀取函數陳述式，  
`function test() {...}` 這種(也就是所謂的**變量提升Hoisting**)
而聲明式 `const test = function() {...}` 則是程式碼執行到他時才會讀取    
這會有甚麼問題呢？來看看下面的例子
```js
sum(10, 10); // 20
function sum(num1, num2) { 
 console.log(num1 + num2);
}
```
這個沒有問題，但是
```js
sum(10, 10); 
const sum = function(num1, num2) { 
 console.log(num1 + num2);
}; 
// Cannot access 'sum' before initialization
```
就會報錯，因為 JS 引擎還沒讀取函數就先調用他了，  
簡單說就是 **陳述式會被函數提升(Hoisting)**  

除此之外  
其實函數表達式就像是一個普通的變量和附值
```js
const num1 = 10;
const getSum = function {...}
```
兩個有點像對吧  
而這樣創建的函數叫做**匿名函數(anonymous function)**，因為 function 後面沒有名字

且若是用 let 或 const 宣告，那他就沒辦法被覆蓋，這是他的優點  
**避免函數重複宣告**   

所以函數表達式用的好可以
1. 避免宣告前使用
2. 避免重複宣告

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
上面這個程式碼看起來很正常，事實上他的結果在每個瀏覽器可能會不同
因為大部分瀏覽器會直接忽略 condition ，直接讀取第二個函數定義，就像是這樣
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
  sayHi = () => { 
    console.log("Hi!"); 
  }; 
} else { 
  sayHi = () => { 
    console.log("Yo!"); 
  }; 
} 
```

### 結論
其實用哪一種方式是看程式碼的風格和個人喜好  
不過要注意的是使用 const 宣告的函數並不會被提升，也不能被重複宣告  
這樣可以確保維護性  
只不過較不易閱讀一點  
若是搭配箭頭函數就要注意 this 指向的問題  
使用上注意一下就好


## 補充：箭頭函數中的 this
前面提到箭頭函數 this 指向的問題  
現在就來簡單聊一下究竟是甚麼問題  

一般的 this 指向是  
**"誰調用我，我就指向誰" ** 
例如
```js
window.color = 'red';
let object = {
  color: 'blue',
}

function fnSayColor() {
  console.log(this.color)
}

fnSayColor() // red

object.fnSayColor = fnSayColor;
object.fnSayColor() // blue
```
可以很清楚看到，第一個 red 是因為是 window 調用 fnSayColor  
而第二個 'blue' 是因為 object 調用 fnSayColor

那如果是箭頭函數呢

```js
let arrowSayColor = () => {
  console.log(this.color)
}

arrowSayColor() // 'red'

object.arrowSayColor = arrowSayColor;
object.arrowSayColor() // 'red'
```
會發現兩次都是呼叫到 color 也就是 window.color

那是因為箭頭函數的this 是
**"誰創造我，我就指向誰"**

再舉一個很常發生的例子  
在事件回調和計時器回調函數中很常發生以下狀況
```js
function Red() {
  this.color = 'red';
  setTimeout(function () {
    console.log(this.color), 500;
  });
}

function Blue() {
  this.color = 'blue';
  setTimeout(() => console.log(this.color), 500);
}

new Red();
new Blue();

// undefined
// blue
```
第一個 Red 因為是 window 調用 setTimeout 裡的函數，所以打印出來是 undefined
第二個 Blue 因為 箭頭函數是在 Blue 裡被創造，所以打印出來就是 blue

## 閉包 closure
閉包是指一個函數a  
他在一個函數b裡面，並且引用他本身(函數a)外部的變量  
像是
```js
function makeCounter() {
  let counts = 0;
  return function() {
    console.log(++counts)
  }
}
let counter1 = makeCounter();
counter1() // 1
counter1() // 2
```
以上面為例  
makeCounter 裡面有一個匿名函數(沒有名字的函數)  
他用了屬於他外部的變量 counts  
這就是一個閉包  
簡單說就是 **内部函数訪問到外部函数的作用域**  

這樣有什麼好處呢？  
看看下面的例子
```js
function makeCounter() {
  let counts = 0;
  return function() {
    console.log(++counts)
  }
}
let counter1 = makeCounter();
counter1() // 1
counter1() // 2

let counter2 = makeCounter();
counter2() // 1
counter1() // 3
```
好處是 counter1 和 counter2  
有屬於自己的變量 counts 
不會影像到全局變量(全局汙染)  
也不會互相影響(私有變數)

為什麼可以這樣？  
這要提到到 JS 的回收機制和作用域  
簡單說 JS 會把沒用到的值回收  
如果會用到他 就會繼續留在記憶體中  

(所以才說不建議使用 var 宣告變數  
除了容易全局汙染  
他也會一直存活在全局變量中不會被回收 影響效能)

而 一般函數在執行結束後 裡面的變量就會被回收  
```js
function sayHi() {
  let message = 'hi';
  console.log(message);
}

sayHi() // hi
```
執行完 `sayHi` 後 message 就被回收了  
但是在 makeCounter 例子中 
counts 一直被 內部的函數使用  s
所以不會被 JS 回收  
最後造成閉包的發生  

那閉包有缺點嗎？  
閉包的缺點就是它的優點  
因為變量不會被回收 所以  
過度使用 閉包 會影響效能

不過也可以使用
```js
counter1 = null;
```
來釋放記憶體

那閉包實際應用的場景有那些呢

### 防止頻繁觸發  
   
有些時候我們不希望函數時間內觸發多次  
而是只要觸發最後一次    
這被稱為 防抖(Debounce)

例如滾動頁面觸發的函數  
就可以利用閉包來解決這個問題
```js
function debounce(fn, delay) {
  let timer = null;
  return function () {
    if (timer) {
      // timer 第一次執行後會保存在記憶體中 不會被回收
      clearTimeout(timer);
      // 這裡才會被回收
    }
    timer = setTimeout(() => {
      fn();
    }, delay);
  };
}
const betterScroll = debounce(() => {
  return console.log('觸發滾動事件');
}, 500);

document.addEventListener('scroll', betterScroll);
```
和防斗相反  
有時候我們希望觸發第一次就好  
叫做 節流(Throttle)
```js
function throttle(fn, interval) {
  // last為上一次觸發的時間
  let last = 0;

  return function () {
    // 紀錄現在的時間
    let now = new Date();
    if (now - last >= interval) {
      last = now;
      fn();
    }
  };
}

const better_scroll = throttle(() => {
  return console.log('觸發滾動事件')
}, 500);
document.addEventListener('scroll', better_scroll);
```

### 函式庫的封裝
常用的 jQuery 就用到閉包的方式  
來防止裡面的變數被我們覆蓋到  
他只用到全局 window.$  
且因為 window.$ 是被使用的  
所以也不會被 JS  回收  
這樣就巧妙的完成的函式庫的封裝 
```js
(function () {
  var jQuery = window.$ = function() {
    // Intialize
  }
})()
```

除了閉包  
他還用到了 立即執行函數  
就是最後的小括號  
這個下次再說


### 立即調用函數 (IIFE)
Immediately Invoked Function Expression  
我覺得立即執行函數很容易跟閉包搞混  
不過他跟閉包結合起來會很厲害  
簡單說立即調用函數就是就是在宣告完函數後直接調用
使用方法為下面這樣  
用一個括號把函數刮起來後  
馬上接一個小括號  
```js
(function() {
  console.log('IIFE')
})()
// IIFE
```
而他也可以帶參數
```js
(function(message) {
  console.log(message)
})('hi')
// hi
```
不過若只是這樣，顯然沒有太大用處  
但是！  
他最厲害的地方是可以用來模擬塊級作用域像是這樣  
```js
(function () { 
 for (var i = 0; i < 1; i++) { 
 console.log(i); // 0 1
 } 
})(); 
console.log(i); // 錯誤
```
在 ES6 前就可以用這種方法來解決 var 的問題
現在比較少看到是因為 ES6 出現了 let 和 const

現在只要
```js
for (let i = 0; i < 1; i++) {
  console.log(i) // 0 1
}
console.log(i)
```

除此之外  
他跟閉包結合可以創建臨時獨立作用域
```js
setInterval((function() {
  let count = 0
  return function() {
    console.log(++count)
  }
})(), 1000)
```
像是上面這樣  
他每一秒執行一次  
而 count 又不會被外部的變量影響汙染到

在進階一點的應用還可以  
解決變量名的衝突  
例如 jQuery 是用 $ 當變量  
不過若有其他函式庫也是用 $ 當變量就可以這樣解決
```js
// 假設其他函式庫占用 $
const $ = () => console.log("Not jQuery");

(function ($) {
   // 通過閉包限制作用愈的變數名稱
   $(document).ready(function () {
     console.log("Hello jQuery");
   });
})(jQuery);

$()
```

以及上篇文說到的函式庫封裝
```js
(function () {
  var jQuery = window.$ = function() {
    // Intialize
  }
})()
```