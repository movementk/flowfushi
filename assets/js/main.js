var Mascara = (function($) {
    
    var rotateCount = 0;
    var typeCount = 5; // 마스카라의 개수
    var typeNow = 1; // 현재 선택된 마스카라
    var changing = false;
    var changeDelay = 2000;
    var $container = $('#header');
    var $back = $container.find('.back:eq(0)');
    var $hand = $container.find('.watch:eq(0) .hand:eq(0)');
    var $shadow = $container.find('.watch:eq(0) .shadow:eq(0)');
    var $features = $container.find('.watch:eq(0) .features:eq(0)');
    var rollDelay = 2000;
    var rollTimer = null;
    
    // 이전 마스카라
    function prevItem() {
        if (changing == false) {
            changing = true;
            if (changing) {
                rotateCount--;
                typeNow--;
                if (typeNow < 0) typeNow = typeCount;
                _showItem();
            }
        }
    };
    
    // 다음 마스카라
    function nextItem() {
        if (changing == false) {
            changing = true;
            if (changing) {
                rotateCount++;
                typeNow++;
                if (typeNow > typeCount + 1) typeNow = 1;
                _showItem();
            }
        }
    };
    
    // 마스카라 보이기
    function _showItem() {
        
        // 마스카라 보이기
        $hand.find('li.selected').removeClass('selected');
        $hand.find('li').eq(typeNow-1).addClass('selected');
        if (typeNow == 0) {
            $hand.find('li').eq(typeCount-1).addClass('selected');
        }
        if (typeNow == typeCount + 1) {
            $hand.find('li').eq(0).addClass('selected');
        }
        
        // 마스카라 그림자
        if (typeNow == 1 || typeNow == typeCount + 1) {
            $shadow.addClass('show');
        } else {
            $shadow.removeClass('show');
        }
        
        // 마스카라 회전
        _rotateItem();
        
        // 특징 선택
        $features.find('li.selected').removeClass('selected');
        $features.find('li').eq(typeNow-1).addClass('selected');
        if (typeNow == 0) {
            $features.find('li').eq(typeCount-1).addClass('selected');
        }
        if (typeNow == typeCount + 1) {
            $features.find('li').eq(0).addClass('selected');
        }
        
        // 배경 변화
        $back.stop().animate({ 'top' : -200*typeNow+'%' }, changeDelay, 'easeOutExpo', function() {
            if (typeNow == 0) {
                $(this).css('top', '-1000%');
                typeNow = 5;
            }
            if (typeNow == typeCount + 1) {
                $(this).css('top', '-200%');
                typeNow = 1;
            }            
            changing = false;
        });
    }
    
    // 마스카라 보이기
    function showItem(n) {
        typeNow = n + 1;
        rotateCount = n;
        _showItem();
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
    
    // 자동롤링
    function playRoll() {
        rollTimer = window.setTimeout(function() {
            nextItem();
            playRoll();
        }, rollDelay + changeDelay);
    }
    
    // 초기화
    function init() {
        playRoll();
    }
    
    // 롤링 정지
    function stopRoll() {
        window.clearTimeout(rollTimer);
        rollTimer = null;
    }
    
    init();
    
    return {
        prev: prevItem,
        next: nextItem,
        stop: stopRoll,
        play: playRoll,
        show: showItem
    };
    
})(jQuery);



(function($) {
    
    // 마우스 휠에 반응
    $(document).on('mousewheel', '#header .watch:eq(0) .figure:eq(0)', function(event) {
        if (event.deltaY == 1) {
            Mascara.prev();
        }
        if (event.deltaY == -1) {
            Mascara.next();
        }
        event.preventDefault();
    });
    
    // 마우스 오버 시 - 롤링 정지
    $(document).on('mouseenter', '#header .watch:eq(0) .figure:eq(0)', function() {
        Mascara.stop();
    });
    
    // 마우스 아웃 시 - 롤링 정지
    $(document).on('mouseleave', '#header .watch:eq(0) .figure:eq(0)', function() {
        Mascara.play();
    });
    
    // 기능 마우스 클릭 시
    /*
    $(document).on('click', '#header .watch:eq(0) .figure:eq(0) .features:eq(0) li a', function(event) {
        Mascara.show($(this).parent().index());
        event.preventDefault();
    });
    */
    
})(jQuery);