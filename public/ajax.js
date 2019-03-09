var todoLi = $('.todo');

$(document).ready(function () {
    $('form').on('submit', function (event) {
        todoLi = $('.todo');  //更新todoList
        event.preventDefault();
        let addInput = $('.add');
        let todo = { item: addInput.val().trim() };

        $.ajax({
            type: 'POST',
            url: '/todo',
            data: todo,
            success: function (data) {
                //do something with the data via front-end framework
                location.reload();
                getTodo();
            }
        });
        return false;
    });

    for (let i = 0; i < todoLi.length; i++) {  //failed 想实现不刷新页面，让todoList不断更新后动态绑定删除的ajax
        todoLi[i].addEventListener('click', function () {
            console.log(todoLi[i]);
            let item = $(this).text().trim().replace(/ /g, "-");
            $.ajax({
                type: 'DELETE',
                url: '/todo/' + item,
                success: function (data) {
                    //do something with the data via front-end framework
                    location.reload();
                    getTodo();
                }
            });
        });
    }


});

function getTodo() {  //局部刷新ul中的li列表，更新数据
    todoLi = $('.todo');
    $.ajax({
        type: 'GET',
        url: '/getTodo',
        success: function (data) {
            data = data.split(',');
            $('.todos').html('');
            for (let i = 0; i < data.length; i++) {
                $('.todos').append(` <li class="todo">
                                     <i class="iconfont icon-circleo"></i>
                                     ${data[i]}</li>`);
            }
        }
    })
}
