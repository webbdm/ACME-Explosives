$(document).ready(function() {

    var dataArray = [];


    function writeDOM() {
        var domString = "";
    }

    var categoriesJSON = function() {
        return new Promise(function(resolve, reject) {
            $.ajax("./db/categories.json").done(function(data1) {
                resolve(data1.categories);
            }).fail(function(error1) {
                reject(error1);
            })
        })
    };

    var typesJSON = function() {
        return new Promise(function(resolve, reject) {
            $.ajax("./db/types.json").done(function(data2) {
                resolve(data2.types);
            }).fail(function(error2) {
                reject(error2);
            })
        })
    };

    var productsJSON = function() {
        return new Promise(function(resolve, reject) {
            $.ajax("./db/products.json").done(function(data3) {
                resolve(data3.products[0]);
            }).fail(function(error3) {
                reject(error3);
            })
        })
    };

    //this method works the best for this solution

    function getData() {
        Promise.all([categoriesJSON(), typesJSON(), productsJSON()])
            .then(function(resultz) {
                console.log("resultz", resultz);
                resultz.forEach(function(ajaxCalls) {
                        console.log(ajaxCalls);
                        //dataArray.push(ajaxCalls);
                    })
                    //console.log(dataArray);
                writeDOM();
            })
    }

    $("#dropFireworks").click(function(e) {
        var clickedCat = $(this).text();
        console.log(clickedCat);
        getData(clickedCat);
    });
    $("#dropDemo").click(function(e) {
        var clickedCat = $(this).text();
        console.log(clickedCat);
        getData(clickedCat);
    });


});
