const filter = () => {
    const $document = $(document);

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
                // 정규식, toLocaleString() 사용하여 입력한 값 한국 지폐단위로 변경
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

    // 삭제버튼 누르기
    $document.on("click", ".js__print__delete", function() {
        const $targetList = $(this).closest(".js__print__list");
        const $targetText = $targetList.find("span").text();
        const $targetInput = $(`.js__filter__list[data-list="${$targetText}"]`).find("input");

        $targetList.remove();

        // 가격 선택사항 없으면 무조건 "전체" 선택
        if ($targetInput.closest(".js__filter__wrapper").attr("data-title") == "price") {
            $(".js__filter__list[data-list=전체]").find("input").prop("checked", true);
            return ;
        }
        
        $targetInput.prop("checked", false);
    });

    // 체크된 인풋의 갯수 체크 
    const checkLength = () => {
        const $target = $("input").prop("chekced");
        console.log($target);
    }
    
    const init = () => {
        radioChange();
        checkboxChange();
        // checkLength();
    }

    init();
}

export default filter;