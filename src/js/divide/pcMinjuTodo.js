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
                    </div>
                    <div class="btn-box">
                        <button type="button" class="btnEdit js__btnEdit">수정</button>
                        <button type="button" class="btnRemove js__btnRemove">삭제</button>
                    </div>
                </li>
            `
            $(".js__list__box").prepend(addList); // 리스트 맨앞에 추가

            insertInput.value = null;

            // 리스트 전체 개수
            $(".js__allCnt").text($(".js__list__row").length);
            
            // 리스트 진행 개수
            $(".js__ing").text( ($(".js__list__row").length) - ($(".js__list__row.dim").length));
            
            if ( $(".js__list__row").length >= 1 ) {
                $(".js__btnAllDelete").addClass("show");
            }

        });

        // 리스트 딤처리
        $document.on("click", ".js__list__row", function() {
            const $this = $(this);
            
            if ( !($this.hasClass("dim")) ) {
                $this.addClass("dim");
            }
            else {
                $this.removeClass("dim");
            }

            // 진행 완료 ( = if 조건 )
            $(".js__done").text($(".js__list__row.dim").length);
            
            // 진행 개수 ( = else )
            $(".js__ing").text( ($(".js__list__row").length) - ($(".js__list__row.dim").length));

        });

        // 리스트 수정
        $document.on("click", ".js__btnEdit", function() {
            // console.log("DDd")
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