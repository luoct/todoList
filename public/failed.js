{  //想实现一个开局随机刷新图标位置的效果，但是不能再设置一个一直旋转的效果  
    {
        let iconWidth = $('.intro-left-icon').css('width');
        let iconHeight = $('.intro-left-icon').css('height');

        //获取的长度是一个字符串，去掉最后的px单位，获取一个Number类型的值
        let iconW = iconWidth.substring(0, iconWidth.length - 2);
        let iconH = iconHeight.substring(0, iconHeight.length - 2);

        // console.log(iconH, iconW);
        // let icons = $('.intro-left-icon .iconfont');
        let icons = document.querySelectorAll('.intro-left-icon .iconfont')
        console.log(icons instanceof Array);  //false 因为jq的选择器取到的是一个对象，是一个类数组，里面封装了length属性



        //----------------------
        //------
        //想多了，没用，不能在for循环外取随机数，毕竟是多个icon，每一个都要不同，且random取到的数赋给变量后，变量的值是不会变了，刷新网页才会变
        //------
        //用一个临时变量来存第一次初始化就获取的随即位置的width和height，避免以后每一次调用randomW和randomH都不是初始值
        // let tempW = randomW;
        // randomW = tempW;
        // let tempH = randomH;
        // randomH = tempH;
        // ----------------------

        for (let i = 0; i < icons.length; i++) {

            //给这些icon元素随机一个不超过指定区域的位置
            //54是icon元素的大小，一排有5个图标，width应该减去5个54，height应该减去一个54，
            let randomW = Math.random() * iconW - 54 * 4;
            let randomH = Math.random() * iconH - 54;

            // icons[i].css("transform", `translate( ${Math.random() * iconW}px, ${Math.random() * iconH}px)`);
            // window.getComputedStyle(icons[i], null).transform = `translate( ${Math.random() * iconW}px, ${Math.random() * iconH}px)`;

            //因为icon元素在父级坐上角，所以translate中的值应该为正数，保证icon元素在指定区域
            icons[i].style.transform = `translate( ${Math.abs(randomW)}px, ${Math.abs(randomH)}px)`;

            // icons[i].animate({transform: `translate( ${Math.abs(randomW)}px, ${Math.abs(randomH)}px) rotate(90deg)`})

            // if (randomW < 0 || randomH < 0) {
            //     randomW = Math.abs(randomW);
            //     randomH = Math.abs(randomH);
            //     icons[i].style.transform = `translate( ${randomW}px, ${randomH}px)`;
            // } else {
            //     icons[i].style.transform = `translate( ${randomW}px, ${randomH}px)`;
            // }
        }

    }
}