# 函數 (進階觀念)
JS裡的函數實際上是物件(Object)  
每個函數都是 Function 類型的實例，所以Function也有自已的屬性和方法
## 函數名
函數名是指向函數的指針  
可以想像函數名是一個路標，而函數本身是一座城市，他指向函數本身，就算路標被拆掉了，函數本身還是存在的  
相對的，一個函數可以有多個函數名(一座城市可以有多個路標)
```js
function sum (num1, num2) {
  return num1 + num2;
}

let anotherSum = sum;
sum = null // 就算把函數名變成 null 函數本身還是存在的

console.log(anotherSum(1, 2)) // 3
```


此外，所有函數對象都會暴露一個只讀的name屬性
```js
function foo() {} 
let bar = function() {}; 
let baz = () => {}; 
console.log(foo.name); // foo 
console.log(bar.name); // bar 
console.log(baz.name); // baz 
console.log((() => {}).name); //（空字符串）
console.log((new Function()).name); // anonymous 
```
如果函數式一個獲取函數、設置函數，或使用bind()，那麼name會加上一個前綴詞
```js
function foo() {} 
console.log(foo.bind(null).name); // bound foo 
let dog = { 
 years: 1, 
 get age() { 
 return this.years; 
 }, 
 set age(newAge) { 
 this.years = newAge; 
 } 
} 
let propertyDescriptor = Object.getOwnPropertyDescriptor(dog, 'age'); 
console.log(propertyDescriptor.get.name); // get age 
console.log(propertyDescriptor.set.name); // set age 
```
- - -
## 參數和arguments的關係
arguments有趣的是，它的值始終與命名參數同步
```js
function test(num1, num2) {
  arguments[0] = 10;
  console.log(num1);
}

test(0,20) // 10
```
但這不代表他們訪問的是同一個內存地址，它們在內存中還是分開的，只是保持同步而已。  
此外，若只傳入一個參數，但修改`arguments[1]`後，並不會影響第二個命名參數，因為`arguments`的長度是根據傳入的參數數量  

嚴格模式下，對arguments賦值並不會影響命名參數，若重寫arguments也會直接報錯

## 沒有重載
在其他語言，例如JAVA，一個函數可以有兩個定義，只要接收參數的類型和數量不同就行，不過JS沒辦法，若定義兩個同名函數，新的會覆蓋舊的
```js
function addSomeNumber(num) { 
 return num + 100; 
} 
function addSomeNumber(num) { 
 return num + 200; 
} 
let result = addSomeNumber(100); // 300 
```

## 默認參數作用域與暫時性死區
默認參數是照順序的，下面兩個程式碼是相同的
```js
function makeKing(name = 'Henry', numerals = 'VIII') { 
 return `King ${name} ${numerals}`; 
} 
console.log(makeKing()); // King Henry VIII 

function makeKing() { 
 let name = 'Henry'; 
 let numerals = 'VIII'; 
 return `King ${name} ${numerals}`; 
} 
```
因此，若前面參數默認值為後面的參數本身，則會拋出錯誤，例如
```js
function makeKing(name = numerals, numerals = 'VIII') { 
 return `King ${name} ${numerals}`; 
} 
```
除此之外，默認參數也是有自己的作用域的，下面會拋出錯誤
```js
function makeKing(name = 'Henry', numerals = defaultNumeral) { 
 let defaultNumeral = 'VIII'; 
 return `King ${name} ${numerals}`; 
} 

```

## 函數內部
### arguments
arguments 除了是參數的類陣列以外，還有一個`callee`屬性  
這個屬性指向 arguments 物件所在的函數  
```js
function factorial(num) { 
 if (num <= 1) { 
 return 1; 
 } else { 
 return num * arguments.callee(num - 1); 
 } 
} 
```
這代表之後不管將函數的名字改成甚麼，他都可以正確的指到該函數

### this
this 在標準函數和箭頭函數有不同的行為  
在標準函數中，this 引用是把調用函數的地方當成作用域  
```js
window.color = 'red'; 
let o = { 
 color: 'blue' 
}; 
function sayColor() { 
 console.log(this.color); 
} 
sayColor(); // 'red' 
o.sayColor = sayColor; 
o.sayColor(); // 'blue' 
```

然而在箭頭函數，this 引用是把**訂義箭頭函數的地方當成作用域**

