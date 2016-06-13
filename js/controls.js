var is_mobile = false;
var is_webgl;
var quality = ""

var safeVid="";
safeVid += "	<video id=\"safe-vid\" width=\"100%\" height=\"auto\" autoplay loop>";
safeVid += "		<source src=\"/videos/safe-vid.mp4\" type=\"video\/mp4\"\/>";
safeVid += "		<source src=\"/videos/safe-vid.ogg\" type=\"video\/ogg\"\/>";
safeVid += "		<source src=\"/videos/safe-vid.webm\" type=\"video\/webm\"\/>";
safeVid += "		Your browser does not support neither WebGL nor Videos.";
safeVid += "	<\/video>";

var playerFrame="";
playerFrame += "<iframe width=\"98%\" height=\"20\" scrolling=\"no\" frameborder=\"no\" id=\"player\" class=\"scplayer\" src=\"https:\/\/w.soundcloud.com\/player\/?url=https%3A\/\/api.soundcloud.com\/tracks\/267672074&amp;color=d8b45c&amp;auto_play=true&amp;show_user=true\"><\/iframe>";

$(document).ready(function(){
  is_mobile = detect_mobile();
  is_webgl = detect_webgl();
  $("#control-message").hide();
  // Browser is not firefox
  if (is_webgl[0]){
    // WebGL is supported
    load_webgl();
    if (!is_mobile) {
      $("#control-message").show();
    }
  }
  else {
    // WebGL is not supported
    $("body").append(safeVid);
    $("#safe-vid")[0].load();
    $("#safe-vid")[0].play();
  }
});

function detect_mobile() {
  if( navigator.userAgent.match(/Android/i)
  || navigator.userAgent.match(/webOS/i)
  || navigator.userAgent.match(/iPhone/i)
  || navigator.userAgent.match(/iPad/i)
  || navigator.userAgent.match(/iPod/i)
  || navigator.userAgent.match(/BlackBerry/i)
  || navigator.userAgent.match(/Windows Phone/i)) {
    return true;
  } else {
    return false;
  }
};

function detect_webgl(return_context)
{
  if (!!window.WebGLRenderingContext) {
    var canvas = document.createElement("canvas"),
    names = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"],
    context = false;
    for(var i=0;i<4;i++) {
      try {
        context = canvas.getContext(names[i]);
        if (context && typeof context.getParameter == "function") {
          return [true, "WebGL is supported and enabled."];
        }
      } catch(e) {}
    }
    return [false, "Error: WebGL is supported but disabled."];
  }
  return [false, "Error: WebGL is not supported."];
}
