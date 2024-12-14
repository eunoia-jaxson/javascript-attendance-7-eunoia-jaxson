import AttendanceController from './controller/AttendanceController.js';

class App {
  #attendanceController;

  async run() {
    this.#attendanceController = new AttendanceController();
    let menu = null;

    while (menu !== 'Q') {
      menu = await this.handleMenu();
      if (menu === '1') {
        this.#attendanceController.enterAttendance();
      }
    }
  }
}

export default App;
