$(document).ready(() => {


$.get("/api/user_data").then(data => {
    console.log(data);
    $(".member-name").text(data.username);
    var id = data.id;

    $.get("/api/shows/" + id).then(shows => {
        console.log(shows);
        shows.forEach(show => {
            makeShowCard(show, data);
        });

    })
});

function makeShowCard(show, data) {
    console.log("I'm making cards");
    var status = show.status
    var score = show.userRate;
    var card =
        `
        <button class="cardButt" type="button" data-toggle="collapse" aria-expanded="false" aria-controls="collapseExample" data-target="#${show.id}Summary">
        <div class="card" style="width: 14rem;">
            <img class="card-img-top" src="${show.img}" alt="${show.title} Image">
            <div class="container-fluid score" id="${show.id}Score">
            <span>${data.username}'s Score: ${score}</span>
            </div>
            <div class="card-body">
                <div class="container">
                <div class="row">
                <div class="col">
                <h5 class="card-title">${show.title}</h5>
                <hr>
                <div class="collapse" id="${show.id}Summary">
                    <p class="card-text">${show.summary}</p>
                    <p class="btn btn-info" data-toggle="modal" data-target="#${show.id}">Edit</p>
                    <p class="btn btn-warning" href="/discuss">Discuss</p>
                </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </button>
        
        <!-- The Modal -->
<div class="modal fade" id="${show.id}">
  <div class="modal-dialog">
    <div class="modal-content">
    
      <!-- Modal Header -->
      <div class="modal-header">
        <h4 class="modal-title">${show.title}</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
      
      <!-- Modal body -->
      <div class="modal-body">
        <div class="row align-items-center">
            <div class="col">
                <img class="card-img-top" src="${show.img}" alt="${show.title} Image">
            </div>
            <div class="row">
            <div class="col">
                <div class="container">
                    <div class="form-group">
                        <label for="${show.netflixid}watchSelect">Watch Status</label>
                        <select id="${show.netflixid}watchSelect" class="form-control">
                            <option>Completed</option>
                            <option>Watching</option>
                            <option>Plan to Watch</option>
                        </select>
                    </div>
                </div>
            </div>
            </div>
            <div class="row">
            <div class="col">
                <div class="container">
                    <div class="form-group">
                        <label for="${show.netflixid}rateSelect">Rating</label>
                        <select class="form-control" id="${show.netflixid}rateSelect">
                            <option>10</option>
                            <option>9</option>
                            <option>8</option>
                            <option>7</option>
                            <option>6</option>
                            <option>5</option>
                            <option>4</option>
                            <option>3</option>
                            <option>2</option>
                            <option>1</option>
                        </select>
                    </div>
                </div>
            </div>
            </div>
        </div>
        

      <!-- Modal footer -->
      <div class="modal-footer center">
        
            <button type="button" class="btn btn-danger" data-dismiss="modal" href="/delete">Delete</button>
            <button type="button" id="${show.netflixid}add" class="btn btn-primary">Update</button>
        
      </div>
      
    </div>
  </div>
</div>`

    // Remember to include break statement when done testing!!!!!!!
    // Remember to include break statement when done testing!!!!!!!
    // Remember to include break statement when done testing!!!!!!!

    switch (status) {
        case "feed":
            $("#watchingMenu").append(card);
            $("#completedMenu").append(card);
        
        case "Completed":
            $("#completedMenu").append(card);
            $("#watchingMenu").append(card);

        case "Plan to Watch":
            $("#planMenu").append(card);
            $("#completedMenu").append(card);
            $("#watchingMenu").append(card);
    }

    scoreColor(score, show.id);
    }
});

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



    // function that updates feed actively via button or swipe or refresh