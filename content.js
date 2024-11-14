// Create an observer instance linked to the callback function
var observer = new MutationObserver(insertPlayer);
observer.observe(document.body, { attributes: false, childList: true });

window.navigation.addEventListener("navigate", (event) => {
    removePlayer(event);
})
insertPlayer();
function removePlayer(event) {
    //did the user go back to the home page(does the url we are going to not include watch)
    // console.log(event);
    if (!event.destination.url.includes("watch")) {

        console.log("ACUTALLy REMOVING");

        //if we inserted a player
        if (document.getElementById("newPlayer") !== null) {
            //remove the player
            document.getElementById("newPlayer").remove();
        }
    } else if (event.destination.url.includes("watch")) {
        //waitToInsertPlayer();
    }
}
function insertPlayer() {
    if (window.location.pathname.includes("watch")) {
        if (document.getElementById("movie_player") !== null) {
            //identify player
            var videoContainer = document.getElementById("movie_player");
            var actuallVideoPlayer = videoContainer.firstChild.children[1];
            //make sure player is defined
            if (actuallVideoPlayer === undefined) {
                var actuallVideoPlayer = document.getElementsByClassName("video-stream html5-main-video");
            } else if (actuallVideoPlayer.paused === undefined) {
                //if player was not identified

                //find with class instead
                var actuallVideoPlayer = document.getElementsByClassName("video-stream html5-main-video");
            }


            //it doesnt work properly sometimes so check if undefined
            if (actuallVideoPlayer.paused === undefined) {
                //pause the player
                actuallVideoPlayer[0].pause();
                //hide the container
                videoContainer.style.display = "none"
            } else if (!actuallVideoPlayer.paused) {
                //when it does work
                //pause the player
                actuallVideoPlayer.pause();
                //hide the container
                videoContainer.style.display = "none"
            }

            //if it hasnt inserted a player yet
            if (document.getElementById("newPlayer") === null) {
                //insert new player
                const videoId = window.location.search.split("&")[0].substring(3);

                const newPlayer = document.createElement("iframe");
                newPlayer.id = "newPlayer"
                newPlayer.src = "https://www.youtube.com/embed/" + videoId;
                newPlayer.style = "width:100%; height:100%;"
                videoContainer.parentElement.appendChild(newPlayer);
            }
        }
    }
}