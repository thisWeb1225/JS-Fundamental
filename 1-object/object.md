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
`Object` 和 `Array` 就是JS內建的原生構造函數，如果你還記得的話，宣告陣列的其中一個方法就是 `let arr = new Array()`  
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
那實例可以通到原型物件嗎?
當然可以囉，不然怎麼去這個大倉庫(原型物件)拿東西呢
只不過不是透過`prototype`這個屬性來找到倉庫  
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
你想的沒有錯，它是構造函數也有prototype屬性  
而且很酷的是，所有原型鏈最後都會指到Object的prototype  
換句話說  
Person的原型物件也是物件實例，所以他也有__proto__屬性，指向Object.prototype  

```js
console.log(p1.__proto__ === Person.prototype)
console.log(Person.prototype.__proto__ === Object.prototype)
```
### 補充
* 構造函數、原型對象、實例是三個完全不同的對象
```js
console.log(p1 === Person) // false
console.log(p1 === Person.prototype) // false
console.log(Person.prototype === Person) // false
```
* 同一個構造函數創建的兩個實例，共享同一個原型對象(和前面說的一樣，共享一個大倉庫)
* constructor 屬性指存在於原型對象中

### 原型層級
現在來問你一個問題，如果實例裡面有和倉庫(原型)裡有一樣的屬性，會發生甚麼事呢？
```js
function Person(name) {
  this.name = name;
  Person.prototype.name = 'prototype'
}

let p1 = new Person('thisWeb')
console.log(p1.name) // ?
```
答案是實例本身的屬性喔  
在訪問屬性時，會先看實例本身有沒有，沒有就往倉庫找
### 如何判斷這個屬性是存在於實例還是原型物件呢？
在判斷實例有無屬性時，可以用`in`操作符  
```js
console.log('name' in p1) // true
```
不過`in`會透過__proto__去原型(倉庫)找  
如果不希望找到倉庫，可以用這個函數`Object.hasOwnProperty(object)`它只會訪問實例本身  
所以可以透過這個方法判斷屬性使否存在於原型物件
```js
function hasPrototypeProperty(object,name) {
  return !object.hasOwnProperty(name) && (name in object)
}
// 實例有原型沒有 -> true
```
### 原型物件的問題
原型物件也不是完美的，比如原型物件內有一個陣列，若有一個實例更改這個陣列  
其他實例也會被影響到，沒辦法針對單獨的實例去修改
```js
function Person() {} 
Person.prototype = { 
 constructor: Person, 
 name: "Nicholas", 
 age: 29, 
 friends: ["Shelby", "Court"]
}; 
let person1 = new Person(); 
let person2 = new Person(); 
person1.friends.push("Van"); 
console.log(person1.friends); // "Shelby,Court,Van" 
console.log(person2.friends); // "Shelby,Court,Van" 
console.log(person1.friends === person2.friends); // true

```
怎麼辦勒？來談談繼承吧哈哈哈

### 原型鏈和繼承
之前說每個構造函數都會有一個原型物件  
那如果這個原型物件也是另一個構造函數的實例呢？ 來看看是甚麼意思 
假設現在有很多個叫做小王的人
但每個小王的id不一樣
```js
function Person() {
  this.name = "小王";
}
Person.prototype.sayName = function() {
    console.log(this.name)
}
function Wang(id) {
  this.id = id;
}
Wang.prototype = new Person();


let wang1 = new Wang(1);
wang1.sayName(); // 小王
console.log(wang1.id) // 1

```
小王1號在找名字時會先找自己的構造函數(Wang)  
找不到就往自己的原型物件找(Wang.prototype === Person)  
又找不到就只好找原型物件的原型物件(Person.prototype)，最後找到了  
這就是**原型鏈**和**繼承**  
Wang 繼承了 Person 的屬性和函數

簡單說，繼承就是一個構造函數的**原型**是另一個構造函數   
就會繼承其屬性和函數

### 原型與繼承關係
原型與實例的關係可以通過兩種方式來確定
1. 用 instanceof 操作符，如果一個實例的原型鏈中出現過相應的構造函數，則 instanceof 返回 true
```js
console.log(wang1 instanceof Wang); // true 
console.log(wang1 instanceof Person); // true 
```

### 默認原型
那你會不會好奇，這個原型鏈的最後一個是甚麼  
其實就是前面提到的Object的prototype  
`let a = new Obejct()` 這個  
所以JS裡所所有東西都可以用toString()、valueOf()等函式
```js
function Test() {}
console.log(Test.prototype.__proto__ === Object.prototype); // true
console.log(Test.prototype.__proto__.constructor === Object); // true
```

