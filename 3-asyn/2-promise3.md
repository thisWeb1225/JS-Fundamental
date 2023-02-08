# Promise 的不足之處及解決辦法
儘管 es6 提供的 promise 很好用，但也有它不足的地方，像是
## 1. 沒辦法突然取消 promise
有時候我們會遇到 promise 正在執行，但我們已經不需要他執行的結果了，但 promise 沒有提供可以解決這種情況的方法  

不過我們也可以自己封裝一個類來達到類似的效果
```js
class CancelToken {
  constructor(cancelFn) {
    this.promise = new Promise((resolve, reject) => {
      cancelFn(() => {
        setTimeout(console.log, 0, 'delay cancelled');
        resolve();
      });
    });
  }
}
const startButton = document.querySelector('#start');
const cancelButton = document.querySelector('#cancel');

function cancellableDelayedResolve(delay) {
  setTimeout(console.log, 0, 'set delay');
  return new Promise((resolve, reject) => {
    const id = setTimeout(() => {
      setTimeout(console.log, 0, 'delayed resolve');
      resolve();
    }, delay);
    const cancelToken = new CancelToken((cancelCallback) =>
      cancelButton.addEventListener('click', cancelCallback)
    );
    cancelToken.promise.then(() => clearTimeout(id));
  });
}
```
每次單擊“Start”按鈕都會開始計時，並實例化一個新的 CancelToken 的實例。此時，“Cancel” 按鈕一旦被點擊，就會觸發令牌實例中的期約解決。而解決之後，單擊“Start”按鈕設置的超時也會被取消

## Promise 進度通知
```js
class TrackablePromise extends Promise {
  constructor(executor) {
    const notifyHandlers = [];
    super((resolve, reject) => {
      return executor(resolve, reject, (status) => {
        notifyHandlers.map((handler) => handler(status));
      });
    });
    this.notifyHandlers = notifyHandlers;
  }
  notify(notifyHandler) {
    this.notifyHandlers.push(notifyHandler);
    return this;
  }
}

let p = new TrackablePromise((resolve, reject, notify) => {
  function countdown(x) {
    if (x > 0) {
      notify(`${20 * x}% remaining`);
      setTimeout(() => countdown(x - 1), 1000);
    } else {
      resolve();
    }
  }
  countdown(5);
});

```
