var fs = require('fs');
var fse = require('fs-extra');
var result;
fs.readdirSync("./lg32965").forEach(file => {
    //Print file name
    //console.log(file)
    var output_name = file.replace('.mmf','')

    /*
    Run this to print the file contents
    console.log(readFileSync(".levels/" + file, {encoding: "utf8"}))
    */

fs.readFile(`./lg32965/${file}`, function (err, data) {
    if (err) throw err;
    //var a = {};
  var map1 = function(z) {return z.split('\r\n \r\n').map(map2)};
  var map2 = function(y) {return y.split('\r\n').map(map3)};
  var map3 = function(x) {return x.trim() .split(":")};
    var array = data.toString()
        .split(/MMMMM----- R.*\r\n \r\n/)
        .map(map1);
    result = array.filter(elm => elm.length > 1);
    var count = 0;
    var store;
    var flag;
    var map_x1 = function (s) {
        store = {};
        flag = 0;
        return s.replace(/-+/g, "-")
            .replace('MMMMM', '');
    };
    var map_x2 = function (elm, index, elements) {
        if (flag == 1) {
            store[count].steps.push(elm);
        }
        if (elm.match(/-(.*?)-/)) {
            count++;
            if (elm.replaceAll('-', '')) {
                store[count] = {};
                store[count].step_title = elm.replaceAll('-', '');
                store[count].steps = [];
            }
            flag = 1;
        }

        if (flag == 1 && (elements[index + 1] ? elements[index + 1].match(/-(.*?)-/) : 0)) {
            flag = 0;
            return store[count];

        } else if (flag == 1 && index + 1 === elements.length) {
            return store[count];
        } else if (flag != 0) {
            return [];
        }
        if (flag == 0 && elm.length != 0) {
            //console.log(elm)
            return elm;
        }
        return store[count];
    };
    var filter_x = function (z) {
        if (Object.keys(z)
            .length > 2) {
            return true;
        }
    };
    var map_reults = function (x, index, elments) {
        x[0] = Object.fromEntries(x[0]);
        x[1] = x[1].flat()
            .map(map_x1)
            .flatMap(map_x2);


        x[2] = x[2].flat();
        x = x.filter(filter_x);
        elments[index] = x;
        //console.log(x)
    };
    result.map(map_reults);
    //console.log(JSON.stringify(result, null, 2));
    //result.map(x => x.map(y => console.log(y.length)));
    fse.outputFile(`reults/${output_name}.txt`,
            JSON.stringify(result, null, 2))
        .then(() => {
            console.log('The file has been saved!');
        })
        .catch(err => {
            console.error(err);
        });
});
  })
