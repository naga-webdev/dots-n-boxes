// JavaScript source code

var grid;
var last = "";
var rows;

function createTable() {

    var row = document.getElementById("grid");
     rows = row.options[row.selectedIndex].value;
    var cols = rows;


    grid = new Array(2 * rows - 1);
    for (var i = 0; i < grid.length; i++) {
        grid[i] = new Array(2 * cols - 1);
    }

    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid.length; j++) {
            grid[i][j] = 1;
        }
    }

    var table = "<table id='gameTable' cellpadding='0' cellspacing='0' border='0' align='center'>";

    for (var i = 0; i < (2 * rows) - 1; i++) {

        table += "<tr>";

        for (var j = 0; j < (2 * cols) - 1; j++) {


            if (i % 2 == 0 && j % 2 == 0)
                table += "<td><img id='dot' src='image/black.gif'></td>";
            else if (i % 2 == 0 && j % 2 != 0)
                table += "<td class='horizantalLine' id='" + i + "-" + j + "' onclick=makeHorizontalLine('" + i + "-" + j + "','P') ></td>";
            else if (i % 2 != 0 && j % 2 == 0)
                table += "<td class='verticalLine' id='" + i + "-" + j + "' onclick=makeVerticalLine('" + i + "-" + j + "','P') ></td>";
            else if (i % 2 != 0 && j % 2 != 0)
                table += "<td class='square' id='" + i + "-" + j + "' ></td>";
        }
        table += "</tr>";
    }
    table += "</table>";

    document.getElementById("table").innerHTML = table;

    document.getElementById("player").value = 0;

    document.getElementById("comp").value = 0;

    if (document.getElementById("computer").checked)
        computerMove();
}

function clearAll() {
    window.location = "SquareIT.html";
}


function hdottedline(location) {

    var a = location.split("-");
    var r = parseInt(a[0]);
    var c = parseInt(a[1]);
    var dothline = "<img id='dhline' src='image/hline.png'>";

    if (grid[r][c] != 0) {
        document.getElementById(location).innerHTML = dothline;
    }
}

function vdottedline(location) {

    var a = location.split("-");
    var r = parseInt(a[0]);
    var c = parseInt(a[1]);
    var dotvline = "<img id='dvline' src='image/vline.png'>";

    if (grid[r][c] != 0) {
        document.getElementById(location).innerHTML = dotvline;
    }
}

function dismissline(location) {

    var a = location.split("-");
    var r = parseInt(a[0]);
    var c = parseInt(a[1]);

    if (grid[r][c] != 0) {
        document.getElementById(location).innerHTML = "";
    }
}

function changeColor(location) {

    var l = location.split("-");
    var r = parseInt(l[0]);
    var c = parseInt(l[1]);

    if (r % 2 == 0 && c % 2 != 0)
        document.getElementById(location).innerHTML = "<img id='line' src='image/red.gif'>";
    else if (r % 2 != 0 && c % 2 == 0)
        document.getElementById(location).innerHTML = "<img id='vline' src='image/red.gif'>";
}


function checkScore(user) {

    var playerScore = 0;
    var compScore = 0;

    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid.length; j++) {
            if (i % 2 != 0 && j % 2 != 0) {
                if (grid[i][j] == "P")
                    playerScore++;
                else if (grid[i][j] == "C")
                    compScore++;

            }
        }
    }

    if (user == "P")
        return playerScore;
    else
        return compScore;
}


function isFinished() {
    
    var w = checkDone();
    var done = false;
    if (w != "-") {
        if (w == "P")
		{
			var name = document.getElementById("name").value;
			if(name == "")
				name = "Player";
			var string = "Hurray!! "+name+" you have won the game!"+"<img src='image/won.gif'>"
			
			BootstrapDialog.show({
            title: 'Square It',
            message: ''+string
			});
		}
        else if (w == "C")
		{
			BootstrapDialog.show({
            title: 'Square It',
            message: 'Computer has won the game'
			});
		}
        else
		{
			BootstrapDialog.show({
            title: 'Square It',
            message: 'Its a draw game'
			});
		}

        done = true;
    }

    return done;
}

