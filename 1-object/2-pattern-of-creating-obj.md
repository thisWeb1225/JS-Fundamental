# JS 宣告物件的設計模式 - 構造函式模式
我們在<a href="https://thisweb.tech/javascript-tutorial-2/" target="_blank" rel="noopener">這篇文章中</a>講了 JS 物件的基本用法和一些要注意的地方，今天我們來更深入聊聊物件這個東西吧！
 
不知道你有沒有想過一個問題，如果我們要創建100個人，難道要一個一個打嗎，會累鼠掉吧，所以我們可以用一些設計模式，來更輕鬆的創造物件。

先來聊聊第一種模式。

## 工廠模式
要記得喔，這些模式都是一種**設計方法**，並不是一個新的語法或函式，他是**觀念**。

工廠模式就是把每個**函數**都**當成一個工廠**，在**工廠內部**自己**創建一個物件**，並且輸出物件：

```javascript
function createPerson(name, age, job) {
  let o = new Object();
  o.name = name;
  o.age = age;
  o,sayName = function() {
    console.log(this.name)
  };
  return o;
}

let person1 = createPerson("Jack", 20, "webDeveloper");
let perons2 = createPerson("Rose", 22, "webDesign");
```

上面的例子可以看出這個工廠是來造人的，可以重複造出好多類似的人。

雖然解決了創建多個類似對象的問題，不過他有個小問題，就是我們沒辦法很好的去識別對象是什麼類型。

就像上面的例子，除非看程式碼，不然無法判斷說 Jack 到底是人還是車子，所以有了接下來的**構造函式**。

## 構造函式模式
如果你還記得的話，宣告陣列的其中一個方法是 `let arr = new Array()`，宣告物件也有一個方式是 `let obj = new Object()`，`Object` 和 `Array` 就是JS內建的原生構造函式，我們也可以自定義一個構造函式，像是:

```js
function Person(name, age, job) {
	this.name = name;
	this.age = age;
	this.job = job;
	this.sayName() {
		console.log(name)	
	}
}

let person1 = new Person('Jack', 18, 'web develope');
let person2 = new Person('Rose', 22, 'web designer');

console.log(person1.constructor === Person) // true
console.log(person2.constructor === Person) // true

console.log(person1 instanceof Object) // true
console.log(person1 instanceof Person) // true
```
你可以發現我們能用 `constructor` 或 `instanceof` 來識別對象的類型，通常認為 `instanceof` 是確定對象類型比較可靠的方式。

**如果有一個物件是用 Person 創造出來的，就稱這個物件為 Person 的實體、實例(instance)**。

也要注意，構造函式習慣用**大寫開頭**，這樣有助於後人來分別是構造函式還是普通函式。

## 構造函式的特性

**構造函式仍然是一個函式**，他並不是一個JS裡特殊的語法，**任何函數只要使用 `new` 操作調用就是構造函式**，不使用 `new` 就是普通函數:

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayName = function() {
    console.log(this.name)
  }
}
let person1 = new Person('Jack', 18) // 作為構造函式使用
Person('Rose', 20); // 作為普通函式使用
window.sayName(); // "person1" 添加到 window 中

```
## 構造函式的問題

構造函式的優點前面說完了，該來說說問題了！在構造函式裡面宣告的函數，會在每一個用構造函數式創建的物件(稱為實例)上都宣告一次，造成資源的浪費:

```js
function Person(name, age, job){ 
 this.name = name; 
 this.age = age; 
 this.job = job; 
 this.sayName = function() {console.log(this.name)}; 
}

console.log(person1.sayName == person2.sayName); // false
```
有沒有發現一樣功能的函式重複宣告了，造成資源的浪費！所以我們用**原型（prototype）**來解決這個問題，**原型就像一個大倉庫**，讓每個實例都可以來倉庫共用一些資源。

```js
function  Person(name, age) {
	this.name = name;
	this.age = age;
  
  // 將 sayName 放到 prototype 原型上
	Person.prototype.sayName = function() {
    console.log(this.name)
  }
}

let person1 = new Person('Jack', 20); 
person1.sayName(); // "Jack" 
let person2 = new Person('Rose', 22); 
person2.sayName(); // "Rose" 
console.log(person1.sayName == person2.sayName); // true
```

## 小結
今天我們說了創建物件的模式，最常使用的構造函式，基本上構造函式用於創建和初始化物件，並且通常使用關鍵字 "new" 來調用。

雖然構造函式很好用，但它仍然有一個問題，就是會重複宣告功能相同的函式，造成資源的浪費，所以需要原型 prototype 來解決這個問題，原型就讓我們留到下次說吧！今天就這樣，下次見囉！