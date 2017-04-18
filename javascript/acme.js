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
        var productString = "";
        var cats = resultz[0];
        var types = resultz[1];
        var products = resultz[2];

        cats.forEach(function(currentCategory) {
            if (currentCategory.name === clickedCat) {
                types.forEach(function(currentType) {
                    if (currentType.category === currentCategory.id) {
                        $.each(products, function(firstKey, firstValue) {
                            $.each(firstValue, function(key, value) {
                                if (value.type === currentType.id) {
                                    productString += writeProduct(currentCategory.name, currentType.name, value);
                                }
                            });
                        });
                    }
                })
            }
        })
        $("#productDIV").html(productString);
    }

    function writeProduct(category, type, firework) {
        var newFirework = `
        <div class="col-md-4">
            <div class="thumbnail">
                <img src="" alt="">
                <div class="caption">
                    <h3>${firework.name}</h3>
                    <p>${type} / ${category}</p>
                    <p>${firework.description}</p>
                </div>
            </div>
        </div>`;
        return newFirework
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
                resultz.forEach(function(ajaxCalls) {
                    })
                writeDOM(clickedCat, resultz);
            })
    }

});
