/*Load CSS */
var script = document.createElement('link'); 
script.rel = "stylesheet"
//script.href = "/dev/style.css";
script.href = "https://cdn.jsdelivr.net/gh/anxovatomica/storyrocks/storyRocks.min.css";
document.head.appendChild(script);

//var url = window.location.href;

const url = new URL(window.location.href);

console.log(url);

var hostname = url.hostname;

console.log(hostname);

//Story Rocks

//Send id from div id and get data in json structure
var divId = document.getElementsByClassName("storyrocks-collection-row")[0].getAttribute('data-id');
//GET Ajax request with js
var xhReq = new XMLHttpRequest();

xhReq.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        //console.log(this.responseText);
    }
};


xhReq.open("GET", "https://www.storyrocks.com/dev/storyrocks_stats.php?id=" + divId + "&type_element=collection&type_action=impression", false);
xhReq.send(null);
var StatsId = xhReq.responseText;

console.log("llega ->" + StatsId);


// Declare plugin's variables
var defaults;
var video;
var image;
var thisTimeline;
var start = 0;
var slide = 0;
var storyTime;
var storySpinner;

this.Story = function() {


    // Default parameters if non provided.
    defaults = {
        playlist: null
    };

    if (arguments[0] && typeof arguments[0] === "object") {
        this.options = extendDefaults(defaults, arguments[0]);
    }

    try {
        if (defaults.playlist == null || defaults.playlist == '') {
            console.log('[SocialStories] No playlist provided.');
            return false;
        }
    } catch (e) {
        console.log(e);
        return false;
    }

        
    var Div = document.getElementsByClassName('storyrocks-collection')[0];


    let newNode = document.createElement('div');

    newNode.classList.add("storyrocks-collection");
/*storyRocks-story-arrow */
    newNode.innerHTML = '<div class="storyRocks-storytime" style="opacity: 0; display: none; z-index:10001;">' +
                            '<div class="storyRocks-story-cover"></div>' +
                            '<div class="storyRocks-story-window">' +
                            '<div class="storyRocks-left" onclick="storyRocks.prev();"></div>'+
                            '<div class="storyRocks-right" onclick="storyRocks.next();"></div>' +
                                '<div class="story-nav">' +
                                    '<div class="storyRocks-story-nav-left">'+
                                      '<img class="storyRocks-story-icon" src="" />'+ 
                                      '<span class="storyRocks-story-text"></span>'+
                                      '<span class="storyRocks-story-date"></span>'+
                                      '<svg onclick="storyRocks.close();" width="20px" height="20px" style="cursor:pointer;transform: rotate(45deg);right: 0px; position: absolute;">'+
                                      '<line x1="10" y1="0" x2="10" y2="20" style="stroke:white;stroke-width:2" />'+
                                      '<line x1="0" y1="10" x2="20" y2="10" style="stroke:white;stroke-width:2" />'+
                                      '</svg>'+
                                    '</div>'+
                                    /*'<div class="storyRocks-story-nav-right">'+
                                      '<a href="#" class="storyRocks-close story-close" onclick="storyRocks.close();"></a>'+
                                    '</div>' +*/
                                '</div>' +
                                '<div class="storyRocks-story-timeline"></div>' +
                                '<div class="storyRocks-story-video" >' +
                                    '<video class="story-next video" preload="auto" src="" poster="https://cdn.jsdelivr.net/gh/anxovatomica/storyrocks/negre.jpg" playsinline></video>' +
                                    '<img class="story-next images" loading="auto" src="">' +
                                '</div>' +
                                '<div class="storyRocks-spinner">' +
                                    '<div class="storyRocks-bounce1"></div>' +
                                    '<div class="storyRocks-bounce2"></div>' +
                                    '<div class="bounce3"></div>' +
                                '</div>' +
                                /*'<button id="buttonId"></button>'+*/
                            '</div>' +
                        '</div>';

    document.body.insertBefore(newNode, document.body.childNodes[0]);
           
    

    //Create avatars
    //console.log("Stories: "+ json.length)
    for(let i = 0; i < json['stories'].length; i++) {
        //Appears clickable but no link added
        var link = document.createElement("a");
        link.id = i;
        link.className = "storyRocks-link";
        link.href = "javascript:void(0);";
        link.style.borderBottom = 0;
        link.setAttribute("onclick", "storyRocks.launch(this.id,"+json['stories'][i].id+")");
        document.getElementsByClassName("storyrocks-collection-row")[0].appendChild(link);
        //Div
        var div = document.createElement("DIV");
        div.className = "storyRocks-avatar";
        //document.getElementsByClassName("storyRocks-link")[i].appendChild(div);
        //Img
        var img = document.createElement("IMG");
        img.className = "storyRocks-img";
        document.getElementsByClassName("storyRocks-link")[i].appendChild(img);
        document.getElementsByClassName("storyRocks-img")[i].src= json['stories'][i].avatar

        //Set name
        var name = document.createElement("DIV");
        name.className = "name";
        name.innerHTML = json['stories'][i].title;
        document.getElementsByClassName("storyRocks-link")[i].appendChild(name);
        document.getElementsByClassName("name")[i].setAttribute("style", "text-align: center;/*margin-top: 100%;*/");

    }// End for

}; //End Story FUnction

