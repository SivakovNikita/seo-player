const FAQData = [
  {
    title: 'Как создать новый плейлист?',
    text: (
      <span>
        Перейдите во вкладку создать плейлист и заполните простую форму. Чтобы создать новый плейлист, вам понадобится:
        названия треков, ссылка на сайт, где хранится аудиофайл и продолжительность трека. <br />
        <br />
        Наши плейлисты сверстаны так, что идеально вмещают от 1 до 10 треков. <br />
        После того, как вы добавите все нужные треки, нажмите на кнопку создать плейлист. Вы получите ссылку на страницу
        с плеером, а также готовый HTML-код для вставки на ваш сайт.
      </span>
    ),
  },
  {
    title: 'Где взять треки для плейлиста?',
    text: (
      <span>
        Попросить у музыкального редактора или добавить самостоятельно, используя <a>Загрузку треков</a> или свое
        хранилище файлов.
      </span>
    ),
  },
  {
    title: 'Как назвать плейлист?',
    text: (
      <span>
        Название плейлиста нужно записать на английском языке, например Deep house playlist, в ссылке на плейлист вы
        увидите /player/DeepHousePlaylist
      </span>
    ),
  },
  {
    title: 'Что такое плейлист?',
    text: (
      <span>
        Плейлист это коллекция треков, от 1 до 10 штук. В плейлисте можно переключать треки в произвольном порядке,
        перематывать трек, воспроизведение следующего трека начинается автоматически, пока не будет проигран последний
        трек. <br />
        Высота виджета плейлиста на 10 треков: 600 пикселей.
      </span>
    ),
  },
  {
    title: 'Что такое плеербар?',
    text: (
      <span>
        Плеербар, это виджет плеера, который иделаьно подходит для одного трека или демо-записи нескольких композиций в
        одном аудиофайле. В плеербаре есть кнопка с призывом к действию, она появляется когда пользователь начинает
        воспроизведение, индикация воспроизведения и загрузки, название композиции идеально возмможность перематывать
        трек.
        <br />
        Высота виджета плеербара в пикселях: 50рх в закрытом состоянии и 100рх в открытом (активном).
        <br />
        <br />
        <img src="/images/playerbar.png" width="100%" />
      </span>
    ),
  },
  {
    title: 'Что такое title плейлиста?',
    text: <span>Это заголовок страницы, который будет виден в браузере.</span>,
  },
  {
    title: 'Как изменить ссылку на трек или его название?',
    text: (
      <div>
        Вам нужно перейти в раздел <a>Отредактировать плейлист</a>
        <br /> Выбрать нужный плейлист из выпадающего списка
        <br /> Внести необходимые изменения
        <br /> Нажать кнопку <button>Сохранить изменения</button>
      </div>
    ),
  },
];

export default FAQData;
