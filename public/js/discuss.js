$(document).ready(() => {

    $.get("/api/user_data").then(user => {
        console.log(user);

        var id = user.id;

        $.get("/api/recent/" + id).then(recent => {
            var show = recent[0];
            console.log(show);
            let summary = show.summary.replace(/&#39;/g, "'");
            console.log(summary)
            $("#showImg").attr("src", show.img);
            $("#showName").text(show.title);
            $("#showSummary").text(summary);
            $("#ratingBadge").append(" " + show.imdb);
            $("#typeBadge").append(" " + show.type);
            $("#yearBadge").append(" " + show.year);


            var netflixID = show.netflixID;

            $.get("/api/post/" + netflixID).then(posts => {
                console.log(posts);
                if (posts.length === 0) {
                    $("#postDiv").removeClass("hide");
                }
                posts.forEach(post => {
                    makePost(post);
                    $(".warn").on("click", function (req, res) {
                        $(this).addClass("hideClick").siblings().removeClass("hideSpoiler")
                    });
                });
            });



            $("#postSubmit").on("click", function (req, res) {
                var check = $("#postBody").val();
                if (check === "") {
                    alert("Post can't be empty");
                } else {
                    $("#postDiv").addClass("hide");
                    $.get("/api/user_data").then(user => {
                        var userId = user.id;
                        if ($('#check').is(":checked")) {
                            var spoiler = '1';
                        } else {
                            var spoiler = '0';
                        }

                        var body = $("#postBody").val().trim();
                        $("#postBody").val("");
                        var discussPost = {
                            body: body,
                            username: user.username,
                            UserId: userId,
                            netflixID: show.netflixID,
                            spoiler: spoiler
                        }
                        $.post("/api/discussPost", discussPost, function (res) {
                            console.log("Post added to DB");
                            makeTemp(discussPost);
                        });
                    });
                }
            })
        })
    });
});

function makePost(post) {
    var date = post.createdAt.slice(0, 10);
    var hideSpoiler = "";
    var hideClick = "";
    if (post.spoiler) {
        hideSpoiler = "hideSpoiler";
        hideClick = "";
    } else {
        hideSpoiler = "";
        hideClick = "hideClick";
    }
    var newPost =
        `<div id="postDiv">
    <div class="row justify-content-center" id="postRow">
        <div class="col-md-1" id="userIcon"><i class="fas fa-user"></i></div>
        <div class="col-md-6" id="postTest">
            <h6 id="postName">${post.username}</h6>
            <p id="postDate">${date}</p>
            <p id="postText" class="${hideSpoiler}">${post.body}</p>
            <p class="${hideClick} warn" id="${post.id}Spoiler"><i class="far fa-flag"></i> This comment contains a spoiler. Click to view.</p>
        </div>
    </div>
</div>`
    $("#board").append(newPost);

}

function makeTemp(post) {
    var hideSpoiler = "";
    var hideClick = "";
    if (post.spoiler) {
        hideSpoiler = "hideSpoiler";
        hideClick = "";
    } else {
        hideSpoiler = "";
        hideClick = "hideClick";
    }
    var date = "Less than a minute ago";
    var newPost =
        `<div id="postDiv">
    <div class="row justify-content-center" id="postRow">
        <div class="col-md-1" id="userIcon"><i class="fas fa-user"></i></div>
        <div class="col-md-6" id="postTest">
            <h6 id="postName">${post.username}</h6>
            <p id="postDate">${date}</p>
            <p id="postText" class="${hideSpoiler}">${post.body}</p>
            <p class="${hideClick} warn"><i class="far fa-flag"></i> This comment contains a spoiler. Click to view.</p>
        </div>
    </div>
</div>`
    $("#board").prepend(newPost);
    $(".warn").on("click", function (req, res) {
        $(this).addClass("hideClick").siblings().removeClass("hideSpoiler")
    });
}