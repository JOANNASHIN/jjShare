const olenzFreegift = () => {

    const $document = $(document) 

    const layerOpen = () => {
        $document.on("click", ".js__gift__open", () => {
            $(".js__gift__layer").addClass("active");
        })
    }

    const layerClose = () => {
        $document.on("click", ".js__gift__close", function() {
            const $target = $(this).closest(".js__gift__layer")
            $target.removeClass("active");
        })
    }

    const orderlistToggle = () => {
        $document.on("click", ".js__orderlist__btn", function() {
            const $orderlist = $(".js__orderlist")
            const $btn = $(".js__orderlist__btn");

            $orderlist.toggleClass("hide"); 

            if( $orderlist.hasClass("hide") ){
                $btn.text("View all");
            } else {
                $btn.text("close");
            }
        })
    }

    const init = () => {
        layerOpen();
        layerClose();
        orderlistToggle();
    }

    init();

}

export default olenzFreegift;