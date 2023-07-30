# Coach APP

## Приложение для тренеров. Помогает в создании планировании и записи упражнений, планов, микроциклов.

### Стек:

TypeScript, React, Redux, React Hook Form, React Router Dom, MaterialUI, Firebase, Calend, Conva.

### Деплой:

[coach-planner.web.app](https://coach-planner.web.app/)

### Реализовано

- [x] Написан readme.md
- [x] Подключить аутентификацию через электронную почту
- [x] пользователь может создавать, изменять, удалять упражнения
- [x] пользователь может создавать,изменять, удалять тренировки
- [x] пользователь может создавать,изменять, удалять планы тренировок
- [x] логика подсчета параметров тренировки
- [x] создана рисовалка для создания рисунка упражнения (в текущей версии возможно рисование и исправление только на поле одного размера (800х400)):
  - [x] создание, изменение, удаление, перемещение, выбор цвета и типа линии движения игрока;
  - [x] создание, перемещение, удаление, выбор цвета и типа игрока в упражнении.
  - [x] создание, перемещение, удаление, выбор цвета и типа инвентаря в упражнении.
  - [x] сохранение, изменение рисунка упражнения.
- [x] стили и валидация для авторизации, регистрации
- [х] стили для создания и просмотра упражнений
- [x] стили для тренировки
- [x] форма изменения данных пользователя.
- [x] стили для плана тренировок
- [x] стили для календаря
- [x] опубликовать приложение
- [x] рисунок правильно отображается на разных размерах экрана
- [x] адаптив
- [ ] разрешить чтение и создание упражнений всем пользователям, изменение упражнений только создателю, создать возможность копировать чужие упражнения.
- [ ] отдельный текстовый редактор для описания упражнеий

---

1. Cоздайте файл в корне приложения `.env.local`.
2. В созданном файе укажите переменные окружения из Firebase Project Settings:

```
VITE_FIREBASE_API_KEY= //apiKey
VITE_FIREBASE_AUTH_DOMAIN= //authDomain
VITE_FIREBASE_PROJECT_ID= //projectId
VITE_FIREBASE_STORAGE_BUCKET= //storageBucket
VITE_FIREBASE_MESSAGING_SENDER_ID= //messagingSenderId
VITE_FIREBASE_APP_ID= //appId
VITE_FIREBASE_MEASUREMENT_ID= //measurementId
```

3. Установите зависимости:`yarn install`

4. Запустите проект:`yarn dev`

5. npx firebase deploy
