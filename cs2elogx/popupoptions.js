const eloscore = 32768;

document.querySelector('#go-to-options').addEventListener('click', function()
{
    if(chrome.runtime.openOptionsPage)
        {
            chrome.runtime.openOptionsPage()
        }
        else
        {
            window.open(chrome.runtime.getURL('options.html'));
        }
});

document.querySelector('#changeID').addEventListener('click', function()
{
    const profileID = document.getElementById("pid").value;
    chrome.storage.local.set(
        {
            profileID: profileID
        },
        () => 
            {
                const status = document.getElementById('status');
                status.textContent = 'Options saved';
                setTimeout(() =>
                {
                    status.textContent = '';
                }, 750);
            }
    );
});
function checkSteamID(id)
{
    if(id.length > 16 && typeof(id === 'number'))
    {
        console.log("SteamID Profile:", id);
        return "https://steamcommunity.com/profiles/" + id + "/gcpd/730/?tab=majors"; 
    }
    else
    {
        console.log("Steam Community Profile:", id)
        return "https://steamcommunity.com/id/" + id + "/gcpd/730/?tab=majors";
    }
}

const opts = () =>
{
    chrome.storage.local.get(
        {
            profileID: "test"
        },
        (items) =>
            {
                console.log(items.profileID)
                var idt = checkSteamID(items.profileID);
                document.getElementById("pid").value = items.profileID;
                const base = idt;
                console.log(base);
                async function scrapeData() {
                    const response = await fetch(base);
                    const html = await response.text();
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, "text/html");
                    var d = doc.getElementsByClassName("generic_kv_table")[1].tBodies[0].rows;
                    var da = document.getElementById("totals").tBodies[0].rows;

                    da[0].children[1].innerText = Math.floor(d[1].children[2].innerText / eloscore);
                    da[0].children[1].style = "color: green;";
                    var lowscore = da[2].children[1];
                    var highscore = da[1].children[1];
                    var high = 0;
                    var low = null;
                    var stat = document.getElementById("stats");
                    for(var i = 0; i <= d.length - 1; i++) 
                    {
                        var row = d.item(i);
                        var cells = row.cells;
                        if(cells[2].innerText != "Score")
                        {
                            var score = Math.floor(cells[2].innerText / eloscore);
                            var r = stat.insertRow(i);
                            r.insertCell(0).innerText = cells[1].innerText;
                            r.insertCell(1).innerText = score;

                            if (low === null) 
                            { 
                                low = score; 
                            }
                            else if (score > high) 
                            { 
                                high = score; 
                            }
                            else if (score < low)
                            { 
                                low = score; 
                            }

                            var cc = r.insertCell(2);

                            if(i + 1 === d.length)
                            {
                                cc.innerText = 0;
                            }
                            else
                            {
                                var change = Math.ceil(score - (d.item(i+1).cells[2].innerText / eloscore));
                                if(Math.sign(change) != 1)
                                {
                                    cc.innerText = change;
                                    cc.style = "color: red;";
                                }
                                else
                                {
                                    cc.innerText = "+" + change;
                                    cc.style = "color: green;";
                                }
                            }
                        }
                        else
                        {
                            console.log(cells[2].innerText);
                            prev = 0;
                        }
                    };
                    highscore.innerText = high;
                    highscore.style = "color: green;";
                    lowscore.innerText = low;
                    lowscore.style = "color: red;";
                }
                scrapeData();
            }
    )
}
document.addEventListener('DOMContentLoaded', opts);
