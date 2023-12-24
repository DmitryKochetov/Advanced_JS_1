"use strict";

/*
###Задание 2
Вы управляете рестораном, в котором работают разные повара, специализирующиеся 
на определенных блюдах. Клиенты приходят и делают заказы на разные блюда.
Необходимо реализовать функцию newOrder. Создавать вспомогательные функции, 
коллекции, не запрещается. Старайтесь использовать коллекции Map/Set, где это 
актуально. Представленный ниже код должен работать.

Повара и их специализации:
Олег - специализация: Пицца.
Андрей - специализация: Суши.
Анна - специализация: Десерты.

Блюда, которые могут заказать посетители:
Пицца "Маргарита"
Пицца "Пепперони"
Пицца "Три сыра"
Суши "Филадельфия"
Суши "Калифорния"
Суши "Чизмаки"
Суши "Сеякемаки"
Десерт Тирамису
Десерт Чизкейк
*/

const cookSpecialize = new Map();
cookSpecialize.set("Пицца", "Олег");
cookSpecialize.set("Суши", "Андрей");
cookSpecialize.set("Десерт", "Анна");

let productsAvailable = [
  {
    type: "Пицца",
    name: "Маргарита",
  },
  {
    type: "Пицца",
    name: "Пепперони",
  },
  {
    type: "Пицца",
    name: "Три сыра",
  },
  {
    type: "Суши",
    name: "Филадельфия",
  },
  {
    type: "Суши",
    name: "Калифорния",
  },
  {
    type: "Суши",
    name: "Чизмаки",
  },
  {
    type: "Суши",
    name: "Сеякемаки",
  },
  {
    type: "Десерт",
    name: "Тирамису",
  },
  {
    type: "Десерт",
    name: "Чизкейк",
  },
];

// Посетитель ресторана.
class Client {
  constructor(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.products = [];
  }
}

// Вам необходимо реализовать класс, который управляет заказами и поварами.
class Manager {
  newOrder(client, products) {
    for (let i = 1; i < arguments.length; i++) {
      if (!productsAvailable.find((obj) => arguments[i].name == obj.name)) {
        throw new Error("Неизвестный товар");
      }
    }

    for (let i = 1; i < arguments.length; i++) {
      if (client.products.find((obj) => arguments[i].name == obj.name)) {
        client.products[
          client.products.findIndex((prod) => prod.name == arguments[i].name)
        ].quantity += arguments[i].quantity;
        i++;
      }
      client.products.push(arguments[i]);
    }

    console.log(`Клиент ${client.firstname} заказал: `);
    for (let i = 0; i < client.products.length; i++) {
      console.log(
        `${client.products[i].name} - ${
          client.products[i].quantity
        }; готовит повар ${cookSpecialize.get(client.products[i].type)}`
      );
    }
  }
}

// Можно передать внутрь конструктора что-либо, если необходимо.
const manager = new Manager();

// Вызовы ниже должны работать верно, менять их нельзя, удалять тоже.
manager.newOrder(
  new Client("Иван", "Иванов"),
  { name: "Маргарита", quantity: 1, type: "Пицца" },
  { name: "Пепперони", quantity: 2, type: "Пицца" },
  { name: "Чизкейк", quantity: 1, type: "Десерт" }
);
// Вывод:
// Клиент Иван заказал:
// Пицца "Маргарита" - 1; готовит повар Олег
// Пицца "Пепперони" - 2; готовит повар Олег
// Десерт "Чизкейк" - 1; готовит повар Анна

// ---

const clientPavel = new Client("Павел", "Павлов");
manager.newOrder(
  clientPavel,
  { name: "Филадельфия", quantity: 5, type: "Суши" },
  { name: "Калифорния", quantity: 3, type: "Суши" }
);
// Вывод:
// Клиент Павел заказал:
// Суши "Филадельфия" - 5; готовит повар Андрей
// Суши "Калифорния" - 3; готовит повар Андрей

manager.newOrder(
  clientPavel,
  { name: "Калифорния", quantity: 1, type: "Суши" },
  { name: "Тирамису", quantity: 2, type: "Десерт" }
);
// Вывод:
// Клиент Павел заказал:
// Суши "Филадельфия" - 5; готовит повар Андрей
// Суши "Калифорния" - 4; готовит повар Андрей
// Десерт "Тирамису" - 2; готовит повар Анна

manager.newOrder(
  clientPavel,
  { name: "Филадельфия", quantity: 1, type: "Суши" },
  { name: "Трубочка с вареной сгущенкой", quantity: 1, type: "Десерт" }
);
// Ничего не должно быть добавлено, должна быть выброшена ошибка:
// Десерт "Трубочка с вареной сгущенкой" - такого блюда не существует.
