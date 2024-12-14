import AttendanceController from './controller/AttendanceController.js';
import InputView from './views/InputView.js';
import OutputView from './views/OutputView.js';

class App {
  #attendanceController;

  async run() {
    this.#attendanceController = new AttendanceController();
    let menu = null;

    while (menu !== 'Q') {
      menu = await this.handleMenu();
      if (await this.start(menu)) {
        menu = 'Q';
      }
    }
  }

  async start(menu) {
    if (menu === '1') {
      if (await this.enterAttendance()) {
        return true;
      }
    }
    return false;
  }

  async handleMenu() {
    try {
      const menu = await InputView.readMenu();
      return menu;
    } catch (error) {
      OutputView.print(error.message);
      return null;
    }
  }

  async enterAttendance() {
    try {
      this.#attendanceController.validDate();
      const nickname = await InputView.readNickname();
      this.#attendanceController.validNickname(nickname);
      const time = await InputView.readTime();
      this.#attendanceController.validTime(time);
      OutputView.print(await this.#attendanceController.storeAttendance(nickname, time));
      return false;
    } catch (error) {
      OutputView.print(error.message);
      return true;
    }
  }
}

export default App;
