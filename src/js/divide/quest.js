const $document = $(document);

const quest = () => {
   
    // 짝수의 합
    const sumEven = () => {
        let sum = 0;
        for( let i = 1; i <= 10; i++ ){
            
            if( i % 2 == 0 ){
                sum = sum + i;
            }
        }
        document.write(sum + "<br>");
    }

    // 이중for문 ( 5*5 )
    const password = () => {
        let star = "*"
        let space = "<br>"
        for( let i = 1; i <= 5; i++ ){
            
            for( let s = 1; s <= 5; s++ ){
                document.write(star);
            }
            document.write(space);
        }
    }

    // 삼각형
    const triangle = () => {
        let zero = "0";
        let sum = "";
        for( let i = 1; i <= 30; i++ ){
            sum += zero;
            document.write(sum + "<br>");
        }
    }

    // 빈 삼각형 - 이중for문
    const nullTriangle = () => {
        let zero = "0"
        let sum = "";
        let nullvalue = "-";

        for( let i = 1; i <= 30; i++ ){
            for(let t = 1; t <= 1; t++ ){
                document.write(sum);
            }
            sum = sum + nullvalue;
            document.write( zero + "<br>")
        } 
    }

    // 5:5 대각선 5개만 0, 나머지는 빈 값
    const nullBox = () => {
        let zero = "*"
        let sum = "";
        let nullvalue = "-";

        for( let i = 1; i <= 5; i++ ){
            for(let t = 1; t <= 5; t++){

                if( i == t ){
                    document.write(zero);
                } else {
                    document.write(nullvalue);
                }
            } 
            document.write("<br>")
        } 
    }

    // 역삼각형으로 만들어보기
    const test = () => {
        let zero = "*"
        let sum = "";
        let nullvalue = " ";

        document.write("<pre>")
        for( let i = 1; i <= 5; i++ ){
            for(let t = 1; t <= 5; t++){

                if( i > t ){
                    document.write(nullvalue);
                } else {
                    document.write(zero);
                }
            } 
            document.write("<br>")
        } 

        document.write("</pre>")
    }

    // 다이아몬드
    const diamond = () => {
        
        // let $null = " ";
        // let $star = "*";
        // for ( let i = 1; i <= 5; i++ ) {
        //     for ( let t = 1; t <= 5; t++) {
        //         // i와 t가 3보다 작거나 같을 때, i + t의 값이 3보다 크다
        //         let $standard = 3;

        //         if ((i <= $standard && t <= $standard)
        //             && (i + t) > $standard 
        //         ) { 
        //             document.write($star);
        //         } 
        //         else {
        //             document.write($null)
        //         }
                
        //     //    if( t == 3 || i == 3 && t % 2 == 0 ){
        //     //        console.log( i*t == Math.pow(2) );                                  
        //     //        document.write($star);
        //     //    } else {
        //     //        document.write($null)
        //     //    }
        //     }
        //     document.write("<br>")
        // }

        //   *
        //  ***
        // *****
        //  ***
        //   *
        // 별:     1 3 5 3 5
        // 빈공간: 2 1 0 1 2
        // "5를 기준으로 절댓값"
        // 별      4 2 0 -2 -4
        // 빈공간: (4 2 0 -2 -4 ) / 2
        let n = 4;
        while ( n >= -4 ){
            console.log( " " .repeat(Math.abs(n) / 2) +  "*" .repeat(5 - Math.abs(n)));
            n -= 2;
        }

        let j = 4;
        while ( n >= -4 ){
            // document.write(" ")
            n -= 2;
        }


    }

    const init = () => {
        diamond();
        sumEven();
        password();
        triangle();
        nullTriangle();
        nullBox();
        test();
    }

    init();
}

export default quest;