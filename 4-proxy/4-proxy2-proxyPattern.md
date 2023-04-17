# proxy 代理 5 個好用的技巧

## 1. 跟蹤屬性訪問
通過 `get`、`set`、`has` 等操作，可以知道目標物件屬性什麼時候被訪問、查詢:

```js
const user = { 
  name: 'Jake' 
}; 

const proxy = new Proxy(user, { 
  get(target, property, receiver) { 
    console.log(`Getting ${property}`); 
    return Reflect.get(...arguments); 
  }, 

  set(target, property, value, receiver) { 
    console.log(`Setting ${property} = ${value}`); 
    return Reflect.set(...arguments); 
  } 
}); 
proxy.name; // Getting name 
proxy.age = 27; // Setting age = 27
```

## 2. 隱藏屬性
代理內部的程式碼在外部是不可見的，因此要隱藏目標物件上的屬性也輕而易舉:

```js
const hiddenProperties = ['age', 'hobbies']; 
const targetUser = { 
 name: 'thisweb', 
 age: 63, 
 hobbies: 'codding' 
}; 

const proxyUser = new Proxy(targetUser, { 
  get(target, property) { 
    if (hiddenProperties.includes(property)) { 
      return undefined; 
    } else { 
      return Reflect.get(...arguments); 
    } 
  },

  has(target, property) {
    if (hiddenProperties.includes(property)) { 
      return false; 
    } else { 
      return Reflect.has(...arguments); 
    } 
  } 
}); 

// get() 
console.log(proxyUser.age); // undefined 
console.log(proxyUser.hobbies); // undefined 
console.log(proxyUser.name); // thisweb 

```

## 3. 屬性驗證
因為所有附值操作都會觸發 `setter`，所以可以在內部驗證屬性來決定是否允許附值:

```js
const targetUser = { 
  id: 0 
}; 

const proxyUser = new Proxy(targetUser, { 
  set(target, property, value) { 
    if (typeof value !== 'number') {
      console.log('the value must be number');
      return false; 
    } else { 
      return Reflect.set(...arguments); 
    } 
  } 
}); 

proxyUser.id = 1; 
console.log(proxyUser.id); // 1 
proxyUser.id = '2'; 
console.log(proxyUser.id); // the value must be number 
```

## 4. 函數和構造函數的參數驗證
代理除了可以對物件屬性進行保護或驗證以外，也可以對函數或構造函數進行審查，因為在 JS 中，函數也是一種特殊的物件，因此可以使用 `apply` 來進行攔截，比如以下有一個函數會返回陣列中的中間值，我們可以利用代理來確保傳入的參數型別一定是 `int`，否則拋出錯誤: 

```js
// 返回中間值
function median(...nums) { 
   return nums.sort()[Math.floor(nums.length / 2)]; 
} 

const proxyMedian = new Proxy(median, { 
  apply(target, thisArg, argumentsList) { 
    for (const arg of argumentsList) { 
      if (typeof arg !== 'number') { 
        throw 'Non-number argument provided'; 
      } 
    } 
    return Reflect.apply(...arguments); 
  } 
}); 

console.log(proxyMedian(4, 7, 1)); // 4 
console.log(proxyMedian(4, '7', 1)); 
// Error: Non-number argument provided 
```

也可以要求實例化時必須給構造函數傳參數
```js
class User { 
   constructor(id) { 
    this.id_ = id; 
  } 
} 
const ProxyUser = new Proxy(User, { 
  construct(target, argumentsList, newTarget) { 
    if (argumentsList[0] === undefined) { 
      throw 'User cannot be instantiated without id'; 
    } else { 
      return Reflect.construct(...arguments); 
    } 
  } 
}); 
const user1 = new ProxyUser(1); 
const user2 = new ProxyUser(); 
// Error: User cannot be instantiated without id 
```

## 5. 數據綁定和可觀察物件
通過代理可以在運行中，把原本不相關的物件連結在一起操作，例如創建實例時，自動在將實例放在一個陣列裡面: 
```js
const userList = []; 
class User { 
  constructor(name) { 
    this.name_ = name; 
  } 
} 
const proxy = new Proxy(User, { 
  construct() { 
    const newUser = Reflect.construct(...arguments); 
    userList.push(newUser); 
    return newUser; 
  } 
}); 

new proxy('John'); 
new proxy('Jacob'); 
new proxy('Jingleheimerschmidt'); 
console.log(userList); // [User {}, User {}, User{}]
```