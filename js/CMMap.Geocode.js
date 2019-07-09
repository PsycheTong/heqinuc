//cmmap javascript sdk v2 by 2016.07.28
//根据1.02版协议增加 错误代码  2016-08-16
//var CMMap={}

     CMMap.Geocode =  {

            //###########################    地理服务类部分  Geo ###################################

            //GeoParam  地理服务查询参数类 ************************************
            GeoParam : function () {

                //默认值设置
                var _address = "";
                var _city = "全国";
                var _output = "json";
                var _callback = "CMMap.callback";
                var _sn = "";

                this.setAddress = function (address) {
                    _address = address;
                };
                this.getAddress = function () {
                    return _address;
                };

                this.setCity = function (city) {
                    _city = city;
                };
                this.getCity = function () {
                    return _city;
                };


                this.setOutput = function (output) {
                    _output = output;
                };

                this.getOutput = function () {
                    return _output;
                };


                this.setCallback = function (callback) {
                    _callback = callback;
                };

                this.getCallback = function () {
                    return _callback;
                };

                this.setSn = function (sn) {
                    _sn = sn;
                };
                this.getSn = function () {
                    return _sn;
                };

            },//end GeoParam


            //GeoCode ***************************************************
            GeoCode : function (data) {

                this.getProvince = function () {
                    return data.province;
                };
                this.getCity = function () {
                    return data.city;
                };
                this.getDistrict = function () {
                    return data.district;
                };

                this.getStreet = function () {
                    return data.street;
                };
                this.getNumber = function () {
                    return data.number;
                };
                this.getLocation = function () {
                    return new CMMap.Geocode.LngLat(data.location);// data.location;
                };

                this.getAdcode = function () {
                    return data.adcode;
                };
                this.getDistrict_location = function () {
                    return data.district_location;
                };
                this.getConfidence = function () {
                    return data.confidence;
                };

            }, //end GeoCode


            //GeoResult类 ***************************************************
            GeoResult : function (data) {

                this.getStatus = function () {
                    return data.status;
                };
                this.getInfo = function () {
                    return data.info;
                };
                this.getGeocode = function () {
                    return (new CMMap.Geocode.GeoCode(data.geocode));
                }

            }, //end GeoResult类


          


            //###########################    逆地理服务类部分 ReGeo   ###################################

            //RegeoParam  逆地理服务查询参数类 ************************************

            RegeoParam: function () {

                var _location = ""; //经纬度坐标（序列）
                /*
                 最多支持20个坐标点查询。
                 经纬度间以","分割，且经度在前，纬度在后。
                 多点之间以"|"分割。
                 经纬度有效精度为小数点后6位。
                 */

                var _batch = 0; //批量查询控制。
                /*
                 可选值为0或1，batch=1为批量查询， batch=0为单点查询，
                 当batch=0时即使传入多个点，也只做单点查询，返回第一个点结果。
                 */

                var _extensions = "1|2|3|4"; //返回结果控制
                /*
                 可选值为1、2、3、4
                 extensions=1将返回道路信息，该数据在响应报文中节点名为roads
                 extensions=2将返回交叉路口信息，该数据在响应中报文节点名为roadinters
                 extensions=3将返回地标信息，该数据在响应报文中节点名为pois
                 extensions=4将返回公交信息，该数据在响应报文中节点名为buses
                 extensions为空时仅返回基本地址信息，该数据在响应报文中节点名为formatted_address、addressComponent
                 此参数可多选，多个值之间以"|"分割
                 extensions无论取值，必返回基本地址信息
                 */
                var _output = "json";//返回数据格式类型

                var _callback = "CMMap.callback"; //系统回调函数

                var _sn = "";

                var _poitype; //保留字段，暂时无效
                var _radius;//保留字段，暂时无效
                var _roadlevel;//保留字段，暂时无效

                //getter 、 setter 方法
                this.setLocation = function (location) {
                    _location = location;
                };
                this.getLocation = function () {
                    return _location;
                };

                this.setBatch = function (batch) {
                    _batch = batch;
                };
                this.getBatch = function () {
                    return _batch;
                };

                this.setExtensions = function (extensions) {
                    _extensions = extensions;
                };
                this.getExtensions = function () {
                    return _extensions;
                };

                this.setOutput = function (output) {
                    _output = output;
                };
                this.getOutput = function () {
                    return _output;
                };

                this.setCallback = function (callback) {
                    _callback = callback;
                };
                this.getCallback = function () {
                    return _callback;
                };

                this.setSn = function (sn) {
                    _sn = sn;
                };
                this.getSn = function () {
                    return _sn;
                };


                this.setPoitype = function (poitype) {
                    _poitype = poitype;
                };
                this.getPoitype = function () {
                    return _poitype;
                };


                this.setRadius = function (radius) {
                    _radius = radius;
                };
                this.getRadius = function () {
                    return _radius;
                };

                this.setRoadlevel = function (roadlevel) {
                    _roadlevel = roadlevel;
                };
                this.getRoadlevel = function () {
                    return _roadlevel;
                };


            }, //end RegeoParam类

            //定义精度纬度信息
            LngLat:function (data){

                this.getLng=function () {
                    return data.split(",")[0];
                }
                this.getLat=function () {
                    if (data.split(",").length>1){
                        return data.split(",")[1];
                    }else{
                        return data.split(",")[0];
                    }
                }
            },

            //RegeoCode-- AddressComponent-- Neighborhood  类 ************************************
            Neighborhood:function (data) {

                this.getName = function () {
                    return data.name;
                };

                this.getType = function () {
                    return data.type;
                };
            },

            //RegeoCode--  AddressComponent--    Building  类 ************************************
            Building:function (data) {

                this.getName = function () {
                    return data.name;
                };

                this.getType = function () {
                    return data.type;
                };
            },

            //RegeoCode--  AddressComponent--    StreetNumber  类 ************************************
            StreetNumber:function (data) {

                this.getStreet = function () {
                    return data.street;
                };

                this.getNumber = function () {
                    return data.number;
                };

                this.getLocation = function () {
                   return new CMMap.Geocode.LngLat(data.location);// return data.location;
                };

                this.getDirection = function () {
                    return data.direction;
                };
                this.getDistance = function () {
                    return data.distance;
                };

            },

            //RegeoCode--  AddressComponent--    StreetNumber  类 ************************************
            BusinessArea: function (data) {

                this.getLocation = function () {
                    return data.location;
                };
                this.getName = function () {
                    return data.name;
                };
                this.getId = function () {
                    return data.id;
                };

            },





            //AddressComponent  逆地理服务查询参数类 ************************************
            AddressComponent : function (data) {


                this.getProvince = function () {
                    return data.province;
                };

                this.getCity = function () {
                    return data.city;
                };


                this.getCitycode = function () {
                    return data.citycode;
                };

                this.getDistrict= function () {
                    return data.district;
                };

                this.getAdcode= function () {
                    return data.adcode;
                };

                this.getDistrict_location= function () {
                    return   new CMMap.Geocode.LngLat( data.district_location);
                };

                this.getDistrict_bounds= function () {
                    var ary=new Array();
                    var dataAry=data.district_bounds.split("|");
                    for(var i=0;i<dataAry.length;i++) {
                        ary[i] = new CMMap.Geocode.LngLat(dataAry[i]);
                    }
                    return (ary);
                };

                this.getTownship= function () {
                    return data.township;
                };

                this.getNeighborhood=function () {
                    return (new CMMap.Geocode.Neighborhood(data.neighborhood));
                };

                this.getBuilding=function () {
                    return (new CMMap.Geocode.Building(data.building));
                };

                this.getStreetNumber=function () {
                    return (new CMMap.Geocode.StreetNumber(data.streetNumber));
                };

                this.getSeaArea= function () {
                    return data.seaArea;
                };

                this.getBusinessAreas=function (data) {    //返回一个BusinessArea类型的数组
                    var arr=new Array();
                    for(var i=0;i<data.businessarea.length;i++) {
                        arr[i] = new CMMap.Geocode.BusinessArea(data.businessarea[i]);
                    }
                    return (arr);
                };


                
            },


            //RegeoCode--  Road  类 ************************************
            Road : function (data) {

                this.getId = function () {
                    return data.id;
                };
                this.getName = function () {
                    return data.name;
                };
                this.getDistance = function () {
                    return data.distance;
                };
                this.getDirection = function () {
                    return data.direction;
                };
                this.getLocation = function () {
                    return  new CMMap.Geocode.LngLat(data.location);
                };
                this.getWidth = function () {
                    return data.width;
                };
                this.getLevel = function () {
                    return data.level;
                };

            },



            //RegeoCode--  Roadinter  类 ************************************
            Roadinter : function (data) {

                this.getName = function () {
                    return data.name;
                };
                this.getDistance = function () {
                    return data.distance;
                };
                this.getDirection = function () {
                    return data.direction;
                };
                this.getLocation = function () {
                    return  new CMMap.Geocode.LngLat(data.location);
                };
                this.getFirst_id = function () {
                    return data.first_id;
                };
                this.getFirst_name= function () {
                    return data.first_name;
                };
                this.getSecond_id = function () {
                    return data.second_id;
                };
                this.getSecond_name= function () {
                    return data.second_name;
                };



            },

            //RegeoCode--  Poi  类 ************************************
            Poi: function (data) {

                this.getId = function () {
                    return data.id;
                };
                this.getName = function () {
                    return data.name;
                };
                this.getType = function () {
                    return data.type;
                };
                this.getTel = function () {
                    return data.tel;
                };
                this.getDistance = function () {
                    return data.distance;
                };
                this.getDirection = function () {
                    return data.direction;
                };
                this.getAddress = function () {
                    return data.address;
                };
                this.getLocation = function () {
                    return new CMMap.Geocode.LngLat(data.location);//data.location;
                };
                this.getBusinessarea = function () {
                    return data.businessarea;
                };
            },



            //RegeoCode--  Aoi  类 ************************************
            Aoi: function (data) {

                this.getId = function () {
                    return data.id;
                };
                this.getName = function () {
                    return data.name;
                };
                this.getAdcode = function () {
                    return data.adcode;
                };
                this.getLocation = function () {
                    return data.location;
                };
                this.getArea = function () {
                    return data.area;
                };
            },





            //RegeoCode--  Bus  类 ************************************
            Bus:function (data) {

                this.getId = function () {
                    return data.id;
                };
                this.getName = function () {
                    return data.name;
                };
                this.getLocation = function () {
                    return data.location;
                };
                this.getLine = function () {
                    return data.line;
                };
                this.getDistance = function () {
                    return data.distance;
                };
                this.getDirection = function () {
                    return data.direction;
                };
            },



            //RegeoCode  类 ************************************
            RegeoCode:function (data) {

                this.getFormatted_address = function () {
                    return data.formatted_address;
                };
                this.getAddressComponent = function () {
                    return (new CMMap.Geocode.AddressComponent(data.addressComponent));
                };



                this.getRoads=function () {    //返回一个Road类型的数组
                    var arr=new Array();
                    for(var i=0;i<data.roads.length;i++) {
                        arr[i] = new CMMap.Geocode.Road(data.roads[i]);     // &&&&&&&&类构造函数传入的参数，都为原始结果对象的点引用方式￥￥￥￥￥￥￥￥
                    }
                    return (arr);
                };



                this.getRoadinters=function () {    //返回一个Roadinter类型的数组
                   var arr=new Array();
                    for(var i=0;i<data.roadinters.length;i++) {
                        arr[i] = new CMMap.Geocode.Roadinter(data.roadinters[i]);     // &&&&&&&&类构造函数传入的参数，都为原始结果对象的点引用方式￥￥￥￥￥￥￥￥
                    }
                    return (arr);
                };

                this.getPois=function () {    //返回一个Poi类型的数组
                    var arr=new Array();
                    for(var i=0;i<data.pois.length;i++) {
                        arr[i] = new CMMap.Geocode.Poi(data.pois[i]);
                    }
                    return (arr);
                };

                this.getBuses=function () {    //返回一个Poi类型的数组
                    var arr=new Array();
                    for(var i=0;i<data.buses.length;i++) {
                        arr[i] = new CMMap.Geocode.Bus(data.buses[i]);
                    }
                    return (arr);
                };


            },



            //应答数据(单点JSON)：   RegeoResult类 *************************************************
            RegeoResult : function (data) {

                this.getStatus = function () {
                    return data.status;
                };
                this.getInfo = function () {
                    return data.info;
                };
                this.getRegeocode = function () {
                    return new CMMap.Geocode.RegeoCode(data.regeocode);
                };


            }, //end RegeoResult类


            //应答数据(多点JSON)：
            RegeoResults:function ( data ) {  //RegeoResults类 ************

                this.getStatus = function () {
                    return data.status;
                };
                this.getInfo = function () {
                    return data.info;
                };

                this.getRegeocodes=function () {  //返回Regeocode数组
                   var arr=new Array();
                    for(var i=0;i<data.regeocodes.length;i++) {
                        arr[i] = new CMMap.Geocode.RegeoCode(data.regeocodes[i]);
                    }
                    return (arr);
                };

            },//end RegeoResults类





            //###########################    地理服务 及 逆地理服务 公用部分 类   ###################################


            //CMMap.Geocode.GeoCoder 地理及逆地理服务类  *******************************
            GeoCoder : function (authKey, serverUrl) {

                var _key = authKey;
                var _serverUrl = serverUrl;


                //地理服务查询方法 +++++++++++++++++++++++++++++++++++++++++++++++++++++++
                this.getLocation = function (geoParam, userCallback) {

                    //生成JSONP回调函数名称，小于等于20位
                    var strTimestamp = new Date().getTime(); //获取当前毫秒级时间戳13位
                    //var strRandom = Math.round(Math.random() * (1000 - 1) + 1000); //获取4位随机数,暂不使用
                    geoParam.setCallback("CMMap.g" + strTimestamp);

                    //动态添加CMMap全局对象的 系统回调函数名称 及 返回数据变量名称

                    eval(geoParam.getCallback() + "_responseData=null"); //返回数据
                    eval(geoParam.getCallback() + "_output="+"'"+geoParam.getOutput()+"'");//请求格式类型json或xml
                    eval(geoParam.getCallback() + "=function(data){" + geoParam.getCallback() + "_responseData" + "=data;};");

                    var _url = _serverUrl +"/gisService/geo"+ "?" + "address=" +encodeURI(geoParam.getAddress(),"UTF-8")+ "&" + "city=" + encodeURI(geoParam.getCity(),"UTF-8") + "&" + "callback=" + geoParam.getCallback() + "&" + "output=" + geoParam.getOutput() + "&" + "key=" + _key;

                    var script = document.createElement('script');
                    script.id = geoParam.getCallback();
                    script.src = _url;
                    script.type = "text/javascript";
                    script.charset = "UTF-8";
                    document.body.appendChild(script);

                    script.onload = script.onreadystatechange = function () {

                        //本函数中不能再引用geoParam内容，作用范围为script
                        if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
                            //alert("应答正常，可调用用户callback函数");

                            var responseData = null;
                            var responseDataFormat=null;
                            responseData = eval(script.id + "_responseData");
                            responseDataFormat=eval(script.id + "_output");

                            if (responseData) {
                                //alert(script.id);
                                if (responseDataFormat == "json") {
                                    if (responseData.status == "0") {
                                        var responseInfo = responseData.info;
                                        alert(CMMap.Geocode.ErrorInfo[responseInfo]);
                                    }
                                    else {
                                        var resultTemp = new CMMap.Geocode.GeoResult(responseData);
                                        if (userCallback) userCallback.call(this, resultTemp);
                                    }
                                }
                                else {
                                    //rd = xmlData(xmlDataTemp);
                                    //if (user_callback) user_callback.call(this, rd);
                                }

                            }
                            else {
                                alert("返回数据出错，数据为NULL值!");
                            }
                            //移除callback 函数
                            eval(this.id + "=null");
                            eval("delete " + this.id + ";");

                            //移除接收数据的全局变量
                            eval(this.id + "_responseData=null");
                            eval("delete " + this.id + "_responseData;");

                            //移除标识请求数据格式的全局变量
                            eval(this.id + "_output=null");
                            eval("delete " + this.id + "_output;");

                            // 移除script元素
                            this.onload = this.onreadystatechange = null;
                            if (document.body && this.parentNode) {
                                document.body.removeChild(this);


                            }

                        }

                    }


                }; //end getLocation方法



                //逆地理服务查询方法 +++++++++++++++++++++++++++++++++++++++++++++++++++++++
                this.getAddress = function (regeoParam, userCallback) {

                    //生成JSONP回调函数名称，小于等于20位
                    var strTimestamp = new Date().getTime(); //获取当前毫秒级时间戳13位
                    //var strRandom = Math.round(Math.random() * (1000 - 1) + 1000); //获取4位随机数,暂不使用
                    regeoParam.setCallback("CMMap.r" + strTimestamp);

                    //动态添加CMMap全局对象的 系统回调函数名称 及 返回数据变量名称

                    eval(regeoParam.getCallback() + "_responseData=null");
                    eval(regeoParam.getCallback() + "_output="+"'"+regeoParam.getOutput()+"'");//请求格式类型json或xml
                    eval(regeoParam.getCallback() + "_batch="+regeoParam.getBatch());//请求是否批量请求 batch标识
                    eval(regeoParam.getCallback() + "=function(data){" + regeoParam.getCallback() + "_responseData" + "=data;};");


                   var _url = _serverUrl  +"/gisService/regeo"+ "?" + "location=" + regeoParam.getLocation() + "&" + "batch=" + regeoParam.getBatch() + "&" + "extensions=" + regeoParam.getExtensions() + "&" + "output=" + regeoParam.getOutput() + "&" + "callback=" + regeoParam.getCallback() + "&" + "sn=" + regeoParam.getSn() + "&" + "key=" + _key;

                    var script = document.createElement('script');
                    script.id = regeoParam.getCallback();
                    script.src = _url;
                    script.type = "text/javascript";
                    script.charset = "UTF-8";
                    document.body.appendChild(script);

                    script.onload = script.onreadystatechange = function () {

                        //本函数中不能再引用geoParam内容，作用范围为script
                        if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
                            //alert("应答正常，可调用用户callback函数");

                            var responseData = null;
                            var responseDataFormat=null;
                            var responseDataBatch=null;
                            responseData = eval(script.id + "_responseData");
                            responseDataFormat=eval(script.id + "_output");
                            responseDataBatch=eval(script.id + "_batch");

                            if (responseData) {
                                //alert(script.id);
                                if (responseDataFormat == "json") {
                                    if (responseData.status == "0") {
                                        var responseInfo = responseData.info;
                                        alert(CMMap.Geocode.ErrorInfo[responseInfo]);
                                    }
                                    else {
                                        var resultTemp = new CMMap.Geocode.RegeoResult(responseData);

                                        if (responseDataBatch == 0) {  //单点请求
                                            resultTemp = new CMMap.Geocode.RegeoResult(responseData);
                                        }
                                        else {  //多点请求
                                            resultTemp = new CMMap.Geocode.RegeoResults(responseData);
                                        }

                                        if (userCallback) userCallback.call(this, resultTemp);
                                    }
                                }
                                else {
                                    //rd = xmlData(xmlDataTemp);
                                    //if (user_callback) user_callback.call(this, rd);
                                }

                            }
                            else {
                                alert("返回数据出错，数据为NULL值!");
                            }



                            //移除callback 函数
                            eval(this.id + "=null");
                            eval("delete " + this.id + ";");

                            //移除接收数据的全局变量
                            eval(this.id + "_responseData=null");
                            eval("delete " + this.id + "_responseData;");

                            //移除标识请求数据格式的全局变量
                            eval(this.id + "_output=null");
                            eval("delete " + this.id + "_output;");

                            //移除标识请求数据格式的全局变量
                            eval(this.id + "_batch=null");
                            eval("delete " + this.id + "_batch;");

                            // 移除script元素
                            this.onload = this.onreadystatechange = null;
                            if (document.body && this.parentNode) {
                                document.body.removeChild(this);

                            }

                        }

                    }


                }; //end getAddress方法






            },//end GeoCoder类



            //CMMap.Geocode.ErrorInfo 错误代码对象  *******************************
            ErrorInfo:{
                    "300100": "逆地理服务请求参数location验证异常" ,
                    "300101": "逆地理服务请求参数location为空" ,
                    "300102": "逆地理服务请求参数location包含非法字符或起止字符非数字" ,
                    "300103": "逆地理服务请求参数location格式错误" ,
                    "300200": "逆地理服务请求参数key验证异常" ,
                    "300201": "逆地理服务请求参数key为空" ,
                    "300202": "逆地理服务请求参数key格式错误" ,
                    "300203": "逆地理服务请求参数key已过期" ,
                    "300204": "逆地理服务请求参数key无效" ,
                    "400100": "地理服务请求参数address验证异常",
					"400101": "地理服务请求参数address为空",
					"400102": "地理服务请求参数address包含非法字符或起止字符非数字",
					"400103": "地理服务请求参数address格式错误",
					"400200": "地理服务请求参数key验证异常",
					"400201": "地理服务请求参数key为空",
					"400202": "地理服务请求参数key格式错误",
					"400203": "地理服务请求参数key已过期",
					"400204": "地理服务请求参数key无效",
					"400205": "地理服务请求结果为空",
					"500100": "MSP同步接口KEY请求参数异常",
					"500101": "MSP同步接口KEY请求参数flag未在预期"
            },//end ErrorInfo 对象









    }; //end CMMap
