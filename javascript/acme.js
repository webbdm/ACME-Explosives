$(document).ready(function() {

    var dataArray = [];

    $.ajax("./db/categories.json").done(function(data1) {
        makeDropdown(data1);
    }).fail(function(error) {
        console.log(error);
    })

    // Dynamically generate the dropdown menu content
    function makeDropdown(data1) {
        catList = data1.categories;

        string = "";
        catList.forEach(function(val, index) {
            $('#drop').append(`<li><a href="#" id="drop${val.name}">${val.name}</a></li>`);
        });

        $("#dropFireworks").click(function(e) {
            var clickedCat = $(this).text(); // Note: Fireworks is uppercase
            getData(clickedCat);
        });
        $("#dropDemolition").click(function(e) {
            var clickedCat = $(this).text(); // Note: Demolition is uppercase
            getData(clickedCat);
        });
    }

    function writeDOM(clickedCat, resultz) {
        var domString = "";
        //console.log(clickedCat, resultz);

        var cats = resultz[0];
        var types = resultz[1];
        var products = resultz[2];
        //console.log(cats, types, products);

        cats.forEach(function(currentCategory) {
            if (currentCategory.name === clickedCat) {
                types.forEach(function(currentType) {
                    if (currentType.category === currentCategory.id) {
                        //console.log(products);
                        $.each(products, function(firstKey, firstValue) {
                            //console.log(key, value);
                            $.each(firstValue, function(key, value) {
                                //console.log(value.type);
                                if (value.type === currentType.id) {
                                    console.log(value);
                                }
                            });
                        });
                    }
                })
            }
        })






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
                resolve(data3.products);
            }).fail(function(error3) {
                reject(error3);
            })
        })
    };

    function getData(clickedCat) {
        Promise.all([categoriesJSON(), typesJSON(), productsJSON()])
            .then(function(resultz) {
                //console.log("resultz", resultz);
                resultz.forEach(function(ajaxCalls) {
                        //console.log(ajaxCalls);
                        //dataArray.push(ajaxCalls);
                    })
                    //console.log(dataArray);
                writeDOM(clickedCat, resultz);
            })
    }

});
