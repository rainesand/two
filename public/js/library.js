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
            <button id="${show.id}Div"class="cardButt" type="button" data-toggle="modal" aria-expanded="false" aria-controls="collapseExample" data-target="#${show.id}">
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
                <div class="col-md-7">
                    <div class="container">
                        <div class="form-group">
                            <label for="${show.id}watchSelect">Watch Status</label>
                            <select id="${show.id}watchSelect" class="form-control">
                                <option>Completed</option>
                                <option>Watching</option>
                                <option>Plan to Watch</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-md-5">
                    <div class="container">
                        <div class="form-group">
                            <label for="${show.id}rateSelect">Rating</label>
                            <select class="form-control" id="${show.id}rateSelect">
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
            
                <button type="button" id="${show.id}delete" class="btn btn-danger" data-dismiss="modal"><i class="fas fa-trash-alt"></i> Delete</button>
                <button type="button" id="${show.id}update" class="btn btn-primary"><i class="fas fa-pen"></i> Update</button>
                <a id="discussButt" href="/discuss"><button type="button" id="${show.id}discuss" class="btn btn-warning"><i class="fas fa-users"></i> Discuss</button></a>

          </div>
          
        </div>
      </div>
    </div>`

        // Remember to include break statement when done testing!!!!!!!
        // Remember to include break statement when done testing!!!!!!!
        // Remember to include break statement when done testing!!!!!!!

        switch (status) {
            case "Watching":
                $("#watchingMenu").prepend(card);
                $("#completedMenu").prepend(card);

            case "Completed":
                $("#completedMenu").prepend(card);
                $("#watchingMenu").prepend(card);

            case "Plan to Watch":
                $("#planMenu").prepend(card);
                $("#completedMenu").prepend(card);
                $("#watchingMenu").prepend(card);
        }

        scoreColor(score, show.id);

        $("#discussButt").on("click", function(e) {
            e.preventDefault();

            $.get("/api/user_data").then(data => {
                var userId = data.id;
                var status = "";
                var rate = "";
                status = $(`#${show.id}watchSelect`).val().trim();
                rate = $(`#${show.id}rateSelect`).val().trim();
                var recentPost = {
                    title: show.title,
                    summary: show.summary,
                    imdb: show.imdb,
                    userRate: rate,
                    status: status,
                    img: show.img,
                    type: show.type,
                    year: show.year,
                    netflixID: show.netflixID,
                    UserId: userId
                }
                console.log(recentPost);
                $.post("/api/recent", recentPost, function (res) {
                    console.log("Show added to recent DB");
                    location.replace("/discuss");
                });
            });
    
        });
        $(`#${show.id}update`).on("click", function (e) {
            e.preventDefault();

            var status = "";
            var rate = "";
            status = $(`#${show.id}watchSelect`).val().trim();
            rate = $(`#${show.id}rateSelect`).val().trim();
            var showUpdate = {
                userRate: rate,
                status: status,
                id: show.id
            }
            $.ajax({
                method: "PUT",
                url: "/api/update",
                data: showUpdate
            })
                .then(function (res) {
                    console.log(res)
                    console.log("Show updated in DB");
                    window.location.reload()
                });

        });


        $(`#${show.id}delete`).on("click", function (e) {
            e.preventDefault();
            deleteShow(show.id);
            $("#dangerAlert").fadeTo(2000, 500).slideUp(500, function(){
                $("#dangerAlert").slideUp(500);
            });
        });
        
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

function deleteShow(id) {
    $.ajax({
        method: "DELETE",
        url: "/api/show/" + id
    })
        .then(function () {
            console.log("Show deleted")
            $(`#${id}Div`).remove();
        });
}

