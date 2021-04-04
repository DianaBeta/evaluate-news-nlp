function checkForurl(inputText) {
    console.log("::: Running checkForurl:::", inputText);
   
    const regex = new RegExp('https');
    const regex2 = new RegExp('www.');
    const regex3 = new RegExp('http');


    const validUrl = (regex.test(inputText)) || (regex2.test(inputText)) ||(regex3.test(inputText));

    if (validUrl === false){
        alert("Please enter a valid URL")
    }
}

export { checkForurl}
