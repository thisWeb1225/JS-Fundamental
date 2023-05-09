# 如何操作 DOM
上篇講了 DOM 是什麼，接著來看看要如何操作 DOM 吧。

## 如何獲取 DOM　元素
在開始操作之前，總要先獲取 DOM 吧，JS 提供多種獲取 DOM 的方法，可以分為
1. 透過 id / class 獲取
  - `getElementById()`
  - `getElementsByClassName()`
2. 透過標籤名字獲取
  - `getElementsByTagName()`
3. 透過表單元素的 name 屬性獲取
  - `getElementByName()`
4. 透過 CSS 選擇器來獲取
  - `querySelector()`
  - `querySelectorAll()` 

這些方法或得到的東西被稱為 **DOM 元素**，所以嚴格來說，DOM 是一個介面，用來提供一些方法操作 HTML 元素，而這裡獲取到的 DOM 元素叫做 **DOM 元素節點(DOM node)**，這部分下次再來聊聊。

因為獲取 DOM 的方法存在 document 這個 JS 內置的物件內，所以在獲取 DOM 元素時，都要在前面加上 `document` 來使用。

### 1. 透過 id / class 獲取 DOM 元素

可以利用 `getElementById()` 來獲取指定 id 的 HTML 元素:

```html
<div id="myDivId">123</div>
```

```javascript
const myDivId = document.getElementById('myDivId');
console.log(myDivId.innerText) // 123
```

上面的 `innerText` 正是 DOM 提供的其中一個屬性，用來表示 DOM 物件的內容。

接著也可以利用 `getElementsByClassName` 來獲取指定 class 的 HTML 元素:
(注意是 Element**s**，因為一個 class 可能存在於多個 HTML 元素上)

```html
<div class="myDivClass">456</div>
```

```js
const myDivClass = document.getElementsByClassName('myDivClass');
console.log(myDivClass[0].innerText) // 456
```

需要注意的是，因為 class 可能同時在多個元素上，所以利用這個方法獲取的 DOM 物件是一個偽陣列 (像陣列但並不是真正的陣列)，所以要加上 `[0]` 來獲取指定的元素喔。

### 2. 透過 HTML 標籤名字獲取 DOM 元素
有時候我們想要對某個標籤做操作，就可以使用 `getElementsByTagName()` 來一次獲取所有指定標籤的 DOM 元素，例如:
(注意是 Elements)

```html
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
```

```js
const divs = document.getElementsByTagName('div');
console.log(divs[0].innerText); // 1
console.log(divs[1].innerText); // 2
```

和 `getElementsByClassName` 一樣，獲取的 DOM 是個偽陣列。

### 3. 透過表單元素的 name 屬性獲取 DOM 元素
這個方法適用於有表單元素時，可以用 `getElementsByName()` 來獲取 DOM 元素
```html
<form action="">
  <label for="email">Email</label>
  <input type="email" name="userEmail" id="email" value="kkk@gmail.com" />
</form>
```
```js
const userEmail = document.getElementsByName('userEmail');
console.log(userEmail[0].value) // kkk@gmail.com 
```
因為獲取的是 input 元素，所以要用 value 代替 innerText 喔，所有的表單元素都會用 value 來獲取用戶輸入的值喔。

### 4. 透過 CSS 選擇器來獲取 DOM 元素

到這邊你可能會覺得，這麼多獲取的方法也太麻煩了吧，所以後來 JS 推出了新的方法，可以利用 CSS 選擇器來選擇，這樣就不用記這麼多的方法。

這個新增的方法是 `querySelector` 和 `querySelectorAll`，一個用來選取單一元素，另一個用來選取多個元素，**`querySelector` 只會選取第一個元素。**

這個方法讓你用 CSS 選擇器的方法選擇元素，如下:

```html
<div class="myDivClass">123</div>
<div id="myDivId">456</div>
```

```js
const myDivClass = document.querySelector('.myDivClass');
const myDivId = document.querySelector('#myDivId');
console.log(myDivClass.innerText); // 123
console.log(myDivId.innerText); // 456
```

如果有多個相同 class 的元素，就可以用 `querySelectorALl()` 選取:

```html
<div class="myDivClass">123</div>
<div class="myDivClass">456</div>
```

```js
const myDivClass = document.querySelectorAll('.myDivClass');
console.log(myDivClass[0].innerText); // 123
console.log(myDivClass[1].innerText); // 456
```

要注意的是，這個方法要加上 `.` 或是 `#`，因為他就是依照選擇器的方法來選擇的，只要在 CSS 能用的選擇器，這個方法都可以使用，因此這是我最推薦的方法，因為它能在任何場景使用。

像如果你想要選取標籤，也能這樣使用:
```js
const divs = document.querySelector('div')
```

## 操作 DOM 元素的內文
更改 DOM 物件內文的方式有三種:
1. `innerText`
2. `innerHTML`
3. `value`

