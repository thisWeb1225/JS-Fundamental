 # 物件(Object)
物件是什麼？  
我先來舉個例子，比如說一個人  
人就可以是一個物件，一個人會有名字、年齡、職業...等等資訊  
這些資訊的名字和內容就組和成一個物件  
比如說
```JS
let person1 = {
  name: 'Yang Shan',
  age: 18,
  job: 'Front-end Engineer'
}
```
(永遠的18歲)  
這樣就是一個叫做 person1 的物件  
物件裡有name、age、job等資訊  
車子也可以是一個物件，我們在網頁上註冊的會員資料可以是一個物件  
所以在JS裡，物件是很重要且常見的東西

## 創建物件的方法
在JS裡有兩個常用來創建物件的方法  
第一種是先創建一個空白的物件  
在塞入各種資料給他
```js
let person1 = new Object();
person1.name = 'Yang Shan';
person1.age = 18;
person1.job = 'Front-end Engineer';
```
第二種方式是像上面的例子  
用大括號`{}`來創建，因為比較簡潔，現在更流行這種方式  
```js
let person1 = {
  name: 'Yang Shan',
  age: 18,
  job: 'Front-end Engineer'
}
```
*(這個方法又稱Object literal，我查了一下，台灣的翻譯叫物件實字，對岸的稱法叫物件字面量，我們先有印象就好)*

當然，物件裡面也可以放函式(function)
```js
let person1 = {
  name: 'Yang Shan',
  age: 18,
  job: 'Front-end Engineer'
  sayName: function() {
    console.log(this.name) // 這裡的this是指person1這個物件
  }
}
```
那物件裡有這些資料後，要如何取得或使用呢？
## 如何取得物件裡的值(資料)?
物件.值的名字
```js
let x = person1.age;
console.log(x) // 18
```
呼叫函式的方法也一樣
```js
person1.sayName() // 'Yang Shan'
```
### 循環物件的方法

# 創建物件的模式
太好了，現在你已經會創建物件了  
不過不知道你有沒有想過一個問題  
如果我們要創建100個人，難道要一個一個打嗎，會累鼠掉吧  
所以才會設計創建物件的模式，來更輕鬆的創造物件

先來聊聊第一種模式
## 工廠模式
要記得喔，這些模式都是一種設計方法，並不是一個新的語法或函式，他是**觀念**  

