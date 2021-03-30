const todoList = () => {
    const $document = $(document);

    // 전체글 진행글 진행완료 갯수 카운트
    const count = () => {
        const _total = $(".fb__todo__list").length;
        const _done = $(".js__text.checked").length;
        const _doing = (_total - _done);
        
        $(".js__total").text(_total);
        $(".js__done").text(_done);
        $(".js__doing").text(_doing);
    }

    // 진행 완료 처리
    const checked = () => {
        $document.on("click", ".js__text", function () {

            if ( !$(this).hasClass("checked") ){
                $(this).addClass("checked");
            }
            else {
                $(this).removeClass("checked");
            }

            count();
        })
    }
    
    // 리스트 추가, 수정, 취소, 삭제하기
    const rewrite = () => {
        $document
            .on("click", ".js__addlist__add", function () {
                const $this = $(this);
                const $target = $this.closest(".fb__todo__addlist").find("input");
                const _text = $target.val().trim();
                const _today = today()
                
                if (_text != ""){

                    const _html = 
                            `<ul class="fb__todo__list">
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
                            </ul>`
                
                    $(".fb__todo__scroll").prepend(_html);
                    
                    $target.val("");  //리스트 추가 후 인풋 비우기
                    count()
                }
                else {
                    alert("일정을 입력해주십시오.")
                }
            })

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
                return false;  //form태그 refresh 방지
            })

            .on("click", ".js__update__cancel", function () {
                const $target = $(this).closest(".fb__todo__update")
        
                $target.removeClass("show");
                return false;  //form태그 refresh 방지
            })

            .on("click", ".js__controller__delete", function () {
                const $target = $(this).closest(".fb__todo__list")
        
                $target.remove();
                count();
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

    // 오늘 날짜 구하기
    const today = () => {
        let _today = "";
        const today = new Date();
        const _year = today.getFullYear();
        const _month = today.getMonth() + 1;
        const _date = today.getDate();
        let _day = today.getDay();

        if ( _day == 1 ) {
            _day = "월요일";
        } 
        else if ( _day == 2 ) {
            _day = "화요일";
        }  
        else if ( _day == 3 ) {
            _day = "수요일";
        } 
        else if ( _day == 4 ) {
            _day = "목요일";
        }
        else if ( _day == 5 ) {
            _day = "금요일";
        } 
		else if ( _day == 6 ) {
            _day = "토요일";
        }
		else {
			_day = "일요일";
		}

		_today = `${_year}.${_month}.${_date} ${_day}`;

		$(".fb__todo__today").text(_today);
        return _today;
    } 

    const init = () => {
        today(); //오늘 날짜 구하기
        count(); //갯수 카운트
        checked(); //체크 처리하기
        rewrite(); //리스트 추가, 수정, 취소, 삭제
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