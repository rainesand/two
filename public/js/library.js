$(document).ready(() => {
    $.get("/api/user_data").then(data => {
        console.log(data);
        $(".member-name").text(data.username);
        var id = data.id;

        $.get("/api/shows/" + id).then(shows => {
            console.log(shows);
            shows.forEach(show => {
                makeShowCard(show);
            });

        })
    });






    function makeShowCard(show) {
        console.log("I'm making cards");
        var status = show.status
        var card =
            `
            <button class="cardButt" type="button" data-toggle="collapse" aria-expanded="false" aria-controls="collapseExample" data-target="#${show.id}Summary">
            <div class="card" style="width: 14rem;">
                <img class="card-img-top" src="${show.img}" alt="${show.title} Image">
                <div class="card-body">
                    <div class="container">
                    <div class="row">
                    <div class="col">
                    <h5 class="card-title">${show.title}</h5>
                    <hr>
                    <div class="collapse" id="${show.id}Summary">
                        <p class="card-text">${show.summary}</p>
                    </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </button>`

        switch (status) {
            case "Watching":
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

    }

});
