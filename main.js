const extensionStyle = document.createElement("link")
extensionStyle.rel = "stylesheet"
extensionStyle.href = "./extension_style.css"

document.querySelector("head").append(extensionStyle)

function killAllPopup() {
    document.getElementById("extensionPopUp").outerHTML = "";
}


document.addEventListener('mouseup', async (value) => {
    console.log(value.toElement)
    if (document.getElementById("extensionPopUp")) {
        if (value.toElement.id != "extensionPopUp") {
            killAllPopup();
        }
    }

    console.log(document.getSelection().toString())
    if (!document.getSelection().toString()) { return 0 }
    else {
        console.log(document.getSelection())
        const selectTag = document.getSelection().getRangeAt(0).commonAncestorContainer.parentElement
        selectTag.style.position = "relative"
        const dataSearch = document.getSelection().toString()
        requestString = `https://www.dictionary.com/browse/${dataSearch}`
        // selectTag.
        const para = document.createElement("div");
        para.id = "extensionPopUp"
        para.innerHTML = `
        <iframe 
        data-cookieblock-src="${requestString}"
        data-cookieconsent="marketing"
        src="${requestString}" title="W3Schools Free Online Web Tutorials" id="extensionIFrame" scroll="no"></iframe>`
        selectTag.appendChild(para)


    }
})

