Object.prototype.equals = function(x)
{
  var p;
  for(p in this) {
      if(typeof(x[p])=='undefined') {return false;}
  }

  for(p in this) {
      if (this[p]) {
          switch(typeof(this[p])) {
              case 'object':
                  if (!this[p].equals(x[p])) { return false; } break;
              case 'function':
                  if (typeof(x[p])=='undefined' ||
                      (p != 'equals' && this[p].toString() != x[p].toString()))
                      return false;
                  break;
              default:
                  if (this[p] != x[p]) { return false; }
          }
      } else {
          if (x[p])
              return false;
      }
  }

  for(p in x) {
      if(typeof(this[p])=='undefined') {return false;}
  }

  return true;
}

module("Perseus")

test("empty object", function() {
    var obj = {};
    Perseus.storeObject('empty obj', obj);
    ok(obj.equals(Perseus.lookupObject('empty obj')));

});

test("simple object", function() {
    var obj = {a: "b", "c": "d", 0: 1, "e": null};
    Perseus.storeObject('simple obj', obj);
    ok(obj.equals(Perseus.lookupObject('simple obj')));

});

test("nested object", function() {
    var obj = {a: "b", "c": { ok: "d", 0: { 1: { 2: 3 } } }, "e": null};
    Perseus.storeObject('nested obj', obj);
    ok(obj.equals(Perseus.lookupObject('simple obj')));

});

test("empty array", function() {
    var obj = [];
    Perseus.storeObject('empty array', obj);
    ok(obj.equals(Perseus.lookupObject('empty array')));
});

test("number array", function() {
    var obj = [1, 2, 0, -.4, 1.3e-8];
    Perseus.storeObject('number array', obj);
    ok(obj.equals(Perseus.lookupObject('number array')));
});

test("string array", function() {
    var obj = ["", "a", 'hello', '-1'];
    Perseus.storeObject('string array', obj);
    ok(obj.equals(Perseus.lookupObject('string array')));
});

test("interleaved array", function() {
    var obj = ["", 0, 2, "bye", {}];
    Perseus.storeObject('interleaved array', obj);
    ok(obj.equals(Perseus.lookupObject('interleaved array')));
});

test("nested array", function() {
    var obj = ["", ["a", []], ['hello', ['-1']]];
    Perseus.storeObject('nested array', obj);
    ok(obj.equals(Perseus.lookupObject('nested array')));
});

/*
test("set:add", function() {
  var set = new Set()
  for (var i = 0; i < 100; ++i) {
    set.add(i)
  }
  equal(set.length, 100, "Set must have exactly 100 elements")
  ok(set.contains(99), "99 must be in the set")
  ok(!set.contains(100), "100 must not be in the set")

  for (var i = 50; i < 101; ++i) {
    set.add(i)
  }
  equal(set.length, 101, "Now the set has 101 elements")
  ok(set.contains(100), "100 is now in the set")
  ok(!set.contains(101), "101 is not yet in the set")
})

test("set:remove", function() {
  var set = new Set([1, 2, 3, 3, 3, 4, 5, 6, 7, 8, 8, 9, 10, 10])
  equal(set.length, 10, "Set length must be 10")

  ok(set.contains(3), "3 is in the set")
  set.remove(3)
  equal(set.length, 9, "One element less")
  ok(!set.contains(3), "3 is not in the set")

  set.remove(3)
  equal(set.length, 9, "The same length")
  ok(!set.contains(3), "3 is not here already")
})

test("set:join", function() {
  var set = new Set([1,2,3,4,5])
  var second_set = new Set([3,4,5,6,7,8,9])

  var joined = set.splice(second_set)
  for (var i = 1; i < 10; ++i)
    ok(joined.contains(i), "Joined must contain " + i)
  equal(joined.length, 9, "It must have exactly 9 elements")
  same(joined.items(), ["1","2","3","4","5","6","7","8","9"])
  equal(set.length, 5, "First set is left intact")
  equal(second_set.length, 7, "Second set as well")
})


test("set:pick", function() {
  var set = new Set([1,2,3,4,5,6])

  equal(set.length, 6)
  var failCounter = 10
  var iterCounter = 0
  while (!set.isEmpty()) {
    ++iterCounter
    console.log(set.pick())
    if (--failCounter == 0) break
  }
  equal(iterCounter, 6, "Exactly 6 iterations expected")
  equal(set.length, 0)
})
*/
