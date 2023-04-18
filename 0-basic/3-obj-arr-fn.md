# JS 入門篇 2 - 物件、陣列、函式
<a href="https://thisweb.tech/javascript-tutorial-1/" target="_blank" rel="noopener">上一篇教學</a>講了 JS 一些基本的用法，像是變數、型別、流程控制、迴圈，還不知道的趕快去看喔！接下來讓我們更深入一點吧!

## 物件 Object
上一篇有提到資料有好幾種型別，像是數字、字串、布林值等等，當資料變複雜時，比如一個人有姓名、年紀、職業等等資訊，我們可以利用物件將這些資訊全部放進一個變數裡面，比如說
```js
let person1 = {
  name: 'Jack',
  age: '18',
  job: '前端工程師'
};
```
像這樣，用 `{}` 大括號來表示物件，裡面放資訊的名稱和內容，並用 `,` 將每個資料隔開，我們習慣上把每個資訊稱作物件的屬性(property)，而名稱叫做 key 值，內容叫做 value。
以上面為例，`person1` 裡面有三個屬性，其中一個屬性的 key 值為 name，value 為 Jack。

如果要取得物件裡的屬性，這樣寫就好:
```js
console.log(perons1.name) // Jack
console.log(perons1.age) // 18
console.log(perons1.job) // 前端工程師
```

也可以用中括號去取得值，但比較少用，有印象即可:
```js
console.log(person1['name']) // Jack
```

除了用大括號宣告物件以外，JS 也提供另一種創建物件的方式，具體如下:
```js
let person1 = new Object();
person1.name = 'Jack';
person1.age = 20;
person1.job = '前端工程師';
```
先創建一個空白的物件，在塞入更種資料給它，不過這種方式比較少使用，建議使用第一種方法就好了喔！

## 陣列 Array
上一篇說變數是用來儲存資料的東西，但如果我們有 100 個資料，難道要宣告 100 個變數嗎？太麻煩了！所以才有陣列的誕生。

一個陣列可以儲存很多的資料，假設我們現在有 3 個同學的名字要儲存，就可以這樣來使用陣列:
```js
let classmates = ['Jack', 'Rose', 'Jason'];

console.log(classmates[0]) // 'Jack'
console.log(classmates[1]) // 'Rose'
console.log(classmates[2]) // 'Jason'
```
利用中括號來宣告陣列，裡面的元素要用 `,` 隔開，要注意的是，每個元素都會有自己的索引 index，你可以想像是它們各自的編號，**從 0 開始**，所以要取得第一個元素只要 `classmates[0]` 就可以了喔！

而 JS 的陣列相較於其它語言有比較特別一點，它裡面的元素要放甚麼都可以，包括物件也可以喔
```js
let array = [1, 2, 'three', true] // 同時放入好幾種型別的元素，但平常不會這樣使用
```

### 陣列搭配物件
陣列也很常搭配物件做使用，比如說有三個人，我們就可以將它們都放進陣列裡:
```js
let people = [
  {
    name: 'Jack',
    age: 18,
  },
  {
    name: 'Rose',
    age: 20,
  },
  {
    name: 'Jason',
    age: 22,
  },
]

console.log(people[1].name) // Rose
console.log(people[2].name) // Jason
```
陣列包住多個物件很常用的用法喔！


除了中括號，JS 也提供另一種宣告陣列的做法，
```js
let classmates = new Array('Jack', 'Rose', 'Jason')
// 完全等於
let classmates = ['Jack', 'Rose', 'Jason'];
```
但不建議用這種作法，有印象就好。

## 函式 Function
在某些時候我們可能會重複執行一樣的程式碼，此時就可以把這些程式碼放到函式裡面，需要使用的時候調用函式即可。函式就像一個魔法黑盒子，你可以在裡面放進一些指令，當你需要使用這些指令時，只需要呼叫這個魔法盒子就好了。

