export const translations = {
  uk: { 
    HEADER: 
    { BOTTON_REGISTRATION: 'Реєстрація',
      BOTTON_LOGIN: 'Логін',
      BOTTON_LOGOUT: 'Вихід',
      HELLO_TEXT: 'Привіт!',
      TAGLINE: 'Зберігай у Каракації, не в голові'
    },
    LEFT_PANEL:
    {
      BOTTON_CREATE: 'Створити предмет',
      BOTTON_SHOW_ITEMS: 'Предмети',
      BOTTON_SHOW_SALES: 'Продажі'
    },
    HOME: 
    { WELCOME: 'Ласкаво просимо!',
       START: 'Почати' 
    },
    ITEM_CREATE: {
      TITLE: 'Створити предмет',
      PLACEHOLDER_TITLE: 'Назва',
      PLACEHOLDER_DESC: 'Опис',
      PLACEHOLDER_PRICE: 'Ціна купівлі',
      CHOOSE_CATEGORY: 'Оберіть категорію',
      CHOOSE_FILE: 'Оберіть файл',
      PHOTO_UPLOADED: 'Фото завантажено',
      BUTTON_CREATE: 'Створити',
      ERROR_TITLE: 'Введіть назву!',
      ERROR_CATEGORY: 'Оберіть категорію!',
      ERROR_PRICE: 'Введіть корректную ціну!',
      ERROR_PHOTO: 'Спочатку завантажте фото!',
      ERROR_CREATE: 'Помилка створення!',
      SUCCESS: 'Айтем успішно створен!'
    }
  },
  en: { 
    HEADER:
    { BOTTON_REGISTRATION: 'Registration',
      BOTTON_LOGIN: 'Login',
      BOTTON_LOGOUT: 'Logout',
      HELLO_TEXT: 'Hello!',
      TAGLINE: 'Store it in Karakatsiya, not in your head'
    },
    LEFT_PANEL:
    {
      BOTTON_CREATE: 'Create item',
      BOTTON_SHOW_ITEMS: 'Items',
      BOTTON_SHOW_SALES: 'Sales'
    },
    HOME: 
    { WELCOME: 'Welcome!',
       START: 'Start' 
    },
    ITEM_CREATE: {
      TITLE: 'Create an item',
      PLACEHOLDER_TITLE: 'Name',
      PLACEHOLDER_DESC: 'Description',
      PLACEHOLDER_PRICE: 'Purchase price',
      CHOOSE_CATEGORY: 'Choose a category',
      CHOOSE_FILE: 'Select a file',
      PHOTO_UPLOADED: 'Photo uploaded',
      BUTTON_CREATE: 'Create',
      ERROR_TITLE: 'Enter a name!',
      ERROR_CATEGORY: 'Choose a category!',
      ERROR_PRICE: 'Enter the correct price!',
      ERROR_PHOTO: 'Upload a photo first!',
      ERROR_CREATE: 'Creation error!',
      SUCCESS: 'Item successfully created!'
    } 
    }
};

export type Lang = 'uk' | 'en';