// Utility method to extend defaults with user options
function extendDefaults(source, properties) {
    var property;
    for (property in properties) {
        if (properties.hasOwnProperty(property)) {
            source[property] = properties[property];
        }
    }
    return source;
}

function launch(num) {


    //var size = document.getElementById('myFile').files[0].size;
    
    xhReq.open("GET", "https://www.storyrocks.com/dev/storyrocks_stats.php?id=" + json['stories'][start].slides[slide].id + "&type_element=slide&type_action=view&stats_id="+ StatsId, false);
    xhReq.send(null);
    var serverResponseStatsSlides = xhReq.responseText;
    var jsonStatsLaunch = JSON.parse(serverResponseStatsSlides)

    console.log("llego Stats slides");
    console.log(JSON.stringify(jsonStatsLaunch));

    

       
    document.getElementsByTagName("body")[0].style.overflow = "hidden";

    var timelineHTML = '';

    // Create timeline elements by looping through story items
    var i;
    for (i = 0; i < json['stories'][start].slides.length; i++) {
        timelineHTML = timelineHTML + '<div class="storyRocks-story-timeline-item"><div class="storyRocks-story-timeline-line"></div><div class="storyRocks-story-timeline-line-active story-active-' + i + '" style="width: 0%;"></div></div>';
    }   

    // Add timeline HTML to storytime div element    
    var storyTimeline = document.getElementsByClassName('storyRocks-story-timeline')[0];
    storyTimeline.innerHTML = timelineHTML;
        
    // Get HTML elements
    storyTime = document.getElementsByClassName('storyRocks-storytime')[0];
    storySpinner = document.getElementsByClassName('storyRocks-spinner')[0];
    thisTimeline = document.getElementsByClassName('story-active-' + slide)[0];
    var icon = document.getElementsByClassName('storyRocks-story-icon')[0];
    var text = document.getElementsByClassName('storyRocks-story-text')[0];
    var date = document.getElementsByClassName('storyRocks-story-date')[0];
    video = document.getElementsByClassName("video")[0];
    image = document.getElementsByClassName("images")[0];

    // Show lightbox
    if (start == 0) {
        storyTime.setAttribute("style", "display: block; opacity: 0;z-index:2000;");
        
    } else {
        storyTime.setAttribute("style", "display: block; opacity: 1; z-index:2000;");
        
    }

    // Set CSS loading spinner to display: block (i.e. show it)
    //storySpinner.style.display = 'block';
    
    
    //Don't let the window move while spinner is on
    /*if(video.offsetWidth != 0){
        document.getElementsByClassName("storyRocks-story-window")[0].style.width = video.offsetWidth + "px"
    }else if(image.offsetWidth != 0){
        document.getElementsByClassName("storyRocks-story-window")[0].style.width = image.offsetWidth+ "px"
    }*/
        
        
    setTimeout(function() {
        storyTime.setAttribute("style", "display: block; opacity: 1;z-index:2002;");
    }, 10);

    // Load in the icon
    icon.src = json['stories'][start].icon;

    text.innerHTML = json['stories'][start].title;
    date.innerHTML = json['stories'][start].date;
    //console.log(json[start].slides[slide])
    //Get file extension
    var fileExt = json['stories'][start].slides[slide].url.substring(json['stories'][start].slides[slide].url.lastIndexOf('.')+1)
    
    //Detect if file is a picture or video from its extension
    function file(file){
        if(file.match(/jpg|jpeg|png|gif/))
            return true
        else
            return false
    }
        
    // Remove any previous videos
    video.src = ' ';
    
    //If file from url is a video
    //var s1 = document.getElementsByClassName("video")[0];
    //console.log("video "+ s1.clientWidth);
    
    /*if(s1 != 0){
        document.getElementsByClassName("storyRocks-story-window")[0].style.width = s1.clientWidth + "px"
    }else if(s2 != 0){
        document.getElementsByClassName("storyRocks-story-window")[0].style.width = s2.clientWidth + "px"
    }*/
        //document.getElementsByClassName("storyRocks-story-window")[0].style.width = ig.clientWidth + "px"
    
    if(!file(fileExt)){
        
        //Hide image
        document.getElementsByClassName("images")[0].style.display = "none"
        //Show video box
        document.getElementsByClassName("video")[0].style.display = "inline"
        //Set video
        video.src = json['stories'][start].slides[slide].url
        //Load it
        video.load();
    
        // Pause/play video when click for desktop
        document.getElementsByClassName("video")[0].touchstart = function(){video.pause();document.getElementsByClassName("storyRocks-story-date")[0].innerHTML="PAUSED";};
        document.getElementsByClassName("video")[0].touchend = function(){video.play();document.getElementsByClassName("storyRocks-story-date")[0].innerHTML=json['stories'][start].date;};
        console.log("date")
        // Pause/play video when click for touch screen
        document.getElementsByClassName("video")[0].touchstart = function(){video.pause();document.getElementsByClassName("storyRocks-story-date")[0].innerHTML="PAUSED";};
        document.getElementsByClassName("video")[0].touchend = function(){video.play();document.getElementsByClassName("storyRocks-story-date")[0].innerHTML=json['stories'][start].date;};
            
        //Set styles
        thisTimeline.style.width = '0%';
        video.style.maxWidth = "100%"
        video.style.maxHeight = "100%"
        
        // When video can play, hide spinner
        video.oncanplay = function() {
            storySpinner.style.display = 'none';
            video.play();
            //document.getElementsByClassName('storyRocks-story-video')[0].setAttribute("style", "min-width: " + video.offsetWidth + "px;");
            video.muted = false;
        };

        // Add event listener to track video progress and run function timeUpdate()
        video.addEventListener('timeupdate', timeUpdate, false);
        // Add event listerer to run function videoEnded() at end of video
        video.addEventListener('ended', videoEnded, false);
    
    }else{
        
        //If file from url is a photo
        document.getElementsByClassName("images")[0].style.display = "inline"
        document.getElementsByClassName("video")[0].style.display = "none"
        
        //Set image
        image.src = json['stories'][start].slides[slide].url;
        thisTimeline.style.width = '0%';
        
        //Hide loading icon(spinner)
        storySpinner.style.display = 'none';
        image.style.maxWidth = "100%"
        image.style.maxHeight = "100%"
        image.style.borderRadius = "10px";
        
        // Pause/play image when click for desktop
        document.getElementsByClassName("images")[0].onmousedown = function(){pause();document.getElementsByClassName("storyRocks-story-date")[0].innerHTML="PAUSED";};
        document.getElementsByClassName("images")[0].onmouseup = function(){imageUpdate();document.getElementsByClassName("storyRocks-story-date")[0].innerHTML=json['stories'][start].date;};
        
            // Add event listener to track image progress and run function imageUpdate()
        image.addEventListener('load', imageUpdate, false);
        // Add event listerer to run function imageEnded() at end of image time
        image.addEventListener('seeking', imageEnded, false);
        
    } //End if
    
    
} //  End Launch
  
