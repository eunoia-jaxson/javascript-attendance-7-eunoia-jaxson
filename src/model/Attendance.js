class Attendance {
  #nickname;
  #datetimes;
  #attendance = 0;
  #late = 0;
  #absent = 0;

  constructor(attendance) {
    this.#nickname = attendance.nickname;
    this.#datetimes = attendance.datetimes;
    this.setCount();
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
