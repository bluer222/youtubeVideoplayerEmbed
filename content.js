
// Wait for the page load completely before clicking
window.addEventListener('load', () => {
    const videoId = window.location.search.split("&")[0].substring(3);

    const newPlayer = document.createElement("iframe");
newPlayer.src = "https://www.youtube.com/embed/" + videoId;
newPlayer.style = "width:100%; height:100%;"
document.getElementById("movie_player").replaceWith(newPlayer);
});