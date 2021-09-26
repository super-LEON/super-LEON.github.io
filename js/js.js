var web_style = $("#web_style").val();
var valine_appid = $("#valine_appid").val();
var valine_appKey = $("#valine_appKey").val();


document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('pre').forEach((block) => {
        hljs.highlightBlock(block);
    });

    if (window.location.pathname === "/" || window.location.pathname === "/index.html") {
        bindTitleClick();
        return;
    } else {
        bindEvent();
    }

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

function initMenu() {

    // 小屏幕，需要绑定事件
    let menubtn = document.querySelector(".menu-btn");
    let menuContent = document.querySelector(".menu-wrapper");
    
    if (window.innerWidth < 1000)  {
        return;
        menubtn.onclick = function (e) {
            e.stopPropagation();
            console.log("menu button clicked!");
            if (menubtn.getAttribute("status") === "open") {
                menuContent.innerHTML = '';
                menuContent.style.left = '-100%';
                menubtn.setAttribute("status", "close");
            } else {
                menuContent.style.left = '0';
                new $menu({
                    contentEl: 'content-wrapper',
                    catalogEl: `menu-wrapper`,
                    selector: ['h1', 'h2', 'h3', 'h4', 'h5'],
                    cool: false,
                })
                menubtn.setAttribute("status", "open");
            }

        }
    } else {
        new $menu({
            contentEl: 'content-wrapper',
            catalogEl: `menu-wrapper`,
            selector: ['h1', 'h2', 'h3', 'h4', 'h5']
        });
        // menubtn.style.opacity = '0';
    }
}

function bodyEvt() {
    let bd = document.querySelector(".hd.posts")
    bd.addEventListener('click', bdc);
}


const bdc = e => {
    let menubtn = document.querySelector(".menu-btn");
    if (window.innerWidth < 1000 && menubtn.getAttribute('status') === "open") {
        menubtn.click();
    }
}


const bindTitleClick = _ => {
    let titleEle = document.querySelector(".logot .title-text");
    let novelEle = document.querySelector(".hd.novel");
    let itEle = document.querySelector(".hd.it");

    titleEle.addEventListener('click', e => {
        if (!titleEle) return;
        if (titleEle.getAttribute("J") == "false") {
            novelEle.style.display = "block";
            itEle.style.display = "none";
            titleEle.innerHTML = "云芒 - N"
            titleEle.setAttribute("J", "true");
        } else {
            novelEle.style.display = "none";
            itEle.style.display = "block";
            titleEle.innerHTML = "云芒 - T"
            titleEle.setAttribute("J", "false");
        }
    })
}



// sharejs

function share() {
    let shareBtn = document.querySelector("#share .social-share");
    if (!shareBtn) return;
    let titleElement = document.querySelector(".title-wrapper .post-title p");
    if (!titleElement) return;
    let titleText = titleElement.innerHTML;
    shareBtn.setAttribute("data-description", `云芒的博客： ${titleText}`);
    console.log(titleText);
}

share();


function initREM(){
    let htmlElement = document.querySelector("html");
    let winWidth = window.innerWidth;
    htmlElement.style.fontSize = winWidth / 100;
}

initREM();


function goHome(){
    let gohomeElement = document.querySelector("#gohome");
}