var downloadTimer;
var width = 1;

function imageUpdate() { 
 
  clearInterval(downloadTimer);
  downloadTimer = setInterval(frame, 50);

  function frame() {
    if (width >= 105) {
      width = 1;
      imageEnded()
      clearInterval(downloadTimer);
      
    } else {
      width++;
      //console.log(width)
      thisTimeline.style.width = width + '%';
    }
  } //End function frame

} //End imageUpdate


function pause() {
  clearInterval(downloadTimer);
} 


function imageEnded() {
    // Remove all event listeners on image end so they don't get duplicated.
    image.removeEventListener('load', imageUpdate);
    image.removeEventListener('seeking', imageEnded);
    // Run next image
    next();
}


function timeUpdate() {
    // Calculate percentage of video played and update the videos timeline width accordingly
    var percentage = Math.ceil((100 / video.duration) * video.currentTime);
    //console.log("duration "+video.duration)
    //console.log("Current time: " +video.currentTime)
    thisTimeline.style.width = percentage + '%';
}


function videoEnded() {
    // Remove all event listeners on video end so they don't get duplicated.
    video.removeEventListener('timeupdate', timeUpdate);
    video.removeEventListener('ended', videoEnded);
    // Run next video
    next();
}


function next() {

    // Set previous video timeline to 100% complete
    thisTimeline.style.width = '100%';
    // Advance play count to next video
    slide++;
    clearInterval(downloadTimer);
    width = 1;
    // If it's the last slide but not the last story, then next story
    if (slide >= json['stories'][start].slides.length && start < json['stories'].length -1 ) {
            clearInterval(downloadTimer);
            width = 1;
            //Hide active circle
            document.getElementsByClassName("storyRocks-img")[start].style.borderColor = "grey"


            xhReq.open("GET", "https://www.storyrocks.com/dev/storyrocks_stats.php?id=" +  json['stories'][start].id + "&type_element=story&type_action=completed&stats_id="+ StatsId, false);
            xhReq.send(null);
            var serverResponseStatsCompleted = xhReq.responseText;
            var jsonStatsLaunch = JSON.parse(serverResponseStatsCompleted)
            console.log("llego Stats completed story");
            console.log(JSON.stringify(jsonStatsLaunch));
            console.log("completado " + json['stories'][start].id)


            start++;
            slide = 0;

           
        launch(start)
    }
    //But if it's last the slide and last story, close
    else if(slide >= json['stories'][start].slides.length && start >= json['stories'].length -1 ){
        setTimeout(function() {
            //Hide active circle
            document.getElementsByClassName("storyRocks-img")[start].style.borderColor = "grey"
            //Show that story has been seen(storyRocks-inactive)
            //document.getElementsByClassName("storyRocks-inactive")[start].style.display = ""

            xhReq.open("GET", "https://www.storyrocks.com/dev/storyrocks_stats.php?id=" +  json['stories'][start].id + "&type_element=story&type_action=completed&stats_id="+ StatsId, false);
            xhReq.send(null);
            var serverResponseStatsCompleted = xhReq.responseText;
            var jsonStatsLaunch = JSON.parse(serverResponseStatsCompleted)
            console.log("llego Stats completed story");
            console.log(JSON.stringify(jsonStatsLaunch));
            console.log("completado " + json['stories'][start].id)


            close();
            start=0;
            slide=0;
            return false;
        }, 100);
    }
    //Otherwise run next slide
    else {
        launch(slide);
    }
}