function updateProgress() {

    var player = eval(checkScore("P"));
    var comp = eval(checkScore("C"));
    var p = (player / ((rows - 1) * (rows - 1)));
    var c = (comp / ((rows - 1) * (rows - 1)));

    player = Math.ceil(p * 100);
    comp = Math.floor(c * 100);

    document.getElementById("perPlayer").style.width = player + "%";
    document.getElementById("perPlayer").innerHTML = player + "%";

    document.getElementById("perComp").style.width = comp + "%";
    document.getElementById("perComp").innerHTML = comp + "%";

}

function play() {
    var audio = document.getElementById("audio");
    audio.play();
}

function swapUser() {
    document.getElementById("playerBorder").style.border = "5px solid red";
    document.getElementById("compBorder").style.border = "0px";
}

function swapComp() {
    document.getElementById("playerBorder").style.border = "0px";
    document.getElementById("compBorder").style.border = "5px solid red";
}

function makeHorizontalLine(location, user) {
    var a = location.split("-");
    var r = parseInt(a[0]);
    var c = parseInt(a[1]);

    if (r % 2 == 0 && c % 2 != 0 && grid[r][c] == 1) {
        grid[r][c] = 0;

        if (last != "") {
            changeColor(last);
            last = "";
        }

        if (user == "P") {
            
            document.getElementById(location).innerHTML = "<img id='line' src='image/blue.gif'>";

            if (checkIfSquare(location, user)) {

                updateProgress();

                //swapUser();

                document.getElementById("player").value = checkScore(user);

                isFinished();


                
            }
            else{
                //swapComp();
                setTimeout(computerMove, 200);
            }
        }
        else {
            last = location;
            document.getElementById(location).innerHTML = "<img id='line' src='image/green.gif'>";

            if (checkIfSquare(location, user)) {

                updateProgress();

                //swapComp();

                changeColor(last);
                last = "";
                
                document.getElementById("comp").value = checkScore(user);

                if (isFinished() == false) {
                    //swapComp();
                    setTimeout(computerMove(), 200);
                }
            }

        }
    }
}



function makeVerticalLine(location, user) {
    var b = location.split("-");
    var r = parseInt(b[0]);
    var c = parseInt(b[1]);

    if (r % 2 != 0 && c % 2 == 0 && grid[r][c] == 1) {
        grid[r][c] = 0;

        if (last != "") {
            changeColor(last);
            last = "";
        }


        if (user == "P") {
            document.getElementById(location).innerHTML = "<img id='vline' src='image/blue.gif'>";

            if (checkIfSquare(location, user)) {

                updateProgress();

                //swapUser();

                document.getElementById("player").value = checkScore(user);

                isFinished();
            }
            else {
                //swapComp();
                setTimeout(computerMove, 200);
            }

        }
        else {
            last = location;
            document.getElementById(location).innerHTML = "<img id='vline' src='image/green.gif'>";

            if (checkIfSquare(location, user)) {

                updateProgress();

                //swapComp();

                changeColor(last);
                last = "";

                document.getElementById("comp").value = checkScore(user);

                if(isFinished()==false) {
                    //swapComp();
                    setTimeout(computerMove, 200);
                }

            }


        }
    }
}


