import AttendanceController from './controller/AttendanceController.js';
import InputView from './views/InputView.js';
import OutputView from './views/OutputView.js';

class App {
  #attendanceController;

  async run() {
    this.#attendanceController = new AttendanceController();

    await this.handleMenu();
  }

  async handleMenu() {
    try {
      const Menu = await InputView.readMenu();
    } catch (error) {
      OutputView.print(error.message);
    }
  }
}

export default App;
