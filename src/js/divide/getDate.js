import moment from "moment";

const inputTest = () => {
    // 21.00.00 요일 10일전
    // input으로 날짜 입력하면 입력한 값의 10일 전 날짜를 구하자.
    // @todo 지원 : 요일은 해결했으니 날짜 해결 필요 (60일, -50일 등)

    const _getNow = new Date();
    
    // 오늘 기준, 알고싶은 날짜
    const _targetDayNum = 10;

    // 년/월/일/요일 구하는 공식
    const _getYear = _getNow.getFullYear();
    const _getMonth = _getNow.getMonth() + 1;
    const _getDate = _getNow.getDate() + _targetDayNum;
    const _getDay = _getNow.getDay() - 1;
    const _targetDay = (_getDay  + _targetDayNum) % 7;
    let dayArray = "";
    
    if( _targetDayNum > 0 ) {
        // 양수일 때 케이스
        console.log("양수")
        dayArray = ["월", "화", "수", "목", "금", "토", "일"];
    } 
    else {
        // 음수일 때 케이스
        console.log("음수")
        dayArray = ["월", "일", "토", "금", "목", "수", "화"];
    }
    console.log(_getYear + "." + _getMonth + "." + _getDate + "." + dayArray[Math.abs(_targetDay)] + "요일");
}

export default inputTest;