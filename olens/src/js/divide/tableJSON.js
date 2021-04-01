import _ from "lodash";

const tableJSON = () => {
    
    const getData = () => {
        $.getJSON("./json/table.json", (infoData) => {
            // console.log(infoData)
            const info = infoData.info;
            if (!info || !info.length) return false;

            info.forEach( function(list) { //ele, index
                drawTable(list);
            })
        })
    }

    const drawTable = (list) => {
        $(".table").append(
            `<tbody>
                <tr>
                    <td></td>
                    <td>${list.name}</td>
                    <td>${list.gender}</td>
                </tr>
            </tbody>`
        )
    }

    const testEach = () => {
        // **차이점**each()는 선택한 "요소"가 여러 개일 때 각각에 대하여 반복하여 함수를 실행시킵니다.
        // 특정 조건을 만족할 때 반복 작업에서 빠져나오려면, return false
        // 화살표함수 사용 가능
        
        let i = 1;
        $( "li" ).each( function (index, ele) { //index, ele
            // console.log("ele", ele) //각각의 li 찾음 but, 선택자는 아님
            // console.log("$(ele)", $(ele)) //**선택자로 li를 찾음  
            // console.log("이거이거", $(this) ) //화살표함수와 함수식의 차이: 함수식 $(this) 찾음 

            $(this).addClass( 's' + i );
                i = i + 1;
                if ( i == 3 ) {
                return false;
            }
            
        });

        $("li").each( (index, ele) => { 
            console.log("이거이거", $(this) ) //화살표함수와 함수식의 차이: 화살표함수 $(this) 못찾음 
            $(ele).addClass("canUseArrow");
            if (index == 2) return false;
        })
    }

    const testForEach = () => {
        // **차이점**forEach() 메서드는 주어진 함수를 "배열" 요소 각각에 대해 실행합니다.
        // 마찬가지로 return false 먹힘
        // 화살표함수 사용 가능

        const arr1 = ["허니버터칩", "스윙칩", "포카칩", "바나나킥", "콘치" ]

        arr1.forEach( (ele, index) => { //ele, index
            if( index == 2 ) {
                return false;
            }
            // console.log(ele + index)
        })
    }

    const testFilter = () => {
        //filter() 메서드는 주어진 함수의 테스트를 통과하는 "모든 요소"를 모아 "새로운 배열"로 반환합니다.

        const words = [ "spray", "limit", "present", "boots", "toothbrush" ]
        // const words = [ "a", "b", "c", "d", "e" ]  // 통과 요소가 없다면 빈 배열
        const result = words.filter( word => word.length > 6 );
        
        console.log("글자수 제한 filter", result);

        function isBigEnough(value) {
            return value >= 10;
        }

        let filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
        console.log("숫자 비교 filter", filtered)

    }
    const testFind = () => {
        // find() 메서드는 주어진 판별 함수를 만족하는 "첫 번째 요소의 값"을 반환합니다. 그런 요소가 없다면 undefined를 반환합니다.

        const array1 = [5, 12, 8, 130, 44];
        const found = array1.find(element => element > 10);

        console.log("크기비교 find", found)

        const inventory = [
            {name: "apples", quantity: 2},
            {name: "bananas", quantity: 0},
            {name: "cherries", quantity: 5},
            {name: "cherries", quantity: 8}
        ];

        function findCherries(fruit) {
            return fruit.name === "cherries";
        }

        console.log( inventory.find(findCherries) ) //첫번째로 일치한 객체반환
    }

    const testSome = () => {
        // some() 메서드는 "배열" 안의 "어떤 요소라도" 주어진 판별 함수를 통과하는지 테스트합니다. 반환값 boolean
        // 빈 배열에서 호출하면 무조건 false

        const array = [1, 2, 3, 4, 5];

        // () => { return --- 가 기본 값이다 }
        // 생략을 하고 싶다면, 괄호와 return 모두 생략한다.
        // 기본값: const even = (ele) => {return ele % 2 === 0;}
        const even = (ele) => ele % 2 === 0;
        const biggerThan5 = (ele) => {
            ele > 5;
        }

        const test = array.some(even);
        console.log("some 짝수", test); //true

        console.log("some 5이상", array.some(biggerThan5)) //false
    }


    const array = [1,2,3,4,5];
    const even = (num) => num % 2 === 0;

    console.log(array.some(even));

    const test = "어쩌구저쩌구 누가 말했습니다.\"\"";

    const testTest = () => {
        // test() 메서드는 주어진 "문자열"이 정규 표현식을 만족하는지 판별하고, 그 여부를 true 또는 false로 반환합니다. "boolean"

        /**   정규식 >> 이난주임님 최고최고  >> 최고+
         *    ? > 없거나 한개만 있거나
         *    * > 없거나 많거나
         *    + > 1개 이상
         * 
         * test exec >>> 검사 
         * test함수는 boolean / exec 함수는 내가찾는 단어를 return
         * 
         * /바보/.test("임지원바보") >> true
         * /바보/.exec("임지원바보") >> 바보
         * 
         * "임지원바보".match(/바보/) >> ["바보"]
         * "임지원바보".split(/바보/) >> ["임지원", ""]
         * "임지원바보".search(/바보/) >> 3 번째로 매치되는 것의 인덱스를 반환 찾지 못하면 -1 반환
         * "임지원바보".replace(/바보/, "천재") >> 임지원 천재
         * 
         * 
         * match > 배열
         * replace > 바꿔줌
         * split > 잘라냄 (자른 부분 삭제)
         * 
         * 
         * \d > 숫자
         * \w > 문자
         * \s >공백문자
         * [a-zA-Z\d] 대소문자
         * . 모든문자 특수문자 모든거 아무거나 
         * \. 진짜 쩜을 찾아라 \\ \/
         * " 영수가 말했습니다. '그랬어?' " == " 영수가 말했습니다. \"그랬어?\" "
         * 
         * 
         * ^   시작 
         * $   끝   
         * [^\]  제외 -- [^\d] 숫자 제외
         * 
        */
        const str = "table football"
        const regex = new RegExp("foo*") // foo가 있거나 없거나 여러번 있거나
        
        console.log(regex.test(str)); //true
        console.log('canal'.lastIndexOf('a')) //3 
        // lastIndex : 문자열 내에서 searchValue가 마지막으로 등장하는 인덱스. 등장하지 않으면 -1.
        
        const str2 = "jiwon, Hello world!"
        const result = /^hello/i.test(str2); //^~는 ~로 시작하는 문자

        console.log(result); //true
    }

    const init = () => {
        getData();
        testEach();
        testForEach();
        testFilter();
        testFind();
        testSome();
        testTest();
    }

    init();
}

export default tableJSON;