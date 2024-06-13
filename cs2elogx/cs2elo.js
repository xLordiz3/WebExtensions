const eloscore = 32768
var e = document.getElementsByTagName("td");
var table = document.getElementsByTagName("table")
var info = table[0];
var nrow = info.insertRow(2);
var nnrow = info.insertRow(3);
var nnnrow = info.insertRow(4);
var title = nrow.insertCell(0).innerHTML = "ELO ";
var hightitle = nnrow.insertCell(0).innerHTML = "HIGH";
var highscore = nnrow.insertCell(1);
var cscore = nrow.insertCell(1);
var lowtitle = nnnrow.insertCell(0).innerHTML = "LOW ";
var lowscore = nnnrow.insertCell(1);
var t = table[1];
var rows = t.tBodies[0].rows
cscore.innerHTML = Math.ceil(rows[1].children[2].innerHTML / eloscore);
cscore.style = "color:lightblue";
var high = 0;
var low = null;
for(var i = 0; i <= rows.length - 1; i++) 
{
    var row = rows.item(i);
    var cells = row.cells;
    // why even show this in this state
    var season = cells[0];
    if (season.innerHTML[0] != "L")
    {
        var seasonnumber = season.innerHTML[season.innerHTML.length - 1];
        season.innerHTML = "Premier Season " + seasonnumber;
    }
    var changer = row.insertCell(3);
    if (cells[2].innerHTML === "Score")
    {
        cells[2].innerHTML = "Score";
        changer.innerHTML = "Change";
    }
    else 
    {
        var s = Math.ceil(cells[2].innerHTML / eloscore);
        cells[2].innerHTML = s;  
        if(i + 1 === rows.length)
        {
            changer.innerHTML = 0;
        }
        else
        {
            var change = Math.ceil(s - (rows.item(i+1).cells[2].innerHTML /  eloscore))
            if(Math.sign(change) != 1)
            {
                changer.innerHTML = change;
                changer.style = "color: red;";
            }
            else
            {
                changer.innerHTML = "+" + change;  
                changer.style = "color: green;";
            }
        }
        if(low === null)
        {
            low = s;
        }
        else if(s > high)
        {
            //console.log()
            high = s;
        }
        else if (s < low)
        {
            low = s;
        }
    }
    lowscore.innerHTML = low;
    lowscore.style = "color:red";
    highscore.innerHTML = high;
    highscore.style = "color:green";
};
