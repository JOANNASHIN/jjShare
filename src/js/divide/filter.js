const filter = () => {
    const $document = $(document);

    /*
        @todo : 지원
        
        1. 클릭했을 때 체크가 되면 list 프린트 되고, 
                       체크가 아니면 list 삭제
        1-1. 라디오만 따로 처리
        1-2. 프린트/삭제 함수 따로 처리

        3. 정규식, toLocaleString() 사용하여 입력한 값 한국 지폐단위로 변경
    */

    // radio 체인지 이벤트
    const radioChange = () => {
        $document.on("change", "input[type=radio]", function() {
            const $this = $(this);
            const $thisParents = $this.closest(".js__filter__list");
            const $printBox = $(".js__print__price");
            const $inputCont = $(".js__inputSelf__cont");
            const _thisValue = $thisParents.find("span").text();

            $printBox.find(".js__print__list").remove();    
            
            if (_thisValue == "전체") {
                if ($inputCont.hasClass("show")) {
                    $inputCont.removeClass("show");
                }
            } 
            else if (_thisValue == "직접입력") {
                $inputCont.addClass("show");
                // @todo 지원 : 적용버튼 누르면 그 값 입력하기 
            }
            else {
                valuePrint(_thisValue, $printBox);
                $inputCont.removeClass("show");
            }
        });
    }

    // checkbox 체인지 이벤트
    const checkboxChange = () => {
        $document.on("change", "input[type=checkbox]", function() {
            const $this = $(this);
            const $thisParents = $this.closest(".js__filter__list");
            const $printBox = $(".js__print");
            const _thisValue = $thisParents.find("span").text();

            if ($this.prop("checked")) {
                valuePrint(_thisValue, $printBox);
            }
            else {
                valueDelete(_thisValue);
            }
        });
    }

    // 체크된 리스트 그리기
    const valuePrint = (_thisValue, $printBox) => {
        const _addValue = `
                        <li class="print__list js__print__list" data-value="${_thisValue}">
                            <span class="print__value js__value__list">${_thisValue}</span>
                            <button type="button" class="print__delete js__print__delete">삭제</button>
                        </li>
                        `
        $printBox.append(_addValue);
    }
    
    // 체크 풀린 리스트 삭제하기
    const valueDelete = (_thisValue) => {
        const $delTarget = $(`.js__print__list[data-value="${_thisValue}"]`);
        const _delTargetVal = $delTarget.find("span").text();

        if (_delTargetVal == _thisValue) {
            $delTarget.remove();
        }
    }

    // 삭제버튼 누르면
    $document.on("click", ".js__print__delete", function() {
        const $targetList = $(this).closest(".js__print__list");
        const $targetText = $targetList.find("span").text();
        const $targetInput = $(`.js__filter__list[data-list="${$targetText}"]`).find("input");

        $targetList.remove();

        if ($targetInput.closest(".js__filter__wrapper").attr("data-title") == "price") {
            $(".js__filter__list[data-list=전체]").find("input").prop("checked", true);
            return ;
        }
        
        $targetInput.prop("checked", false);

        // @todo 지원 : 뭐는 span으로 찾고 뭐는 data 타겟으로 찾음 통일해서 찾자!
        // @todo 지원 : input type 으로 구분 짓는게 아니라 data-title로 구분짓자
    });
    
    const init = () => {
        radioChange();
        checkboxChange();
    }

    init();
}

export default filter;