function checkIfSquare(location, user) {
    var a = location.split("-");
    var r = parseInt(a[0]);
    var c = parseInt(a[1]);


    var found = false;

    var m;
    var n;
    var id;
    var rc;


    if ((r % 2 == 0 && c % 2 != 0) || (r % 2 != 0 && c % 2 == 0)) {

        var x = 0;
        var y = 0;

        if (r % 2 == 0 && c % 2 != 0) {

            m = eval(r + 1) + "-" + c;
            n = eval(r - 1) + "-" + c;

            rc = 1;

            if (r == 0)
                x = !grid[r + 1][c - 1] && !grid[r + 1][c + 1] && !grid[r + 2][c];
            else if (r == (grid.length - 1))
                y = !grid[r - 1][c - 1] && !grid[r - 1][c + 1] && !grid[r - 2][c];
            else {
                x = !grid[r + 1][c - 1] && !grid[r + 1][c + 1] && !grid[r + 2][c];
                y = !grid[r - 1][c - 1] && !grid[r - 1][c + 1] && !grid[r - 2][c];
            }
        }
        else if (r % 2 != 0 && c % 2 == 0) {

            m = r + "-" + eval(c + 1);
            n = r + "-" + eval(c - 1);

            rc = 2;

            if (c == 0)
                x = !grid[r - 1][c + 1] && !grid[r + 1][c + 1] && !grid[r][c + 2];
            else if (c == (grid.length - 1))
                y = !grid[r - 1][c - 1] && !grid[r + 1][c - 1] && !grid[r][c - 2];
            else {
                x = !grid[r - 1][c + 1] && !grid[r + 1][c + 1] && !grid[r][c + 2];
                y = !grid[r - 1][c - 1] && !grid[r + 1][c - 1] && !grid[r][c - 2];
            }
        }


        if (x == 1 && y == 1) {

            found = true;

            if (user == "P") {
                document.getElementById(m).innerHTML = "<img id='square' src='image/human.gif'>";
                document.getElementById(n).innerHTML = "<img id='square' src='image/human.gif'>";


                if (rc == 1) {
                    grid[eval(r + 1)][c] = "P";
                    grid[eval(r - 1)][c] = "P";
                }
                else if (rc == 2) {
                    grid[r][eval(c + 1)] = "P";
                    grid[r][eval(c - 1)] = "P";
                }

            }
            else {
                document.getElementById(m).innerHTML = "<img id='square' src='image/comp.gif'>";
                document.getElementById(n).innerHTML = "<img id='square' src='image/comp.gif'>";

                if (rc == 1) {
                    grid[eval(r + 1)][c] = "C";
                    grid[eval(r - 1)][c] = "C";
                }
                else if (rc == 2) {
                    grid[r][eval(c + 1)] = "C";
                    grid[r][eval(c - 1)] = "C";
                }
            }

        }

        else if (x == 1 || y == 1) {

            if (x == 1)
                id = m;
            else if (y == 1)
                id = n;

            found = true;

            if (user == "P") {
                document.getElementById(id).innerHTML = "<img id='square' src='image/human.gif'>";

                if (rc == 1) {
                    if (x == 1)
                        grid[eval(r + 1)][c] = "P";
                    else if (y == 1)
                        grid[eval(r - 1)][c] = "P";
                }
                else if (rc == 2) {
                    if (x == 1)
                        grid[r][eval(c + 1)] = "P";
                    else if (y == 1)
                        grid[r][eval(c - 1)] = "P";
                }
            }
            else {
                document.getElementById(id).innerHTML = "<img id='square' src='image/comp.gif'>";

                if (rc == 1) {
                    if (x == 1)
                        grid[eval(r + 1)][c] = "C";
                    else if (y == 1)
                        grid[eval(r - 1)][c] = "C";
                }
                else if (rc == 2) {
                    if (x == 1)
                        grid[r][eval(c + 1)] = "C";
                    else if (y == 1)
                        grid[r][eval(c - 1)] = "C";
                }
            }


        }
    }
    return found;
}

function checkDone() {
    var done = true;
    var playerScore = 0;
    var compScore = 0;

    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid.length; j++) {
            if ((i % 2 != 0 && j % 2 != 0) && done) {
                if (grid[i][j] == 1)
                    done = false;
            }
        }
    }

    if (done) {
        for (var i = 0; i < grid.length; i++) {
            for (var j = 0; j < grid.length; j++) {
                if ((i % 2 != 0 && j % 2 != 0) && done) {
                    if (grid[i][j] == "P")
                        playerScore++;
                    else if (grid[i][j] == "C")
                        compScore++;

                }
            }
        }

        if (playerScore > compScore)
            return "P";
        else if (playerScore < compScore)
            return "C";
        else
            return "D";
    }
    else {
        return "-";
    }
}


