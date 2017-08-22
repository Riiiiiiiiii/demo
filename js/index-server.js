/**
 * Created by hxsd on 2017/1/4.
 */
$(function(){
    $('.customerS').hover(
        function(){
            $('.customerInner').css({'display':'block'});
        },
        function(){
            $('.customerInner').css({'display':'none'});
        });
    $('.customerInner').hover(
        function() {
            $(this).css({'display': 'block'})
        },
        function(){
            $(this).css({'display':'none'})
        }
    )
})