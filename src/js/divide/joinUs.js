const joinUs = () => {
    const $document = $(document);

    // 버튼 눌렀을 때,
    const buttonClick = () => {
        $document.on("click", ".js__join__button", function () {
            const isPass = joinValidation()

            console.log(isPass, "알럿 띄우는 곳")
            if (isPass) {
                alert("회원가입이 완료되었습니다!");
            } 
        })
    }

    const joinValidation = () => {
        let isPass = true;

        const valueCheck = [
            {
                name: "firstName", 
                valueTarget: "firstName__input",
                regExp: "",
                messageTarget: "firstName__alert",
            },
            {   name: "lastName",
                valueTarget: "lastName__input",
                regExp: "",
                messageTarget: "lastName__alert",
            },
            {
                name: "eMail",
                valueTarget: "eMail__input",
                regExp: /[\da-zA-Z]+-?_?@[\da-zA-Z]+-?_?\.[\da-zA-Z]{2,3}/g,
                messageTarget: "eMail__alert",
            },
            {
                name: "password",
                valueTarget: "password__input",
                regExp: /[\da-zA-z]{8,12}[\*\?\!\,\.\~]+/g,
                messageTarget: "password__alert",
            },
            {
                name: "pwConfirm", 
                valueTarget: "pwConfirm__input",
                regExp: "",
                messageTarget: "pwConfirm__alert",
            },
            {
                name: "country",
                valueTarget: "country__selectBox option:selected", 
                regExp: "",
                messageTarget: "country__alert",
            },
            {
                name: "birth__month",
                valueTarget: "birth__month option:selected",
                regExp: "",
                messageTarget: "birth__alert",
            },
            {
                name: "birth__day",
                valueTarget: "birth__day option:selected",
                regExp: "",
                messageTarget: "birth__alert",
            },
            {
                name: "birth__year",
                valueTarget: "birth__year option:selected", 
                regExp: "",
                messageTarget: "birth__alert",
            },
        ]


        valueCheck.forEach( ele => {

            const $password = $(".password__input").val().trim();
            const $pwConfirm = $(".pwConfirm__input").val().trim();
            let $value = $("." + ele.valueTarget).val().trim();
            let $regExp = ele.regExp;
            let $message = $("." + ele.messageTarget); 
            
           
            //공백이면
            if(!$value) { 
                resultValidation(false, $message) 
                return;
            }

            //공백 아닐 때,
            if ($value && $regExp) { //정규식테스트
                if ($regExp.test($value)){ 
                    resultValidation(true, $message);
                } 
                else {
                    resultValidation(false, $message);
                }
            } 
            else if ($value && ele.name == "pwConfirm") { //비번 확인
                const boolean =  isSameValue($password, $pwConfirm);
                resultValidation(boolean, $message)
            } 
            else { //공백만 아니면 
                resultValidation(true, $message);
            }
            
        });

        // 값 비교하는 함수
        function isSameValue ( value1, value2) {
            if (value1 == value2) {
                return true;
            } else {
                return false;
            }
        }

        // 조건식 결과에 따른 경고메시지
        function resultValidation(isPass, $message) {
            if (isPass) { //통과
                $message.removeClass("show");
            }
            else { //불통과
                $message.addClass("show");
            }

            console.log(isPass, "결과그리는곳")
            return isPass;
        }
        
        console.log("여기는 왜 계속 true얌", isPass)
        return isPass;
    }
    
    const init = () => {
        buttonClick();
    }

    init();
}

export default joinUs;


        // --------------------------------------------------------------------기존소스 
        //
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