# 類 class
我們在<a href="https://thisweb.tech/js-constructor-function/" target="_blank">這篇</a>中我們提到了 JS 的構造函數，以及構造函數的問題。
接著在<a href="https://thisweb.tech/js-prototype-inherit/" target="_blank">這篇</a>我們從構造函數延伸到原型鏈和繼承。

經過前面原型鏈和繼承的學習，你會發現原型鏈的寫法不太友善，於是有了 class  的誕生，要先知道 class 只是一個語法糖，簡單說就是用一種更好寫的寫法代替之前說的原型鏈的寫法，但是原理是一模一樣的。

## class 怎麼宣告
不管是聲明式還是表達式都可以宣告 class:

```js
class Person {}; // 類聲明式
const Animal = class {} // 類表達式
```

但和函式一樣，**聲明式會被 hoisting(提升)**，表達式則不會，而函式和類最不一樣的地方是，**函式不受區塊作用域影響，而類受到區塊作用域限制**。

建議閱讀: <a href="https://thisweb.tech/javascript-block-scope-tdz/" target="_blank">什麼是區塊作用域？</a>

```js
{ 
 function FunctionDeclaration() {} 
 class ClassDeclaration {} 
} 
console.log(FunctionDeclaration); // FunctionDeclaration() {} 
console.log(ClassDeclaration); // ReferenceError: ClassDeclaration is not defined
```
## 類的構造函數
前面說過類的原理跟構造函數、原型鏈一模一樣，所以類也會有構造函數，只是寫法變成了 `constructor()` 關鍵字:

```js
// 類
class Person { 
 constructor(name, age) { 
  this.name = name;
  this.age = age;
 } 
} 

// 構造函式
function Animal(name, age) {
  this.name = name;
  this.age = age;
}

let thisWeb = new Person('thisWeb', 18); 
let duan = new Animal('duan', 3);
console.log(thisWeb) // Person {name:'thisWeb', age: 18}
```
有沒有發現跟構造函式差不多，只是類使用 `constructor()` 當作構造函數，不過最不同的地方是，類一定要用 new 操作符，如果沒有用的話會直接報錯，這一點倒是比構造函式好，可以避免預期之外的錯誤。
(話說 duan 是我家貓咪的名字XD，叫做短短)

而類也跟普通的構造函式一樣，可以用 `instanceof` 檢查實例和類的關係:

```js
class Person { 
 constructor() { 
	 
	}
 } 
let p1 = new Person();
console.log(p1 instanceof Person); // true 
```

## 類也是函數
前面講了那麼多，相信你也有發現類跟函數蠻像的，其實它們可以說是一樣，為什麼這麼說？
是因為 JS 中其實沒有一種類別(type)叫做類(class)  

那類到底是甚麼呢？直接來測試就知道了:

```js
class Person {}
console.log(typeof Person) // function
```
欸居然還是函數？沒錯，所以類跟構造函數有一樣的行為，一樣有　prototype，prototype 裡一樣有 constructor 可以指回類本身:

```js
class Person{} 
console.log(Person.prototype); // { constructor: f() } 
console.log(Person === Person.prototype.constructor); // true

let p = new Person(); 
console.log(p instanceof Person); // true
```

*這裡如果不懂的話，建議先來看看<a href="https://thisweb.tech/js-prototype-inherit/" target="_blank"> JS 原型鏈和繼承</a>*

## 類的原型

類的語法讓我們可以很簡單的定義存在於原型上的屬性:

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

上面的程式碼和下的構造函數的寫法一樣:

```js
function Person(name) {
  this.name = name;
}
Person.prototype.sayName = function() {
  console.log(this.name);
}
```
不過很明顯感覺 class 更好寫一點對吧，不過要注意的是下面這種情況:

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
  hobbits = ['coding', 'design'];
}
```
在原型鏈上定義屬性值是一種不太好的寫法，因為若有任何一個實例去修改屬性的話，會影響到所有的實力，所以類不支持這種寫法。

不過如果真的要的話還是可以直接寫在原型上的:

```js
Person.prototype.hobbits = ['coding', 'design']
```

## 繼承
在原型鏈和繼承那篇文章花了很多篇幅討論如何在 ES6 之前實現繼承，但在 class 中繼承變得很簡單，只需要用 `extend` 關鍵字就好:

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
  walk() {
    console.log('walking');
  }
}

class Cat extends Animal {
  constructor(name, age) {
    super(name);
    this.age = age;
  }
}

class Dog extends Animal {
  constructor(name, age) {
    super(name);
    this.age = age;
  }
}

const myCat = new Cat('duan', 3);
myCat.walk(); // walking

const myDog = new Dog('dudu', 15);
myDog.walk(); // walking
```

可以看到 `Cat` 和 `Dog` 很簡單就繼承了 `Animal` 的 `walk()`，而裡面有一個新的關鍵字 `super()`，他的意思就是**執行父類(Animal) 的構造函式**，可以想像成下面這樣:

```js
class Cat extends Animal {
  constructor(name, age) {
    this.name = name; // Animal 的構造函式
    this.age = age;
  }
}
```
但要注意，子類的構造函式再調用 `super()` 之前，是不能寫 `this` 關鍵字的:

```js
class Dog extends Animal {
  constructor(name, age) {
    this.age = age;
    super(name);
  }
}

let myDog = new Dog('duan', 2);
// 直接報錯 會告訴你要先調用 super()
```

## static 靜態函式
這個關鍵字可以讓方法被宣告在類本身，而不會被宣告在實例上，主要用在不限定於實例上面的方法:

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
  walk() {
    console.log('walking');
  }
  static jump() {
    console.log('jumping');
  }
}

let myPet = new Animal('Wang');
myPet.walk(); // walking
Animal.jump(); // jumping
myPet.jump(); // myPet.jump is not a function
```

但如果子類也想要用到靜態函數呢？可以用super()來調用:

```js
class Rabbit extends Animal {
  constructor(name, age) {
    super(name);
    this.id = age;
  }
  static jump() {
    super.jump();
  }
}

Rabbit.jump(); // jumping
```

小補充: `super()` 只能用在子類的構造函式、普通函式、靜態函式裡
不能單獨引用 `console.log(super)` 會報錯喔

## 總結
今天我們講了ES6 新增的類語法，其實就只是原型鏈的語法糖(比較好看的寫法)，背後的原理是一樣的，所以學會原型鏈，就學會了類了喔！

而學會類除了可以更方便的創造物件，很多程式語言也都有類的觀念，JS 也是為了能快速銜接其它語言的語法，才新增類這個語法。而現在很流行的 React 框架，在之前也是大量使用到類，所以類的觀念是很重要的喔！