var fs = require('fs');
fs.readFile('ENGLISH.MMF', function(err, data) {
  if (err) throw err;
  var array = data.toString().split("MMMMM----- Recipe via UNREGISTERED Meal-Master (tm)").map(x => x.split("MMMMM----- Recipe via Meal-Master (tm)")).flat();
  var a = [];

  var indexing = 1;

  for (i in array) {
    if (array[i].length > 1) {

      ((array[i].replace(/-/g, '').replace(/[^\S\r\n]+/g, ' ').split("MMMMM")).filter(x => x.length > 2));
      a.push(((array[i].replace(/-/g, '').replace(/[^\S\r\n]+/g, ' ').split("MMMMM")).filter(x => x.length > 2)))
      //console.log('=====================');
    }
  }

  a = Object.assign({}, a.map(x => Object.assign({}, x)));
  //console.log(a)
  for (const keys in a) {
    v = a[keys];
    l = Object.keys(v).length;
    //console.log(v)
    for (const key in [...Array(l).keys()]) {
      //v[key] = v[key][0].split('/n/r')
      //console.log(keys + ': ' + key)
      v[key] = Object.assign({}, v[key].split("\r\n \r\n"))
      if (v[key][1]) {
        h = {};
        v[key][1].split("\r\n").map((x, idx) => h[x.split(":")[0].trim()] = x.split(":")[1])
      }
      v[key][1] = h;
    }
    a[keys] = v;

  }
  console.log(JSON.stringify(a, null, 4))
});