工廠模式就是把每個**函數**都**當成一個工廠**  
在**工廠內部**自己**創建一個物件**
並且輸出物件
```js
function createPerson(name, age, job) {
  let o = new Object();
  o.name = name;
  o.age = age;
  o,sayName = function() {
    console.log(this.name)
  };
  return o;
}

let shan = createPerson("shan", 18, "webDeveloper");
let yang = createPerson("yang", 22, "webDesign");
```
上面的例子可以看出這個工廠是來造人的 (？
可以重複造出好多類似的人

雖然解決了創建多個類似對象的問題，不過他有個小問題
就是我們沒辦法很好的去識別對象是什麼類型
就像上面的例子
除非看程式碼，不然無法判斷說 shan 是人還是車子
所以有了接下來的
**構造函數模式**

## 構造函數模式
Object和Array就是JS內建的原生構造函數  
我們也可以自定義一個構造函數

使用方法為
```js
function Person(name, age, job) {
	this.name = name;
	this.age = age;
	this.job = job;
	this.sayName() {
		console.log(name)	
	}
}

let shan = new Person('shan', 18, 'web develope');
let thisWeb = new Person('thisWeb', 22, 'web designer');

console.log(shan.constructor === Person) // true
console.log(thisWeb.constructor === Person) // true

console.log(shan instanceof Object) // true
console.log(shan instanceof Person) // true
```
你可以發現我們能用 constructor 或 instanceof 來識別對象的類型
通常認為 instancdof 是確定對象類型比較可靠的方式  
**如果有一個物件是用 Person 創造出來的，就稱這個物件為 Person 的實體(instance)**

構造函數習慣用**大寫開頭**，這樣有助於後人來分別是構造函數還是普通函數

### 構造函數的特性
**構造函數仍然是一個函數**  
他並不是一個JS裡特殊的語法，任何函數只要使用`new`操作調用就是構造函數，不使用`new`就是普通函數  
來看看`new`
```js
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayName = function() {
    console.log(this.name)
  }
}
let person1 = new Person('thisWeb', 18) // 作為構造函數使用
Person('Shan', 20); // 作為普通函數使用
window.sayName(); // "Shan" 添加到 window 中

```
### 構造函數的問題

構造函數的優點前面說完了，該來說說問題了！
在構造函數裡面宣告的函數，會在每一個用構造函數創建的物件(稱為實體)上都宣告一次，造成資源的浪費  
```js
function Person(name, age, job){ 
 this.name = name; 
 this.age = age; 
 this.job = job; 
 this.sayName = function() {console.log(this.name)}; 
}

console.log(person1.sayName == person2.sayName); // false
```
有沒有發現一樣功能的函數重複宣告了，造成資源的浪費！
所以我們用 原型（`prototype`） 來解決這個問題(終於說到原型了！)  
可以先把原型想像成大倉庫，讓每個實例都可以來倉庫共用一些資源   

```js
function  Person(name, age) {
	this.name = name;
	this.age = age;
	Person.prototype.sayName = function() {
    console.log(this.name)
  }
}

let person1 = new Person('thisWeb1', 18); 
person1.sayName(); // "thisWeb1" 
let person2 = new Person('thisWeb2', 20); 
person2.sayName(); // "thisWeb2" 
console.log(person1.sayName == person2.sayName); // true
```
---

# 原型 (prototye)
其實每一個函數都會自動內建一個`prototype`屬性  
不信你可以去試試
```js
function test() {
  console.log('test')
}
console.log(test.prototype)
```
而這個自動內建的屬性是一個物件，也就是常常聽到的原型物件(如果不好理解，就先把原型物件想像成一個大倉庫，每個實例都可以來這個倉庫拿東西)，  
在這個原型物件裡面也會有一個內建的屬性 `constructor`，指回原本的函數
```js
function Person() {}
console.log(Person.prototype.constructor === Person) // true
```
所以函數和原型物件是相通的，畢竟要相通才拿來倉庫拿東西呀  
那你可能會有個疑問，構造函數和原型物件相通  
那構造函數創建出來的實例，有和原型物件相通嗎？  
當然有，只不過不是透過`prototype`這個屬性來找到倉庫  
而是用`__proto__`這個屬於實例的屬性(兩個下滑線代表不希望被修改和取值，所以一般不會直接操作這個屬性)  
所有的實例都有這個屬性
```js
function Person() {}
let p1 = new Person();
console.log(p1.__proto__ === Person.prototype) // true
```
所以實例是用`__proto__`這個屬性來通往倉庫(原型物件)的
### 所有函數都有prototype屬性，那Object也有嗎？
記得前面提到創建物件的方法有一個是用 `let person = new Object()` 嗎 
不知道你會不會好奇，這個Object也是構造函數嗎？那它也有prototype屬性嗎？　　
沒有錯，你想的沒有錯，它是構造函數也有prototype屬性  
而且很酷的是，所有原型鏈最後都會指到這裡
換句話說
Person的原型物件也是物件實例，所以他也有__proto__屬性，指向Object.prototype  

```js
console.log(p1.__proto__ === Person.prototype)
console.log(Person.prototype.__proto__ === Object.prototype)
```
### 最後補充
* 構造函數、原型對象、實例是三個完全不同的對象
```js
console.log(p1 === Person) // false
console.log(p1 === Person.prototype) // false
console.log(Person.prototype === Person) // false
```
* 同一個構造函數創建的兩個實例，共享同一個原型對象(和前面說的一樣，共享一個大倉庫)
* constructor 屬性指存在於原型對象中


---  
接著介紹到 繼承、類