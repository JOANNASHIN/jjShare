const filter = () => {
    const $document = $(document);

    /*
        @todo : 지원
        가격 인풋 type="radio"
        + 정규식, toLocaleString() 사용하여 입력한 값 한국 지폐단위로 변경

        카테고리 type="checkbox"

    */

    const filterChange = () => {
        $(document).on("change", "input", function() {
            const $this = $(this);
            const $targetCont = $(".js__inputSelf__cont");
            const $thisParents = $this.closest(".js__filter__list");
            const _thisValue = $thisParents.find("span").text();

            if ($this.attr("type") == "text") return ;

            if ($this.hasClass("js__inputSelf__open")) {
                $targetCont.addClass("show");
                return ;
            } else {
                $targetCont.removeClass("show");
            }

            valuePrint($this, _thisValue);
        });
        
    }
    
    const valuePrint = ($this, _thisValue) => {
        const $filterPrint = $(".js__filter__print");
        const _addValue = `
                        <li class="print__list js__filter__list">
                            ${_thisValue}
                            <button type="button" class="print__delete js__print__delete">삭제</button>
                        </li>
            `

        // @todo 지원 : 이 부분 다시해야함 체크되면 그려지고, 체크박스 풀리면 사라져야함
        if( $this.attr("type") == "radio" ){
            $filterPrint.append(_addValue);
        } else {
            $filterPrint.append(_addValue);
        }
    }

    $document.on("click", ".js__print__delete", function() {
        const $this = $(this);
        const $thisParents = $this.closest(".js__filter__list");

        $thisParents.remove();
    })
   
    
    const init = () => {
        filterChange();
    }

    init();
}

export default filter;