function prev() {
    
    clearInterval(downloadTimer);
    width = 1;
    // If previous video was not first video set its timeline to 0% 
    if (slide != 0) {
        thisTimeline.style.width = '0%';
    }
    // Subtract play count to previous video
    slide--;
    //If first slide of first story, relaunch
    if (start <= 0 && slide <= 0) {
            clearInterval(downloadTimer);
            width = 1;
            start = 0;
            slide = 0;
        launch(start)
    }
    //If first slide of any story except the first one
    else if(slide < 0 ){
        start--;
            slide = (json['stories'][start].slides.length-1);
            launch(start)
    }
    //Otherwise run previuos slide
    else {
        clearInterval(downloadTimer);
        launch(slide);
    }
    
}

function close() {
    //Unblock scroll
    document.getElementsByTagName("body")[0].style.overflow =  "auto";
    //Clear time interval for pictures
    clearInterval(downloadTimer);
    width = 1;
    // Pause currently playing video
    video.pause();
    // Hide Social Story popup
    storyTime.setAttribute("style", "opacity: 0;");
    // After 500ms set stoyrtime element to display:none and reset all video timelines to 0%
    setTimeout(function() {
        storyTime.setAttribute("style", "opacity: 0; display: none;");
        start = 0;
        slide = 0;
        var i;
        for (i = 0; i < json['stories'][start].length; i++) {
            document.getElementsByClassName('storyRocks-story-timeline-line-active')[i].setAttribute("style", "width: 0%;");
        }
    }, 500);
}

    // Plugin functions that can be called from your webpages

