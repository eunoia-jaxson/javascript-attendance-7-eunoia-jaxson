import Crews from '../model/Crews.js';
import InputView from '../views/InputView.js';
import OutputView from '../views/OutputView.js';

class AttendanceController {
  #crews;

  constructor() {
    this.#crews = new Crews();
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
}

export default AttendanceController;
