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
        const addList = "";

        $document.on("click", ".js__btnAdd", function() {
            // 입력된 인풋 밸류값
            const _inputValue = $("#js__insert").val();
            // html에서 인풋 불러오기
            const insertInput = document.getElementById("js__insert");

            // 리스트 생성
            const addList = `
                <li class="todo__list__row">
                    <div class="cont-box">
                        <span class="cont">${_inputValue}</span>
                        <span class="date">${_today}</span>
                    </div>
                    <div class="btn-box">
                        <button type="button" class="btnEdit">수정</button>
                        <button type="button" class="btnRemove">삭제</button>
                    </div>
                </li>
            `
            $(".js__list__box").prepend(addList);

            insertInput.value = null;

            // 리스트 전체 개수
            $(".js__allCnt").text($(".todo__list__row").length);
            
            // 리스트 진행 개수
            $(".js__ing").text($(".todo__list__row").length);
           
        });

        // 리스트 딤처리
        $document.on("click", ".todo__list__row", function() {
            const $this = $(this);
            // const _idx = $this.index();

            if ( !($this.hasClass("dim")) ) {
                $this.addClass("dim");
            }
            else {
                $this.removeClass("dim");
            }
        });

        // 리스트 삭제
        $document.on("click", ".btnRemove", function() {
            const $this = $(this); 
            const findList = $this.closest($(".todo__list__row"));

            findList.remove();

            // 리스트 전체 개수
            $(".js__allCnt").text($(".todo__list__row").length);
            
            // 리스트 진행 개수
            $(".js__ing").text($(".todo__list__row").length);
        });
    }

    todoApp();
} 

export default minjuTodo;