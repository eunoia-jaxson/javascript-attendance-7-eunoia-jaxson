import { DateTimes } from '@woowacourse/mission-utils';

const TODAY = DateTimes.now();

const DAY = ['일', '월', '화', '수', '목', '금', '토'];

class Attendance {
  #nickname;
  #datetimes;
  #attendance = 0;
  #late = 0;
  #absent = 0;
  #storeMessage;

  constructor(attendance) {
    this.#nickname = attendance.nickname;
    this.#datetimes = attendance.datetimes;
    this.setCount();
  }

  getNickname() {
    return this.#nickname;
  }

  storeAttendance(time) {
    const datetime = `${TODAY.getFullYear()}-${TODAY.getMonth() + 1}-${TODAY.getDate()} ${time}`;
    const datetimes = this.#datetimes.map((date) => date.slice(0, 10));
    if (datetimes.includes(datetime.slice(0, 10))) {
      throw new Error(
        '\n[ERROR] 이미 출석을 확인하였습니다. 필요한 경우 수정 기능을 이용해 주세요.',
      );
    }
    this.#datetimes.push(datetime);
    const date = new Date(datetime);
    if (this.mondayStore(date, time)) {
      return this.#storeMessage;
    }
    this.otherDayStore(date, time);
    return this.#storeMessage;
  }

  toString() {
    return `${this.#nickname}: ${this.#datetimes}\n ${this.#attendance} ${this.#late} ${this.#absent}\n\n`;
  }

  setCount() {
    for (let i = 0; i < this.#datetimes.length; i++) {
      const date = new Date(this.#datetimes[i]);
      if (this.monday(date)) {
        continue;
      }
      if (this.otherDay(date)) {
        continue;
      }
    }
  }

  monday(date) {
    if (date.getDay() === 1) {
      const boundary = new Date(date.setHours(13));
      if (this.setLate(boundary, date)) {
        return true;
      }
      if (this.setAbsent(boundary, date)) {
        return true;
      }
      this.#attendance += 1;
      return true;
    }
    return false;
  }

  mondayStore(date, time) {
    if (date.getDay() === 1) {
      const boundary = new Date(date.setHours(13));
      if (this.setLate(boundary, date)) {
        this.#storeMessage = `\n${TODAY.getMonth() + 1}월 ${TODAY.getDate()}일 ${DAY[TODAY.getDay()]}요일 ${time} (지각)\n`;
        return true;
      }
      if (this.setAbsent(boundary, date)) {
        this.#storeMessage = `\n${TODAY.getMonth() + 1}월 ${TODAY.getDate()}일 ${DAY[TODAY.getDay()]}요일 ${time} (결석)\n`;
        return true;
      }
      this.#storeMessage = `\n${TODAY.getMonth() + 1}월 ${TODAY.getDate()}일 ${DAY[TODAY.getDay()]}요일 ${time} (출석)\n`;
      this.#attendance += 1;
      return true;
    }
    return false;
  }

  otherDay(date) {
    if (date.getDay() !== 1) {
      const boundary = new Date(date.setHours(10));
      if (this.setLate(boundary, date)) {
        return true;
      }
      if (this.setAbsent(boundary, date)) {
        return true;
      }
      this.#attendance += 1;
      return true;
    }
    return false;
  }

  otherDayStore(date, time) {
    if (date.getDay() !== 1) {
      const boundary = new Date(date.setHours(10));
      if (this.setLate(boundary, date)) {
        this.#storeMessage = `\n${TODAY.getMonth() + 1}월 ${TODAY.getDate()}일 ${DAY[TODAY.getDay()]}요일 ${time} (지각)\n`;
        return true;
      }
      if (this.setAbsent(boundary, date)) {
        this.#storeMessage = `\n${TODAY.getMonth() + 1}월 ${TODAY.getDate()}일 ${DAY[TODAY.getDay()]}요일 ${time} (결석)\n`;
        return true;
      }
      this.#storeMessage = `\n${TODAY.getMonth() + 1}월 ${TODAY.getDate()}일 ${DAY[TODAY.getDay()]}요일 ${time} (출석)\n`;
      this.#attendance += 1;
      return true;
    }
    return false;
  }

  setLate(boundary, date) {
    boundary.setMinutes(5);
    if (boundary.getTime() - date.getTime() < 0) {
      this.#late += 1;
      return true;
    }
    return false;
  }

  setAbsent(boundary, date) {
    boundary.setMinutes(30);
    if (boundary.getTime() - date.getTime() < 0) {
      this.#absent += 1;
      return true;
    }
    return false;
  }
}

export default Attendance;
