// when button clicked, get all tabs (including ids), select random tab, set as active using .update()

function listTabs()
{
    console.log("listTabs Function");
    getCurrentWindowTabs().then((tabs) => 
    {
        let numTabs = document.getElementById("tabCount");
        numTabs.textContent = tabs.length;
        let currentTabs = document.getElementById("tabList");//document.createDocumentFragment();
        let limit = 5;
        let counter = 0;
        for (let tab of tabs)
        {
            if(!tab.active && counter <= limit)
            {
                let tabLink = document.createElement("a");
                tabLink.textContent = tab.title || tab.url;
                tabLink.setAttribute('href', tab.url);
                tabLink.classList.add('switch-tabs');
                currentTabs.appendChild(tabLink);
                currentTabs.appendChild(document.createElement("br"));
            }
            counter += 1;
        }
    });
}
function randPick(max) { return Math.floor(Math.random() * (Math.floor(max))); }
document.addEventListener("DOMContentLoaded", listTabs);

function getCurrentWindowTabs()
{
    return browser.tabs.query({currentWindow: true});
}

document.addEventListener("click", (e) => 
{
    if (e.target.id === "tabs-random")
    {
        getCurrentWindowTabs().then((tabs) =>
        { browser.tabs.update(selectedTab = tabs[randPick(tabs.length)].id, {"active": true});})
    }
})