// Create an observer and when the body changes, make sure the player is inserted
var observer = new MutationObserver(insertPlayer);
observer.observe(document.body, { attributes: false, childList: true });

//when the page changes
window.navigation.addEventListener("navigate", (event) => {
    //did the user go back to the home page(does the url we are going to not include watch)
    if (!event.destination.url.includes("watch")) {
        //if so then remove the player
        removePlayer(event);
    }
})
function removePlayer(event) {
    //if we inserted a player
    if (document.getElementById("newPlayer") !== null) {
        //remove the player
        document.getElementById("newPlayer").remove();
    }
}

function insertPlayer() {
    //make sure we are on a watch page
    if (window.location.pathname.includes("watch")) {
        //if the built in player is still there
        if (document.getElementById("movie_player") !== null) {
            //identify the player
            var videoContainer = document.getElementById("movie_player");
            //identify the video inside the player
            var actuallVideoPlayer = videoContainer.firstChild.children[1];
            //if we failed to identify the player
            if (actuallVideoPlayer === undefined || actuallVideoPlayer.paused === undefined) {
                //try to find it with class
                var actuallVideoPlayer = document.getElementsByClassName("video-stream html5-main-video")[0];
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

            //if we havent inserted the new player yet
            if (document.getElementById("newPlayer") === null) {
                //create new player
                const videoId = window.location.search.split("&")[0].substring(3);
                const newPlayer = document.createElement("iframe");
                newPlayer.id = "newPlayer"
                newPlayer.src = "https://www.youtube.com/embed/" + videoId + "?autoplay=1";
                newPlayer.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;";
                newPlayer.style = "width:100%; height:100%;"

                //insert new player
                videoContainer.parentElement.appendChild(newPlayer);
            }
        }
    }
}
insertPlayer();