// storyRocks.launch()
Story.prototype.launch = function(num, idstory) {

    console.log("stats_id-> "+StatsId);

   
    xhReq.open("GET", "https://www.storyrocks.com/dev/storyrocks_stats.php?id=" + idstory + "&type_element=story&type_action=click&stats_id="+ StatsId, false);
    xhReq.send(null);
    var serverResponseStatsLaunch = xhReq.responseText;
    var jsonStatsLaunch = JSON.parse(serverResponseStatsLaunch)
    console.log("llego Stats click story");
    console.log(JSON.stringify(jsonStatsLaunch));

    // Launch - if no number is passed with storyRocks.launch() then choose the first story.  As the stories are a javascript array the first story is 0
    if(!num) { var num = 0;}
    start = num;
    launch();
};

// storyRocks.next()
Story.prototype.next = function() {
    next();
};

// storyRocks.prev()
Story.prototype.prev = function() {
    prev();
};

// storyRocks.close()
Story.prototype.close = function() {
    close();
};






xhReq.open("GET", "https://www.storyrocks.com/dev/storyrocks_data.php?id=" + divId+"&url=www.storyrocks.com", false);
xhReq.send(null);
var serverResponse = xhReq.responseText;
var json = JSON.parse(serverResponse);

console.log(json);
var color = json['elements']['border_color'];
var fontColor = json['elements']['text_color'];

//Create Story object and asign it to json recived
var storyRocks = new Story({
    playlist: json
});


function circleColorChange(color){
    var el = document.getElementsByClassName('storyRocks-img');
    for(i = 0; i < el.length; i++) {
        el[i].style.borderColor = color;
      }
}
circleColorChange(color);


//Function to change font color
function changeFontColor(color){
    var font = document.getElementsByClassName('name');
    for(i = 0; i < font.length; i++) {
        font[i].style.color = color;
      }
}
changeFontColor(fontColor)

//Function to change hover font color
function changeHoverFontColor(color, fontColor) {
  var font = document.getElementsByClassName("name");
  for (i = 0; i < font.length; i++) {
    font[i].onmouseover = function () {
      this.style.color = color;
    };
  }
  for (i = 0; i < font.length; i++) {
    font[i].onmouseout = function () {
      this.style.color = fontColor;
    };
  }
}
changeHoverFontColor('#fcba03', '#4200f7');

