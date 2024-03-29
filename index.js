'use strict'




function submitForm(){
    $("#js-form").submit(event =>{
        event.preventDefault();
        $('#results-list').empty();
        $('#error').empty();
        let userEntry = document.getElementById("js-search-user").value;
        Results(userEntry);
        resetForm();
        
    })

}


function Results(userEntry){
    fetch('https://api.github.com/users/'+`${userEntry}`+'/repos')
    .then(userResponse => {
        if (userResponse.ok){
            return userResponse.json();
        } else{
            throw new Error(userResponse.statusText);
        }
    })
    .then(userResponseJson => userRepos(userResponseJson))
    .catch(err => {
        $('#error').text(`Something went wrong: ${err.message}`);
        $('#results-title').hide();
      });

}

function userRepos(userResponseJson){
    console.log(userResponseJson);


    for (let i =0; i < userResponseJson.length; i ++){
        $('#results-list').append(
            `<li><h3><a href="${userResponseJson[i].svn_url}" target ="_blank">${userResponseJson[i].name}</a></h3>
            </li>`
        )};

    $('#results').removeClass('hidden');
    $('#results-title').show();
}

function resetForm(){
    $('#js-form').trigger('reset');
    
}

$(submitForm);