語法為:
```js
function 函式名字() {
  // 你的程式碼
}
```

比如我現在需要一個函式，調用它時會打印 `Hello World`，就可以這樣寫:
```js
function sayHello() {
  console.log('Hello World');
}

sayHello(); // 調用時要加小括號
```

### 函式的參數
有時候我們不一定要打印 Hello World，可能想打印 Hi World，**它們的功能類似，但內容不同**，這種時候就可以用參數解決:
```js
function saySomething(message) {
  console.log(message)
}
```
簡單來說，函式的參數就是讓你可以把一些值傳遞給函式，讓它做一些事情的方法。再舉個例子:
```js
function sum(x, y) {
  console.log(x + y);
}

sum(1, 2) // 3
sum(3, 3) // 6
```
### 函式的返回值 return
有時候我們會想要取得函式運算完的結果，把結果儲存在某個變數中，就可以使用 `return` 關鍵字，比如我們想要將加總的結果返回出來:
```js
function sum(x, y) {
  return x + y;
}

let result = sum(1, 2)
console.lop(result)  // 3
```
要注意的是，當函式遇到第一個 return，return 後面的程式碼就都不會執行了喔
```js
function sum(x, y) {
  return x + y;

  // 之後的程式碼都不會執行
}
```
返回的東西也不限制是什麼東西，你**可以返回一個數字、字串、陣列，也可以返回物件或函式喔**

## 物件中的方法 Methods
其實物件裡面不只能放一般的值，也可以放入函式，例如:
```js
let person = {
	name: 'Jack',
  getName: function() {
    console.log(this.name) // 相當於 person.name
  },
}

person.getName(); // Jack
```
物件裡面的函式我們習慣稱為**方法 methods**。

也可以省略 `: function` 來簡寫:
```js
let person = {
  name: 'Jack',
  getName() {
    console.log(this.name) // 相當於 person.name
  },
}

person.getName(); // Jack
```
這樣的寫法更簡潔，所以很多人都會這樣寫喔！

**在 JS 中，字串、陣列都算是一種特別的物件**，所以它們也有一些**內建**的方法可以使用，例如我們想把一個陣列裡的元素反過來排，就可以使用:
```js
let array = [1, 2, 3];
array.reverse() // [3, 2, 1]
```
這個 `reverse` 就是陣列的其中一個方法，至於字串和陣列有甚麼方法，有需要的時候再去查詢就好了。


## 物件裡的 this 是什麼？
前面有段程式碼寫了　`this.name`，這個 `this` 是什麼意思呢？

其實很簡單 `this` 就是**指這個物件本身**:
```js
let person1 = {
  name: 'Jack',
  age: 18,
  job: '前端工程師',
  getName: function() {
    console.log(this.name); // 相當於 person1.name
  },
  getAge: function() {
    console.log(this.age); // 相當於 person1.age
  }
}
```
使用 `this` 的好處是，如果有多個物件時，就可以分別使用它的各自的屬性，例如我們現在多了 `person2` 物件:

```js
let person2 = {
  name: 'Rose',
  age: 20,
  job: '後端工程師',
  getName: function() {
    console.log(this.name); // 相當於 person2.name
  },
  getAge: function() {
    console.log(this.age); // 相當於 person2.age
  }
}

person1.getName() // Jack
person2.getName() // Rose
```
## 小結
今天我們介紹了 JS 的物件、陣列、函式，也有提到一些新手要注意的地方，例如陣列結合物件的使用、函式的返回值、物件的方法...等等，不熟悉的話可以多看幾遍，這些對新手來說都是很重要，但網路上很多教學都沒有強調的觀念！

推薦閱讀
<a href="https://thisweb.tech/js-constructor-function/" target="_blank" rel="noopener">JS 創建物件的模式 - 構造函式</a>
<a href="https://thisweb.tech/javascript-var-let-const/" target="_blank" rel="noopener">JS 中 var、let、const 的差別</a>