//Function to change size font
function changeFontSize(size) {
  var font = document.getElementsByClassName("name");
  for (i = 0; i < font.length; i++) {
    font[i].style.fontSize = size + "px";
  }
}
changeFontSize('20');

/***************************************************************/
/*************************** BUTTON ***************************/
/*************************************************************/

var button = document.getElementById("buttonId");
//buttonAppears(button);
//buttonText('text');
//buttonWidth(null);
//buttonHeight(sizeHeight);
//backgroundColorButton('#4200f7');
//buttonHoverColor('#e5eb34','#34eba5');
//buttonSize('m');
//positionOfButton("br");

//Function to make the button appear or not
function buttonAppears(button) {
  var x = document.getElementById("buttonId");
  x =
    button === true ? (x.style.display = "block") : (x.style.display = "block");
}
var button = document.getElementById("buttonId");

//Function that add text to a button
function buttonText(text) {
  var x = document.getElementById("buttonId");
  x.innerHTML = text;
}

//Function that change button width size
function buttonWidth(sizeWidth) {
  var x = document.getElementById("buttonId");
  x.style.width = sizeWidth + "px";
}

//Function that change button height size
function buttonHeight(sizeHeight) {
  var x = document.getElementById("buttonId");
  x.style.height = sizeHeight + "px";
}

//Function that change button color
function backgroundColorButton(colorB) {
  var x = document.getElementById("buttonId");
  x.style.backgroundColor = colorB;
}

//Function that change button hover color
function buttonHoverColor(hoverIn, hoverOut) {
  var x = document.getElementById("buttonId");
  x.onmouseover = function () {
    this.style.color = hoverIn;
    x.style.boxShadow =
      "" +
      OverInset +
      " " +
      OverOffsetX +
      "px " +
      OverOffsetY +
      "px " +
      OverBlurRadius +
      "px " +
      OverSpreadRadius +
      "px " +
      OverColorBoxShadow +
      "";
  };
  x.onmouseout = function () {
    this.style.color = hoverOut;
    x.style.boxShadow =
      "" +
      inset +
      " " +
      offsetX +
      "px " +
      offsetY +
      "px " +
      blurRadius +
      "px " +
      spreadRadius +
      "px " +
      ColorBoxShadow +
      "";
  };
}

//Button size change according your selection (s-m-l , default or personalized)
function buttonSize(size) {
  var x = document.getElementById("buttonId");
  switch (size) {
    case "s":
      x.className += "btn btn-primary btn-sm";
      x.style.width = "60px";
      break;
    case "m":
      x.className += "btn btn-primary btn-primary";
      x.style.width = "80px";
      break;
    case "l":
      x.className += "btn btn-primary btn-lg";
      x.style.width = "100px";
      break;
    case "default":
      x.style.padding = "10px 16px";
      x.style.lineHeight = "1.3333333";
      x.style.borderRadius = "6px";
      break;
    default:
      buttonWidth();
      buttonHeight();
      x.style.padding = "10px 16px";
      x.style.lineHeight = "1.3333333";
      x.style.borderRadius = "6px";
      break;
  }
}

//Button is positioned at postion selected
function positionOfButton(position) {
  var x = document.getElementById("buttonId");
  switch (position) {
    case "tr":
      topRight(x);
      break;
    case "tl":
      topLeft(x);
      break;
    case "br":
      bottomRight(x);
      break;
    case "bl":
      bottomLeft(x);
      break;
    case "c":
      center(x);
      break;
    default:
      break;
  }
}

//Button is positioned at top-left
function topLeft(x) {
  x.style.top = "11%";
  x.style.left = "10%";
}
//Button is positioned at top-right
function topRight(x) {
  x.style.top = "11%";
  x.style.right = "1%";
}
//Button is positioned at bottom-right
function bottomRight(x) {
  x.style.bottom = "0.5%";
  x.style.right = "1%";
}
//Button is positioned at bottom-left
function bottomLeft(x) {
  x.style.bottom = "1%";
  x.style.left = "10%";
}
//Button is positioned at center
function center(x) {
  x.style.position = "absolute";
  x.style.left = "50%";
  x.style.top = "50%";
}