### 繼承
居然原型沒辦法很解決共同屬性的問題  
那繼承可以怎麼解決呢？  
最常用的方法是，利用call改變this的指向  
來看看是甚麼意思呢
```js
function Person(age){  
  this.age = age;
  this.name = '小王'
  this.hobbies = ['coding', 'design']
} 
Person.prototype.sayName = function() { 
 console.log(this.name); 
}

function Wang(age, id){ 
 // 繼承屬性
 Person.call(this, age); 
 this.id = id; 
} 

// 繼承函數
Wang.prototype = new Person(); 

let Wang1 = new Wang(20, 1); 
Wang1.hobbies.push('game') 
console.log(Wang1.hobbies); // coding design game 
Wang1.sayName(); // 小王; 

let wang2 = new Wang(23, 2); 
console.log(wang2.hobbies); // coding design 
wang2.sayName(); // 小王
```
這樣就可以只繼承函數而彼此的屬性是互不干擾的  
(簡單說，call()的第一個參數可以改變this的指向)
(以這裡為例 call的第一個參數是指Wang)

```js
// 這裡可以提到一下 app call bind
```

---  
# 類 class
終於講到ES6新增很重要的寫法了  
經過前面原型鏈和繼承的學習，你會發現原型鏈的寫法很不友善  
於是有了 class  的誕生  
要先知道 class 只是一個語法糖，簡單說就是代替之前說的原型鏈的寫法  
但是原理是一模一樣的  

### class 怎麼宣告
不管是聲明式還是表達式都可以
```js
class Person {}; // 類聲明式
const Animal = class {} // 類表達式
```
和函數一樣 聲明式會被 hoisting(提升)，表達式則不會  
而函數和類最不一樣的地方是  
函數不受塊作用域影響，而類受到塊作用域限制
```js
{ 
 function FunctionDeclaration() {} 
 class ClassDeclaration {} 
} 
console.log(FunctionDeclaration); // FunctionDeclaration() {} 
console.log(ClassDeclaration); // ReferenceError: ClassDeclaration is not defined
```
### 類的構造函數
前面說過類的原理跟構造函數、原型鏈一模一樣  
所以類也會有構造函數，其實是一樣的東西
```js
class Person { 
 constructor(name, age) { 
  this.name = name;
  this.age = age;
 } 
} 
function Animal(name, age) {
  this.name = name;
  this.age = age;
}
let thisWeb = new Person('thisWeb', 18); 
let duan = new Animal('duan', 1);
console.log(thisWeb) // Person {name:'thisWeb', age: 18}
```
有沒有發現跟構造函數差不多，只是類constructor()當作構造函數
不過最不同的地方師，類一定要用 new 操作符，如果沒有用的話會直接報錯  
這一點倒是比構造函數好
(duan 是我家貓咪的名字XD)

而類也跟普通的構造函數一樣，可以用`instanceof`檢查實例和類的關係
```js
class Person { 
 constructor() { 
	 
	}
 } 
let p1 = new Person();
console.log(p1 instanceof Person); // true 
```

### 類也是函數
前面講了那麼多，相信你也有發現類跟函數蠻像的，其實它們可以說是一模一樣
JS中是沒有一種類別(type)叫做類(class)  
那類到底是甚麼呢？直接看看就知道了
```js
class Person {}
console.log(typeof Person) // function
```
欸居然還是函數  
沒錯，所以類跟構造函數有一樣的行為，一樣有prototype  
prototype裡一樣有constructor可以只回類本身  
```js
class Person{} 
console.log(Person.prototype); // { constructor: f() } 
console.log(Person === Person.prototype.constructor); // true

let p = new Person(); 
console.log(p instanceof Person); // true
```

### 類的原型
類的語法可以很簡單的定義存在於原型上的屬性  
```js
class Person {
  constructor(name) {
    this.name = name;
  }

  // 定義在原型上
  sayName() {
    console.log(this.name);
  }
}
```
上面的程式碼和下的構造函數的寫法一樣  
```js
function Person(name) {
  this.name = name;
}
Person.prototype.sayName = function() {
  console.log(this.name);
}
```
不過很明顯感覺 class 更友善一點對吧

要注意的是下面這種情況
```js
class Person {
  constructor(name) {
    this.name = name;
  }

  // 定義在原型上
  sayName() {
    console.log(this.name);
  }

  // 定義在實例上
  let hobbits = [coding, design];
}
```
因為在原型鏈上定義屬性值是一種不太好的寫法，所以類不支持。
不過如果真的要的話還是可以直接寫在原型上
```js
Person.prototype.hobbits = [coding, design]
```

### 類繼承


