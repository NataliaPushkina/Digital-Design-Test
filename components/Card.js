export class Card {
  constructor(data, handleClick) {
    this._id = data.id;
    this._link = data.link;
    this._name = data.name;
    this._date = data.date;
    this._cardSelector = ".template-element";
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".element__photo");
    this._btn = this._element.querySelector(".element__button");
    this._handleClick = handleClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  _getDataInfo() {
    const weekDays = [
      "воскресенье",
      "понедельник",
      "вторник",
      "среда",
      "четверг",
      "пятница",
      "суббота",
    ];
    const monthes = [
      "Января",
      "Февраля",
      "Марта",
      "Апреля",
      "Мая",
      "Июня",
      "Июля",
      "Августа",
      "Сентября",
      "Октября",
      "Ноября",
      "Декабря",
    ];
    const ymd = this._date.split(".").reverse().join();
    const d = new Date(ymd);
    const month = d.getMonth();
    const year = d.getFullYear();
    const weekDay = d.getDay();
    let adjustedDate = d.getDate() + d.getDay();
    let weekNumber;
    weekNumber = Math.ceil((adjustedDate / 7));
    return `${weekDays[weekDay]}, ${weekNumber} неделя ${monthes[month]} ${year} года`;
  }

  generateCard() {
    this._element.querySelector(".element__title").textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    this._element.querySelector(".element__date").textContent =
    this._getDataInfo(this._date);
    this._element.querySelector(".element__button");
    this._btn.addEventListener("click", () => {
      this._handleClick(this._name, this._id);
    });
    return this._element;
  }
}
