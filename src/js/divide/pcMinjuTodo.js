const todoStart = () => {
    const $document = $(document);

    // 오늘 날짜 구하기
    const getToday = () => {
        const _now = new Date();
        const weekly = ["일", "월", "화", "수", "목", "금", "토"];
        const _getMonth = _now.getMonth();
        
        let _date = `${ _now.getFullYear()}.${_getMonth+1}.${ _now.getDate()} ${weekly[_now.getDay()]+"요일"}`
        $(".js__today").text(_date);

        return _date;
    }

    // 리스트 카운트
    const countChange =  () => {
        const _total = $(".js__allCnt").text($(".js__list__row").length); // 전체개수
        const _ing = $(".js__ing").text( ($(".js__list__row").length) - ($(".js__list__row.dim").length)); //진행 중
        const _done =  $(".js__done").text($(".js__list__row.dim").length); // 진행 완료
    }

    // 리스트 추가
    const addListEvent = () => {
        $document.on("click", ".js__btnAdd", function() {
            const _inputValue = $("#js__insert").val();
            const _date = getToday();

            // 리스트 생성
            if ( !_inputValue ) {
                alert("할 일을 입력해주세요.");
                return;
            }
            else {
                const addList =
                    `
                    <li class="todo__list__row js__list__row">
                        <div class="todo__list__inner js__list__inner show">
                            <span class="todo__list__content js__text">${_inputValue}</span>
                            <span class="todo__list__date">${_date}</span>
                            <div class="todo__list__controller">
                                <button type="button" class="todo__list__controller--btnEdit js__btnEdit">수정</button>
                                <button type="button" class="todo__list__controller--btnRemove js__btnRemove">삭제</button>
                            </div>    
                        </div>   
    
                        <div class="todo__edit__inner js__edit__inner">
                            <input type="text" class="todo__edit__input" placeholder="내용을 입력하세요.">
                            <div class="todo__edit__controller">
                                <button type="button" class="todo__edit__controller--btnEditDone js__btnEditDone">완료</button>
                                <button type="button" class="todo__edit__controller--btnCancel js__btnCancel">취소</button>
                            </div>
                        </div>
                    </li>
                `
                $(".js__list__box").prepend(addList);

                $("#js__insert").val("");

                // 전체삭제 bt 활성화
                if ( $(".js__list__row").length ) {
                    $(".js__btnAllDelete").addClass("show");
                }
            }
            countChange(); // 카운트 
        });
    }

    // 리스트 딤처리
    const listDim = () => {
        $document.on("click", ".js__list__row", function() {
            const $this = $(this);
            
            // 수정할 때 딤처리 안되게
            if( $(".js__edit__inner").hasClass("show") ) {
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
            
            const _done = countChange();
            const _ing = countChange();          
        });
    }

    // 리스트 수정
    const listEdit = () => {
        $document
            // 수정
            .on("click", ".js__btnEdit", function() {
                const $this = $(this);
                const $listInner = $this.closest(".js__list__row").find(".js__list__inner"); // 리스트 이너
                const $editInner = $this.closest(".js__list__row").find(".js__edit__inner"); // 수정 이너

                const _listTextValue = $this.closest(".js__list__row").find(".js__text").text(); // 텍스트값

                $listInner.removeClass("show"); // 리스트 숨기고
                $editInner.addClass("show"); // 수정 리스트 보이기
                $editInner.find("input").val(_listTextValue); // 리스트 텍스트 가져오기
            })

            // 완료
            .on("click", ".js__btnEditDone", function(e) {
                e.stopPropagation(); // 딤 전파 막기

                const $this = $(this);
                const $listInner = $this.closest(".js__list__row").find(".js__list__inner");
                const $editInner = $this.closest(".js__list__row").find(".js__edit__inner");

                const _editDoneValue =  $this.closest(".todo__edit__controller").siblings().val();
                
                if ( !_editDoneValue ) {
                    alert("내용을 입력해주세요.")
                    return false;
                }
                else {
                    $editInner.removeClass("show");
                    $listInner.addClass("show");

                    $listInner.find(".js__text").text(_editDoneValue);
                }
            })

            // 취소
            .on("click", ".js__btnCancel", function(e) {
                e.stopPropagation();
                const $this = $(this);
                const $listInner = $this.closest(".js__list__row").find(".js__list__inner");
                const $editInner = $this.closest(".js__list__row").find(".js__edit__inner");

                $listInner.addClass("show");
                $editInner.removeClass("show");
            });   
    }

    // 삭제 
    const listDelete =  () => {
        // 리스트 삭제
        $document
            .on("click", ".js__btnRemove", function() {
                const $this = $(this); 
                const findList = $this.closest(".js__list__row");
                const _total = countChange();

                findList.remove();
            })
            // 전체 삭제
            .on("click", ".js__btnAllDelete", function() {
                $(".js__list__box").empty();
                $(".js__count__value").text("0");
            });
        }

    const todoInit = () => { 
        
        getToday(); //날짜
        countChange(); //카운트
        addListEvent(); // 리스트 추가
        listDim(); // 딤처리
        listEdit();// 리스트 수정
        listDelete();// 리스트 삭제
        
    }

    todoInit();

}

export default todoStart;