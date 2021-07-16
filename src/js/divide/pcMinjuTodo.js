const minjuTodo = () => {
    const $document = $(document);

    const todoApp = () => {
        // 날짜 변수 선언
        const _now = new Date();
        const weekly = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
        const _getYear = _now.getFullYear();
        const _getMonth = _now.getMonth();
        const _getDate = _now.getDate();
        const _getDay = _now.getDay();

        // 오늘 날짜 구하기
        const _today = `${_getYear}.${_getMonth+1}.${_getDate} ${weekly[_getDay]}`
        $(".js__today").text(_today);

        // 리스트 빈값 선언
        let addList = "";
        
        // 리스트 추가
        $document.on("click", ".js__btnAdd", function() {
            // 입력된 인풋 밸류값
            const _inputValue = $("#js__insert").val();
            // html에서 인풋 불러오기
            const insertInput = document.getElementById("js__insert");

            // 리스트 생성
            const addList = `
                <li class="todo__list__row js__list__row">
                    <div class="cont-box">
                        <span class="cont">${_inputValue}</span>
                        <span class="date">${_today}</span>
                        <div class="btn-box">
                            <button type="button" class="btnEdit js__btnEdit">수정</button>
                            <button type="button" class="btnRemove js__btnRemove">삭제</button>
                        </div>    
                    </div>   

                    <div class="edit-box">
                        <input type="text" class="edit-input" placeholder="내용을 입력하세요.">
                        <div class="edit-btn">
                            <button type="button" class="btnEditDone js__btnEditDone">완료</button>
                            <button type="button" class="btnCancel js__btnCancel">취소</button>
                        </div>
                    </div>
                </li>
            `
            $(".js__list__box").prepend(addList); // 리스트 맨앞에 추가

            insertInput.value = null;

            // 리스트 전체 개수
            $(".js__allCnt").text($(".js__list__row").length);
            
            // 리스트 진행 개수
            $(".js__ing").text( ($(".js__list__row").length) - ($(".js__list__row.dim").length));
            
            // 리스트 개수가 1이상 되면 전체삭제 버튼
            if ( $(".js__list__row").length >= 1 ) {
                $(".js__btnAllDelete").addClass("show");
            }

        });

        // 리스트 딤처리
        $document.on("click", ".js__list__row", function(e) {
            const $this = $(this);

            // 수정박스가 보여질 때
            if( $(".edit-box").hasClass("editShow") ) {
                return false;
            }

            // 딤추가/ 버튼 활성화/비활
            if ( !($this.hasClass("dim")) ) {
                $this.addClass("dim");

                // attr()로 버튼의 disabled 사용여부 (disabled 활성화/비활성화)
                // attr()은 HTML의 속성을 취급
                // prop()은 javescript의 property를 취급하는 메소드, disabled의 상태값 확인
                $(".js__btnEdit").attr("disabled", true);
            }
            else {
                $this.removeClass("dim");
                $(".js__btnEdit").attr("disabled", false);
            }
            
            // 진행 완료 ( = if 조건 )
            $(".js__done").text($(".js__list__row.dim").length);
            
            // 진행 개수 ( = else )
            $(".js__ing").text( ($(".js__list__row").length) - ($(".js__list__row.dim").length));

        });

        // 리스트 수정
        $document.on("click", ".js__btnEdit", function(e) {
            const $this = $(this);
            e.stopPropagation();

            // 컨텐츠 박스 숨기기
            $this.closest(".js__list__row").find(".cont-box").addClass("contHide");

            // 수정 리스트 보이기
            $this.closest(".js__list__row").find(".edit-box").addClass("editShow");

            // 리스트 텍스트 가져오기
            $this.closest(".cont-box").next(".edit-box").find("input").val($this.closest(".js__list__row").find(".cont").text());

            console.log( $this.closest(".js__list__row").find(".cont").text() );
            
        });

        // 리스트 수정 후 완료
        $document.on("click", ".js__btnEditDone", function(e) {
            e.stopPropagation();

            const $this = $(this);
            const _editDoneValue = $this.parent().siblings().val();

            // 컨텐츠 박스 보이게
            $this.closest(".js__list__row").find(".cont-box").removeClass("contHide");
            // 수정 텍스트 다시 가져오기
            $this.closest(".js__list__row").find(".cont-box").find(".cont").text(_editDoneValue);

            console.log(_editDoneValue)

            // 수정 리스트 숨기기
            $this.closest(".js__list__row").find(".edit-box").removeClass("editShow");

        });

        // 수정 취소
        $document.on("click", ".js__btnCancel", function(e){
            e.stopPropagation();

            const $this = $(this);
            // 컨텐츠 박스 보이게
            $this.closest(".js__list__row").find(".cont-box").removeClass("contHide");
             // 수정 리스트 숨기기
             $this.closest(".js__list__row").find(".edit-box").removeClass("editShow");
        });

        // 리스트 삭제
        $document.on("click", ".js__btnRemove", function() {
            const $this = $(this); 
            const findList = $this.closest($(".js__list__row"));

            findList.remove(); // 리스트를 찾아서 삭제

            // 전체 개수
            $(".js__allCnt").text($(".js__list__row").length);

            // 리스트가 없으면
            if ( $(".js__list__row").length == 0 ) {
                $(".js__btnAllDelete").removeClass("show"); // 버튼 삭제
                $(".todo__situation__box").find(".cnt-value").text("0"); // 리셋
            }
           
        });

        // 전체 삭제
        $document.on("click", ".js__btnAllDelete", function() {

            $(".js__list__box").empty(); //remove()를 하면 list__box가 통으로 삭제

            $(".todo__situation__box").find(".cnt-value").text("0"); // 카운트 리셋

             if ( $(".js__list__row").length == 0 ) {
                $(".js__btnAllDelete").removeClass("show");
            }
        });

    }

    todoApp();
} 

export default minjuTodo;