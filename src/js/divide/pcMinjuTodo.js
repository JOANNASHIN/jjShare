const todoList = () => {
    const $document = $(document);
    
    // 날짜 구하기
    const getToday = () => {
        const _now = new Date();
        const _getYear = _now.getFullYear();
        const _getMonth = _now.getMonth() + 1;
        const _getDate = _now.getDate();
        const _getDay = _now.getDay();
        const week = ["일", "월", "화", "수", "목", "금", "토"]; 
        const _date = `${_getYear}.${_getMonth}.${_getDate} ${week[_getDay]+"요일"}`;

        return _date;
    }

    // 카운트
    const countChange = () => {
        $(".js__allCnt").text($(".js__list__row").length); // 전체
        $(".js__ing").text( ($(".js__list__row").length) - ($(".js__list__row.dim").length)); //진행 중
        $(".js__done").text($(".js__list__row.dim").length); // 완료
    }

    // 이벤트 추가
    const addList = () => {
        //추가
        $document.on("click", ".js__btnAdd", function() {
            const _inputValue = $(".js__insert__input").val().trim();
            const _date = getToday(); // _date에 담아서 실행
            
            if ( ! _inputValue ) {
                alert("내용을 입력해주세요.");
                return;
            }
            else {
                const addList = `
                    <li class="todo__list__row js__list__row">
                        <div class="todo__list__inner js__list__inner">
                            <span class="todo__list__content js__text">${_inputValue}</span>
                            <span class="todo__list__date">${_date}</span>
                            <div class="todo__list__controller">
                                <button type="button" class="todo__list__controller--btnEdit js__btnEdit">수정</button>
                                <button type="button" class="todo__list__controller--btnRemove js__btnRemove">삭제</button>
                            </div>    
                        </div>   

                        <div class="todo__edit__inner js__edit__inner">
                            <input type="text" class="todo__edit__input js__edit__input" placeholder="내용을 입력하세요.">
                            <div class="todo__edit__controller js__edit__controller">
                                <button type="button" class="todo__edit__controller--btnEditDone js__btnEditDone">완료</button>
                                <button type="button" class="todo__edit__controller--btnCancel js__btnCancel">취소</button>
                            </div>
                        </div>
                    </li>
                `;

                $(".js__list__box").prepend(addList);
                $(".js__insert__input").val("");

                // 리스트 있으면 전체삭제 버튼 활성화
                if ( $(".js__list__row").length ) {
                    $(".js__btnAllDelete").addClass("show");
                }
            }
            countChange(); // 카운트 함수 실행
        });
        
        // 엔터 -> 키업 이벤트
        $(".js__insert__input").on("keyup", function(e) {
            if ( e.keyCode  == 13 ) {
                $(".js__btnAdd").trigger("click");
            }
        });
    }

    // 리스트 딤처리
    const listDim = () => {
        $document.on("click", ".js__list__row", function() {
            const $this = $(this)

            if ( $(".js__list__row").hasClass("editShow") ) {
                return;
            }

            if ( !$this.hasClass("dim") ) {
                $this.addClass("dim").find(".js__btnEdit").prop("disabled", true);
            }
            else {
                $this.removeClass("dim").find(".js__btnEdit").prop("disabled", false);
            }

            countChange();
        });
    }

    // 수정
    const listEdit = () => {
        $document.on("click", ".js__btnEdit", function(e) {
            e.stopPropagation();

            const $this = $(this);
            const $findList = $this.closest(".js__list__row");
            const _listValue = $findList.find(".js__text").text(); // 리스트 텍스트 값 가져오기

            listShowHide($this, true);
            $findList.find(".js__edit__input").val(_listValue);
        });
                
        //완료
        $document.on("click", ".js__btnEditDone", function(e) {
            e.stopPropagation();

            const $this = $(this);
            const $findList = $this.closest(".js__list__row");

            //수정한 값 가져오기
            const _editDoneVal = $this.closest(".js__edit__controller").siblings().val().trim();

            // 수정한 값 뿌리기
            $findList.find(".js__text").text(_editDoneVal);

            listShowHide($this, false);
        });

        //취소
        $document.on("click", ".js__btnCancel", function(e) {
            e.stopPropagation();
            const $this = $(this);

            listShowHide($this, false);
        });

        //함수처리
        function listShowHide ($this, flag) {
            const $findList = $this.closest(".js__list__row");

            if ( flag ) {
                $findList.addClass("editShow");
            }
            else {
                $findList.removeClass("editShow");
            }
        }
    }

    // 삭제
    const listDelete = () => {
        $document.on("click", ".js__btnRemove", function() {
            const $this = $(this);
            const $findList = $this.closest(".js__list__row");
    
            $findList.remove();
            countChange();
        });

        $document.on("click", ".js__btnAllDelete", function() {
            $(".js__list__box").empty();
            $(".js__btnAllDelete").removeClass("show");
            countChange();
        });
    }

    // 최초실행
    const todoInit = () => {
        $(".js__today").text(getToday());
        addList(); // 리스트 추가
        countChange(); // 카운트
        listDim(); // 딤처리
        listEdit(); // 리스트 수정
        listDelete(); // 리스트 삭제
    }

    todoInit();
}

export default todoList;