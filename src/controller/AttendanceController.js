import { DateTimes } from '@woowacourse/mission-utils';
import Crews from '../model/Crews.js';

const TODAY = DateTimes.now();

const DAY = ['일', '월', '화', '수', '목', '금', '토'];

const ERROR_MESSAGES = Object.freeze({
  none: '\n[ERROR] 등록되지 않은 닉네임입니다.',
  weekend: `\n[ERROR] ${TODAY.getMonth() + 1}월 ${TODAY.getDate()}일 ${DAY[TODAY.getDay()]}요일은 등교하는 날이 아닙니다.`,
  format: '\n[ERROR] 잘못된 형식을 입력하였습니다.',
  boundary: '\n[ERROR] 캠퍼스 운영 시간에만 출석이 가능합니다.',
  future: '\n[ERROR] 아직 수정할 수 없습니다.',
});

class AttendanceController {
  #crews;

  constructor() {
    this.#crews = new Crews();
  }

  async storeAttendance(nickname, time) {
    return this.#crews.storeAttendance(nickname, time);
  }

  async modifyAttendance(nickname, date, time) {
    return this.#crews.modifyAttendance(nickname, date, time);
  }

  async checkAttendance(nickname) {
    return this.#crews.checkAttendance(nickname);
  }

  async warningAttendance() {
    return this.#crews.warningAttendance();
  }

  validNickname(nickname) {
    if (!this.#crews.getNicknames().includes(nickname)) {
      throw new Error(ERROR_MESSAGES.none);
    }
  }

  validTime(time) {
    const regex = /\d\d:\d\d/i;
    if (!regex.test(time)) {
      throw new Error(ERROR_MESSAGES.format);
    }

    this.validBoundary(time);
  }

  validBoundary(time) {
    const dateTime = new Date(TODAY.setHours(Number(time.slice(0, 2))));
    dateTime.setMinutes(Number(time.slice(3)));
    const boundary = new Date(TODAY.setHours(8));
    boundary.setMinutes(0);
    if (dateTime.getTime() - boundary.getTime() < 0) {
      throw new Error(ERROR_MESSAGES.boundary);
    }

    boundary.setHours(23);
    if (dateTime.getTime() - boundary.getTime() > 0) {
      throw new Error(ERROR_MESSAGES.boundary);
    }
  }

  validDate() {
    if (TODAY.getDay() === 0 || TODAY.getDay() === 6 || TODAY.getDate() === 25) {
      throw new Error(ERROR_MESSAGES.weekend);
    }
  }

  validModifyDate(date) {
    if (TODAY.getDate() < date) {
      throw new Error(ERROR_MESSAGES.future);
    }
    if (
      date === 1 ||
      date === 8 ||
      date === 15 ||
      date === 22 ||
      date === 29 ||
      date === 7 ||
      date === 14 ||
      date === 21 ||
      date === 28 ||
      date === 25
    ) {
      throw new Error(ERROR_MESSAGES.weekend);
    }
  }
}

export default AttendanceController;
