var web_style = $("#web_style").val();
var valine_appid = $("#valine_appid").val();
var valine_appKey = $("#valine_appKey").val();


document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('pre').forEach((block) => {
        hljs.highlightBlock(block);
    });

    bindEvent();
});

function setCookie(key, value) {
    localStorage.setItem(key, value);
}

function getCookie(key) {
    var data = localStorage.getItem(key);
    return data
}

function updateStyle() {
    if (getCookie("style") == "white") {
        $("#footer").attr("style", "color: #969696;");
        $(".flink").attr("style", "color: #969696;");
        $(".ba").attr("style", "color: #969696;");
        $("#bodyx").attr("class", "bg_while");
        $("#update_style").attr('checked', false);
    } else {
        $("#footer").attr("style", "");
        $(".flink").attr("style", "");
        $("#bodyx").attr("class", "");
        $(".ba").attr("style", "");
        $("#update_style").attr('checked', true);
    }
}

if (getCookie("style") == null) {
    setCookie("style", web_style)
    updateStyle();
} else if (getCookie("style") == "white") {
    setCookie("style", "white")
    updateStyle();
} else if (getCookie("style") == "black") {
    setCookie("style", "black")
    updateStyle();
}

$("#update_style").change(function () {
    var style = $("#update_style").is(':checked');
    if (style) {
        setCookie("style", "black")
        updateStyle();
    } else {
        setCookie("style", "white")
        updateStyle();
    }
});


function bindEvent() {
    initMenu();
    bodyEvt();
}

function initMenu(){
    // 小屏幕，需要绑定事件
    let menubtn = document.querySelector(".menu-btn");
    let menuContent = document.querySelector(".menu-wrapper");
    if(window.innerWidth < 1000){
        menubtn.onclick = function(e){
            e.stopPropagation();
            console.log("menu button clicked!");
            if(menubtn.getAttribute("status") === "open"){
                menuContent.innerHTML = '';
                menuContent.style.left = '-100%';
                menubtn.setAttribute("status","close");
            }else{
                menuContent.style.left = '0';
                new $menu({
                    contentEl: 'content-wrapper',
                    catalogEl: `menu-wrapper`,
                    selector: ['h1', 'h2'],
                    cool: false,
                })
                menubtn.setAttribute("status","open");
            }

        }
    }else{
        new $menu({
            contentEl: 'content-wrapper',
            catalogEl: `menu-wrapper`,
            selector: ['h1', 'h2']
        });
        menubtn.style.opacity = '0';
    }
}

function bodyEvt(){
    let bd = document.querySelector(".hd.posts")
    bd.addEventListener('click',bdc);
}


const bdc = e=>{
    let menubtn = document.querySelector(".menu-btn");
    if(window.innerWidth < 1000 && menubtn.getAttribute('status') === "open"){
        menubtn.click();
    }
}