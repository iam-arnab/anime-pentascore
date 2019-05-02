const electron = require('electron')
const fs = require('fs')
const path = require('path')

const userAppDataPath = (electron.app || electron.remote.app).getPath('userData');
	
const scoreHistoryPath = path.join(userAppDataPath, 'Score History');

fs.readFile(scoreHistoryPath, 'utf8', function (err , history) {
    if (err) throw err;
    document.getElementById('showHistory').innerHTML= history;
});
const deleteBtn = document.getElementById('deleteBtn');

deleteBtn.addEventListener('click', function (event) {
    fs.unlinkSync(scoreHistoryPath);
    const notification = {
        title: 'History Cleared',
        body: 'Please restart the history window should you wish to check if history has been cleared.'
    }
    new window.Notification(notification.title, notification);
})