function computerMove() {


    var pos0 = new Array();
    var pos1 = new Array();
    var pos2 = new Array();
    var pos3 = new Array();
    var pos4 = new Array();

    for (var yrow = 0; yrow < grid.length; yrow++) {
        for (var ycol = 0; ycol < grid[yrow].length; ycol++) {
            if (yrow % 2 == 1 && ycol % 2 == 1) {
                if (!grid[yrow - 1][ycol] && !grid[yrow + 1][ycol] && !grid[yrow][ycol - 1] && !grid[yrow][ycol + 1]) {
                    pos4[pos4.length] = yrow + "-" + ycol;
                }
                else if (!grid[yrow - 1][ycol] && !grid[yrow + 1][ycol] && !grid[yrow][ycol - 1]) {
                    pos3[pos3.length] = yrow + "-" + eval(ycol + 1);
                }
                else if (!grid[yrow - 1][ycol] && !grid[yrow + 1][ycol] && !grid[yrow][ycol + 1]) {
                    pos3[pos3.length] = yrow + "-" + eval(ycol - 1);
                }
                else if (!grid[yrow - 1][ycol] && !grid[yrow][ycol - 1] && !grid[yrow][ycol + 1]) {
                    pos3[pos3.length] = eval(yrow + 1) + "-" + ycol;
                }
                else if (!grid[yrow + 1][ycol] && !grid[yrow][ycol - 1] && !grid[yrow][ycol + 1]) {
                    pos3[pos3.length] = eval(yrow - 1) + "-" + ycol;
                }
                else if (!grid[yrow - 1][ycol] && !grid[yrow + 1][ycol]) {
                    pos2[pos2.length] = yrow + "-" + eval(ycol - 1);
                    pos2[pos2.length] = yrow + "-" + eval(ycol + 1);
                }
                else if (!grid[yrow - 1][ycol] && !grid[yrow][ycol - 1]) {
                    pos2[pos2.length] = eval(yrow + 1) + "-" + ycol;
                    pos2[pos2.length] = yrow + "-" + eval(ycol + 1);
                }
                else if (!grid[yrow - 1][ycol] && !grid[yrow][ycol + 1]) {
                    pos2[pos2.length] = eval(yrow + 1) + "-" + ycol;
                    pos2[pos2.length] = yrow + "-" + eval(ycol - 1);
                }
                else if (!grid[yrow + 1][ycol] && !grid[yrow][ycol - 1]) {
                    pos2[pos2.length] = eval(yrow - 1) + "-" + ycol;
                    pos2[pos2.length] = yrow + "-" + eval(ycol + 1);
                }
                else if (!grid[yrow + 1][ycol] && !grid[yrow][ycol + 1]) {
                    pos2[pos2.length] = eval(yrow - 1) + "-" + ycol;
                    pos2[pos2.length] = yrow + "-" + eval(ycol - 1);
                }
                else if (!grid[yrow][ycol - 1] && !grid[yrow][ycol + 1]) {
                    pos2[pos2.length] = eval(yrow + 1) + "-" + ycol;
                    pos2[pos2.length] = eval(yrow - 1) + "-" + ycol;
                }
                else if (!grid[yrow - 1][ycol]) {
                    pos1[pos1.length] = eval(yrow + 1) + "-" + ycol;
                    pos1[pos1.length] = yrow + "-" + eval(ycol - 1);
                    pos1[pos1.length] = yrow + "-" + eval(ycol + 1);
                }
                else if (!grid[yrow + 1][ycol]) {
                    pos1[pos1.length] = eval(yrow - 1) + "-" + ycol;
                    pos1[pos1.length] = yrow + "-" + eval(ycol - 1);
                    pos1[pos1.length] = yrow + "-" + eval(ycol + 1);
                }
                else if (!grid[yrow][ycol - 1]) {
                    pos1[pos1.length] = eval(yrow + 1) + "-" + ycol;
                    pos1[pos1.length] = eval(yrow - 1) + "-" + ycol;
                    pos1[pos1.length] = yrow + "-" + eval(ycol + 1);
                }
                else if (!grid[yrow][ycol + 1]) {
                    pos1[pos1.length] = eval(yrow + 1) + "-" + ycol;
                    pos1[pos1.length] = eval(yrow - 1) + "-" + ycol;
                    pos1[pos1.length] = yrow + "-" + eval(ycol - 1);
                }
                else {
                    pos0[pos0.length] = eval(yrow + 1) + "-" + ycol;
                    pos0[pos0.length] = eval(yrow - 1) + "-" + ycol;
                    pos0[pos0.length] = yrow + "-" + eval(ycol - 1);
                    pos0[pos0.length] = yrow + "-" + eval(ycol + 1);
                }
            }
        }
    }

    var found = false;
    if (pos3.length > 0) {
        var r = parseInt(pos3[0].split("-")[0]);
        var c = parseInt(pos3[0].split("-")[1]);

        if (r % 2 == 0 && c % 2 == 1) {
            makeHorizontalLine(pos3[0], 'C');
            //swapUser();
            return;
        }
        else {
            makeVerticalLine(pos3[0], 'C');
            //swapUser();
            return;
        }
    }

    if (pos0.length > 0 || pos1.length > 0) {
        var location;
        var redo = false;
        do {
            var inP1 = false;
            redo = false;
            location = Math.floor(Math.random() * (pos0.length + pos1.length));
            if (location >= pos0.length) {
                location = location - pos0.length
                inP1 = true;
            }
            else {
                inP1 = false;
            }

            if ((!inP1 && pos2.indexOf(pos0[location]) != -1) || (inP1 && pos2.indexOf(pos1[location]) != -1)) {
                redo = true;
                if (inP1) {
                    pos1[location] = pos1[pos1.length - 1];
                    pos1.length--;
                }
                else {
                    pos0[location] = pos0[pos0.length - 1];
                    pos0.length--;
                }
            }
        }
        while (redo);

        if (!inP1) {
            var r = parseInt(pos0[location].split("-")[0]);
            var c = parseInt(pos0[location].split("-")[1]);

            if (r % 2 == 0 && c % 2 == 1) {
                makeHorizontalLine(pos0[location], 'C');
                //swapUser();
                return;
            }
            else {
                makeVerticalLine(pos0[location], 'C');
                //swapUser();
                return;
            }
        }
        else if (pos1.length > 0) {
            var r = parseInt(pos1[location].split("-")[0]);
            var c = parseInt(pos1[location].split("-")[1]);

            if (r % 2 == 0 && c % 2 == 1) {
                makeHorizontalLine(pos1[location], 'C');
                //swapUser();
                return;
            }
            else {
                makeVerticalLine(pos1[location], 'C');
                //swapUser();
                return;
            }
        }
    }

    if (pos2.length > 0) {

        var location;
        
        if (document.getElementById("level").value == "e") {
            location = easy();
        }
        else if (document.getElementById("level").value == "m") {
            location = medium();
        }

        var r = parseInt(location.split("-")[0]);
        var c = parseInt(location.split("-")[1]);

        if (r % 2 == 0 && c % 2 == 1) {
            // makeHorizontalLine(pos2[location], 'C');
            makeHorizontalLine(location, 'C');
            //swapUser();
            return;
        }
        else {
            // makeVerticalLine(pos2[location], 'C');
            makeVerticalLine(location, 'C');
            //swapUser();
            return;
        }
    }
}

