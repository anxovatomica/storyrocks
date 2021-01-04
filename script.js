//Load CSS 
var script = document.createElement('link'); 
script.rel = "stylesheet"
script.href = "https://cdn.jsdelivr.net/gh/anxovatomica/storyrocks/storyRocks-style.min.css";
document.head.appendChild(script); 

//Story Rocks

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

        // HTML for story popup to be added to page
        var baseHTML = '<div class="storyRocks-storytime" style="opacity: 0; display: none;z-index:2000;">' +
			'<div class="storyRocks-story-cover"></div>' +
			'<div class="storyRocks-story-window">' +
			'<a href="#" class="storyRocks-story-arrow storyRocks-left" onclick="socialStory.prev();"></a><a href="#" class="storyRocks-story-arrow storyRocks-right" onclick="socialStory.next();"></a>' +
				'<div class="story-nav">' +
					'<div class="storyRocks-story-nav-left"><img class="storyRocks-story-icon" src="" /> <span class="storyRocks-story-text"></span><span class="storyRocks-story-date"></span></div><div class="storyRocks-story-nav-right"><a href="#" class="storyRocks-close story-close" onclick="socialStory.close();"></a></div>' +
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
			'</div>' +
		'</div>';
		// Add HTML to storytime div element
        Div.innerHTML += baseHTML;

       
    //Stories father
    var stories = document.createElement("div");
    stories.id = "stories"
    document.getElementsByClassName("storyrocks-collection")[0].appendChild(stories);
    //Create avatars
    //console.log("Stories: "+ json.length)
