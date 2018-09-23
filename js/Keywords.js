function SubsetOrUnion() {
    this.kdataDi = [];
    this.kdata = [];
    this.NDdataList = [];


    this.Subset_diff = function(ar1, ar2) {
        if (ar1.length >= ar2.length) {
            return (SetDifferenceNum(ar1, ar2, 0, false));
        } else {
            return (SetDifferenceNum(ar2, ar1, 0, false));
        }
    }

    function SetDifferenceNum(arB1, arL2, iMin, ismatch) {
        var arB1len = arB1.length
        var arL2len = arL2.length
        if (arL2len <= 1 || arB1len <= 1) {
            //至少要2個字
            return;
        }
        if (arB1len != arL2len) {
            if (iMin < arL2len - arB1len) {
                return;
            }
            var Lnum = 0;
            var ifmatch = true;
            for (var i = iMin + arB1len - arL2len; i < arB1len; i++) {
                if (arL2[Lnum] == undefined) {
                    break;
                }

                if (arB1[i] != arL2[Lnum]) {
                    ifmatch &= false;
                    break;
                } else {
                    // console.log(arB1[i]);
                }
                Lnum++;
            }

            // console.log(ifmatch);
            // console.log(iMin);
            if (!ifmatch) {
                iMin--;
                // console.log("----goOn");
                return SetDifferenceNum(arB1, arL2, iMin, ismatch);
            } else {
                ismatch |= true;
                // console.log("----Out");
                return iMin;
            }
        } else {
            if (iMin < 0 - arB1len) {
                return;
            }
            var Lnum = 0;
            var ifmatch = true;
            for (var i = iMin + arB1len - 1; i < arB1len; i++) {
                if (arB1[i] != arL2[Lnum]) {
                    ifmatch &= false;
                    break;
                } else {
                    // console.log(arB1[i]);
                }
                Lnum++;
            }

            // console.log(ifmatch);
            // console.log(iMin);
            if (!ifmatch) {
                iMin--;
                // console.log("----goOn");
                return SetDifferenceNum(arB1, arL2, iMin, ismatch);
            } else {
                ismatch |= true;
                // console.log("----Out");
                return iMin - 1;
            }
        }
    }
}
var sUnio = new SubsetOrUnion();

function consolelog_deBUG(e, Diffdata, NoDiffdata, Str){
    var deBUGnum = -1;
    for (var i = 0; i < e.length; i++) {
        if(e[i].kWord.indexOf(Str) > -1 ){
            deBUGnum = i;
            break;
        }
    }
    console.log(deBUGnum);
    

    for (var i = 0; i < Diffdata.length; i++) {
        if(Diffdata[i] == deBUGnum){
            console.log("Diffdata:" + i);
        }
    }

    for (var i = 0; i < NoDiffdata.length; i++) {
        var Dl = NoDiffdata[i].split(",")[0];
        if(Dl.split(":")[0] == deBUGnum || Dl.split(":")[1] == deBUGnum){
            console.log("NoDiffdata:" + i + "。" + NoDiffdata[i]);
        }

    }
}


$.ajax({
        url: './js/Keywords.php',
        type: 'POST',
        dataType: 'json',
        data: { param1: 'value1' },
    })
    .done(function(e) {
        // console.log(e);

        var Diffdata = [];
        var NoDiffdata = [];
        var NoDiffdata_new = [];


        for (var i = 0; i < e.length; i++) {
            var isDiff = true;
            for (var i_sub = 0; i_sub < e.length; i_sub++) {
                if (i_sub != i) {
                    // if(e[i_sub].kWord == e[i].kWord){
                    //     NoDiffdata.push = i_sub + "," + i;
                    // }

                    var sUnioNum = sUnio.Subset_diff(e[i_sub].kWord, e[i].kWord);
                    if (sUnioNum != undefined) {
                        isDiff &= false;
                        NoDiffdata.push(i_sub + ":" + i + "," + sUnioNum);
                    }
                }
            }
            if (isDiff) {
                // Diffdata.push(e[i].kWord);
                Diffdata.push(i);
            }
        }

        // console.log(Diffdata);
        // console.log(NoDiffdata);

        NoDiffdata = delRep(NoDiffdata);

        // consolelog_deBUG(e, Diffdata, NoDiffdata, "哥德");

        for (var i = 0; i < NoDiffdata.length; i++) {
            sUnio.NDdataList.push(NoDiffdata[i]);

            var data = NoDiffdata[i].split(",")[0];

            var eNum0 = data.split(":")[0];
            var eNum1 = data.split(":")[1];

            var kword0 = e[eNum0].kWord;
            var kword1 = e[eNum1].kWord;
            // console.log(data + "。" + kword0 + ":" + kword1);
            // console.log(kword0 + ":" + kword1);

            // console.log("----");
            if (kword0.length == kword1.length) {
                if (kword0 == kword1) {
                    // console.log(e[eNum0].kWeight);
                    // console.log(e[eNum1].kWeight);

                    if (e[eNum0].kWeight <= e[eNum1].kWeight) {
                        Diffdata.push(eNum1);
                    } else if (e[eNum0].kWeight > e[eNum1].kWeight) {
                        Diffdata.push(eNum0);
                    }

                } else {
                    // console.log(kword0 + ":" + kword1);
                    Diffdata.push(eNum0);
                    Diffdata.push(eNum1);
                }
            } else if (kword0.length > kword1.length) {
                if (e[eNum0].kWeight >= e[eNum1].kWeight) {
                    // console.log(e[eNum0].kWord);
                    NoDiffdata_new.push(eNum0);
                    Diffdata.push(eNum1);
                } else {
                    // console.log(e[eNum1].kWord);
                    NoDiffdata_new.push(eNum1);
                    Diffdata.push(eNum0);
                }
            } else {
                if (e[eNum1].kWeight >= e[eNum0].kWeight) {
                    // console.log(e[eNum1].kWord);
                    NoDiffdata_new.push(eNum1);
                    Diffdata.push(eNum0);
                } else {
                    // console.log(e[eNum0].kWord);
                    NoDiffdata_new.push(eNum0);
                    Diffdata.push(eNum1);
                }
            }
        }
        // console.log(NoDiffdata_new);


        //sUnio.kdata
        var kdataStr = delRepStr("", Diffdata);
        var kdataStrs = kdataStr.split(",");
        for (var i = 0; i < kdataStrs.length; i++) {
            // console.log(e[kdataStrs[i]]);
            sUnio.kdata.push(e[kdataStrs[i]]);
        }

        //sUnio.kdataDi
        kdataStr = delRepStr("", NoDiffdata_new);
        kdataStrs = kdataStr.split(",");
        for (var i = 0; i < kdataStrs.length; i++) {
            // console.log(e[kdataStrs[i]]);
            sUnio.kdataDi.push(e[kdataStrs[i]]);
        }

        
        
        Select_element();
    })
    .fail(function() { console.log("error"); });


