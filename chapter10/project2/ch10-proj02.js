
document.addEventListener("DOMContentLoaded", function() {
	
	const url = 'https://www.randyconnolly.com//funwebdev/3rd/api/shakespeare/play.php';

   /*
     To get a specific play, add play name via query string, 
	   e.g., url = url + '?name=hamlet';
	 
	 https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=hamlet
	 https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=jcaesar
     
   */
	 
   
    /* note: you may get a CORS error if you test this locally (i.e., directly from a
       local file). To work correctly, this needs to be tested on a local web server.  
       Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
       use built-in Live Preview.
    */

	let jsonData;
	let playList = document.querySelector("#playList")
	playList.addEventListener("change", (e) => {

		let data = fetch(url + "?name=" + playList.value).then (function(response){
			return response.json()
		}).then(function (data){
			dataManipulator(data)
			jsonData = data
		})
	})

	let but = document.querySelector("#btnHighlight")
	but.addEventListener("click", (e) =>{
		highlight(jsonData)
	})

});

function dataManipulator(data) {
	// Act List
	let actList = document.querySelector("#actList")
	actList.innerHTML = ""

	for(let num = 0; num < data.acts.length; num++) {
		actList.innerHTML += "<option value=" + num + ">" + data.acts[num].name + "</option>"
	}

	actList.addEventListener("change", (e) => {
		updateSceneList(data, actList)
	})

	updateSceneList(data, actList)
}

function updateSceneList(data, actList){
	// Scene List
	let sceneList = document.querySelector("#sceneList")
	sceneList.innerHTML = ""

	for(let num = 0; num < data.acts[actList.value].scenes.length; num++) {
		sceneList.innerHTML += "<option value=" + num + ">" + data.acts[actList.value].scenes[num].name + "</option>"
	}

	sceneList.addEventListener("change", (e) => {
		// Play Here
		updatePlayHere(data, actList, sceneList)
	})

	updatePlayHere(data, actList, sceneList, "0", "")
	updatePlayerList(data, actList, sceneList)
}

function updatePlayHere(data, actList, sceneList, actor, input) {
	// Play Here
	let playHere = document.querySelector("#playHere")
	let currentAct = data.acts[actList.value];
	let currentScene = data.acts[actList.value].scenes[sceneList.value]

	playHere.innerHTML = "<h2>" + data.title + "</h2>"
	playHere.innerHTML += "<article id='actHere'> <h3>" + currentAct.name + "</h3> <div id='sceneHere'>" +
		" <h4> " + currentScene.name + " </h4> <p class='title'>" + currentScene.title + "</p> <p class='direction'> " + currentScene.stageDirection + "</p>"

	for(let num = 0; num < currentScene.speeches.length; num++){
		let cur = currentScene.speeches[num]

		if(actor === "0")
			inputSpeech(playHere, cur, input)
		else {
			if(actor === cur.speaker)
				inputSpeech(playHere, cur, input)
		}

		playHere.innerHTML += "</div>"
	}

	playHere.innerHTML +=  "</div> </article>"
}

function inputSpeech(playHere, cur, input){
	playHere.innerHTML += "<div class='speech'> <span>" + cur.speaker + "</span>"

	for(let numLines = 0; numLines < cur.lines.length; numLines++){
		if(input !== "")
		{
			playHere.innerHTML += checkLine(cur.lines[numLines], input)
		}
		else
		{
			playHere.innerHTML += "<p>" + cur.lines[numLines] + "</p>"
		}
	}
}

function updatePlayerList(data, actList, sceneList) {
	let playerList = document.querySelector("#playerList")
	let currentAct = data.acts[actList.value];
	let currentScene = data.acts[actList.value].scenes[sceneList.value]

	playerList.innerHTML = "<option value=0>All Players</option>"

	const uniqueCharacters = [];
	for(let num = 0; num < currentScene.speeches.length; num++){
		let speaker = currentScene.speeches[num].speaker

		if(uniqueCharacters.includes(speaker)) continue

		uniqueCharacters[uniqueCharacters.length] = speaker
		playerList.innerHTML += "<option value=" + speaker + ">" + speaker + "</option>"
	}
}

function highlight(data) {
	let actor = document.querySelector("#playerList").value
	let input = document.querySelector("#txtHighlight").value

	updatePlayHere(data, document.querySelector("#actList"), document.querySelector("#sceneList"), actor, input)
}

function checkLine(line, condition) {

	for(let i = 0; i < line.length - condition.length; i++){
		let word = line.slice(i, i + condition.length)

		if(word === condition){
			return "<p style='background-color: yellow'>" + line + "</p>"
		}
	}

	return "<p>" + line + "</p>"
}
