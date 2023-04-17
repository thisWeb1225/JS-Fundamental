https://juejin.cn/post/6970893008778559495#heading-5

# Reflect 反射

## 簡介
Reflect 是 JS 內置的物件，他提供一些控制物件操作的方法，這些方法剛好和 Proxy 提供的攔截函數一樣，也和 Object 這個內置物件所提供的方法類似。  

所以我們可以用 Proxy 對一物件進行封裝，攔截對這個物件的訪問和操作，在搭配 Reflect 提供的函數可以更方便的對攔截物件做操作，比如我們想在對訪問物件時進行額外的操作時：

在沒有 reflect 時可以這樣寫
```js
const user = {
  name: 'thisWeb'
};

const handler = {
  get(obj, prop) {
    return obj[prop] 
  },
  set(obj, prop, newVal) {
    obj[prop] = newVal
  }
};

const myProxy = new Proxy(obj, handler);
```
但有 reflect 這個全局物件後就可以直接使用
```js
const handler = {
  get(obj, prop) {
    return Reflect.get(obj, prop);
  },
  set(obj, prop, newVal) {
    return Reflect.set(obj, prop, newVal);
  }
};

const myProxy = new Proxy(obj, handler);
```

你可能會覺得感覺差不多，用 Reflect 有比較好嗎？
是因為 getter 和 setter 相對單純，而且若是手寫的情況下，還要對 undefined 和 null 來處理   
而且要是進行其他攔截方法，例如 Proxy 中的 `apply(target, thisArg, args)` 可以在對物件做 apply 時進行攔截，這個方法要是自己寫肯定很麻煩  

基於這兩點理由，勢必要用到 Reflect  
```js
const handler = {
  apply(target, thisArg, argumentsList) {
    console.log('apply');
    return Reflect.apply(target, thisArg, argumentsList)
  }
};
```
其他攔截方法也可以直接使用 Reflect 就不用自己從頭寫一遍    

## 在 Proxy 內部簡寫 Reflect 的調用
在 Proxy 攔截時，因為參數和 Reflect 都一樣，所以可以直接 `...arguments` 簡寫
```js
const handler = {
  get(target, prop) {
    return Reflect.get(...arguments)
  }
}
```

## 結論
雖然反射聽起來很難，但了解之後會發現其實超簡單的，它主要是用來解決 Proxy 攔截方法要手寫的問題，使用起來也很簡單

最後整理一下 Reflect 的優點
* Reflect 的方法和 Proxy 的攔截函數是一一對應的，例如 Reflect.get 對應 Proxy 的 get、Reflect.set 對應 Proxy 的 set、Reflect.has 對應 Proxy 的 has 等等。
* 使用 Reflect 的方法可以使代碼更簡潔、可讀性更高，並且可以減少一些潛在的錯誤，比如在使用 Reflect.get 和 Reflect.set 時不需要手動處理 undefined 或者 null 的情況。

在 Vue3 中，因為使用 Proxy 作為實現數據綁定的底層邏輯，所以也用到大量的 Reflect 物件，所以了解一下不吃虧喔。