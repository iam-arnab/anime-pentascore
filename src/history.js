const electron = require('electron')
const fs = require('fs')
const path = require('path')
const remote = electron.remote

const closeBtn = document.getElementById('closeBtn');

closeBtn.addEventListener('click', function(event) {
    var window = remote.getCurrentWindow();
    window.close();
})
const userAppDataPath = (electron.app || electron.remote.app).getPath('userData');
const animePentaScorePath = path.join(userAppDataPath, 'Anime PentaScore')
const scoreHistoryPath = path.join(animePentaScorePath, 'Score History');

fs.readFile(scoreHistoryPath, 'utf8', function (err , history) {
    if (err) throw err;
    document.getElementById('showHistory').innerHTML= history;
});
const deleteBtn = document.getElementById('deleteBtn');

deleteBtn.addEventListener('click', function (event) {
    fs.unlinkSync(scoreHistoryPath);
    const notification = {
        title: 'History Cleared',
        body: 'Please restart the history window to check that history has been cleared'
    }
    new window.Notification(notification.title, notification);
})