function delRep(data, num) {
    if (num == undefined) { num = 0; }
    if (num >= data.length) {
        return data;
    }

    var v1 = data[num].split(",")[0];
    var bool = false;
    for (var i = num + 1; i < data.length; i++) {
        var v2 = data[i].split(",")[0];
        bool |= NoDiff(v1, v2);
    }

    if (bool) {
        // console.log("----goOn");
        // console.log(data);
        data = removeArray(data, num);
        // console.log(data);
        return delRep(data, num);
    } else {
        num++;
        return delRep(data, num);
    }
}

function delRepStr(str, datas) {
    for (var i = 0; i < datas.length; i++) {
        if(str.match("," + datas[i]) == null){
            str += "," + datas[i];
        }
    }
    // console.log(str);
    return str.substring(1);
}


function NoDiff(v1, v2) {
    if (v1 == v2) {
        return true;
    } else {
        var v3 = v2.split(":")[1] + ":" + v2.split(":")[0];
        return v1 == v3;
    }
}


function removeArray(arr, num) {
    var array = [];

    for (var i = 0; i < arr.length; i++) {
        if (i != num) {
            array.push(arr[i]);
        }
    }
    return array;
}



function Select_element() {
    $.each($("li"), function(index, val) {
        txt_replace($(this));
    });
    $.each($("h4"), function(index, val) {
        txt_replace($(this));
    });
    $.each($("div.keyword_on"), function(index, val) {
        txt_replace($(this));
    });
    $.each($("div.n1"), function(index, val) {
        txt_replace($(this));
    });


    //table
    $.each($("div.col-md-4 > table"), function(index, val) {
        txt_replace($(this));
    });
}



function rep_Regexp(txt, flags, val) {
    var str = "<a href=\"{1}\">{2}</a>".replace("{1}", val.kUrl).replace("{2}", val.kWord);

    var patt = new RegExp(val.kWord, "g");
    txt = txt.replace(patt, str);
    return txt;
}

function GetStr(txt, indNum){
    var MAXnum = txt.length -1;
    if(MAXnum < 0){ return txt; }

    var sn = indNum - 7;
    var en = indNum + 7;

    return txt.substring(sn, en);
}
function rep_while(txt, val) {
    var str = "<a href=\"{1}\">{2}</a>".replace("{1}", val.kUrl).replace("{2}", val.kWord);
    
    var indNum = 0;
    while(txt.indexOf(val.kWord, indNum) > -1 ){
        indNum = txt.indexOf(val.kWord, indNum); indNum++;

        var matchStr = GetStr(txt, indNum);
        if(matchStr != ""){
            // console.log(matchStr);
            // console.log(matchStr.match(/>.+</));

            if(matchStr.match(/php">.+</) == null){
                var matchStr_new = matchStr.replace(val.kWord, str)
                txt = txt.replace(matchStr, matchStr_new);
                indNum += matchStr_new.length;

            }else if(txt.substring(indNum-9, indNum).indexOf("href=\"\">") > -1){
                var matchStr_new = matchStr.replace(val.kWord, str)
                txt = txt.replace(matchStr, matchStr_new);
                indNum += matchStr_new.length;
            }else{
                //有超聯結  被排除掉
                // console.log(matchStr);
            }
        }
    }
    return txt;
}




function txt_replace(el) {
    var txt = el.html();
    if (txt.lenght < 1) {
        return "";
    }
    // console.log(sUnio.NDdataList);


    //sUnio.kdataDi
    $.each(sUnio.kdataDi, function(index, val) {
        // console.log(val);
        var sNum = txt.length;
        txt = rep_Regexp( txt, "g", val);
        var eNum = txt.length;
        if(sNum < eNum){
            // console.log(val.kWord);
        }
    });

    //sUnio.kdata
    $.each(sUnio.kdata, function(index, val) {
        // console.log(val);
        txt = rep_while(txt, val);
    });
    el.html(txt)
}