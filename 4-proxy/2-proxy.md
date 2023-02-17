## 創建 Proxy
要創建一個空的 Proxy，可以傳入一個簡單的物件字面量
```js
const target = {
  name: 'thisWeb'
};

const handler = {};

const proxy = new Proxy(target, handler)

console.log(target.name) // thisWeb
console.log(proxy.name) // thisWeb

target.name = 'kevin';
console.log(target.name) // kevin
console.log(proxy.name) // kevin

proxy.name = 'rose';
console.log(target.name) // rose
console.log(proxy.name) // rose

console.log(target === proxy); // false
```
