/**
 * Created by hxsd on 2017/1/2.
 */
$(function(){
    // 主导航栏 hover 事件
    $('#navList>li').each(function(index){
        $(this).hover(
            function(){
                $(this).addClass('ac');
                $('#poPup .section').eq(index).css('display','block')
            },
            function(){
                $('#navList>li').removeClass('ac')
                $('#poPup .section').css('display','none')
            }
        )
    })
    $('#poPup .section').each(function(index){
        $(this).hover(
            function(){
                $(this).css('display','block')
            },
            function(){
                $('#poPup .section').css('display','none')
            }
        )
    })

    // banner 轮播图
    // 索引值 及 默认状态
    var index=0;
    $('#bannerA ol li').eq(index).addClass('ac');
    $('#bannerList li').eq(index).css({'opacity':'1'});
    // 索引值 hover li更换 banner
    $('#bannerA ol li').each(function(){
        $(this).hover(
            function(){
                clearInterval(timer);
                $('#bannerA ol li').removeClass('ac');
                $(this).addClass('ac');
                index=parseInt($(this).html())-1;
                $('#bannerList li').finish().animate({'opacity':'0'},300).eq(index).finish().animate({'opacity':'1'},200)
            },
            function(){
                $('#bannerA ol li').removeClass('ac');
                $(this).addClass('ac');
                timer=setInterval(function(){
                    index++;
                    if(index==5){index=0;}
                    $('#bannerA ol li').removeClass('ac');
                    $('#bannerA ol li').eq(index).addClass('ac');
                    $('#bannerList li').finish().animate({'opacity':'0'},300).eq(index).finish().animate({'opacity':'1'},200)
                },2000)
            }
        )
    });
    // 索引值 Btn click 更换 banner
    $('#nextBtn a').on('click',function(){
        index++;
        if(index==5){index=0;}
        $('#bannerA ol li').removeClass('ac');
        $('#bannerA ol li').eq(index).addClass('ac');
        $('#bannerList li').finish().animate({'opacity':'0'},300).eq(index).finish().animate({'opacity':'1'},200)
        console.log(index)
    });
    $('#prevBtn a').on('click',function(){
        index--;
        if(index==-1){index=4;}
        $('#bannerA ol li').removeClass('ac');
        $('#bannerA ol li').eq(index).addClass('ac');
        $('#bannerList li').finish().animate({'opacity':'0'},300).eq(index).finish().animate({'opacity':'1'},200)
    });

    $('#nextBtn a,#prevBtn a').hover(
        function(){
            clearInterval(timer);
        },
        function(){
            timer=setInterval(function(){
                index++;
                if(index==5){index=0;}
                $('#bannerA ol li').removeClass('ac');
                $('#bannerA ol li').eq(index).addClass('ac');
                $('#bannerList li').finish().animate({'opacity':'0'},300).eq(index).finish().animate({'opacity':'1'},200)
            },2000)
        }
    );
    // 索引值 setInterval 更换 banner
    var timer=setInterval(function(){
        index++;
        if(index==5){index=0;}
        $('#bannerA ol li').removeClass('ac');
        $('#bannerA ol li').eq(index).addClass('ac');
        $('#bannerList li').finish().animate({'opacity':'0'},300).eq(index).finish().animate({'opacity':'1'},200)
    },2000)

    // main detail change
    $('.floorF').each(function(flNum){
        $(this).find('.nav_f li').on('mouseover',function(){
            var liNum=$(this).index();
            $(this).addClass('ac');
            $(this).siblings('li').removeClass('ac');
            $('.floorF').eq(flNum).find('div.details').attr("class","details hide");
            $('.floorF').eq(flNum).find('div.details').eq(liNum).attr("class","details");

        })
    })
    // floor hover
    for(var i=0; i<$('.subnav .floorList li').length; i++){
        var $LiSpan=$('.subnav .floorList').find('li').eq(i).find('span');
        $LiSpan.hover(
            function(){
                $('.subnav .floorList li').removeClass('ac');
                $('.subnav .floorList li').eq($(this).attr("data-id")-1).addClass('ac');
            })
    }

    // floor onclick
    for(var i=0; i<$('.subnav .floorList li').length; i++){
        var $LiSpan=$('.subnav .floorList').find('li').eq(i).find('span');
        $LiSpan.siblings('a').on('click',function(){				// 先hover 使span hidden了  选着 span的兄弟标签 a
            //alert($(this).siblings('span').attr("data-id"));
            $("html,body").animate({
                // 以hash值为id选择器
                scrollTop:$('.floorF').eq($(this).siblings('span').attr("data-id")-1).offset().top
            },600);
        })
    }

    // floor slide
    $(window).scroll(function(){
        var $scroll=$(window).scrollTop();
        if($scroll>=1400 && $scroll<=9000){
            $('.subnav .floorList').css({"display":"block"})
        }else{
            $('.subnav .floorList').css({"display":"none"})
        };
        for(var i=0; i<$('.floorF').length; i++){
            if($('.floorF').eq(i).offset().top<=$scroll) {
                $('.subnav .floorList').find('li').removeClass('ac');
                $('.subnav .floorList').find('li').eq(i).addClass('ac')
            }
        }
    })
    // city & weather
    function CityWeather(){
        var CityData="http://wthrcdn.etouch.cn/weather_mini?city="+$('.diqu select').val();
        $.getJSON(
            {"url":CityData,
                success:function(data){
                    console.log(data.data.forecast[0].type);
                    var WeatherData;
                    WeatherData='　'+data.data.forecast[0].type+'　';
                    WeatherData+=data.data.forecast[0].low+'　';
                    WeatherData+=data.data.forecast[0].high+'　';
                    $('.diqu span').html(WeatherData)
                }}
        )
    };
    CityWeather();
    $('.diqu select').on('change',function(){
        CityWeather();
    })
})
