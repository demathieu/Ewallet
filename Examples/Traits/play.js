var Trait = require('traits.js');

var EnumerableTrait = Trait({
  // the trait requires these properties
  forEach: Trait.required,

  // the trait provides these properties:
  map: function(fun) {
    var seq = [];
    this.forEach(function(e,i) {
      seq.push(fun(e,i));
    });
    return seq;
  },
  filter: function(pred) {
    var seq = [];
    this.forEach(function(e,i) {
      if (pred(e,i)) {
        seq.push(e);
      }
    });
    return seq;
  },
  reduce: function(init, fun) {
    var result = init;
    this.forEach(function(e,i) {
      result = fun(result, e, i);
    });
    return result;
  }
});

function makeInterval(min, max) {
  return Trait.create(Object.prototype,
    Trait.compose(
      EnumerableTrait,
      Trait({
        start: min,
        end: max,
        size: max - min - 1,
        toString: function() { return ''+min+'..!'+max; },
        contains: function(e) { return (min <= e) && (e < max); },
        forEach: function(consumer) {
          for (var i = min; i < max; i++) {
            consumer(i,i-min);
          }
        }
      })));
}

var i = makeInterval(0,5);
console.log(i.start) // 0
console.log(i.end) // 5
console.log(i.reduce(0, function(a,b) { return a+b; })) // 0+1+2+3+4 = 10