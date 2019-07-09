var sourceUrl = {
    

        // testShapeDat:'https://sgdt.mlocso.com:8443/CMMapDemoHttps/res/testShapeDat.json',
        // testMassivepoint:'https://sgdt.mlocso.com:8443/CMMapDemoHttps/res/testMassivepoint.json',
        // testpolygon:'https://sgdt.mlocso.com:8443/CMMapDemoHttps/res/testpolygon.txt'
        
         testShapeDat:'http://sgdt.mlocso.com:8000/CMMapDemo/res/testShapeDat.json',
        testMassivepoint:'http://sgdt.mlocso.com:8000/CMMapDemo/res/testMassivepoint.json',
        testpolygon:'http://sgdt.mlocso.com:8000/CMMapDemo/res/testpolygon.txt'
};
var JSWrap = function () {};
!function () {
    var head = document.head || document.getElementsByTagName('head')[0];

    var meta = document.createElement('meta');
    meta.name = 'renderer';
    meta.content = 'webkit';
    head.appendChild(meta);

    var meta1 = document.createElement('meta');
    meta1.httpEquiv= 'X-UA-Compatible';
    meta1.content = 'IE=edge,chrome=1';
    head.appendChild(meta1);

    var bundleScript = document.createElement('script');
    bundleScript.type = 'text/javascript';
    // bundleScript.src = 'https://sgdt.mlocso.com:8443/VectorMapAbility/jssdk/auth?v=2.0&key=1234&name=bundle';
        // bundleScript.src = 'http://sgdt.mlocso.com:8000/VectorMapAbility/jssdk/auth?v=2.0&key=1234&name=bundle';
    bundleScript.src = 'http://61.189.20.113:8000/VectorMapAbility/jssdk/auth?v=2.0&key=1234&name=bundle';
    // bundleScript.src = '../js/bundle.js';
    // bundleScript.async = true;
    head.appendChild(bundleScript);

    // if(document.getElementsByTagName('meta').namedItem('isui')!=null){
    //          var UIScript = document.createElement('script');
    // UIScript.type = 'text/javascript';
    // // bundleScript.src = 'http://61.189.20.113:8000/maps?v=2.0&key=1234&name=bundle';
    // UIScript.src = '../js/ui.js';
    // head.appendChild(UIScript);
    // }

    // var skmapcss = document.createElement('link');
    // skmapcss.rel = "stylesheet";
    // skmapcss.href = "../css/skmap.css";
    // head.appendChild(skmapcss);
}();
JSWrap.floatTo6 = function(num){
    var numobj = new Number(num);
    return numobj.toFixed(6);
};
JSWrap.lnglatToStr = function(lnglat){
    return JSWrap.floatTo6(lnglat.getLng()) + " , " + JSWrap.floatTo6(lnglat.getLat());
};
JSWrap.lnglatToArrStr = function(lnglat){
    console.log(lnglat);
    return "[ " + JSWrap.lnglatToStr(lnglat) + " ]";
};
function loadScript(src, callback) {
    var script = document.createElement('script'),
        head = document.getElementsByTagName('head')[0];
    script.type = 'text/javascript';
    script.charset = 'UTF-8';
    script.src = src;
    if (script.addEventListener) {
        script.addEventListener('load', function () {
            callback();
        }, false);
    } else if (script.attachEvent) {
        script.attachEvent('onreadystatechange', function () {
            var target = window.event.srcElement;
            if (target.readyState == 'loaded') {
                callback();
            }
        });
    }
    head.appendChild(script);
}

function loadUIScript(callback){
      // loadScript('http://sgdt.mlocso.com:8000/maps?v=2.0&key=1234&name=ui',callback);
    // loadScript('https://sgdt.mlocso.com:8443/maps?v=2.0&key=1234&name=ui',callback);
     loadScript('http://61.189.20.113:8000/VectorMapAbility/jssdk/auth?v=2.0&key=1234&name=ui',callback);
    // loadScript('../js/ui.js',callback);
}

JSWrap.showInfo = function () {
//
// <div class="info">
//         <div id="input-card"></div>
//         </div>
}