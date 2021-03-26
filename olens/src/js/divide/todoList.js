const todoList = () => {

    const $document = $(document);
    
    // 전체글 진행글 진행완료 갯수 카운트
    const count = () => {
        let _total = $(".fb__todo__list").length;
        let _done = $(".js__text.checked").length;
        let _doing = (_total - _done);
        
        $(".js__total").text(_total);
        $(".js__done").text(_done);
        $(".js__doing").text(_doing);
    }

    
    // 진행 완료 처리
    const checked = (value) => {
        let _doneLength = 0;
        
        $document.on("click", ".js__text", function () {
            
            if ( !$(this).hasClass("checked") ){
                $(this).addClass("checked");
                _doneLength++;
            }
            else {
                $(this).removeClass("checked");
                _doneLength--;
            }
            
            count(_doneLength);
        })
    }
    
    // 수정 * 취소 * 삭제하기
    const rewrite = () => {
        const $formUpdate = $(".fb__todo__update")
        $document
        .on("click", ".js__controller__rewrite", function () {
                let _thisParent = $(this).parent();
                let _target = _thisParent.siblings($formUpdate);
                let _thisParentSiblings = _thisParent.siblings();
                let _targetText = _thisParentSiblings.children(".js__text");

                let _textCopy = _targetText.text();

                // 해당 인풋에게 텍스트 넣어주기

                console.log(_PastTarget);

                _target.addClass("show");

            })
            .on("click", ".js__update__cancel", function () {
                let _target = $(this).parent($formUpdate)

                _target.removeClass("show");
            })
            .on("click", ".js__controller__delete", function () {
                let _target = $(this).closest(".fb__todo__list")

                _target.remove();
                count();
            })
    }

    // 오늘 날짜 구하기
    const today = () => {
        let today = new Date();
        let year = today.getFullYear();
        let month = (today.getMonth() + 1);
        let date = today.getDate();
        let day = today.getDay();

        if ( day == 1 ){
            day = "월요일"
        } 
        else if ( day == 2 ){
            day = "화요일"
        }  
        else if ( day == 3 ){
            day = "수요일"
        } 
        else if ( day == 4 ){
            day = "목요일"
        }
        else {
            day = "금요일"
        }

        $(".today__year").text(year + ".");
        $(".today__month").text(month + ".");
        $(".today__date").text(date + ".");                
        $(".today__day").text(day);
    } 

    
    // ** 할 것
    // 1. '추가' 누르면 input 내용으로 하나 더 list 만들기 (날짜 캡처)
    // 2. '수정' 누르면 해당 내용 고대로 담기
    // 3. '수정' 에서 또 '수정' 누르면 해당 내용 반영하기 
    // ** html 클래스 네이밍


    const init = () => {
        today(); //오늘 날짜 구하기
        checked(); //체크 처리하기
        count(); //갯수 카운트
        rewrite(); //리스트 수정 * 취소 * 삭제하기
    }

    init();

}

export default todoList;