function easy() {

    var location;
    var pos4 = new Array();
    var pos3 = new Array();
    var pos2 = new Array();
    var pos1 = new Array();
    var pos0 = new Array();

    for (var yrow = 0; yrow < grid.length; yrow++) {
        for (var ycol = 0; ycol < grid[yrow].length; ycol++) {
            if (yrow % 2 == 1 && ycol % 2 == 1) {
                if (!grid[yrow - 1][ycol] && !grid[yrow + 1][ycol] && !grid[yrow][ycol - 1] && !grid[yrow][ycol + 1]) {
                    pos4[pos4.length] = yrow + "-" + ycol;
                }
                else if (!grid[yrow - 1][ycol] && !grid[yrow + 1][ycol] && !grid[yrow][ycol - 1]) {
                    pos3[pos3.length] = yrow + "-" + eval(ycol + 1);
                }
                else if (!grid[yrow - 1][ycol] && !grid[yrow + 1][ycol] && !grid[yrow][ycol + 1]) {
                    pos3[pos3.length] = yrow + "-" + eval(ycol - 1);
                }
                else if (!grid[yrow - 1][ycol] && !grid[yrow][ycol - 1] && !grid[yrow][ycol + 1]) {
                    pos3[pos3.length] = eval(yrow + 1) + "-" + ycol;
                }
                else if (!grid[yrow + 1][ycol] && !grid[yrow][ycol - 1] && !grid[yrow][ycol + 1]) {
                    pos3[pos3.length] = eval(yrow - 1) + "-" + ycol;
                }
                else if (!grid[yrow - 1][ycol] && !grid[yrow + 1][ycol]) {
                    pos2[pos2.length] = yrow + "-" + eval(ycol - 1);
                    pos2[pos2.length] = yrow + "-" + eval(ycol + 1);
                }
                else if (!grid[yrow - 1][ycol] && !grid[yrow][ycol - 1]) {
                    pos2[pos2.length] = eval(yrow + 1) + "-" + ycol;
                    pos2[pos2.length] = yrow + "-" + eval(ycol + 1);
                }
                else if (!grid[yrow - 1][ycol] && !grid[yrow][ycol + 1]) {
                    pos2[pos2.length] = eval(yrow + 1) + "-" + ycol;
                    pos2[pos2.length] = yrow + "-" + eval(ycol - 1);
                }
                else if (!grid[yrow + 1][ycol] && !grid[yrow][ycol - 1]) {
                    pos2[pos2.length] = eval(yrow - 1) + "-" + ycol;
                    pos2[pos2.length] = yrow + "-" + eval(ycol + 1);
                }
                else if (!grid[yrow + 1][ycol] && !grid[yrow][ycol + 1]) {
                    pos2[pos2.length] = eval(yrow - 1) + "-" + ycol;
                    pos2[pos2.length] = yrow + "-" + eval(ycol - 1);
                }
                else if (!grid[yrow][ycol - 1] && !grid[yrow][ycol + 1]) {
                    pos2[pos2.length] = eval(yrow + 1) + "-" + ycol;
                    pos2[pos2.length] = eval(yrow - 1) + "-" + ycol;
                }
                else if (!grid[yrow - 1][ycol]) {
                    pos1[pos1.length] = eval(yrow + 1) + "-" + ycol;
                    pos1[pos1.length] = yrow + "-" + eval(ycol - 1);
                    pos1[pos1.length] = yrow + "-" + eval(ycol + 1);
                }
                else if (!grid[yrow + 1][ycol]) {
                    pos1[pos1.length] = eval(yrow - 1) + "-" + ycol;
                    pos1[pos1.length] = yrow + "-" + eval(ycol - 1);
                    pos1[pos1.length] = yrow + "-" + eval(ycol + 1);
                }
                else if (!grid[yrow][ycol - 1]) {
                    pos1[pos1.length] = eval(yrow + 1) + "-" + ycol;
                    pos1[pos1.length] = eval(yrow - 1) + "-" + ycol;
                    pos1[pos1.length] = yrow + "-" + eval(ycol + 1);
                }
                else if (!grid[yrow][ycol + 1]) {
                    pos1[pos1.length] = eval(yrow + 1) + "-" + ycol;
                    pos1[pos1.length] = eval(yrow - 1) + "-" + ycol;
                    pos1[pos1.length] = yrow + "-" + eval(ycol - 1);
                }
                else {
                    pos0[pos0.length] = eval(yrow + 1) + "-" + ycol;
                    pos0[pos0.length] = eval(yrow - 1) + "-" + ycol;
                    pos0[pos0.length] = yrow + "-" + eval(ycol - 1);
                    pos0[pos0.length] = yrow + "-" + eval(ycol + 1);
                }
            }
        }
    }

    location = Math.floor(Math.random() * pos2.length);

    return pos2[location];
}

