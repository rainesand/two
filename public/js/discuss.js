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



            $.get("/api/post").then(posts => {
                console.log(posts);


            })





            $("#postSubmit").on("click", function (req, res) {
                $.get("/api/user_data").then(user => {
                    var userId = user.id;
                    if ($('#check').is(":checked")) {
                        var spoiler = '1';
                    } else {
                        var spoiler = '0';
                    }

                    var body = $("#postBody").val().trim();
                    var discussPost = {
                        body: body,
                        username: user.username,
                        UserId: userId,
                        netflixID: show.netflixID,
                        spoiler: spoiler
                    }
                    $.post("/api/discussPost", discussPost, function (res) {
                        console.log("Post added to DB");
                    });
                });
            })
        })
    });











});

function makePost(post) {
    var newPost =
        `<div id="postDiv">
    <div class="row justify-content-center" id="postRow">
        <div class="col-md-1" id="userIcon"><i class="fas fa-user"></i></div>
        <div class="col-md-6" id="postTest">
            <h6 id="postName">${post.username}</h6>
            <p id="postDate">${post.createdAt}</p>
            <p id="postText" class="hider">${post.body}</p>
            <p class="spoilerWarning">This comment contains a spoiler. Click to view.</p>
        </div>
    </div>
</div>`
}