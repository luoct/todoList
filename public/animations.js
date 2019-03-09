
window.onload = () => {
    iconsFloatingOnMouseenter();
    iconsFloatingOnRandom();
    gotoTipsShow();
    // gotoListView();
}

function gotoTipsShow() {
    let gotoTips = document.querySelector('.goto-tips');
    gotoTips.style.color = 'transparent';
    $('.goto-input').on('input porpertychange', () => {
        if ($('.goto-input').val() !== '') {
            gotoTips.style.color = '#444';
        } else {
            gotoTips.style.color = 'transparent';
        }

    })
}

let icons = document.querySelectorAll('.intro-left-icon .iconfont');
let iconWidth = $('.intro-left-icon').css('width');
let iconHeight = $('.intro-left-icon').css('height');
//获取的长度是一个字符串，去掉最后的px单位，获取一个Number类型的值
let iconW = iconWidth.substring(0, iconWidth.length - 2);
let iconH = iconHeight.substring(0, iconHeight.length - 2);
function iconsFloatingOnMouseenter() {

    for (let i = 0; i < icons.length; i++) {
        // console.log(icons[i]);
        icons[i].addEventListener('mouseenter', () => {
            icons[i].style.top = Math.random() * iconH + 'px';
            icons[i].style.left = Math.random() * iconW + 'px';

            //鼠标移动的时候，速度变快
            // icons[i].style.top = Math.random() * (iconH - 400) + 400 + 'px';
            // icons[i].style.left = Math.random() * (iconW - 400) + 400 + 'px';

        });
    }
}

function iconsFloatingOnRandom() {
    for (let i = 0; i < icons.length; i++) {
        setInterval(`icons[${i}].style.top = Math.random() * iconH + 'px';
                     icons[${i}].style.left = Math.random() * iconW + 'px';`, 5000)
    }
}

function gotoListView() {  //按下回车键 页面信息变化
    let gotoInput = document.querySelector('.goto-input');
    // console.log(gotoInput);
    if (gotoInput.value !== '') {
        if (event.keyCode === 13) {
            $('.goto').hide();
            $('.intro-left-content').fadeOut(300);
            setTimeout(function () {
                if ($('.intro-left-content').css('display') == 'none') {
                    $('.listView').fadeIn(1000);
                    $('.listView').css('transform', 'translate(0, 0)');
                }
            }, 400)
            $('.intro-left-content').css('top', '100%');
            $('.info').fadeIn(1000);
            $('.modes').fadeIn(2000);
            $('.modes').css('top', '13%');

            setTimeout(function() {
                window.location.href = '/todo';
            }, 300);
        }
    }

}
