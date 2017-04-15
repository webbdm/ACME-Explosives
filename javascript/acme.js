$(document).ready(function() {

    var dataArray = [];


    function writeDOM() {
        var domString = "";
        for (var i = 0; i < dataArray.length; i++) {
            domString += `<h1>${dataArray[i].type}</h1>`;
        }
        //$("#promises").append(domString);
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

    // //this is the most ideal method
    // categoriesJSON().then(function(jsonData1){
    //     console.log("categories",jsonData1);
    //     dataArray = jsonData1;
    //     return typesJSON();
    // }).then(function(jsonData2){
    //     console.log("types",jsonData2);
    //     jsonData2.forEach(function(data){
    //         dataArray.push(data);
    //     })
    //     return productsJSON();
    // }).then(function(jsonData3){
    //     console.log("products",jsonData3);
    //     jsonData3.forEach(function(data){
    //         dataArray.push(data);
    //     })
    //     writeDOM();
    //     console.log("Combo Array", dataArray);
    // });

    //this method works the best for this solution

    function getData() {
        Promise.all([categoriesJSON(), typesJSON(), productsJSON()])
            .then(function(resultz) {
                console.log("resultz", resultz);
                resultz.forEach(function(ajaxCalls) {

                    dataArray.push(ajaxCalls);

                    // ajaxCalls.forEach(function(data) {
                    //     dataArray.push(data);
                    // })
                })
                console.log(dataArray);
                writeDOM();
            })
    }

    $("#dropFireworks").click(function(e){
        console.log($(this).text());
    });
    $("#dropDemo").click(function(e){
        console.log($(this).text());
    });


});
