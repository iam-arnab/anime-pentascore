const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
const fs = require('fs')

const historyBtn = document.getElementById('historyBtn')

function computeScore()
{
	var x = AnimeName.AnimeInput.value;
	var a = myForm.ArtSelect.value;
	var b = myForm.PlotSelect.value;
	var c = myForm.ostSelect.value;
	var d = myForm.CharactersSelect.value;
	var e = myForm.enjoymentSelect.value;
	var f = myForm.InstinctSelect.value;
	var y = +a + +b + +c + +d + +e + +f;
	var z = Math.floor(y/6);
	var ScoreOutput =  x+ " score: " +z;
	document.getElementById("printscore").innerHTML= ScoreOutput;

	const userAppDataPath = (electron.app || electron.remote.app).getPath('userData');
	
	const animePentaScorePath = path.join(userAppDataPath, 'Anime PentaScore')
	if(!fs.existsSync(animePentaScorePath))
	{
		fs.mkdirSync(animePentaScorePath);
	}
	const scoreHistoryPath = path.join(animePentaScorePath, 'Score History');
	
	fs.appendFileSync(scoreHistoryPath,"\<br>" + ScoreOutput);

	const notification = {
		title: 'Score Calculated',
		body: ScoreOutput + '. Scroll down to see the score.'
	}
	new window.Notification(notification.title, notification);
}
historyBtn.addEventListener('click', function(event){
    const modalPath = path.join('file://',__dirname, 'history.html')
    let win = new BrowserWindow({ frame: false, width: 500, height: 400})
    win.on('close', function() { win = null })
    win.loadURL(modalPath)
	win.show()
	
	
})