```js
window.color = 'red'; 
let o = { 
 color: 'blue' 
}; 
let sayColor = () => console.log(this.color); 
sayColor(); // 'red' 
o.sayColor = sayColor; 
o.sayColor(); // 'red' 
```
this 會保留定義函數時的上下文  
```js
function King() { 
 this.royaltyName = 'Henry'; 
 // this 引用 King 的实例
 setTimeout(() => console.log(this.royaltyName), 1000); 
} 
function Queen() { 
 this.royaltyName = 'Elizabeth'; 
 // this 引用 window 对象
 setTimeout(function() {
  console.log(this.royaltyName); }, 1000); 
} 
new King(); // Henry 
new Queen(); // undefined 
```
### caller
... 未完待續

## 私有變量
嚴格來講，JS 沒有私有成員的概念，所有物件屬性都是公有的  
不過 JS 有私有變量的概念，任何定義在函數或塊中的變量都可以認為是私有的，因為外部訪問不到，例如：
```js
function add(num1 + num2) {
  let sum = num1 + num2;
  return sum;
}
```

### 特權方法(privileged method)
特權方法是指，能夠訪問函數私有變量的公有方法  
在物件中有兩種創建特權方法的方式
一是在構造函數中實現
```js
function MyObject() { 
 // 私有变量和私有函数 
 let privateVariable = 10; 
 function privateFunction() { 
 return false; 
 } 
 // 特权方法
 this.publicMethod = function() { 
 privateVariable++; 
 return privateFunction(); 
 }; 
} 
```
這樣之所以可以，是因為`publicMethod`也是一個閉包  

### 靜態私有變量
二是靜態私有變量  
簡單說就是通過作用域來定義私有變量和函數
```js
(function() { 
 // 私有变量和私有函数
 let privateVariable = 10; 
 function privateFunction() { 
 return false; 
 } 
 // 构造函数
 MyObject = function() {}; 
 // 公有和特权方法
 MyObject.prototype.publicMethod = function() { 
 privateVariable++; 
 return privateFunction(); 
 }; 
})();
```
把公友方法定義在構造函數的原型上，你會發現，我們沒有使用任何關鍵字來創建 `MyObject`，是因為沒有使用關鍵字會將物件創建在全局上，變成全局變量  

這個方法與上面的差別是，公有方法是由實例共享，以減少資源消耗

## 模塊模式
模塊模式是在一個單例對象實現了相同的隔離和封裝  

> 單例對象：只有一個實例的對象，例如：
>```js
>let singleton = { 
> name: value, 
> method() { 
> // 方法的代码
> } 
>}; 
>```
而模塊模式是在單例物件的基礎上加以擴展
```js
let singleton = function() { 
 // 私有变量和私有函数
 let privateVariable = 10; 
 function privateFunction() { 
 return false; 
 } 
 // 特权/公有方法和属性
 return { 
 publicProperty: true, 
 publicMethod() { 
 privateVariable++; 
 return privateFunction(); 
 } 
 }; 
}();
```
如果單例對象需要進行某種初始化，並且需要訪問私有變量時就可以採用下面的模式
```js
let application = function() { 
 // 私有变量和私有函数 
 let components = new Array(); 
 // 初始化
 components.push(new BaseComponent()); 
 // 公共接口
 return { 
  getComponentCount() { 
    return components.length; 
  }, 
  registerComponent(component) { 
    if (typeof component == 'object') { 
      components.push(component); 
    } 
  } 
 }; 
}(); 
```
在 Web 開發中，經常需要使用上面這樣的單例物件管理應用程序級的信息  
對象字面量中定義的 `getComponentCount()` 和 `registerComponent()` 方法都是可以訪問 components 私有數組的特權方法。前一個方法返回註冊組件的數量，後一個方法負責註冊新組件

## 模塊增強模式
另一個利用模塊模式的做法是在返回對象之前先對其進行增強。這適合單例對象**需要是某個特定類型的實例**，但又必須給它添加額外屬性或方法的場景。來看下面的例子：
```js
let singleton = function() { 
 // 私有变量和私有函数
  let privateVariable = 10; 
  function privateFunction() { 
    return false; 
  } 
  // 创建对象
  let object = new CustomType(); 
  // 添加特权/公有属性和方法
  object.publicProperty = true; 
  object.publicMethod = function() { 
  privateVariable++; 
  return privateFunction(); 
  }; 
  // 返回对象
  return object; 
}(); 
```
如果前一節的 application 對象必須是 BaseComponent 的實例，那麼就可以使用下面的代碼來創建它：
```js
let application = function() { 
  // 私有变量和私有函数 
  let components = new Array(); 
  // 初始化
  components.push(new BaseComponent()); 
  // 创建局部变量保存实例
  let app = new BaseComponent(); 
  // 公共接口
  app.getComponentCount = function() { 
    return components.length; 
  };
  app.registerComponent = function(component) { 
    if (typeof component == "object") { 
    components.push(component); 
  } 
 }; 
 // 返回实例
 return app; 
}(); 
```