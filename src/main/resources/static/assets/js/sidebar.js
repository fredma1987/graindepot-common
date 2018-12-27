function docollapsed(){
    var window_width_px=$('#main-container').css('width');
    var window_width=window_width_px.substr(0,window_width_px.length-2);
    var sidebar_width=$('#sidebar').width();
    if(sidebar_width==42){
        $("#main-content").css({"width":window_width-210,"float":"left"});
    }else{
        $("#main-content").css({"width":window_width-45,"float":"left"});
    }
}
function defaultcollapsed(){
    {
        var b = {
            "navbar-fixed": "navbar-fixed-top",
            "sidebar-fixed": "sidebar-fixed",
            "breadcrumbs-fixed": "breadcrumbs-fixed",
            "sidebar-collapsed": "menu-min",
            "main-container-fixed": "container"
        };
        var c="sidebar";
        var e="collapsed";
        var d = document.getElementById("sidebar");
        var flag=ace.hasClass(d, b[c + "-" + e]);
        var window_width_px = $('.main-container').css('width');
        var window_width = window_width_px.substr(0, window_width_px.length - 2);
        var sidebar_width = $('#sidebar').width();
        if(flag){
            $("#main-content").css({"width": window_width - 45, "float": "left"});
        }else{
            $("#main-content").css({"width": window_width - 190, "float": "left"});
        }
    }
}