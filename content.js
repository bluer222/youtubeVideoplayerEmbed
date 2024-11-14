// Create an observer instance linked to the callback function
var observer = new MutationObserver(insertPlayer);

// Start observing the target node for configured mutations
observer.observe(document.body, { attributes: false, childList: true });

function insertPlayer() {
    console.log("change");
    //if there is a video player then replace it
        if (document.getElementById("movie_player") !== null) {
            // Wait for the page load completely before switching it out
            const videoId = window.location.search.split("&")[0].substring(3);

            const newPlayer = document.createElement("iframe");
            newPlayer.id = "newPlayer"
            newPlayer.src = "https://www.youtube.com/embed/" + videoId;
            newPlayer.style = "width:100%; height:100%;"
            document.getElementById("movie_player").replaceWith(newPlayer);
        }
}
