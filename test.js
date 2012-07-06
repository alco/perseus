function isArray(x) {
    return Array.isArray(x) || toString.call(x) === '[object Array]';
}

///

module("Perseus.object")

test("empty object", function() {
    var key = 'empty obj';
    var obj = {};
    Perseus.storeObject(key, obj);

    var new_obj = Perseus.lookupObject(key);
    deepEqual(new_obj, obj);
    notDeepEqual(new_obj, {'':''});
    notDeepEqual(new_obj, []);

});

test("simple object", function() {
    var key = 'simple obj';
    var obj = {a: "b", "c": "d", 0: 1, "e": null};
    Perseus.storeObject(key, obj);

    var new_obj = Perseus.lookupObject(key);
    deepEqual(new_obj, obj);
    strictEqual(new_obj.e, obj.e);
    strictEqual(new_obj[0], obj[0]);
});

test("object with functions", function() {
    var key = 'obj w/ fun';
    var obj = {
        func: function(x) {
            this.y = x;
            return -x;
        },
        g: function() {
            return this.func(-1);
        },
    };
    Perseus.storeObject(key, obj);

    var new_obj = Perseus.lookupObject(key);
    strictEqual(typeof(new_obj.func), typeof(obj.func));
    strictEqual(typeof(new_obj.g), typeof(obj.g));
    var props = [];
    for (var prop in new_obj)
        props.push(prop);
    strictEqual(props.length, 2);

    strictEqual(new_obj.func(1), -1);
    strictEqual(new_obj.y, 1);
    strictEqual(new_obj.g(), 1);
    strictEqual(new_obj.y, -1);
});

test("object with arrays", function() {
    var key = 'obj w/ arrays';
    var obj = {
        1: [],
        "a": [1, 2, 3],
        "b": ['a', 'b', 'c'],
        "c": [[[[], []], []], []],
    };
    Perseus.storeObject(key, obj);

    var new_obj = Perseus.lookupObject(key);
    ok(isArray(new_obj[1]));
    ok(isArray(new_obj.a));
    ok(isArray(new_obj.b));
    ok(isArray(new_obj.c));
    deepEqual(new_obj, obj);
});

test("nested object", function() {
    var key = 'nested obj';
    var obj = {a: "b", "c": { ok: "d", 0: { 1: { 2: 3 } } }, "e": null};
    Perseus.storeObject(key, obj);

    var new_obj = Perseus.lookupObject(key);
    deepEqual(new_obj, obj);
});

///

module("Perseus.array")

test("empty array", function() {
    var key = 'empty array';
    var obj = [];
    Perseus.storeObject(key, obj);

    var new_obj = Perseus.lookupObject(key);
    ok(isArray(new_obj));
    strictEqual(new_obj.length, 0);
});

test("number array", function() {
    var key = 'number array';
    var obj = [1, 2, 0, -.4, 1.3e-8];
    Perseus.storeObject(key, obj);

    var new_obj = Perseus.lookupObject(key);
    ok(isArray(new_obj));
    deepEqual(new_obj, obj);
    strictEqual(new_obj.length, obj.length);
});

test("string array", function() {
    var key = 'string array';
    var obj = ["", "a", 'hello', '-1'];
    Perseus.storeObject(key, obj);

    var new_obj = Perseus.lookupObject(key);
    ok(isArray(new_obj));
    deepEqual(new_obj, obj);
    strictEqual(new_obj.length, obj.length);
});

test("interleaved array", function() {
    var key = 'interleaved array';
    var obj = ["", 0, 2, "bye", {}];
    Perseus.storeObject(key, obj);

    var new_obj = Perseus.lookupObject(key);
    ok(isArray(new_obj));
    deepEqual(new_obj, obj);
    strictEqual(new_obj.length, obj.length);
});

test("nested array", function() {
    var key = 'nested array';
    var obj = ["", ["a", []], ['hello', ['-1']]];
    Perseus.storeObject(key, obj);

    var new_obj = Perseus.lookupObject(key);
    ok(isArray(new_obj));
    deepEqual(new_obj, obj);
    strictEqual(new_obj.length, obj.length);
});
