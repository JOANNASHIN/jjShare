const joinUs = () => {
    const $document = $(document);

    // 버튼 눌렀을 때,
    const buttonClick = () => {
        $document.on("click", ".js__join__button", function () {
            const isPass = joinValidation(); 

            if (isPass) {
                // 함수의 결과값 true이면 회원가입 진행
            }
        })
    }

    const joinValidation = () => {
        let isPass = true;

        const valueCheck = [
            {
                value: $(".firstName__input"),
                regExp: "",
                message:$(".firstName__alert"),
            },
            {
                value: $(".lastName__input"),
                regExp: "",
                message:$(".lastName__alert"),
            },
            {
                value: $(".eMail__input"),
                regExp: /[\da-zA-Z]+-?_?@[\da-zA-Z]+-?_?\.[\da-zA-Z]{2,3}/g,
                message:$(".eMail__alert"),
            },
            {
                value: $(".password__input"),
                regExp: /[\da-zA-z]{8,12}[\*\?\!\,\.\~]+/g,
                message:$(".password__alert"),
            },
            {
                value: $(".pwConfirm__input"),
                regExp: "",
                message:$(".pwConfirm__alert"),
            },
            {
                value: $(".country__selectBox").prop("selected", "true"),
                regExp: "",
                message:$(".country__alert"),
            },
            {
                value: $(".birth__month").prop("selected", "true"),
                regExp: "",
                message:$(".birth__alert"),
            },
            {
                value: $(".birth__day").prop("selected", "true"),
                regExp: "",
                message:$(".birth__alert"),
            },
            {
                value: $(".birth__year").prop("selected", "true"),
                regExp: "",
                message:$(".birth__alert"),
            },
        ]

        valueCheck.forEach( ele => {

            // ele.value.val().trim(); //입력한 값의 공백 제거

            // if ( ele.value ) { //공백이면,
            //     resultValidation(false)
            //     return;
            // } else if (ele.regExp && ele.regExp.test(ele.value)) { //공백아니고, regExp가 있으면서, 통과하면
            //     resultValidation(true);
            // } else if (!ele.regExp && ) { //공백 아니고, regExp가 없으면서 !!!여기!!!!!!!!!!!!!!

            // }
            // else { // 그냥 공백아니면
            //     console.log("공백아니면")
            // }
            
            // console.log("return의 유효성") 
            
            
            // if ( !ele.value ) { 
            //     resultValidation(ele.message, false, "확인하세요")
            //     isPass = false;
            // }
            // else if (ele.regExp && ele.regExp.test(ele.value)) { 
            //     resultValidation(ele.message, false, "확인하세요")
            //     isPass = false;
            // }
            // // else if (  ) {

            // // }
            // else { //공백이 아니면
            //     resultValidation(ele.message, true);
            // }
            
        });

        function resultValidation($message, isPass) {
            if (isPass) { //통과
                $message.removeClass("show");
            }
            else { //불통과
                $message.addClass("show");
            }
        }

        return isPass;
    }
    
    const init = () => {
        buttonClick();
    }

    init();
}

export default joinUs;


// // 성별
        // if ($(".gender__female").is(":checked")) {
        //     // true면 여자
        // } 
        // else {
        //     // false면 남자
        // }

        // const userData = [
        //     {
        //         name: "firstName",
        //         value: "firstName__input",//$(".firstName__input").val().trim(),
        //         message: $(".firstName__alert"),
        //         // message: "아이디를 확인하여주세요.",
        //         regExp: "", 
        //     },
        //     {
        //         name: "lastName", 
        //         value: $(".lastName__input").val().trim(),
        //         message: $(".lastName__alert"),
        //         regExp: "",
        //     },
        //     {
        //         name: "eMail", 
        //         value: $(".eMail__input").val().trim(),
        //         message: $(".eMail__alert"),
        //         regExp: /[\da-zA-Z]+-?_?@[\da-zA-Z]+-?_?\.[\da-zA-Z]{2,3}/g,
        //     },
        //     {
        //         name: "password", 
        //         value: $(".password__input").val().trim(),
        //         message: $(".password__alert"),
        //         regExp: /[\da-zA-z]{8,12}[\*\?\!\,\.\~]+/g,
        //     },
        //     {
        //         name: "pwConfirm", 
        //         value: $(".pwConfirm__input").val().trim(),
        //         message: $(".pwConfirm__alert"),
        //         regExp: "",
        //     },
        //     {
        //         name: "country", 
        //         value: $(".country__selectBox").prop("selected", "true").val().trim(),
        //         message: $(".country__alert"),
        //         regExp: "",
        //     },
        //     {
        //         name: "birthMonth", 
        //         value: $(".birth__month").prop("selected", "true").val().trim(),
        //         message: $(".birth__alert"),
        //         regExp: "",
        //     },
        //     {
        //         name: "birthDay", 
        //         value: $(".birth__day").prop("selected", "true").val().trim(),
        //         message: $(".birth__alert"),
        //         regExp: "",
        //     },
        //     {
        //         name: "birthYear", 
        //         value: $(".birth__year").prop("selected", "true").val().trim(),
        //         message: $(".birth__alert"),
        //         regExp: "",
        //     },
        // ]

        // // 유효성 체크
        // $.each(userData, function (index, ele) {
        //     // 공백 체크
        //     if (ele.value != "") {
        //         // 정규식 표현 체크
        //         if (ele.regExp != "") { // 정규식 있으면

        //             if (ele.regExp.test(ele.value)) { //정규식 맞으면
        //                 ele.message.text("").removeClass("show");
        //                 return;
        //             } 
        //             else { //정규식 틀리면
        //                 ele.message.text("입력하신 내용을 한번 더 확인하여 주십시오.").addClass("show");
        //                 return;
        //             }
        //         } 
        //         else { // 정규식 없으면
        //             if (ele.name == "pwConfirm") { // 패스워드컨펌이면
        //                 if ($(".password__input").val().trim() != $(".pwConfirm__input").val().trim()) {
        //                     ele.message.text("비밀번호가 일치하지 않습니다.").addClass("show");
        //                     return;
        //                 } else {
        //                     ele.message.text("").removeClass("show");
        //                     return;
        //                 }
        //             } 
        //             else {
        //                 ele.message.text("").removeClass("show");
        //                 return;
        //             }
        //         }
        //     } 
        //     else { //공백 있으면
        //         ele.message.text("다음의 항목을 입력하여주십시오.").addClass("show");
        //         return;
        //     }

        // });