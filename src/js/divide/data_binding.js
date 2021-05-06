// 21.04.19 오렌즈 포토 전체리뷰 팝업
// review_pop.htm

// 내가 한 데이터바인딩

$(document).ready(function () {

    //다음 페이지의 리뷰 불러오기
    $(".js__photo__more").click(function () {
        const $this = $(this);
        const $photoList = $(".js__photo__scroll"); //append할 부모타겟 
        const pageCount = 12;
        const pid = $("#pid").val(); //상품번호
        var page = parseInt($("#nowPage").val()) + 1;

        $.ajax({
            type: "get",
            datatype: "json",
            url: "/popup/review_pop.php", //주소
            data: "act=imgAjax&page=" + page + "&pid=" + pid + "&max=" + pageCount, //새로운 데이터값 : string 형식

            
            error: function (ex) {
                console.error(ex);
            },
            
            success: function (data) {
                var response = JSON.parse(data) //받아오는 데이터 값 정리
                var photoData = response.data[0]; //필요한 데이터 위치
                

                // 추가될 데이터 템플릿
                const addResponse = '<li class="allReview__item js__detailReview__open" data-pid="{'+ pid +'}" data-bbsix="' + photoData.bbs_ix + '">' +
                                        '<figure class="allReview__image">' +
                                            '<img src="' + photoData.imgUrl + '">' +
                                        '</figure>' + 
                                    '</li>';
                                        
                // 템플릿 붙여넣기
                $photoList.append(addResponse);

                //현재 부른 페이지값 변경 (한바퀴 돌면 +1)
                $("#nowPage").val(response.page);

            
                //더이상 불러올 페이지가 없을때 버튼 숨기기
                if (response.dataCnt < pageCount) {
                    $this.addClass("hide");
                }
            }
        })

    })
});




// 정답: 매니저님이 하신 데이터 바인딩

$(document).ready(function () {

    //다음 페이지의 리뷰 불러오기
    $(".js__photo__more").click(function () {
        const $this = $(this);
        const $photoList = $(".js__photo__scroll");
        const pageCount = 12;
        const pid = $("#pid").val(); //상품번호
        var page = parseInt($("#nowPage").val()) + 1;

        $.ajax({
            type: "get",
            datatype: "json",
            url: "/popup/review_pop.php", // 주소
            data: "act=imgAjax&page=" + page + "&pid=" + pid + "&max=" + pageCount,

            error: function (ex) {
                console.error(ex);
            },

            success: function (data) {
                if (!data) return ;
                var response = JSON.parse(data);

                //photoReview template
                const template = {
                    _compile: function (_photo) {
                        return '<li class="allReview__item js__detailReview__open" data-pid="'+ _photo.bbs_etc1 +'" data-bbsix="' + _photo.bbs_ix + '">' +
                            '<figure class="allReview__image">' +
                                '<img src="'+ _photo.imgUrl +'">' +
                            '</figure>' +
                        '</li>';
                    }
                };

                //포토리뷰 append
                const photoReviewData = response.data;

                if (photoReviewData && photoReviewData.length) {

                    photoReviewData.forEach(function (photoData) {
                        $photoList.append(template._compile(photoData));
                        $photoList.scrollTop($photoList.prop("scrollHeight"));
                    });
                }

                //현재 부른 페이지값 변경
                $("#nowPage").val(response.page);

                //더이상 불러올 페이지가 없을때
                if (response.dataCnt < pageCount) {
                    $this.addClass("hide");
                }
            }
        })
    })
});
