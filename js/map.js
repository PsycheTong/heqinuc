var isInt = 0;      //判断源码是否已经获取过，如果获取过，则直接显示当前页面源码，否则从服务器获取
var isTab = 1;
var myWidth = 0, myHeight = 0, isOpen = 0, isFull = 0;editor = null;//获取浏览器高度和宽度,高亮代码编辑器


function screenResize(){
    if(typeof( $(window).innerWidth()) == 'number' ) {
        //Non-IE
        myWidth = $(window).innerWidth();
        myHeight = $(window).innerHeight();
    } 
    else if(document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight)){
        //IE 6+ in 'standards compliant mode'
        myWidth = document.documentElement.clientWidth;
        myHeight = document.documentElement.clientHeight;  
    }
    window.onresize = function () 
    { 
        if( typeof( $(window).innerWidth() ) == 'number' ) {
            //Non-IE
            myWidth = window.innerWidth;
            myHeight = window.innerHeight;
        } 
        else if(document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight)){
            //IE 6+ in 'standards compliant mode'
            myWidth = document.documentElement.clientWidth;
            myHeight = document.documentElement.clientHeight;  
        }
        mapheight();
    } 
}


function codeChange(){
    if($("#code_area")[0].offsetWidth >0){
        $("#code_open").hide();
        $("#code_close").show();
    }else{  
        $("#code_close").hide();
        $("#code_open").show();
    }
}

function hideCode(){
    var code_area = $('#code_area');
    var map = $('#container');
    var toggleImg = $('#toggle-img');
    if(code_area[0].offsetWidth <=0)
        return;
    toggleFooter();
}
/**开关代码编辑器**/
function toggleFooter () {
    var code_area = $('#code_area');
    var map = $('#container');
    var toggleImg = $('#toggle-img');
    if(code_area[0].offsetWidth <=0){//如果已经关闭，则打开
        code_area.animate({ 
            width: 500
        }, 200);
    map.animate({
        width: myWidth - 785
    },200);
    }else{
        code_area.animate({ 
             width: 0
        }, 200);
    map.animate({
        width: myWidth - 285
    },200);
    }
    setTimeout(function(){codeChange()},200);
}


function getresource(id){
    init();
    function createXmlHttpRequest(){
        try {
            return new XMLHttpRequest();
        }
        catch(e){
            return new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    var mylink; 
    var location = window.location.toString();
        if (location.indexOf('index.html') > 0) {
            location = location.substr(0, location.indexOf('index.html'));
        }  
    mylink = location += 'page/' + id + '.html';
    var xmlHttp = createXmlHttpRequest();
    xmlHttp.open("get",mylink,false);
    xmlHttp.send();
    if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
        str = xmlHttp.responseText;//str即为返回的html内容
        localStorage.content = str;
        str = str.replace('5592f4830d22caccc27546e61faf9048', '您的密钥');
        $("#code").val(str);
        initEditor();   
        isInt = 1;
        isTab = 0;
    }  
 }   


/** 设置地图容器宽度 **/
function mapheight(){
    $("#container").width(myWidth - $("#menu")[0].offsetWidth - $("#code_area")[0].offsetWidth -5);
    $("#container").height(myHeight - 90);
}


/**将用户修改过的代码加载到content中**/
function run()
	{
        console.log('run');
	    var iframeContent=$("#code").val();
	    if(editor){
	      iframeContent=editor.getValue();
	    }
	    iframeContent = iframeContent.replace('您的密钥','5592f4830d22caccc27546e61faf9048');
	    // alert(iframeContent);
	    var iFrame=document.getElementById("container").contentWindow;
	    iFrame.document.open();
	    iFrame.document.write(iframeContent);
	    iFrame.document.close(); 
    }
	
	
/**刷新**/	
function refresh()
	{
	    $("#code").val();
	    initEditor();
	    run();
	}
	
	
/**初始化文本编辑器**/	
function initEditor()
	{
        if(!editor){
            editor = CodeMirror.fromTextArea(document.getElementById("code"), {
                lineWrapping:true, //是否显示scroll
                lineNumbers: false, //是否显示number
                styleActiveLine: true,
                matchBrackets: true,
                mode:"htmlmixed",
                viewportMargin: Infinity              
            });
        }else{
            editor.setValue($("#code").val());
        }
	}


/** 复制功能 **/
var clip = null;    
var copyTimer = null;   //显示复制成功的定时器
function init() {
    // debugger;
    clip = new ZeroClipboard.Client();
    clip.setHandCursor( true );         
    clip.addEventListener('load', function (client) {
        debugstr("Flash movie loaded and ready.");
    });         
    clip.addEventListener('mouseOver', function (client) {
            // update the text on mouse over
    $("#d_clip_button").css({fontWeight:"bold"});
    var iframeContent=$("#code").val();
    if(editor){
        iframeContent=editor.getValue();
    }
    clip.setText( iframeContent );
    }); 
    clip.addEventListener('mouseOut', function (client) {
        $("#d_clip_button").css({fontWeight:"normal"});
        // $("#d_clip_button").style.fontWeight = "normal";
    });
    clip.addEventListener('complete', function (client, text) {
        debugstr("Copied text to clipboard: " + text );        
    });         
    clip.glue('d_clip_button');
}


/**左侧导航**/
function navigation(){
    var menu_head = $('#menu ul>li>a');
    var menu_body = $('#menu ul>li>.submenu');
    var menu_i = $('#menu ul>li>a>i');
    var flag = 0;
    menu_head.on('click',function(event){   
        if(!$(this).hasClass("open clickState")){
            var des = ($(this).attr("listid")-1) * 52;
            $("#menu").animate({scrollTop:des},200);
            //slideToggle
            menu_body.slideUp('fast');
            $(this).next().stop(true,true).slideToggle('fast');
            menu_head.removeClass('open clickState');
            menu_i.removeClass('t_open');
            menu_i.addClass('t_close');
            $(this).addClass('open clickState');
            $(this).find('i').addClass('t_open');
        }else{
            if(flag == $(this).attr("listid")){
                $(this).removeClass('open');
            }else{
                $(this).removeClass('open clickState');
            }
            $(this).find("i").removeClass('t_open').addClass('t_close');
            $(this).parents("li").find(".submenu").slideUp('fast');
        }
    });
    $(".submenu a").on('click',function(){
        flag = $(this).parents("li").find(".one_head").attr("listid");
        if(!$(this).hasClass("clickState")){
            $(".submenu a").removeClass("clickState");
            $(this).addClass("clickState");
        }
        //代码宽度还原
        $("#code_area").width(500);
        mapheight();
    }); 
}


/**设置显示源码的拖拽效果**/
function dragCode(){
    $("#drag").mousedown(function(){
        document.onselectstart = function(){return false;};
        document.onmousemove = function(e){
            var bottomX = (e||window.event).clientX -281;
            if($("#overiframe").is(":hidden")==true){
                $("#overiframe").show();
            }
            if(bottomX <=0){
                bottomX = 0;
            }
            if(bottomX >= myWidth - 287){
                bottomX = myWidth - 287;
            }
            $("#code_area").width(bottomX);
            $("#code").width(bottomX*0.8);
            $("#container").width(myWidth - bottomX -287);
            $("#overiframe").width(myWidth - bottomX -287);     
        };
        document.onmouseup=function(){
            document.onmousemove=null;
            $("#overiframe").hide();
            codeChange();           
            init();
        };
    });
}


/**页面初始化**/
(function(){	
    dragCode();
    codeChange();
    navigation();
    init();
    screenResize();
})();

