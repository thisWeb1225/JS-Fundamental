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

### this

### caller