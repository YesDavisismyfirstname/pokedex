
$('document').ready(


    function () {
        var current_page = 1;
        var objCnt = 807;
        var objPerPg = 30;

        populatePageNums(getPageNums(objCnt, objPerPg));
        getPokeDex(30, current_page);

        // Style dropdown animation for all Menus with hmenu classes. 
        // Assumes that the children relationships are structured using the default html formatting provided in index
        $("[class^='hmenu']").children("div").hover(function () {
            $(this).children("div").slideToggle(250)
        });

        // Styles simple image toggle option. Any item with class of toggle should be placed 
        // immediately following the div you wish to collapse.
        $("[class^='toggle']").click(function () {
            $(this).prev("div").slideToggle(250);
            $(this).toggleClass('rotate180');

        });

        $("#pager").on('click', "button", function () {
            current_page = $(this).attr('value');
            getPokeDex(objPerPg, (current_page * objPerPg) - objPerPg + 1);
            populatePageNums(getPageNums(objCnt, objPerPg));

        });
        function getPokeDex(count, startNum) {
            var pokedex = "";
            for (var i = startNum; i < count + startNum; i++) {
                pokedex += '<img' + " id=" + i + ' src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + i + '.png" alt=""></img>'
            }
            document.getElementById("pokedex").innerHTML = pokedex;
        };

        function populatePageNums(arr) {
            var pageNums = "";
            var leftVal = (current_page == 1) ? 1 : current_page - 1;
            console.log(arr.length);
            var rightVal = (leftVal == (Math.floor(objCnt / objPerPg))) ? (Math.floor(objCnt / objPerPg) + 1) : ((current_page == 1) ? leftVal + 1 : leftVal + 2);
            for (var i = 0; i < arr.length; i++) {
                pageNums += ((i == 0) ? '<button type = "button" value="' + leftVal + '">' + "<<<" + '</button>' +
                    '<button type = "button" value="' + 1 + '">' + "1.." + '</button>' :
                    ((i == arr.length - 1) ? '<button type = "button" value="' + (Math.floor(objCnt / objPerPg) + 1) + '">' + ".." + (Math.floor(objCnt / objPerPg) + 1) + '</button>'
                        + '<button type = "button" value="' + rightVal + '">' + ">>>" + '</button>'
                        : '<button type = "button" value="' + arr[i] + '">' + arr[i] + '</button>'));
            }
            document.getElementById("pager").innerHTML = pageNums;
            $("button[value=" + current_page + "]").toggleClass("current");
        };
        function getPageNums(objCount, objPerPage) {
            var pageCount = Math.floor(objCount / objPerPage) + 1;
            var displayed_pages = [];
            for (var i = 1; i <= 7; i++)
                if (current_page <= 3 && current_page > 0) {
                    if (i == 1) {
                        displayed_pages.push(pageCount);
                    } else {
                        displayed_pages.push(i);
                    }
                } else if (current_page >= pageCount - 3) {
                    if (i == 1) {
                        displayed_pages.push(1);
                    } else {
                        displayed_pages.push(pageCount - 7 + i);
                    }
                } else if (current_page > 3 && current_page < pageCount - 3) {
                    if (i == 1) {
                        displayed_pages.push(1)
                    }
                    else if (i == 7) {
                        displayed_pages.push(pageCount);
                    } else {
                        displayed_pages.push(current_page - 3 + i);
                    }
                }
            return displayed_pages;
        };


        $("#pokedex").on('click', "img", function () {
            var pid = $(this).attr('id');
            var pokestats = "";
            $.get("https://pokeapi.co/api/v2/pokemon/" + pid + "/", function (res) {
                pokestats += "<h2>" + res.name.substr(0,1).toUpperCase() + res.name.substr(1) + "</h2>";
                pokestats += '<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pid + '.png" alt=""></img>';
                pokestats += "<h4>Types</h4><ul>";
                for (i = 0; i < res.types.length; i++) {
                    pokestats += "<li>" + res.types[i].type.name + "</li>";
                };
                pokestats += "</ul><h4>Height</h4>";
                pokestats += "<p>" + res.height + "</p>";
                pokestats += "<h4>Weight</h4>";
                pokestats += "<p>" + res.weight + "</p>";
                $('#pokestat').html(pokestats);
            }, "json");
            
        });
    });