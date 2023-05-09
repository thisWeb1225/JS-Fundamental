# 原型 (prototye) 與繼承 (inherit)
我們在<a href="https://thisweb.tech/js-constructor-function/" target="_blank">構造函數</a>中提到構造函數的問題，就是會在實例中重複宣告同樣的方法，所以需要原型 prototype 來解決。

## 原型 prototype 是什麼

每一個函數都會**自動內建**一個 `prototype` 屬性，不信你可以去試試:

```js
function test() {
  console.log('test')
}
console.log(test.prototype)
```

而這個自動內建的屬性是一個**物件**，也就是常常聽到的**原型物件**，原型物件就像一個大倉庫，每個實例都可以來這個倉庫拿東西，所以只要把方法宣告放在原型物件裡，就解決了重複宣告的問題了。

```js
function Person(name) {
  this.name = name;
}

Person.prototype.sayName = function() {
  console.log(this.name)
}

const p1 = new Person('Jack');
const p2 = new Person('Rose');

p1.sayName() // Jack
p1.sayName === p2.sayName // true
```

## constructor 從原型回到構造函式
而在這個原型物件裡面也會有一個內建的屬性 `constructor`，指回原本的函式:

```js
function Person() {}
console.log(Person.prototype.constructor === Person) // true
```

所以函式和原型物件是相通的，畢竟要相通才拿來倉庫拿東西，那你可能會有個疑問，構造函式和原型物件相通，那實例也可以通到原型物件嗎?

當然可以囉，不然怎麼去這個大倉庫(原型物件)拿東西呢？只不過不是透過`prototype`這個屬性來找到倉庫，而是用`__proto__`這個屬於實例的屬性(兩個下滑線代表不希望被修改和取值，所以一般**不會直接操作這個屬性**)。

所有的實例都有這個屬性:
```js
function Person() {}
let p1 = new Person();
console.log(p1.__proto__ === Person.prototype) // true
```
所以實例是用`__proto__`這個屬性來通往倉庫(原型物件)的。

### 所有函數都有prototype屬性，那Object也有嗎？
記得前面提到創建物件的方法有一個是用 `let person = new Object()` 嗎，不知道你會不會好奇，這個Object也是構造函數嗎？那它也有prototype屬性嗎？

你想的沒有錯，它是構造函數也有prototype屬性，而且有趣的是，所有原型鏈最後都會指到Object 這個構造函式的 prototype  
換句話說，Person 的原型物件也是物件實例，所以他也有 `__proto__`屬性，指向`Object.prototype`:

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

## 原型層級
現在來問你一個問題，如果實例裡面有和倉庫(原型)裡有一樣的屬性，會發生甚麼事呢？

```js
function Person(name) {
  this.name = name;
  Person.prototype.name = 'prototype'
}

let p1 = new Person('thisWeb')
console.log(p1.name) // ?
```
答案是實例本身的屬性喔。

在訪問屬性時，**會先看實例本身有沒有，沒有就往倉庫找**，這就是所謂的原型層級。

## 如何判斷這個屬性是存在於實例還是原型物件呢？
在判斷實例有無屬性時，可以用`in`操作符:

```js
console.log('name' in p1) // true
```
不過`in`會透過__proto__去原型(倉庫)找  
如果不希望找到倉庫，可以用這個函數 `Object.hasOwnProperty(object)` 它只會訪問實例本身，所以可以透過這個方法判斷屬性使否存在於原型物件: 

```js
function hasPrototypeProperty(object,name) {
  return !object.hasOwnProperty(name) && (name in object)
}
// 實例有原型沒有 -> true
```

## 原型物件的問題
原型物件也不是完美的，比如原型物件內有一個陣列，若有一個實例更改這個陣列，其他實例也會被影響到，沒辦法針對單獨的實例去修改:

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
怎麼辦呢？就需要用繼承解決喔。

## 原型鏈和繼承
之前說每個構造函數都會有一個原型物件，那如果這個原型物件也是另一個構造函數的實例呢？ 

假設現在有很多個叫做小王的人，但每個小王的id不一樣

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

// Wang 繼承 Person
Wang.prototype = new Person();
// 記得設置 constructor 屬性指回構造函式本身
Wang.prototype.constructor = Wang;

let wang1 = new Wang(1);
wang1.sayName(); // 小王
console.log(wang1.id) // 1

```
小王1號在找名字時會先找自己的構造函式(Wang)，找不到就往自己的原型物件找(Wang.prototype === Person)。

又找不到就只好找原型物件的原型物件(Person.prototype)，最後找到了，這就是**原型鏈**和**繼承**。

**Wang 繼承了 Person 的屬性和方法。**

簡單說，繼承就是一個構造函數的**原型是另一個構造函數**，就會繼承其屬性和函數。

不過要記得手動設置 `Wang.prototype.constructor = Wang;`，不然 可能會導致預期之外的錯誤。

## 原型與繼承關係
原型與實例的關係可以通過用 `instanceof` 操作符來確定

如果一個實例的原型鏈中出現過相應的構造函數，則 instanceof 也會返回 true:

```js
console.log(wang1 instanceof Wang); // true 
console.log(wang1 instanceof Person); // true 
```

## 默認原型
那你會不會好奇，這個原型鏈的最後一個是甚麼，其實就是前面提到的 Object 的 prototype，所以它就是所有物件的默認原型。  

所以為什麼 JS 裡所所有東西都可以用 toString()、valueOf() 等方法，就是因為它們放在 Object 的 prototype 裡面

```js
function Test() {}
console.log(Test.prototype.__proto__ === Object.prototype); // true
console.log(Test.prototype.__proto__.constructor === Object); // true
```

## 繼承
居然原型鏈沒辦法解決共同屬性的問題，那繼承可以怎麼解決呢？最常用的方法是，利用 `call()` 改變 this 的指向:  

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
// 記得設置 constructor 屬性指回構造函式本身
Wang.prototype.constructor = Wang;

let Wang1 = new Wang(20, 1); 
Wang1.hobbies.push('game') 
console.log(Wang1.hobbies); // coding design game 
Wang1.sayName(); // 小王; 

let wang2 = new Wang(23, 2); 
console.log(wang2.hobbies); // coding design 
wang2.sayName(); // 小王
```
這樣就可以只繼承函式而彼此的屬性是互不干擾的(簡單說，call()的第一個參數可以改變this的指向，以這裡為例 call的第一個參數是指Wang)

## 小結
今天講了原型、原型鏈、繼承的觀念，簡單總結一下:

* 原型: 就像一個大倉庫，所有實例都可以到原型裡拿東西
* 原型鏈: 原型物件最終都會指到 `Object` 這個 JS 內建的構造函式
* 繼承: 當一個原型物件，是另一個構造函式的實例時，就會繼承其方法和屬性。

但為了解決屬性共用的問題，我們會用 `call()` 來繼承屬性。