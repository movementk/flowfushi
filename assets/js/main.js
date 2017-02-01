var Mascara = (function($) {
    
    var rotateCount = 0;
    var typeCount = 5;
    var typeNow = 1;
    var changing = false;
    var changeDelay = 2000;
    var $container = $('#header');
    var $back = $container.find('.back:eq(0)');
    var $hand = $container.find('.watch:eq(0) .hand:eq(0)');
    
    // 이전 마스카라
    function prevItem() {
        //console.log('prev mascara');
        changing = true;
        if (changing) {
            rotateCount--;
            typeNow--;
            if (typeNow < 0) typeNow = typeCount;
            _showItem();
        }
    };
    
    // 다음 마스카라
    function nextItem() {
        //console.log('next mascara');
        changing = true;
        if (changing) {
            rotateCount++;
            typeNow++;
            if (typeNow > typeCount + 1) typeNow = 1;
            _showItem();
        }
    };
    
    // 마스카라 보이기
    function _showItem() {
        //$container.removeClass('mascara-0 mascara-1 mascara-2 mascara-3 mascara-4 mascara-5 mascara-6');
        //$container.addClass('mascara-'+typeNow);
        
        // 마스카라 보이기
        $hand.find('li.selected').removeClass('selected');
        $hand.find('li').eq(typeNow-1).addClass('selected');
        if (typeNow == 0) {
            $hand.find('li').eq(typeCount-1).addClass('selected');
        }
        if (typeNow == typeCount + 1) {
            $hand.find('li').eq(0).addClass('selected');
        }
        
        // 마스카라 회전
        _rotateItem();
        
        // 배경 변화
        $back.stop().animate({ 'top' : -200*typeNow+'%' }, changeDelay, function() {
            if (typeNow == 0) {
                //$container.removeClass('mascara-0 mascara-1 mascara-2 mascara-3 mascara-4 mascara-5 mascara-6');
                //$container.addClass('mascara-5');
                $(this).css('top', '-1000%');
                typeNow = 5;
            }
            if (typeNow == typeCount + 1) {
                //$container.removeClass('mascara-0 mascara-1 mascara-2 mascara-3 mascara-4 mascara-5 mascara-6');
                //$container.addClass('mascara-1');
                $(this).css('top', '-200%');
                typeNow = 1;
            }
            changing = false;
        });
    }
    
    // 마스카라 회전
    function _rotateItem() {
        var deg = rotateCount * 360 / typeCount;
        if (deg >= 0) {
            if (rotateCount % typeCount == 1) {
                deg += 3;
            }
            if (rotateCount % typeCount == 2) {
                deg += 6;
            }
            if (rotateCount % typeCount == 3) {
                deg -= 6;
            }
            if (rotateCount % typeCount == 4) {
                deg -= 3;
            }
        } else {
            if (-rotateCount % typeCount == 4) {
                deg += 3;
            }
            if (-rotateCount % typeCount == 3) {
                deg += 6;
            }
            if (-rotateCount % typeCount == 2) {
                deg -= 6;
            }
            if (-rotateCount % typeCount == 1) {
                deg -= 3;
            }
        }
        $hand.css({
            '-webkit-transform' : 'rotate('+deg+'deg)',
            '-moz-transform' : 'rotate('+deg+'deg)',
            '-ms-transform' : 'rotate('+deg+'deg)',
            '-o-transform' : 'rotate('+deg+'deg)',
            'transform' : 'rotate('+deg+'deg)'
        });
    }
    
    // 애니메이션 중인지
    function isChanging() {
        return changing;
    }
    
    return {
        prev: prevItem,
        next: nextItem,
        getChanging: isChanging
    };
    
})(jQuery);



(function($) {
    
    $('#header').on('mousewheel', function(event) {
        //console.log(event.deltaX, event.deltaY, event.deltaFactor);
        //console.log(Mascara.getChanging());
        if (event.deltaY == 1) {
            if (Mascara.getChanging() == false) {
                Mascara.prev();
            }
        }
        if (event.deltaY == -1) {
            if (Mascara.getChanging() == false) {
                Mascara.next();
            }
        }
        event.preventDefault();
    });
    
})(jQuery);