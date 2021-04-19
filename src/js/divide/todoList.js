const todoList = () => {
    const $document = $(document);

    // 전체글 진행글 진행완료 갯수 카운트
    const listCount = () => {
        const $content = $(".fb__todo__content");
        const $nullContent = $(".fb__todo__content--null");
        const _total = $(".fb__todo__list").length;
        const _done = $(".js__text.checked").length;
        const _doing = (_total - _done);
        
        $(".js__total").text(_total);
        $(".js__done").text(_done);
        $(".js__doing").text(_doing);

        // 리스트 유무에 따른 콘텐츠 처리
        if ( !_total == 0 ){
            $nullContent.removeClass("show")
            $content.addClass("show")
        }
        else {
            $content.removeClass("show")
            $nullContent.addClass("show")
        }
    }

    // 진행 완료 처리
    const listChecked = () => {
        $document.on("click", ".js__text", function () {
            const $this = $(this);
            const $todoList = $this.closest(".fb__todo__list");
            const $target = $todoList.find(".fb__todo__controller button");

            $todoList.toggleClass("checked");

            if ( $todoList.hasClass("checked") ){
                $target.prop("disabled", true);
            }
            else {
                $target.prop("disabled", false);
            }

            listCount();
        })
    }
    
    // 리스트 상태변경
    const listEvent = () => {
        $document

            //리스트 추가하기 
            .on("click", ".js__addlist__add", function () {
                const $this = $(this);
                const $target = $this.closest(".fb__todo__addlist").find("input");
                const _text = $target.val().trim();
                const _today = today()
                
                if (_text != ""){
                    const _html = 
                            `<div class="fb__todo__scroll">
                                <ul class="fb__todo__list">
                                    <li class="fb__todo__textWrap">
                                        <p class="fb__todo__text js__text">${_text}</p>
                                        <span class="fb__todo__date">${_today}</span>
                                    </li>
                                    <li class="fb__todo__controller">
                                        <button type="button" class="fb__todo__controller--rewrite js__controller__rewrite">수정</button>
                                        <button type="button" class="fb__todo__controller--delete js__controller__delete">삭제</button>
                                    </li>
                                    <li>
                                        <form class="fb__todo__update">
                                            <input type="text" value="">
                                            <button type="button" class="fb__button js__update__push">확인</button>
                                            <button type="button" class="fb__button js__update__cancel">취소</button>
                                        </form>
                                    </li>
                                </ul>
                            </div>`
                
                    $(".fb__todo__content").prepend(_html);
                    $target.val("");  //리스트 추가 후 인풋 비우기
                    listCount()
                }
                else {
                    alert("일정을 입력해주십시오.")
                }
            })

            // 리스트 수정하기
            .on("click", ".js__controller__rewrite", function () {
                const $this = $(this);
                const $todoList = $this.closest(".fb__todo__list");
                const $formTarget = $todoList.find(".fb__todo__update");
                const $formInput = $formTarget.find("input");
                const $textTarget = $todoList.find(".js__text");
                const _textCopy = $textTarget.text();
                
                $formTarget.addClass("show");
                
                // 해당 인풋에게 기존 텍스트 넣어주기
                $formInput.val(_textCopy);
                // return false;  //form태그 refresh 방지
            })

            // 리스트 수정 취소하기
            .on("click", ".js__update__cancel", function () {
                const $target = $(this).closest(".fb__todo__update")
        
                $target.removeClass("show");
                // return false;  //form태그 refresh 방지
            })

            // 리스트 삭제하기
            .on("click", ".js__controller__delete", function () {
                const $target = $(this).closest(".fb__todo__list")
        
                $target.remove();
                listCount();
            });
    }

    // 수정된 내용 반영하기
    const newVal = function () {

        $document.on("click", ".js__update__push", function () {
            const $this = $(this);
            const $todoList = $this.closest(".fb__todo__list");
            const $targetForm = $this.closest(".fb__todo__update");
            const $targetText = $todoList.find(".js__text");
            const _currentVal = $targetForm.find("input").val().trim();

            if( _currentVal != "") {
                $targetForm.removeClass("show");
                $targetText.text(_currentVal);
            } 
            else {
                alert("수정할 내용을 입력해주십시오.")    ; 
            }
        })
    }

    // 오늘 날짜 구하기 **npm install moment
    const today = () => {
        const today = new Date();
        const moment = require("moment");
        const $thisDay = moment();
        const $dayArray = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]
        const _today =  ( $thisDay.format("YYYY.MM.DD") + " " + $dayArray[today.getDay()]);

        $(".fb__todo__today").text(_today);
        return _today;
    } 

    const init = () => {
        today(); //오늘 날짜 구하기
        listCount(); //갯수 카운트
        listChecked(); //체크 처리하기
        listEvent(); //리스트 상태 변경
        newVal() //수정된 내용 반영하기
    }

    init();

}

export default todoList;





// // 오늘 날짜 구하기 **original
// const today = () => {
//     let _today = "";
//     const today = new Date();
//     const _year = today.getFullYear();
//     const _month = today.getMonth() + 1;
//     const _date = today.getDate();
//     let _day = today.getDay();

//     if ( _day == 1 ) {
//         _day = "월요일";
//     } 
//     else if ( _day == 2 ) {
//         _day = "화요일";
//     }  
//     else if ( _day == 3 ) {
//         _day = "수요일";
//     } 
//     else if ( _day == 4 ) {
//         _day = "목요일";
//     }
//     else if ( _day == 5 ) {
//         _day = "금요일";
//     } 
//     else if ( _day == 6 ) {
//         _day = "토요일";
//     }
//     else {
//         _day = "일요일";
//     }

//     _today = `${_year}.${_month}.${_date} ${_day}`;

//     $(".fb__todo__today").text(_today);
//     return _today;
// } 