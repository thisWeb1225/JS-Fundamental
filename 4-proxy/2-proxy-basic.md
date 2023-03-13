# Proxy
上次說完 defineProperty()，他可以攔截我們對物件存取時的操作，達到監聽的效果，Vue2 就是用 defineProperty() 實現響應式設計，
但我們手動操作後可以發現要監聽物件蠻麻煩的，如果一個物件有多個屬性，就要先寫一堆的 defineProperty() 或者迴圈，但 Proxy 就不用了。  

Proxy 提供了開發者更多可以操作物件的方式，所以 Vue3 響應式底層就從 defineProperty() 改成 Proxy 了。

## 創建 Proxy
要創建一個空的 Proxy，可以傳入一個簡單的物件字面量  
並且我們對 proxy 操作都會對應到實際的物件上，不管是直接修改原本的物件還是修改 proxy 物件，會發現他們都是相通的  
像下面這樣    
```js
const obj1 = {
  name: 'thisWeb',
  age: 18
};
const handler = {};
const myProxy = new Proxy(obj1, handler)

console.log(obj1.name) // thisWeb
console.log(myProxy.name) // thisWeb

// 修改 obj1
obj1.name = 'kevin';
console.log(obj1.name) // kevin
console.log(myProxy.name) // kevin

// 修改 myProxy
myProxy.name = 'rose';
console.log(obj1.name) // rose
console.log(myProxy.name) // rose

console.log(obj1 === myProxy); // false
```
我們更改 myProxy 後，原本的 obj 也被更改了  
儘管它們是不同的物件  

`new Proxy(param1, param2)` 的第一個參數是你想要代理的目標物件  
第二個參數是設置代理目標物件的攔截操作，就和 defineProperty() 類似  

接下來我們就來看看可以進行什麼操作  

## getter 和 setter 
和 defineProperty() 一樣，Proxy 也有 setter 和 getter
```js
const obj = {
  name: 'thisWeb',
  age: 18
};

const handler = {
  get(obj, prop) {
    console.log('getter', prop, obj[prop]);
    return obj[prop]
  },
  set(obj, prop, newVal) {
    console.log('setter', prop, obj[prop], newVal);
    obj[prop] = newVal
  }
};

const myProxy = new Proxy(obj, handler);

myProxy.name; // getter name thisWeb
myProxy.age = 180 // setter age 18 180
obj.age; // 180
```
和 defineProperty() 不一樣的地方是，他第一二三個參數分別是，被代理的物件、被觸發的物件屬性名、新的值  
而且你也看出 Proxy 會直接攔截整個物件，如果用 defineProperty() 就要針對 name 寫一次，再針對 age 寫一次

簡單說就是
* proxy 是直接針對整個物件去攔截 
* defineProperty() 是針對物件裡的一個屬性去做攔截

## 再寫一次響應式設計
還記得上次用 defienProperty() 寫響應式物件的方式嗎   
這次我們用 Proxy 重寫一次
```js
const button = document.getElementById('button');
const container = document.getElementById('container');

const counter = {
  num: 0,
};

(function() {
    function watch(target, callback) {

        const proxy = new Proxy(target, {
            get: function(obj, prop) {
                return obj[prop];
            },
            set: function(obj, prop, value) {
                obj[prop] = value;
                callback(prop, value);
            }
        });

        return proxy;
    }

    this.watch = watch;
})()

let counterProxy = watch(count, function(key, newValue) {
    if (key === 'value') container.innerHTML = newValue;
    // else 可以針對其他屬性去做操作
})

button.addEventListener("click", function() {
    counterProxy.value += 1
});
```

其實寫起來和 defineProperty 差不多  
一樣用 IIEF 來避免全局汙染，再利用 set get方法去做攔截，最後返回 proxy  
但要注意這次我們更改值時，是對 counterProxy 這個代理的物件去更改，而非本來的 counter  
就像 Vue 一樣，我們不能對原本的物件去操作

不過方便的是如果有多個屬性，就不用寫迴圈，因為 Proxy 是直接針對整個物件去攔截  


## proxy 的其他攔截方法
除了 set get 以外，proxy 還提供總共十三種攔截的方法，原理就和 set get一樣，在對物件做某些操作的時候可以觸發相對的攔截  
比如說 `deleteProperty()` 他可以攔截刪除物件屬性的行為  
```js
const myTarget = {
  id: 1
}; 
const proxy = new Proxy(myTarget, { 
  deleteProperty(target, prop) { 
    console.log(`you delete the ${prop}`); 
  } 
}); 
delete proxy.id 
// you delete the id 
```
又或著再使用 Object.keys() 時產生攔截行為的 ownKeys()  

```js
const myTarget = {
  id: 1,
}; 

const proxy = new Proxy(myTarget, { 
 ownKeys(target) { 
 console.log('you use the Object.keys()'); 
 } 
}); 
Object.keys(proxy); 
// you use the Object.keys() 
```

在這邊統整常用的攔截方法
1. get(target, property, receiver)：攔截對目標物件的讀取屬性操作，常用於處理屬性不存在的情況，或者實現代理模式等。

2. set(target, property, value, receiver)：攔截對目標物件的設置屬性操作，常用於對屬性賦值進行檢查或者修改，或者實現代理模式等。

3. has(target, property)：攔截對目標物件使用 in 運算符判斷屬性是否存在的操作，返回布爾值。

4. deleteProperty(target, property)：攔截對目標物件使用 delete 運算符刪除屬性的操作，返回布爾值表示刪除是否成功。

5. apply(target, thisArg, args)：攔截對目標物件的函數調用操作，常用於對函數調用進行權限控制、參數檢查或者拦截等。

6. construct(target, args, newTarget)：攔截對目標物件使用 new 運算符創建實例的操作，返回值為一個物件。

7. getPrototypeOf(target)：攔截對目標物件使用 Object.getPrototypeOf 方法獲取原型的操作，返回值為一個物件或者 null。

8. setPrototypeOf(target, proto)：攔截對目標物件使用 Object.setPrototypeOf 方法設置原型的操作，返回布爾值表示是否成功。

9. defineProperty(target, property, descriptor)：攔截對目標物件使用 Object.defineProperty 方法定義屬性的操作，返回布爾值表示是否成功。

10. getOwnPropertyDescriptor(target, property)：攔截對目標物件使用 Object.getOwnPropertyDescriptor 方法獲取屬性描述符的操作，返回值為一個物件或者 undefined。

11. preventExtensions(target)：攔截對目標物件使用 Object.preventExtensions 方法禁止擴展的操作，返回布爾值表示是否成功。

12. isExtensible(target)：攔截對目標物件使用 Object.isExtensible 方法判斷物件是否可擴展的操作，返回布爾值。

總之這些方法可以針對某些的行為去做攔截  
進而達到你想達到的效果  
但是其他的就先不說太多，因為也不太常使用到，如果你有興趣可以去 MDN 查查看