### 1. innerText
只能獲得純文本的訊息，不會獲得標籤，例如
```html
<div class="myDOM">
	Hello World
	<p>I am thisWeb</p>
</div>
```
```js
const myDOM = document.querySelector('.myDOM');
console.log(myDOM.innerText)
// "Hello World
// I am thisWeb"
```

若要修改文本內容直接附值就可以:

```js
myDOM.innerText = 'Hi World！'
```
此時就會看到畫面上的文本內容出現改變了。

### 2. innerHTML
會連標籤都一起獲取:
```html
<div class="myDOM">
	Hello World
	<p>I am thisWeb</p>
</div>
```

```js
const myDOM = document.querySelector('.myDOM');
console.log(myDOM.innerHTML)
// Hello World
// <p>I am thisWeb</p>
```

所以若要修改 HTML 的結構，就要使用 `innerHTML`:

```js
myDOM.innerHTML = `Hi World, It's a <a href="https://google.com">Google link</a>`
```
此時修改成 google 連結了。

### 3. value
這個屬性用在表單元素上面，例如 `input` 標籤:

```html
<input type="text" class="textInput" value="預設值"/>
```

```js
const textInput = document.querySelector('.textInput');
console.log(textInput.value) // 預設值
```
`value` 可以搭配等下會說的事件還獲取用戶輸入的值。

若 input 是使用 `checkbox` 或 `radio` 選框的話，可以用 `checked` 來判斷用戶是否有選取:

```js
const checkInput = document.querySeletor('.checkInput');
console.log(checkInput.checked) // true 或 false
```

## 操作 DOM 元素的樣式
我們可以直接在 JS 用 DOM 來操作樣式，使用方法為 `xxx.style.xxx = xxx`:

```html
<div class="box">123</div>
```

```js
const box = document.querySelector('.box');
box.style.color = 'green';
// 若遇到 css 的 '-' 符號，要用駝峰寫法代替，例如
box.style.backgroundColor = 'blue';
```

### 直接修改類名
針對類的修改可以分三個:
1. 增加類
2. 刪除類
3. 直接覆蓋類

**1. 增加類**

```css
.active {
	color: red;
}
```
```js
box.classList.add('active');
```
此時 box 的文字顏色就會改成紅色的。

**2. 刪除類**
```js
box.classList.remove('active');
```
此時 box 的文字顏色就會變回去。

有時候我們可能要經常增加或刪除某個類，所以 JS 提供 `toggle` 來幫助我們快速切換。

```js
box.classList.toggle('active');
```
這樣 JS 就會判斷 box 是否有 active 類名，然後自己增加或刪除了。

**3. 直接覆蓋**
這個方法比較少使用:
```js
box.className = 'active';
```
要注意，這樣會把原本的類名也覆蓋掉。


## 操作 DOM 元素屬性
除了修改內文、樣式、類名，我們也可以操作屬性，有三種方法:
1. `getAttribute()` : 獲取屬性
2. `setAttribute()` : 設置屬性
3. `removeAttribute()` : 刪除屬性

### 1. getAttribute()
只要元素上有設定的屬性都可以獲取，例如 a 連結，或圖片來源:
```html
<a href="https://google.com">Google</a>
// 或圖片
<img src="https://..." alt="圖片描述"/>
```
```js
const a = document.querySelector('a');
const img = document.querySelector('img');

const href = a.getAttribute('href') // https://google.com
const src = img.getAttribute('src') // https://...
```

不過其實也可以直接獲取元素:
```js
console.log(a.href) // https://google.com
```
就看你喜歡哪種寫法。

### 2. setAttribute()
設定屬性可以用來更換連結或圖片:
```js
const a = document.querySelector('a');
const img = document.querySelector('img');

a.setAttribute('href', 'https://www.youtube.com/');
img.setAttribute('src', '...');
```

和上面一樣，也可以直接對屬性修改:
```js
a.href = 'https://www.youtube.com/';
```
兩種寫法都可以。

### 3. removeAttribute()
當然也可以刪除屬性
```js
const a = document.querySelector('a');
a.removeAttribute('href');
```

### 自訂義屬性
用 `setAttribute()` 可以自訂義自己的屬性:
```js
const div = document.querySelector('a');
a.setAttribute('myAttribute', 123);
const myAttribute = a.getAttribute('myAttribute') // 123
```

不過這樣有個壞處，就是常常看不出來哪一個屬性是自己定義的，所以 JS 提供另一個方法來自定義屬性，`dataset`:

```js
a.dataset.myAttribute = 123;
```

這樣自訂義的屬性會在前面增加 `data-*` 字樣，可以打開 F12 觀察自己增加的屬性會變成 `data-myAttribute`，這樣可以看出哪些是自己新增的屬性。

## 小結
今天說了什麼是 DOM 物件，以及獲取和修改它的各種方法，其實 DOM 就是把 HTML 元素轉成 JS 物件來讓開發人員修改，下一篇會來繼續講如何增加、刪除 DOM 元素。

## 推薦閱讀
<a href="https://thisweb.tech/js-event-loop/" target="_blank" rel="noopener">JS Event Loop - 面試超愛考的事件循環</a>