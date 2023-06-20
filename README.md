# Coach APP

## Приложение для тренеров. Помогает в создании планировании и записи упражнений, планов, микроциклов.

### Стек:

TypeScript, React, Redux, React Hook Form, React Router Dom, MaterialUI, Firebase, Calend, Conva.

### Реализовано

- [x] Написан readme.md
- [x] Подключить аутентификацию через электронную почту
- [x] пользователь может создавать, изменять, удалять упражнения
- [x] пользователь может создавать,изменять, удалять тренировки
- [x] пользователь может создавать,изменять, удалять планы тренировок
- [x] логика подсчета параметров тренировки
- [ ] создана рисовалка для создания рисунка упражнения:
- создание, изменение, удаление, перемещение, выбор цвета и типа линии движения игрока;
- создание, перемещение, удаление, выбор цвета и типа игрока в упражнении.
- создание, перемещение, удаление, выбор цвета и типа инвентаря в упражнении.
- сохранение, изменение рисунка упражнения
- [ ] форма изменения данных пользователя
- [ ] стили и валидация для авторизации,изменения дянных пользователя и регистрации
- [ ] адаптив
- [ ] стили для плана тренировок
- [ ] стили для календаря
- [ ] стили для тренировки
- [ ] опубликовать приложение

---

Для запуска приложения нужно создать файл в папке coach-planner/coach-planner:

.env.local

со следующим переменными из Firebase Project Settings:

```
VITE_FIREBASE_API_KEY= //apiKey
VITE_FIREBASE_AUTH_DOMAIN= //authDomain
VITE_FIREBASE_PROJECT_ID= //projectId
VITE_FIREBASE_STORAGE_BUCKET= //storageBucket
VITE_FIREBASE_MESSAGING_SENDER_ID= //messagingSenderId
VITE_FIREBASE_APP_ID= //appId
VITE_FIREBASE_MEASUREMENT_ID= //measurementId
```

После установить зависимости:
`yarn install`

Теперь можно запускать проект:
`yarn dev`
