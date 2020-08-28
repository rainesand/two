$(document).ready(() => {


    $.get("/api/user_data").then(data => {
        console.log(data);
        $(".member-name").text(data.username);
        var id = data.id;

        $.get("/api/feedShows").then(shows => {
            console.log(shows);
         
            shows.forEach(show => {
                makeFeed(show); 
                var userId = show.UserId;
                console.log(userId);
                console.log("================");
                $.get("/api/users/" + userId).then(user => {
                    console.log(user);
                    
                });
              
            });
        });
    });

    function makeFeed(show) {
        
        console.log("I'm making the feed");
        var score = show.userRate;
        var card =
            `<div class="card" style="width: 14rem;">
                <img class="card-img-top" src="${show.img}" alt="${show.title} Image">
                <div class="container-fluid score" id="${show.id}Score">
                <span>Score: ${score}</span>
                </div>
                <div class="card-body">
                    <div class="container">
                    <div class="row">
                    <div class="col">
                    <h5 class="card-title">${show.title}</h5>
                    </div>
                    </div>
                </div>
                </div>
                </div>`
                $("#feedDiv").prepend(card);

                scoreColor(score, show.id);
      
                function scoreColor(score, showId) {

                    switch (score) {
                        case 10:
                            $(`#${showId}Score`).addClass("score10");
                            break;
                        case 9:
                            $(`#${showId}Score`).addClass("score9");
                            break;
                        case 8:
                            $(`#${showId}Score`).addClass("score8");
                            break;
                        case 7:
                            $(`#${showId}Score`).addClass("score7");
                            break;
                        case 6:
                            $(`#${showId}Score`).addClass("score6");
                            break;
                        case 5:
                            $(`#${showId}Score`).addClass("score5");
                            break;
                        case 4:
                            $(`#${showId}Score`).addClass("score4");
                            break;
                        case 3:
                            $(`#${showId}Score`).addClass("score3");
                            break;
                        case 2:
                            $(`#${showId}Score`).addClass("score2");
                            break;
                        case 1:
                            $(`#${showId}Score`).addClass("score1");
                            break;
                
                    }
                }
            }
});
    // function that updates feed actively via button or swipe or refresh