for(let i = 0; i < json.length; i++) {
    //Appears clickable but no link added
    var link = document.createElement("a");
    link.id = i;
    link.className = "storyRocks-link";
    link.href = "javascript:void(0);";
    link.style.borderBottom = 0;
    link.setAttribute("onclick", "socialStory.launch(this.id);");
    document.getElementById("stories").appendChild(link);
    //Div
    var div = document.createElement("DIV");
    div.className = "storyRocks-avatar";
    document.getElementsByClassName("storyRocks-link")[i].appendChild(div);
    //Outdoor circle
    var circle = document.createElement("DIV");
    circle.className = "storyRocks-circle";
    document.getElementsByClassName("storyRocks-avatar")[i].appendChild(circle);
    //Img
    var img = document.createElement("IMG");
    img.className = "storyRocks-img";
    document.getElementsByClassName("storyRocks-circle")[i].appendChild(img);
    document.getElementsByClassName("storyRocks-avatar")[i].setAttribute("id", "story" + i);
    document.getElementsByClassName("storyRocks-img")[i].src= json[i].avatar
    
    //SVG - Active story
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("class", "storyRocks-active");
    //svg.style.display = "none"
    document.getElementsByClassName("storyRocks-circle")[i].appendChild(svg);
    //Indoor circle
    var inCircle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    inCircle.setAttributeNS(null,"cx", "50");
    inCircle.setAttributeNS(null,"cy", "50");
    inCircle.setAttributeNS(null,"r", "45");
    document.getElementsByClassName("storyRocks-active")[i].appendChild(inCircle);
    
    //SVG - Inactive story
    var svg2 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg2.setAttribute("viewBox", "0 0 100 100");
    svg2.setAttribute("class", "storyRocks-inactive");
    svg2.style.display = "none"
    document.getElementsByClassName("storyRocks-circle")[i].appendChild(svg2);
    //Indoor circle
    var outCircle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    outCircle.setAttributeNS(null,"cx", "50");
    outCircle.setAttributeNS(null,"cy", "50");
    outCircle.setAttributeNS(null,"r", "45");
    outCircle.setAttributeNS(null,"stroke", "grey");
    outCircle.setAttributeNS(null,"stroke-width", "3");
    outCircle.setAttributeNS(null,"fill", "none");
    document.getElementsByClassName("storyRocks-inactive")[i].appendChild(outCircle);
    
    //Set name
    var name = document.createElement("DIV");
    name.className = "name";
    name.innerHTML = json[i].title;
    document.getElementsByClassName("storyRocks-avatar")[i].appendChild(name);
    document.getElementsByClassName("name")[i].setAttribute("style", "text-align: center;margin-top: 100%;");
  }

    };

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
       
        document.getElementsByTagName("body")[0].style.overflow =  "hidden";

       var timelineHTML = '';

        // Create timeline elements by looping through story items
        var i;
        for (i = 0; i < json[start].slides.length; i++) {
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
            storyTime.setAttribute("style", "display: block; opacity: 1;z-index:2000;");
        }, 10);

        // Load in the icon
        icon.src = json[start].icon;

        text.innerHTML = json[start].title;
        date.innerHTML = json[start].date;
        //console.log(json[start].slides[slide])
        //Get file extension
        var fileExt = json[start].slides[slide].url.substring(json[start].slides[slide].url.lastIndexOf('.')+1)
        
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
            video.src = json[start].slides[slide].url
            //Load it
            video.load();
        
        // Pause/play video when click for desktop
        document.getElementsByClassName("video")[0].touchstart = function(){video.pause();document.getElementsByClassName("storyRocks-story-date")[0].innerHTML="PAUSED";};
        document.getElementsByClassName("video")[0].touchend = function(){video.play();document.getElementsByClassName("storyRocks-story-date")[0].innerHTML=json[start].date;};
        console.log("date")
        // Pause/play video when click for touch screen
        document.getElementsByClassName("video")[0].touchstart = function(){video.pause();document.getElementsByClassName("storyRocks-story-date")[0].innerHTML="PAUSED";};
        document.getElementsByClassName("video")[0].touchend = function(){video.play();document.getElementsByClassName("storyRocks-story-date")[0].innerHTML=json[start].date;};
        
        
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
            image.src = json[start].slides[slide].url;
            thisTimeline.style.width = '0%';
            
            //Hide loading icon(spinner)
            storySpinner.style.display = 'none';
            image.style.maxWidth = "100%"
            image.style.maxHeight = "100%"
            
            // Pause/play image when click for desktop
            document.getElementsByClassName("images")[0].onmousedown = function(){pause();document.getElementsByClassName("storyRocks-story-date")[0].innerHTML="PAUSED";};
            document.getElementsByClassName("images")[0].onmouseup = function(){imageUpdate();document.getElementsByClassName("storyRocks-story-date")[0].innerHTML=json[start].date;};
            
             // Add event listener to track image progress and run function imageUpdate()
            image.addEventListener('load', imageUpdate, false);
            // Add event listerer to run function imageEnded() at end of image time
            image.addEventListener('seeking', imageEnded, false);
            
        }
        
        
    }
    
    
    //Weird function to calculate image time on lightbox and set progress bar
    /*var timeleft
    var downloadTimer
    var percentage = 1
    function imageUpdate(){
        timeleft = 1.00;
        var duration = 15;
        clearInterval(downloadTimer)
         downloadTimer = setInterval(function(){
            if(timeleft >= duration +1){
                percentage=1
                clearInterval(downloadTimer);
                imageEnded()
            }else{
                percentage = Math.ceil((100 / duration) * timeleft);
                console.log(percentage)
                thisTimeline.style.width = percentage   + '%';
                timeleft += 1;
            }
        },250);
    }
    function pause() {
  clearInterval(downloadTimer);
}*/
    
  
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
  }
}

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
        if (slide >= json[start].slides.length && start < json.length -1 ) {
                clearInterval(downloadTimer);
                width = 1;
                //Hide active circle
                document.getElementsByClassName("storyRocks-active")[start].style.display = "none"
                //Show story has been seen(storyRocks-inactive)
                document.getElementsByClassName("storyRocks-inactive")[start].style.display = ""
                start++;
               slide = 0;
            launch(start)
        }
        //But if it's last the slide and last story, close
        else if(slide >= json[start].slides.length && start >= json.length -1 ){
            setTimeout(function() {
                //Hide active circle
                document.getElementsByClassName("storyRocks-active")[start].style.display = "none"
                //Show that story has been seen(storyRocks-inactive)
                document.getElementsByClassName("storyRocks-inactive")[start].style.display = ""
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
                slide = (json[start].slides.length-1);
                launch(start)
        }
        //Otherwise run previuos slide
        else {
            clearInterval(downloadTimer);
            launch(slide);
        }
       
    }
/*
 // If next video doesn't exist (i.e. the previous video was the last) then close
        if (slide < 0) {
            slide = 0;
            launch(0);
            return false;
        } else {
        	// Otherwise run the previous video
            launch(slide);
        }
*/
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
            for (i = 0; i < json[start].length; i++) {
                document.getElementsByClassName('storyRocks-story-timeline-line-active')[i].setAttribute("style", "width: 0%;");
            }
        }, 500);
    }

    // Plugin functions that can be called from your webpages

    // socialStory.launch()
    Story.prototype.launch = function(num) {
    	// Launch - if no number is passed with socialStory.launch() then choose the first story.  As the stories are a javascript array the first story is 0
    	if(!num) { var num = 0;}
        start = num;
        launch();
    };

    // socialStory.next()
    Story.prototype.next = function() {
        next();
    };

    // socialStory.prev()
    Story.prototype.prev = function() {
        prev();
    };

    // socialStory.close()
    Story.prototype.close = function() {
        close();
    };

        //Send id from div id and get data in json structure
        var divId = document.getElementsByClassName("storyrocks-collection")[0].getAttribute('data-id');
        //GET Ajax request with js
		var xhReq = new XMLHttpRequest();
		xhReq.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                //console.log(this.responseText);
            }
        };
        xhReq.open("GET", "https://www.storyrocks.com/dev/storyrocks_data.php?id=" + divId, false);
        xhReq.send(null);
        var serverResponse = xhReq.responseText;
        var json = JSON.parse(serverResponse)

        //Create Story object and asign it to json recived
		var socialStory = new Story({
			playlist: json
		});
