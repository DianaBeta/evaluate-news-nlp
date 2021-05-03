function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value;
    let formResults = document.getElementById ('results');
    Client.checkForurl(formText)

    console.log("::: Form Submitted :::")
    
    //function call to send the userinput to the server
    postData('http://localhost:8081/api', {text: formText}).then(
      function(res) {//response from the server
        if (res.score_tag == "P"){
          document.getElementById('results1').innerHTML = `Score tag: Positive`
        }
          if (res.score_tag == "N"){
            document.getElementById('results1').innerHTML = `Score tag: Negative`
          };
      
        document.getElementById('results2').innerHTML = `Agreement: ${res.agreement}`;
        document.getElementById('results3').innerHTML = `Confidence: ${res.confidence}`;
      
      }
    )
    }

    //function definition to send the user input "data" to the url, in this case the route of my server
    const postData = async ( url = '', data = {})=>{
      console.log(data);
        const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
       // Body data type must match "Content-Type" header        
        body: JSON.stringify(data), 
      });

        try {
          const newData = await response.json();
          console.log(newData);
          return newData;
        }catch(error) {
          console.log("error", error);
        }

        
    }


export { handleSubmit }