function medium() {
    var dummy;

    dummy = new Array(2 * rows - 1);
    for (var i = 0; i < grid.length; i++) {
        dummy[i] = new Array(2 * rows - 1);
    }
    
    

    for (var n = 0; n <grid.length; n++){
        for (var m = 0; m<grid.length; m++) {
            dummy[n][m] = grid[n][m];
        }
    }

    var pos2 = new Array();
    var pos3 = new Array();
    var pos4 = new Array();
    var box = new Array();
    var location;

    
    for (var yrow = 0; yrow < dummy.length; yrow++) {
        for (var ycol = 0; ycol < dummy.length; ycol++) {

            if (yrow % 2 != 0 && ycol % 2 != 0) {

                if (!dummy[yrow - 1][ycol] && !dummy[yrow + 1][ycol] && !dummy[yrow][ycol - 1] && !dummy[yrow][ycol + 1]) {
                    pos4[pos4.length] = yrow + "-" + ycol;
                }
                else if (!dummy[yrow - 1][ycol] && !dummy[yrow + 1][ycol] && !dummy[yrow][ycol - 1]) {
                    pos3[pos3.length] = yrow + "-" + eval(ycol + 1);
                }
                else if (!dummy[yrow - 1][ycol] && !dummy[yrow + 1][ycol] && !dummy[yrow][ycol + 1]) {
                    pos3[pos3.length] = yrow + "-" + eval(ycol - 1);
                }
                else if (!dummy[yrow - 1][ycol] && !dummy[yrow][ycol - 1] && !dummy[yrow][ycol + 1]) {
                    pos3[pos3.length] = eval(yrow + 1) + "-" + ycol;
                }
                else if (!dummy[yrow + 1][ycol] && !dummy[yrow][ycol - 1] && !dummy[yrow][ycol + 1]) {
                    pos3[pos3.length] = eval(yrow - 1) + "-" + ycol;
                }
                else if (!dummy[yrow - 1][ycol] && !dummy[yrow + 1][ycol]) {
                    pos2[pos2.length] = yrow + "-" + eval(ycol - 1);
                    pos2[pos2.length] = yrow + "-" + eval(ycol + 1);
                }
                else if (!dummy[yrow - 1][ycol] && !dummy[yrow][ycol - 1]) {
                    pos2[pos2.length] = eval(yrow + 1) + "-" + ycol;
                    pos2[pos2.length] = yrow + "-" + eval(ycol + 1);
                }
                else if (!dummy[yrow - 1][ycol] && !dummy[yrow][ycol + 1]) {
                    pos2[pos2.length] = eval(yrow + 1) + "-" + ycol;
                    pos2[pos2.length] = yrow + "-" + eval(ycol - 1);
                }
                else if (!dummy[yrow + 1][ycol] && !dummy[yrow][ycol - 1]) {
                    pos2[pos2.length] = eval(yrow - 1) + "-" + ycol;
                    pos2[pos2.length] = yrow + "-" + eval(ycol + 1);
                }
                else if (!dummy[yrow + 1][ycol] && !dummy[yrow][ycol + 1]) {
                    pos2[pos2.length] = eval(yrow - 1) + "-" + ycol;
                    pos2[pos2.length] = yrow + "-" + eval(ycol - 1);
                }
                else if (!dummy[yrow][ycol - 1] && !dummy[yrow][ycol + 1]) {
                    pos2[pos2.length] = eval(yrow + 1) + "-" + ycol;
                    pos2[pos2.length] = eval(yrow - 1) + "-" + ycol;
                }
            }
        }
    }

    

    for (var i = 0; i < pos2.length; i++) {

        var r = parseInt(pos2[i].split("-")[0]);
        var c = parseInt(pos2[i].split("-")[1]);

        var count = 0;

        dummy[r][c] = 0;


        for (var yrow = 0; yrow < dummy.length; yrow++) {
            for (var ycol = 0; ycol < dummy.length; ycol++) {

                if (yrow % 2 != 0 && ycol % 2 != 0) {

                    if (!dummy[yrow - 1][ycol] && !dummy[yrow + 1][ycol] && !dummy[yrow][ycol - 1] && !dummy[yrow][ycol + 1]) {
                        pos4[pos4.length] = yrow + "-" + ycol;
                    }
                    else if (!dummy[yrow - 1][ycol] && !dummy[yrow + 1][ycol] && !dummy[yrow][ycol - 1]) {
                        pos3[pos3.length] = yrow + "-" + eval(ycol + 1);
                    }
                    else if (!dummy[yrow - 1][ycol] && !dummy[yrow + 1][ycol] && !dummy[yrow][ycol + 1]) {
                        pos3[pos3.length] = yrow + "-" + eval(ycol - 1);
                    }
                    else if (!dummy[yrow - 1][ycol] && !dummy[yrow][ycol - 1] && !dummy[yrow][ycol + 1]) {
                        pos3[pos3.length] = eval(yrow + 1) + "-" + ycol;
                    }
                    else if (!dummy[yrow + 1][ycol] && !dummy[yrow][ycol - 1] && !dummy[yrow][ycol + 1]) {
                        pos3[pos3.length] = eval(yrow - 1) + "-" + ycol;
                    }
                }

            }
        }


        while (pos3.length != 0) {

            var r = parseInt(pos3[0].split("-")[0]);
            var c = parseInt(pos3[0].split("-")[1]);

            dummy[r][c] = 0;
            pos3 = new Array();
            count++;

            

            for (var yrow = 0; yrow < dummy.length; yrow++) {
                for (var ycol = 0; ycol < dummy.length; ycol++) {

                    if (yrow % 2 != 0 && ycol % 2 != 0) {

                        if (!dummy[yrow - 1][ycol] && !dummy[yrow + 1][ycol] && !dummy[yrow][ycol - 1] && !dummy[yrow][ycol + 1]) {
                            pos4[pos4.length] = yrow + "-" + ycol;
                        }
                        else if (!dummy[yrow - 1][ycol] && !dummy[yrow + 1][ycol] && !dummy[yrow][ycol - 1]) {
                            pos3[pos3.length] = yrow + "-" + eval(ycol + 1);
                        }
                        else if (!dummy[yrow - 1][ycol] && !dummy[yrow + 1][ycol] && !dummy[yrow][ycol + 1]) {
                            pos3[pos3.length] = yrow + "-" + eval(ycol - 1);
                        }
                        else if (!dummy[yrow - 1][ycol] && !dummy[yrow][ycol - 1] && !dummy[yrow][ycol + 1]) {
                            pos3[pos3.length] = eval(yrow + 1) + "-" + ycol;
                        }
                        else if (!dummy[yrow + 1][ycol] && !dummy[yrow][ycol - 1] && !dummy[yrow][ycol + 1]) {
                            pos3[pos3.length] = eval(yrow - 1) + "-" + ycol;
                        }
                    }

                }
            }

        }

        box[i] = pos2[i] + "__" + count;


        for (var n = 0; n < grid.length; n++) {
            for (var m = 0; m<grid.length; m++) {
                dummy[n][m] = grid[n][m];
            }
        }
        
       

    }
    

    var min = eval(box[0].split("__")[1]);

    for (var r = 0; r < box.length; r++) {
        
        if (min > eval(box[r].split("__")[1]))
            min = eval(box[r].split("__")[1]);
    }

    
    var found = false;
    var l =0
    while(l < box.length&&!found) {

        if (box[l].split("__")[1] == min)
            found = true;
        else
            l++;
    }

    if (found)
        location = l;
    
    return (box[location].split("__")[0]);
}

