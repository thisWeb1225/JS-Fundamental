# Proxy 代理 前言 defineProperty
Proxy 是 ES6 新增的語法，它可以幫助我們創建一個可編輯、可攔截和可代理的物件，可以想像成目標物件的替身，但又完全獨立於目標物件。

目標物件既可以直接被操作，也可以通過Proxy來操作，但直接操作目標物件，會繞過Proxy。

不過在開始聊 Proxy 之前，我想先聊聊 ES5 新增的 `defineProperty()`，因為 Proxy 算是他的加強版

## defineProperty
相信你或多或少都會在寫框架時聽過**數據綁定**這個詞，要能實現數據綁定的關鍵在於能夠監聽數據的變化，也就是當數據一改變時，程式能夠知道並對畫面做出相應的改變。

那到底要怎麼知道一個物件
```js
let obj = {
  number: 1
}
```
被改變呢?

於是 ES5 提供了 Object.defineProperty 這個方法讓我們能夠去定義對象的屬性

相對直接用物件字面量，這個用法可以有更多的操作空間
```js
let obj1 = {};
Object.defineProperty(obj, "number", {
    value : 1,
    writable : true,
    enumerable : true,
    configurable : true,
    get() {
      console.log('getter')
    },
    set() {
      console.log('setter')
    }
});
//  讓物件 obj 有一個屬性叫做 number, 並且值為 1

obj1.number // getter
obj1.number = 2 // setter

// 和物件字面量的比較
let obj2 = {
  value: 1
}

```
defineProperty 的第一個參數是我們要操作的物件，第二的是屬性的名字，第三個參數就是我們定義的方法，其中分別有  
* value 是值
* writable 表示屬性是否能被修改，默認 true
* enumerable 表示屬性是否能通過 for-in 循環返回，默認 true
* configurable 表示屬性能不能被刪除，默認也是 true，不過若調成 false 就不能再利用  
* defineProperty 改回 true 了
* get 函數在讀取屬性時調用，常被稱為 getter
* set 函數在賦值(寫入)時調用，常被稱為 setter

有了 getter 和 setter 我們就可以監聽數據了，怎麼做呢？

我們可以像這樣來封裝物件
```js
function Counter() {
  this.num_ = 0;

  Object.defineProperty(this, 'num', {
    get() {
      console.log('執行了 get 操作');
      return this.num_;
    },
    set(newValue) {
      console.log('執行了 set 操作');
      this.num_ = newValue;
    },
  });

  this.getCount = () => {
    console.log(this.num);
  };
}

let count1 = new Counter();

count1.num = 2; // 執行了 set 操作
console.log(count1.num) // 執行了 get 操作
// 2
```
我們先定義了一個 Counter 的函數，且函數內部宣告了一個私有變量 num_，下滑線代表我們不希望他被外部直接訪問  

然後使用 Object.defineProperty 函數定義了一個 num 屬性，並用 getter setter 操作他  

當我們使用 count1.num = 2 賦值時，實際上會調用 num 屬性的 setter 方法，該方法會先輸出一條 "執行了 set 操作" 的訊息，並將傳入的值賦給 num_。

然後當調用 console.log(count1.num) 時，會輸出一條 "執行了 get 操作" 的訊息，並輸出 this.num_ 的值，也就是 2

簡單說是表面上我們以為是直接操作 num ，實際上是利用私有變量 num_ 以及 setter、getter 來完成監聽的效果 

是不是有點感覺了，接著我們來試試能不能操作畫面來實現數據綁定！

## 更改 DOM 來實現數據綁定
一般我們用 JS 更改 DOM 時會這樣做

```html
<span id="container">1</span>
<button id="button">點擊 + 1</button>
```

```js
document.getElementById('button').addEventListener("click", () => {
    const container = document.getElementById("container");
    container.innerHTML = Number(container.innerHTML) + 1;
});
```

那如果使用 defineProperty 要怎麼寫呢
我們先定義一個 count 物件  
然後封裝一個 watch 函數  
以後需要監聽某些物件時就可以直接調用這個 watch 函數
```js
const button = document.getElementById('button');
const container = document.getElementById('container');
const count = {
  num: 0,
};

button.addEventListener('click', function () {
  count.num += 1;
});

(function () {
  function watch(obj, name, callback) {
    let value = obj[name];

    Object.defineProperty(obj, name, {
      get: function () {
        return value;
      },
      set: function (newValue) {
        value = newValue;
        callback(value);
      },
    });
  }
  this.watch = watch;
})();

watch(count, 'num', (newValue) => {
  container.innerHTML = newValue;
});
```
上面的程式碼，我們一開始先宣告一個 count 物件，並且在點擊按鈕時增加裡面 num 屬性

然後我們用了一個立即執行函數 watch，還記得他是幹嘛的嗎，忘記趕快去複習，簡單複習一下用立即執行函數是為了避免變量汙染，

然後用　Object.defineProperty 方法為物件的指定屬性 num 定義了 getter 和 setter，當屬性被讀取或更改時，會觸發對應的 getter 和 setter 方法，達到監聽對象屬性的效果。

雖然感覺變複雜了，但其實我們寫了一個超級無敵迷你版的 Vue 哈哈哈

## defineProperty 的問題
defineProperty 是 vue2 數據綁定的底層原理
不過因為 defineProperty 能做到的事情不多，而且當有多個屬性時，需要用迴圈去讓攔截每個屬性，非常麻煩  
所以 Vue3 就數據綁定的原理改成了之後要講的 Proxy 了
