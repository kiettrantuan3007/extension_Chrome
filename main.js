const extensionStyle = document.createElement("link")
extensionStyle.rel = "stylesheet"
extensionStyle.href = "./extension_style.css"
const extensionFavicon = document.createElement("script")
extensionFavicon.src = "https://kit.fontawesome.com/d0bc29860c.js"
extensionFavicon.crossOrigin = "anonymous"
document.querySelector("head").append(extensionStyle)
document.querySelector("body").append(extensionFavicon)

function killAllPopup() {
    document.getElementById("extensionPopUp").outerHTML = "";
}


document.addEventListener('mouseup', async (value) => {

    if (document.getElementById("extensionPopUp")) {
        if (value.toElement.id == "extensionPopUp" || value.toElement.id == "buttonPlay" || value.toElement.id == "inExtension") {

        } else {
            killAllPopup();
        }
    }

    const getString = document.getSelection().toString()
    if (!getString || getString.includes("/") || getString.includes(":") || getString.includes("_") || getString.includes("{") || getString.includes("}") || getString.includes(".") || getString.includes("=")) { return 0 }
    else {
        const selectTag = document.getSelection().getRangeAt(0).commonAncestorContainer.parentElement
        selectTag.style.position = "relative"
        const dataSearch = document.getSelection().toString()
        requestString = `https://api.dictionaryapi.dev/api/v2/entries/en/${dataSearch}`
        const para = document.createElement("div");
        para.id = "extensionPopUp"
        selectTag.appendChild(para)
        console.log(requestString)
        var word, phonetics, meanings;
        var addHTML = ""

        const dich = await fetch(`https://translation.googleapis.com/language/translate/v2?q=${dataSearch}&target=vi&key=AIzaSyAT-ZHseAa2b3C5Mtc-T46v4jSHhifBCKc`, { method: "POST" })
        var translated = await dich.json()
        translated = translated.data.translations[0].translatedText

        // console.log(translated)
        await fetch(requestString)
            .then(res => res.json())
            .then(value => {
                if (value[0].word) word = value[0].word;
                if (value[0].phonetics) phonetics = value[0].phonetics;
                if (value[0].meanings) meanings = value[0].meanings
                addHTML = `<h2 id="inExtension">${word}</h2>
                <p>${translated}</p>`
                for (let phonetic of phonetics) {
                    if (!phonetic.text) continue
                    else { addHTML = addHTML + `<span id="inExtension">${phonetic.text}    </span>` }
                    if (!phonetic.audio) continue
                    else {
                        addHTML = addHTML + `<a id="buttonPlay" onclick="this.firstChild.play()"><audio src="${phonetic.audio}"></audio><i id="buttonPlay" class="fa-solid fa-play"></i></a>
                    `}

                }
                for (let meaning of meanings) {
                    addHTML = addHTML + `
                        <h3 id="inExtension">${meaning.partOfSpeech}</h3>
                        <p id="inExtension">${meaning.definitions[0].definition}</p>
                    `
                }
                addHTML = addHTML + '<p id="inExtension" class="thank">API thank to Free Dictionary API </p>'
            })
            .catch(e => {
                if (addHTML == "") addHTML = addHTML + `${translated}`
                console.log(e)
            })

        document.querySelector("#extensionPopUp").innerHTML = addHTML
    }

})



// translate api: POST/ https://translation.googleapis.com/language/translate/v2?q=hello&target=vi&key=AIzaSyAT-ZHseAa2b3C5Mtc-T46v4jSHhifBCKc