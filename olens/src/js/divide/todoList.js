import { initial } from "lodash";

const todoList = () => {
    $document = $(document);
    console.log("되니?")

    const rewrite = () => {
        const $formUpdate = $(".fb__todo__update")
        $document
                .on("click", ".js__controller__rewrite", function () {
                    console.log("클릭 되니")
                    $formUpdate.addClass("show");
                })
                .on("click", ".js__controller__delete", function () {
                    $formUpdate.removeClass("show");
                })
                
    }


    const init = () => {
        rewrite();
    }   
    
    init();

}

export default todoList;