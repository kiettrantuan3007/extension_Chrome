fetch('https://api.dictionaryapi.dev/api/v2/entries/en/hello')
    .then(function (response) {
        // When the page is loaded convert it to text
        return response.json()
    })
    .then(value => console.log(value))
