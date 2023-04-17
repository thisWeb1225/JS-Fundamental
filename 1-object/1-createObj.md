# 物件(Object)
物件是什麼？  

我先來舉個例子，比如說一個人就可以是一個物件，一個人會有名字、年齡、職業...等等資訊，這些資訊的名字和內容就可以組和成一個物件，比如說: 
```JS
let person1 = {
  name: 'thisWeb',
  age: 18,
  job: 'Front-end Engineer'
}
```

上面我們創建了一個 `person1` 物件，物件裡有name、age、job等資訊，這些資訊又叫做**物件的屬性**。

很多東西都可以用物件表示，例如車子也可以是一個物件，我們在網頁上註冊的會員資料可以是一個物件，所以在JS裡，物件是很重要且常見的東西。

## 創建物件的方法
在JS裡有兩個常用來創建物件的方法，第一種是先創建一個空白的物件，在塞入各種資料給他:
```js
let person1 = new Object();
person1.name = 'thisWeb';
person1.age = 18;
person1.job = 'Front-end Engineer';
```
但這種方法不常使用，更常用的是向一開始的例子，用大括號 `{}` 來創建，因為更簡潔: 
```js
let person1 = {
  name: 'thisWeb',
  age: 18,
  job: 'Front-end Engineer'
}
```
*(這個方法又稱**Object literal**，台灣的翻譯叫物件實字，對岸的翻譯叫物件字面量，我們先有印象就好)*


當然，物件裡面也可以放函式(function)
```js
let person1 = {
  name: 'thisWeb',
  age: 18,
  job: 'Front-end Engineer'
  sayName: function() {
    console.log(this.name) // 這裡的this是指person1這個物件
  }
}
```
物件裡放函式也可以簡寫成這樣，省略 `: function` :
```js
let person1 = {
  name: 'thisWeb',
  age: 18,
  job: 'Front-end Engineer'
  sayName() {
    console.log(this.name) // 這裡的this是指person1這個物件
  }
}
```

那物件裡有這些資料後，要如何取得或使用呢？

## 如何取得物件裡的值(資料)?

第一種方式是利用 `物件名字.屬性名字` 就可以取得物件屬性的值:

```js
console.log(person1.age) // 18
```

呼叫函式的方法也是類似的:
```js
person1.sayName() // 'thisWeb'
```

第二種方式比較少用，是用 `[屬性名字]` 來調用
```js
console.log(person1['age']) // 18
person1['sayName']() // 'thisWeb'
```
這種方式要打的字比較多，函式調用看起來也很複雜，所以更推薦第一種用法喔。

## 物件裡的 this 是什麼？
前面有段程式碼寫了　`this.name`，這個 `this` 是什麼意思呢？

其實很簡單 `this` 就是**指這個物件本身**:
```js
let person1 = {
  name: 'thisWeb',
  age: 18,
  job: 'Front-end Engineer'
  sayName: function() {
    console.log(this.name) // 相當於 person1.name
  }
}
```
使用 `this` 的好處是，如果有多個物件時，就可以分別使用它的各自的屬性，例如我們現在多了 `person2` 物件:

```js
let person2 = {
  name: '請網這邊走',
  age: 15,
  job: 'student'
  sayName: function() {
    console.log(this.name) 
  }
}

person1.sayName() // thisWeb
person2.sayName() // 請網這邊走
```

## 小結
今天介紹了 JS 裡的物件，物件是非常重要的觀念，開發時幾乎一定會用到，所以趕快學起來！