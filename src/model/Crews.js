import fs from 'fs';
import Attendance from './Attendance.js';

class Crews {
  #attendance = [];

  constructor() {
    const readedLines = fs
      .readFileSync('public/attendances.csv')
      .toString()
      .split('\n')
      .slice(1, -1);
    const attendances = this.#preprocess(readedLines);
    attendances.forEach((attendance) => {
      this.#attendance.push(new Attendance(attendance));
    });
  }

  #preprocess(readedLines) {
    const attendances = [];
    const rawAttendances = readedLines.map((attendance) => attendance.split(','));
    rawAttendances.forEach((rawAttendance) => {
      const temp = attendances.find((attendance) => attendance.nickname === rawAttendance[0]);
      if (temp === undefined) {
        attendances.push({ nickname: rawAttendance[0], datetimes: [rawAttendance[1]] });
        return;
      }
      temp.datetimes.push(rawAttendance[1]);
    });
    return attendances;
  }

  getNicknames() {
    return this.#attendance.map((attendance) => attendance.getNickname());
  }

  storeAttendance(nickname, time) {
    const temp = this.#attendance.find((attendance) => attendance.getNickname() === nickname);
    return temp.storeAttendance(time);
  }
}

export default Crews;