//Mute-Unmute story
function enableDisableVideoSound() {
  $("#audio-control").click(function () {
    if ($("#video").prop("muted")) {
      $("#video").prop("muted", false);
      $(this).text("🔉");
      // or toggle class, style it with a volume icon sprite, change background-position
    } else {
      $("#video").prop("muted", true);
      $(this).text("🔇");
    }
  });
}
enableDisableVideoSound();

//Enable iconSound of next/prev story
function restoreIconSound() {
  $("#arrowPrev").click(function () {
    $("#audio-control").text("🔉");
  });
  $("#arrowNext").click(function () {
    $("#audio-control").text("🔉");
  });
  $("#storyClose").click(function () {
    $("#audio-control").text("🔉");
  });
}
restoreIconSound();



/*Pause video and image with touch screen (phone)
function playVid() {
  $("#video").trigger("pause");
  document.getElementsByClassName("storyRocks-story-date")[0].innerHTML =
    "PAUSED";
}
function pauseVid() {
  $("#video").trigger("play");
  document.getElementsByClassName("storyRocks-story-date")[0].innerHTML =
    json[start].date;
}
function playImg() {
  console.log('play');
  $("#image_story").trigger(pause());
  document.getElementsByClassName("storyRocks-story-date")[0].innerHTML =
    "PAUSED";
}
function pauseImg() {
  console.log('stop');
  $("#image_story").on(imageUpdate());
  document.getElementsByClassName("storyRocks-story-date")[0].innerHTML =
    json[start].date;
}*/

// Add event listeners to start and stop the video
document.addEventListener("touchstart", stopVideo, false);
document.addEventListener("touchend", startVideo, false);
document.addEventListener("touchstart", stopImg, false);
document.addEventListener("touchend", startImg, false);

// Functions to start and stop the video
function startVideo() {
  document.getElementsByClassName("story-next")[0].play();
}
function stopVideo() {
  document.getElementsByClassName("story-next")[0].pause();
}

// Functions to start and stop the image
function startImg() {
  imageUpdate();
  document.getElementsByClassName("storyRocks-story-date")[0].innerHTML =
    json[start].date;
    imageUpdate();
}
function stopImg() {
  pause();
  document.getElementsByClassName("storyRocks-story-date")[0].innerHTML =
    "PAUSED";
  //document.getElementsByClassName("story-next")[1].pause();
}

//Pause/play video when click for desktop
document.getElementsByClassName("video")[0].onmousedown = function () {
  pause();
  video.pause();
  document.getElementsByClassName("storyRocks-story-date")[0].innerHTML =
    "PAUSED";
};
document.getElementsByClassName("video")[0].onmouseup = function () {
  //videoUpdate();
  document.getElementsByClassName("storyRocks-story-date")[0].innerHTML =
  json['stories'][start].date;
  video.play();
};
//

// Pause/play image when click for desktop
document.getElementsByClassName("images")[0].onmousedown = function () {
  pause();
  document.getElementsByClassName("storyRocks-story-date")[0].innerHTML =
    "PAUSED";
};
document.getElementsByClassName("images")[0].onmouseup = function () {
  imageUpdate();
  document.getElementsByClassName("storyRocks-story-date")[0].innerHTML =
    json[start].date;
};


/*
document.onreadystatechange = function () {
    var state = document.readyState
    if (state == 'interactive') {
        document.getElementById('interactive').innerHTML = 'Document ready to accept interactions.'
    } else if (state == 'complete') {
        document.getElementById('complete').innerHTML = 'Document completely loaded'
    }
  }

  ready(function () {
    // your code here

    alert("hey");
  });
  */