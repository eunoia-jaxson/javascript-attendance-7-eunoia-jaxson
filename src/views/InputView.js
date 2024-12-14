import { Console, DateTimes } from '@woowacourse/mission-utils';

const TODAY = DateTimes.now();

const DAY = ['일', '월', '화', '수', '목', '금', '토'];

const INPUT_MESSAGES = Object.freeze({
  today: `오늘은 ${TODAY.getMonth() + 1}월 ${TODAY.getDate()}일 ${DAY[TODAY.getDay()]}요일입니다. 기능을 선택해 주세요.`,
  menu1: '1. 출석 확인',
  menu2: '2. 출석 수정',
  menu3: '3. 크루별 출석 기록 확인',
  menu4: '4. 제적 위험자 확인',
  menuQ: 'Q. 종료\n',
});

const ERROR_MESSAGE = '[ERROR] 잘못된 형식을 입력하였습니다.';

// const SPERATE_STRING = ',';

const InputView = Object.freeze({
  async readMenu() {
    Console.print(INPUT_MESSAGES.today);
    Console.print(INPUT_MESSAGES.menu1);
    Console.print(INPUT_MESSAGES.menu2);
    Console.print(INPUT_MESSAGES.menu3);
    Console.print(INPUT_MESSAGES.menu4);
    const INPUT = await Console.readLineAsync(INPUT_MESSAGES.menuQ);
    this.validInput(INPUT);

    return INPUT;
  },

  validInput(input) {
    if (!input) {
      throw new Error(ERROR_MESSAGE);
    }
  },
});

export default InputView;