function howToPlay() {
   /* var win;
    win=confirm("are you sure");
    if (win == true) {
//        window.open("https://www.google.co.in", "_self");
        window.close();
    }
    */

   /* bootbox.confirm("Are you sure?", function (result) {
        if (result == true)
            window.close();
    });*/
    // BootstrapDialog.alert('I want banana!');
    
    BootstrapDialog.show({
        title: '<b>HOW TO PLAY</b>',
        message: '<pre>* User and The computer take turns to place a line between two adjacent dots trying to form a box.<br>* The one who makes a box must take another turn.<br>* The one who makes the most boxes by the time all dots are connected wins.</pre>',
        buttons: [{
            id: 'btn-close',
            label: 'Close',
            cssClass: 'btn-primary',
            autospin: false,
            action: function (dialogRef) {
                dialogRef.close();
            }
        }]
    });
}

function rules() {
    
    BootstrapDialog.show({
        title: '<b>Rules</b>',
        message: 'The game play area of Dots & Boxes consists of an n x n grid of "dots". A players turn consists of connecting two horizontally or vertically adjacent dots with a line - diagonal lines are not allowed and the dots must be next to each other. A point is scored each time a player completes a square. When a square is created, the turn stays with the player who made the square, otherwise the turns alternate.<br>Notice that the player must complete the square to get points - even if you provide three of the sides, if your opponent fills in the fourth side, he gets the points. It is customary to fill in the square with the initial of the player who won the square. Since both players usually avoid putting lines close together until they have to, when it becomes possible to make one square, there is a whole cascade of possible squares. The player who makes the first square in such a cascade can elect to take any or all of the possible squares - there are some strategic schools of thought that say it is better not to take them all. The game is over when all the dots are connected and n*n squares have been made',
        buttons: [{
            id: 'btn-close',
            label: 'Close',
            cssClass: 'btn-primary',
            autospin: false,
            action: function (dialogRef) {
                dialogRef.close();
            }
        }]
    });
}

function credits() {
    
    BootstrapDialog.show({
        title: '<b>Credits</b>',
        message: '<ul type=none><li>Developed By :</li><ul><li> J Revathi (Team Leader)</li><li> Prasad M</li><li> Naga Babu</li></ul></ul><br/><br/>Version 1.0',
        buttons: [{
            id: 'btn-close',
            label: 'Close',
            cssClass: 'btn-primary',
            autospin: true,
            action: function (dialogRef) {
            dialogRef.close();
            }
        }]
    });
}
