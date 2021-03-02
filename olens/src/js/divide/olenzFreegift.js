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
    const init = () => {
        layerOpen();
        layerClose();
    }

    init();

}

export default olenzFreegift;