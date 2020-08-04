'use strict';

var fs = require('fs');

fs.readFile('salaries.txt', function(err, data) {
    if (err) throw err;
    console.log(data.toString());
    var data = data.toString();
    var arr = data.split("\n");
    for (var i = 0; i < arr.length; i++){
        arr[i] = arr[i].split("\t");
        for (var y = 0; y < arr[i].length; y++){
            arr[i][y] = arr[i][y].split(",")
            for (var z = 0; z < arr[i][y].length; z++){
                arr[i][y][z] = parseInt(arr[i][y][z])
            }
            arr[i][y] = arr[i][y][0] + (arr[i][y][1] / 100);
            arr[i][y] = arr[i][y]*1.0124;
            arr[i][y] = arr[i][y].toFixed(2).replace(".", ",");
        }
    }
    console.log(arr)
    fs.writeFile('newSalaries.txt', '', function (err) {
        if (err) throw err;
        for (var i = 0; i < arr.length; i++){
            fs.appendFile('newSalaries.txt', "a)\t" + arr[i].join('\t') + "\n", function (err){
                if (err) throw err;
            })
        }
        console.log("done")

    });
  });
  
fs.readFile('immigrant.txt', function(err, data) {
    if (err) throw err;
    data = data.toString().split("\n")
    console.log(data)
    fs.writeFile('newImmigrant.txt', 'Value\tBefore\tNow\n', function (err) {
        if (err) throw err;
        for (var i = 0; i < data.length; i++){
            if (data[i].indexOf("invandrar") > -1){
                var old = parseInt(data[i+1].split(".")[0])+(parseInt(data[i+1].split(".")[1])/100)
                var now = (old * 1.0124).toFixed(2)
                console.log(old, now, now/old);
                fs.appendFile('newImmigrant.txt', data[i] + "\t" + old + "\t" + now + "\n", function (err){
                    if (err) throw err;
                });
            }
        }
    });
    
});

//var express = require('express')
//express().use(express.static(process.cwd() + '/public')).listen(8080, function(){console.log("Shortest server ever listening")});
