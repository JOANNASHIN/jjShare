const todoJSON = () => {
    const $document = $(document);

    const requestTodoList = () => {
        $.getJSON("./json/todolist.json", (data) => {
            const todo = data.todo;
            if (!todo || !todo.length) return false;

            todo.forEach(list => drawAdd(list));
        })
    }
    
    //날짜계산
    const getDate = () => {
        const dayList = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
        return moment(new Date()).format("YYYY.MM.DD") + " " + dayList[new Date().getDay()];
    }

    //날짜그리기
    const drawToday = () => {
        const date = getDate();
        $(".js__today").html(date);
    }

    //counting
    const updateCount = () => {
        const $empty = $(".fb__todo__empty");
        const $countBox = $(".js__todo__count");

        let _totalCount = $(".js__todo__list").find("dl").length; //전체
        let _ingCount = $(".js__todo__list").find("dl:not(.done)").length; //진행중
        let _doneCount = $(".js__todo__list").find("dl.done").length; //완료

        //상단 숫자 변경
        $countBox.html(`
            <li class="count__box">
                <span class="count__title">전체</span>
                <em class="count__value">${_totalCount}</em>
            </li>
            <li class="count__box">
                <span class="count__title">진행중</span>
                <em class="count__value">${_ingCount}</em>
            </li>
            <li class="count__box">
                <span class="count__title">진행완료</span>
                <em class="count__value">${_doneCount}</em>
            </li>
        `)

        //empty case
        if (_totalCount == 0) {
            $empty.addClass("show");
        } 
        else {
            $empty.removeClass("show");
        }
    }

    //해당 타겟 박스 return
    const returnTarget = ($this) => {
        const $todoBox = $this.closest(".js__todo__each"); //각각의 todo
        const $updateBox = $todoBox.find(".fb__todo__update"); //각각의 수정input

        return {
            $todoBox,
            $updateBox
        };
    }

    //todo이벤트1: 추가하기
    const addEvents = () => {
        $document
            .on("keyup", ".js__todo__add-area input", function (e) {
                if (e.keyCode === 13) tryToAdd($(this));
            })
            
            .on("click", ".js__todo__add", function () {
                tryToAdd($(this));
            })
    }

    const tryToAdd = ($this) => {
        const $area = $this.closest(".js__todo__add-area");
        const $input = $area.find("input");
        
        if ($input.val().trim() == "") {
            alert("한글자 이상 입력해주세요.");
            return ;
        }

        const todoData = {
            content: $input.val(),
            date: getDate()
        }

        $input.val(" ");
        drawAdd(todoData);

        return false;
    }
    
    //추가하기 실제 push
    const drawAdd = (todoData) => {
        const $list = $(".js__todo__list");

        $list.prepend(`
            <dl class="fb__todo__list js__todo__each">
                <dt class="fb__todo__inner">
                    <p class="fb__todo__text js__todo__title">${todoData.content}</p>
                    <span class="fb__todo__date js__todo__date">${todoData.date}</span>
                </dt>
                <dd class="fb__todo__controller">
                    <button class="fb__todo__controller--rewrite js__todo__rewrite">수정</button>
                    <button class="fb__todo__controller--delete js__todo__delete">삭제</button>
                </dd>
                <div class="fb__todo__update">
                    <input type="text" value="">
                    <button class="fb__button js__update__push">수정</button>
                    <button class="fb__button js__update__cancel">취소</button>
                </div>
            </dl>
        `)

        //count update
        updateCount();
    }


    //todo이벤트2: 삭제하기
    const deleteEvent = () => {
        $document.on("click", ".js__todo__delete", function () {
            const $this = $(this);
            const {$todoBox} = returnTarget($this);

            $todoBox.remove();

            //count update
            updateCount();
        })  
    }

    //todo이벤트3: 수정하기
    const updateEvents = () => {
        const bindEvents = () => {
            $document
                //수정input박스 보이기
                .on("click", ".js__todo__rewrite", function () {
                    const $this = $(this);
                    const {$todoBox, $updateBox} = returnTarget($this);
                    const _oriValue = $todoBox.find(".js__todo__title").html(); //원본값
    
                    $updateBox.addClass("show");
                    $updateBox.find("input").val(_oriValue);
                })
    
                //수정이벤트 (수정 버튼)
                .on("click", ".js__update__push", function () {
                    pushUpdate($(this));
                })
    
                //수정이벤트 (수정 enter 키)
                .on("keyup", ".fb__todo__update input", function (e) {
                    if (e.keyCode === 13) pushUpdate($(this));
                })
    
                //수정이벤트 (취소)
                .on("click", ".js__update__cancel", function () {
                    const $this = $(this);
                    const {$updateBox} = returnTarget($this);
    
                    $updateBox.removeClass("show");
                })
        }

        const pushUpdate = ($this) => {
            const {$todoBox, $updateBox} = returnTarget($this);
            
            let _updateContent = $updateBox.find("input").val();

            if (_updateContent == "") {
                alert("한글자 이상 입력해주세요.");
                return ;
            }

            $todoBox.find(".js__todo__title").html(_updateContent);
            $todoBox.find(".js__todo__date").html(getDate());
            $updateBox.removeClass("show");
        }

        bindEvents();
    }

    //todo이벤트4: 상태변경하기
    const ChangeStatus = () => {
        $document.on("click", ".js__todo__title", function () {
            const $this = $(this);
            const {$todoBox} = returnTarget($this);

            $todoBox.toggleClass("done");

            if ($todoBox.hasClass("done")) {
                $todoBox.find("button").prop("disabled", true);
            }
            else {
                $todoBox.find("button").prop("disabled", false);
            }
    
            //count update
            updateCount();
        })
    }

    const init = () => {
        //ajax 연동
        requestTodoList();

        //날짜init
        drawToday();
        
        //events
        addEvents();
        deleteEvent();
        updateEvents();

        //상태변경
        ChangeStatus();
    }   
    
    init();

}

export default todoJSON;