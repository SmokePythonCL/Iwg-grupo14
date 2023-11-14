document.addEventListener("DOMContentLoaded", function () {
    var btnHelp = document.getElementById("btnHelp");
    var helpTitle = document.getElementById("helpTitle");
    var helpBody = document.getElementById("helpBody");
    var heading = document.getElementById("heading");
    var description = document.getElementById("description");
    var overlay = document.getElementById("overlay");
    var popup = document.getElementById("popup");
    var closeMsg = document.getElementById("closeMessage");
    var notShowAgainCheckbox = document.getElementById("notShowAgain");
    var welcome = document.getElementById("welcoming");

    var displayToggle = 1;
    btnHelp.onclick = function () {
        displayToggle++;
        if (displayToggle % 2 == 0) {
        showHelp();
        } else {
            hideHelp();
        }
    }
    function showHelp() {
        var titleWidth = 0;
        var bodyHeight = 0;
        var id1 = setInterval(frame1, 1);
        function frame1() {
            if (titleWidth == 250) {
                clearInterval(id1)
                heading.style.display = "block";
                heading.style.animation = "fadein-right 0.6s";
                var id2 = setInterval(frame2, 1);
                function frame2(){
                    if (bodyHeight == 250) {
                        clearInterval(id2);
                        description.style.display = "block"
                        description.style.animation = "fadein-bottom 0.6s";
                    } else {
                        bodyHeight += 5;
                        helpBody.style.height = bodyHeight + "px";
                    }
                }
            } else {
                titleWidth += 5;
                helpTitle.style.width = titleWidth + "px";
            }
        }
    }

    function hideHelp() {
        description.style.animation = "fadeout-bottom 0.6s";
        heading.style.animation = "fadeout-left 0.6s"
        var bodyHeight = 250;
        var titleWidth = 250;
        var id2 = setInterval(frame2,1);
        function frame2(){
            if (bodyHeight == 0){
                clearInterval(id2);
                var id1 = setInterval(frame1,1);
                function frame1(){
                    if (titleWidth == 0) {
                        clearInterval(id1);
                    } else {
                        heading.style.display = "none";
                        titleWidth -= 5;
                        helpTitle.style.width = titleWidth + "px";
                    }
                }
            } else {
                description.style.display = "none";
                bodyHeight -= 5;
                helpBody.style.height = bodyHeight + "px";
            }
        }
    }
    //localStorage.setItem("messageDisplayed", "false"); //to check if welcome message works
    if (localStorage.getItem("messageDisplayed") !== "true") {
        overlay.style.display = "block";
        closeMsg.addEventListener("click", function () {
            if (notShowAgainCheckbox.checked) {
                localStorage.setItem("messageDisplayed", "true");
            }
            closePopup();
        });
    } else {
        popup.style.display = "none";
        overlay.style.display = "none";
    }
    //localStorage.setItem("alreadyVisited", "false"); //to check if welcome message change works
    if (localStorage.getItem("alreadyVisited") !== "true") {
        closeMsg.addEventListener("click", function (){
        localStorage.setItem("alreadyVisited", "true");
        })
    } else {
        welcome.textContent = "¡Bienvenido de vuelta!"
    }
});
function closePopup() {
    popup.classList.add("fade-out");
    overlay.style.animation = "fade-out 0.5s ease-out forwards";
    setTimeout(function() {
        popup.style.display = "none";
        overlay.style.display = "none";
    }, 500);
}