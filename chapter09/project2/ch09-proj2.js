document.addEventListener('DOMContentLoaded', () => {

    try {
        let json = JSON.parse(content)
        let ul = document.querySelector("#paintings ul")

        for(let i = 0; i < json.length; i++){
            ul.innerHTML += "<li> <img src='images/small/" + json[i].id + ".jpg' id='" + json[i].id + "' class='smallImage " + i + "' alt=' " + json[i].title + "'" + "> </li>"
        }

        TestClick(json)
    } catch (e) {
        document.write("Unable to parse JSON file --> " + e)
    }
})

function TestClick(json){
    const smalls = document.getElementsByClassName("smallImage")

    for(let small of smalls){
        small.addEventListener("click", function () {
            OnClick(small.id, small.alt, json, GetID(small.className))
        })
    }


}

function GetID(classname){
    let id = classname.split(" ")
    return id[1]
}

function OnClick(id, title, json, jsonID){
    let fig = document.querySelector("#details figure")

    // Override or clears the previous image and sets new one
    fig.innerHTML = "<img src='images/large/" + id + ".jpg' alt='+ " + title +"'>"

    OnClickFeatures(json, jsonID, fig)

    let h2 = document.querySelector("#title")
    h2.innerHTML = json[jsonID].title
    let h3 = document.querySelector("#artist")
    h3.innerHTML = "By " + json[jsonID].artist
}

function OnClickFeatures(json, jsonID, fig){
    let features = json[jsonID].features
    let index = 0

    for(let feat of features){
        let newWidth = feat.lowerRight[0] - feat.upperLeft[0]
        let newHeight = feat.lowerRight[1] - feat.upperLeft[1]

        fig.innerHTML += "<div class='box " + index + "' style='position: absolute; left:" + feat.upperLeft[0] + "px; top: " + feat.upperLeft[1] + "px; width: " + newWidth + "px; height: " + newHeight + "px;'> </div>"
        index++
    }

    for(let box of document.getElementsByClassName("box")) {
        box.addEventListener("mouseenter", function () {
            OnMouseOver(features[GetID(box.className)].description)
        })

        box.addEventListener("mouseout", function (){
            OnMouseLeave()
        })
    }
}

function OnMouseOver(description){
    let desc = document.querySelector("#description")
    desc.textContent = description

}

function OnMouseLeave(){
    let desc = document.querySelector("#description")
    desc.textContent = ""
}
