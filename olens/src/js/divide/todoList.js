import { lt } from "lodash";

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
        $document
        .on("click", ".js__controller__rewrite", function () {
            let _thisParent = $(this).parent();  //fb__todo__controller
            let _formTarget = _thisParent.siblings(".fb__todo__update")
            let _formInput = _formTarget.children("input");
            
            _formTarget.addClass("show");
            
            // 해당 인풋에게 기존 텍스트 넣어주기
            let _textTarget = _thisParent.siblings(".fb__todo__inner").children(".js__text");
            let _textCopy = _textTarget.text().trim();
            
            _formInput.val(_textCopy);
            
            // 수정된 내용 반영하기
            newVal(_textCopy);
        })

        .on("click", ".js__update__cancel", function () {
            let _target = $(this).parent(".fb__todo__update")
    
            _target.removeClass("show");
        })
    
        .on("click", ".js__controller__delete", function () {
            let _target = $(this).closest(".fb__todo__list")
    
            _target.remove();
            count();
        })
    }

    const newVal = function (_oldVal) {

        $document.on("click", ".js__update__push", function () {
            let _targetForm = $(this).parent();
            let _currentVal = $(this).siblings("input").val().trim();
            let _targetText = $(this).parent().siblings().children(".js__text");

            if( _oldVal == _currentVal ){
                alert("수정된 내용이 없습니다.")
            }
            else {
                _targetForm.removeClass("show");
                _targetText.text(_currentVal);
            } 
        })
    }

    // 오늘 날짜 구하기
    const today = () => {
        let today = new Date();
        let _year = today.getFullYear();
        let _month = (today.getMonth() + 1);
        let _date = today.getDate();
        let _day = today.getDay();

        if ( _day == 1 ){
            _day = "월요일";
        } 
        else if ( _day == 2 ){
            _day = "화요일";
        }  
        else if ( _day == 3 ){
            _day = "수요일";
        } 
        else if ( _day == 4 ){
            _day = "목요일";
        }
        else if ( _day == 5 ){
            _day = "금요일";
        } 
		else if ( _day == 6 ){
            _day = "토요일";
        }
		else {
			_day = "일요일";
		}
		

		let _today = `${_year}.${_month}.${_date} ${_day}`;

		$(".fb__todo__today").text(_today);
        return _today;
    } 

    // 리스트 추가하기
    const addList = function () {
        $document.on("click", ".js__addlist__add", function () {
            let _target = $(this).siblings("input");
            let _text = _target.val();
            let _today = today()
            
            if( ! _text == "" ){
                let _html = "<dl class='fb__todo__list'>";
						_html += "<dt class='fb__todo__inner'>";
							_html += `<p class='fb__todo__text js__text test'>${_text}</p>`;
							_html += `<span class='fb__todo__date'>${_today}</span>`;
						_html += "</dt>";
						_html += "<dd class='fb__todo__controller'>";
							_html += "<button class='fb__todo__controller--rewrite js__controller__rewrite'>수정</button>";
							_html += "<button class='fb__todo__controller--delete js__controller__delete'>삭제</button>";
						_html += "</dd>";
						_html += "<form class='fb__todo__update'>";
							_html += "<input type='text' value=''>";
							_html += "<button type='button' class='fb__button js__update__push'>확인</button>";
							_html += "<button type='button' class='fb__button js__update__cancel'>취소</button>";
						_html += "</form>";
					_html += "</dl>";
               
                $(".fb__todo__scroll").prepend(_html);
    
                count()
            }
            else {
                alert("일정을 입력해주십시오.")
            }
        });

    }
    
    // ** 할 것
	// 공통함수 묶기

    const init = () => {
        today(); //오늘 날짜 구하기
        checked(); //체크 처리하기
        count(); //갯수 카운트
        rewrite(); //리스트 수정 * 취소 * 삭제하기
        addList(); //리스트 추가하기
    }

    init();

}

export default todoList;