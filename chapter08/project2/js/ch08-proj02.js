const photos = JSON.parse(content);

for(let i=0; i < 3; i++) {
    outputCard(photos[i])
}

function outputCard(photo){
    document.write("<article> <img src=\"images/"+ photo.filename + "\" alt=\" " + photo.title + "\">")
    document.write("<div class=\"caption\">")
    document.write("<h2> "+ photo.title +" </h2>")
    document.write("<p>" + photo.location.city + ", " + photo.location.country +"</p>")
    document.write("<h3>Colors</h3>");
    outputColors(photo.colors)
    document.write("</div>")
    document.write("</article>")
}

function outputColors(colors){
    for(let i = 0; i < 5; i++) {
        document.write(constructColors(colors[i]))
    }
}

function constructColors(color){
    let lum = color.luminance
    let textColor = "#000000"

    if(lum < 70) {
        textColor = "#FFFFFF"
    }

    return "<span style='background-color: " + color.hex + "\; color:" + textColor + "'>" + constructStyle(color) + "</span>"
}

function constructStyle(color) {
    return color.name
}