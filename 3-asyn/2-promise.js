function createPromise(seconds, data, success = true) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // console.log(data);
      if (success) resolve(data);
      reject('err');
    }, seconds * 1000);
  });
}

let p1 = createPromise(1, 'p1');
let p2 = createPromise(2, 'p2', false);
let p3 = createPromise(3, 'p3');

Promise.all([p1, p2, p3])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

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

let p10 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, 3);
});

p.then((x) => {
  console.log(x);
}).catch((err) => {
  console.log(err);
}); // 一秒後 3

function createPromise(seconds, data, success = true) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // console.log(data);
      if (success) resolve(data);
      reject('err');
    }, seconds * 1000);
  });
}

async function asyncGetData() {
  try {
    let p11 = await createPromise(1, '1', false);
  } catch {
    console.log(err);
  }
}

asyncGetData();

p.then(() => console.log('second'))
  .then(() => console.log('third'))
  .then(() => console.log('fourth'));
