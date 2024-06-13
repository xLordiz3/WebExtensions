const saveOptions = () =>
    {
        const profileID = document.getElementById("profileid").value;
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
    };

const restoreOptions = () => 
{
    chrome.storage.local.get(
        {
            profileID: "test"
        },
        (items) =>
            {
                document.getElementById("profileid").value = items.profileID;
            }
    )
}
document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById("save").addEventListener('click', saveOptions);