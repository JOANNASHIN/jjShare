const todoStart = () => {
    const $document = $(document);

    // 오늘 날짜 구하기
    const getToday = () => {
        const _now = new Date();
        const weekly = ["일", "월", "화", "수", "목", "금", "토"];
        const _getYear = _now.getFullYear();
        const _getMonth = _now.getMonth();
        const _getDate = _now.getDate();
        const _getDay = _now.getDay();
        const _date = `${_getYear}.${_getMonth+1}.${_getDate} ${weekly[_getDay]+"요일"}`
       
        return _date;
    }

    // 리스트 카운트
    const countChange =  () => {
        $(".js__allCnt").text($(".js__list__row").length); // 전체개수
        $(".js__ing").text( ($(".js__list__row").length) - ($(".js__list__row.dim").length)); //진행 중
        $(".js__done").text($(".js__list__row.dim").length); // 진행 완료
    }

    // 리스트 추가
    const addListEvent = () => {
        $document.on("click", ".js__btnAdd", function() {
            const _inputValue = $(".js__insert__input").val();
            const _date = getToday();

            // 리스트 생성
            if ( !_inputValue ) {
                alert("할 일을 입력해주세요.");
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
                            <div class="todo__edit__controller">
                                <button type="button" class="todo__edit__controller--btnEditDone js__btnEditDone">완료</button>
                                <button type="button" class="todo__edit__controller--btnCancel js__btnCancel">취소</button>
                            </div>
                        </div>
                    </li>
                `
                $(".js__list__box").prepend(addList);

                $(".js__insert__input").val("");

                // 전체삭제 bt 활성화
                if ( $(".js__list__row").length ) {
                    $(".js__btnAllDelete").addClass("show");
                }
            }
            countChange(); // 카운트 함수 실행
        });

        // 엔터 -> 키업이벤트
        $(".todo__insert__input").on("keyup", function(e) {
           
            if (e.keyCode == 13) {
                $(".js__btnAdd").trigger("click");
            }
            
        })
    }

    // 리스트 딤처리
    const listDim = () => {
        $document.on("click", ".js__list__row", function() {
            const $this = $(this);
            
            // 수정할 때 딤처리 안되게
            if ( $(".js__list__row").hasClass("editShow") ) {
                return false;
            }
            
            if ( !$this.hasClass("dim") ) {
                $this.addClass("dim")
                $this.find(".js__btnEdit").prop("disabled", true);
            }
            else {
                $this.removeClass("dim")
                $this.find(".js__btnEdit").prop("disabled", false);
            }
            
            countChange();
        });
    }

    // 리스트 수정
    const listEdit = () => {
        $document
            // 수정
            .on("click", ".js__btnEdit", function(e) {
                e.stopPropagation();

                const $this = $(this);
                const $findList = $this.closest(".js__list__row");

                showHide($this, true);
                // $findList.addClass("editShow");

                const _listTextValue = $findList.find(".js__text").text(); // 텍스트값
                $findList.find(".js__edit__input").val(_listTextValue); // 리스트 텍스트 가져오기
            })

            // 완료
            .on("click", ".js__btnEditDone", function(e) {
                e.stopPropagation();

                const $this = $(this);
                const $findList = $this.closest(".js__list__row");

                const _editDoneValue =  $this.closest(".todo__edit__controller").siblings().val();
                
                if ( !_editDoneValue ) {
                    alert("내용을 입력해주세요.")
                    return false;
                }
                else {
                    showHide($this, false);
                    $findList.find(".js__text").text(_editDoneValue);
                }
            })

            // 취소
            .on("click", ".js__btnCancel", function(e) {
                e.stopPropagation();
                const $this = $(this);

                showHide($this, false);
            });

            // show/hide 함수처리
            function showHide ($this, flag) {
                const $findList = $this.closest(".js__list__row");

                if (flag == true) {
                    $findList.addClass("editShow");
                } else {
                    $findList.removeClass("editShow");
                }
            }
    }

    // 삭제 
    const listDelete =  () => {
        // 리스트 삭제
        $document
            .on("click", ".js__btnRemove", function() {
                const $this = $(this); 
                const $findList = $this.closest(".js__list__row");
                
                $findList.remove();
                countChange();
            })
            // 전체 삭제
            .on("click", ".js__btnAllDelete", function() {
                $(".js__list__box").empty();
                $(".js__btnAllDelete").removeClass("show");
                countChange();
            });
    }

    const todoInit = () => { 
        $(".js__today").text(getToday()); // 날짜
        addListEvent(); // 리스트 추가
        listDim(); // 딤처리
        listEdit();// 리스트 수정
        listDelete();// 리스트 삭제
    }

    todoInit();

}

export default todoStart;