$(document).ready(() => {
    $("#refresh").on("click", function (e) {
        e.preventDefault();
        location.reload();
    })
    $.get("/api/feedShows").then(shows => {
        console.log(shows);
        var name = shows[0].User.username;
        $(".member-name").append(name);
        shows.forEach(show => {
            makeFeed(show);
            addUser(show);
        });
    });


    function makeFeed(show) {
        var date = show.createdAt.slice(0, 10);
        var card =
            `<div class="container">
        <div class="card mb-3">
        <div class="fadeUp">
        <div class="row align-items-center fadeMe">
          <div class="col-md-3">
            <img src="${show.img} class="card-img" alt="${show.title} Image">
          </div>
          <div class="col-md-9">
            <div class="card-body">
              <h2 id="${show.id}Statement"></h2>  
              <h5 class="card-title">${show.title}  <span class="badge badge-info" id="ratingBadge"><i class="fas fa-star"></i>
              ${show.User.username}'s Score: ${show.userRate}</span></h5>
              <p class="card-text">${show.summary}</p>
              <p class="card-text"><small class="text-muted italic">${date}</small></p>
              <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#${show.netflixID}"><i class="fas fa-plus"> </i> Add</button>
                <button type="button" id="${show.netflixID}discuss" class="btn btn-warning discussButt"><i class="fas fa-users"></i> Discuss</button>
            </div>
          </div>
        </div>
        </div>
      </div>
      </div>
      <!-- The Modal -->
    <div class="modal fade" id="${show.netflixID}">
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
                            <label for="${show.netflixID}watchSelect">Watch Status</label>
                            <select id="${show.netflixID}watchSelect" class="form-control">
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
                            <label for="${show.netflixID}rateSelect">Rating</label>
                            <select class="form-control" id="${show.netflixID}rateSelect">
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
            
                <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="far fa-window-close"> </i> Cancel</button>
                <button type="button" id="${show.netflixID}add" class="btn btn-primary" data-dismiss="modal"><i class="fas fa-plus"> </i> Add</button>
          </div>
          
        </div>
      </div>
    </div>`

        $("#feedDiv").prepend(card);

        $(`#${show.netflixID}discuss`).on("click", function (e) {
            e.preventDefault();
            var recentPost = {
                title: show.title,
                summary: show.summary,
                imdb: show.imdb,
                userRate: show.userRate,
                status: show.status,
                img: show.img,
                type: show.type,
                year: show.year,
                netflixID: show.netflixID,
                UserId: show.UserId
            }
            $.post("/api/recent", recentPost, function (res) {
                console.log("Show added to recent DB");
                location.replace("/discuss");
            });
        });

        $(`#${show.netflixID}add`).on("click", function (e) {
            e.preventDefault();

            $("#addedAlertRes").fadeTo(2000, 500).slideUp(500, function () {
                $("#addedAlertRes").slideUp(500);
            });

            status = $(`#${show.netflixID}watchSelect`).val().trim();
            rate = $(`#${show.netflixID}rateSelect`).val().trim();
            var showPost = {
                title: show.title,
                summary: show.summary,
                imdb: show.imdb,
                userRate: rate,
                status: status,
                img: show.img,
                type: show.type,
                year: show.year,
                netflixID: show.netflixID,
                UserId: show.UserId
            }
            $.post("/api/shows", showPost, function (res) {
                console.log("Show added to DB");
            });

        });

    }
});


function addUser(show) {
    var statement = `${show.User.username} `
    console.log(statement)
    switch (show.status) {
        case "Completed":
            statement += `Completed:`;
            break;
        case "Watching":
            statement += `is Currently Watching:`;
            break;
        default:
            statement += `Plans to Watch:`;
    }

    $(`#${show.id}Statement`).prepend(statement);
}
    // function that updates feed actively via button or swipe or refresh