// function Counter() {
//   this.num_ = 0;

//   Object.defineProperty(this, 'num', {
//     get() {
//       return this.num_;
//     },
//     set(newValue) {
//       document.getElementById('container').innerHTML = newValue;
//       this.num_ = newValue;
//     },
//   });

//   this.getCount = () => {
//     console.log(this.num);
//   };
// }

// const count1 = new Counter();

const button = document.getElementById('button');
const container = document.getElementById('container');
const count = {
  num: 0,
};

button.addEventListener('click', function () {
  count.num += 1;
});

(function () {
  function watch(obj, name, func) {
    let value = obj[name];

    Object.defineProperty(obj, name, {
      get: function () {
        return value;
      },
      set: function (newValue) {
        value = newValue;
        func(value);
      },
    });
  }
  this.watch = watch;
})();

watch(count, 'num', (newValue) => {
  container.innerHTML = newValue;
});
