// --------------------------- input radio checkbox 안나눈거 ---------------------------

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
            const $nowChange = $("input:checked"); //체크되는 값

            /*
                1. 이전에 체크된 값 -> 삭제
                2. !지금! 체크된 값 찾기 -> 그리기
            */
            return $beforeChange;
        });
    }

    // // checkbox 체인지 이벤트
    // const checkboxChange = () => {
    //     $document.on("change", "input[type=checkbox]", function() {
    //         const $this = $(this);
    //         const $thisParents = $this.closest(".js__filter__list");
    //         const _thisValue = $thisParents.find("span").text();

    //         if ($this.prop("checked")) {
    //             valuePrint($this, _thisValue);
    //         }
    //         else {
    //             valueDelete($this, _thisValue);
    //         }
    //     });
    // }

    // input 체인지 이벤트
    const checkboxChange = () => {
        $document.on("change", "input", function() {
            const $this = $(this);
            const $thisParents = $this.closest(".js__filter__list");
            const _thisValue = $thisParents.find("span").text();
            
            if ($this.attr("type") == "radio") {
                const $nowChange = $("input:checked");
                radioChange($nowChange);
            } 
            else if ($this.attr("type") == "checkbox") {
                console.log("체크박스만")
                if ($this.prop("checked")) {
                    valuePrint($this, _thisValue);
                }
                else {
                    valueDelete($this, _thisValue);
                }    
            } else {
                return ;
            }
        });
    }

    // 체크된 리스트 그리기
    const valuePrint = ($this, _thisValue) => {
        const $filterPrint = $(".js__print");
        const _addValue = `
                        <li class="print__list js__print__list" data-value="${_thisValue}">
                            <span class="print__value js__value__list">${_thisValue}</span>
                            <button type="button" class="print__delete js__print__delete">삭제</button>
                        </li>
                        `
        $filterPrint.append(_addValue);
    }
    
    // 체크 풀린 리스트 삭제하기
    const valueDelete = ($this, _thisValue) => {
        const $delTarget = $(".js__print__list[data-value="+ _thisValue +"]")
        const _delTargetVal = $delTarget.find("span").text();

        if (_delTargetVal == _thisValue) {
            $delTarget.remove();
        }
    }

    // 삭제버튼 누르면
    $document.on("click", ".js__print__delete", function() {
        const $targetList = $(this).closest(".js__print__list");
        $targetList.remove();
    });
    
    const init = () => {
        radioChange();
        checkboxChange();
    }

    init();
}

export default filter;