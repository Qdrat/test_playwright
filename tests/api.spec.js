// Импортируем 'test' и 'expect' из библиотеки Playnwright
import { test, expect } from "@playwright/test";

test.describe.serial("API-тесты для Restful-booker", { tag: "@api" }, () => {
  const baseURL = "https://restful-booker.herokuapp.com";

  const authData = {
    username: "admin",
    password: "password123",
  };

  const bookingData = {
    firstname: "Alfred",
    lastname: "Hager",
    totalprice: 555,
    depositpaid: true,
    bookingdates: {
      checkin: "2026-04-01",
      checkout: "2026-04-05",
    },
    additionalneeds: "Breakfast",
  };

  let bookingId;

  async function getAuthToken(request) {
    // Отправляем POST-запрос для получения токена
    const response = await request.post(`${baseURL}/auth`, {
      data: authData,
    });

    // Проверка 1: Статус-код ответа
    // console.log(`Статус-код: ${response.status()}`);
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    return responseBody["token"];
  }

  test("Создание бронирования (POST - /booking)", async ({ request }) => {
    // Отправляем POST-запрос
    const response = await request.post(`${baseURL}/booking`, {
      data: bookingData,
    });

    // Проверка 1: Статус-код ответа
    console.log(`Статус-код: ${response.status()}`);
    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    // Проверка 2: В ответе есть объекты с ключом 'bookingid'
    expect(responseBody).toHaveProperty("bookingid");

    // Проверка 3: В ответе возвращаются те же данные
    expect(responseBody["booking"]).toEqual(bookingData);

    console.log("Тело ответа:", responseBody);
    bookingId = responseBody["bookingid"];
  });

  test("Получение информации о бронировании (GET - /booking/{id})", async ({
    request,
  }) => {
    // Отправляем GET-запрос
    const response = await request.get(`${baseURL}/booking/${bookingId}`);

    // Проверка 1: Статус-код ответа
    console.log(`Статус-код: ${response.status()}`);
    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    // Проверка 2: В ответе возвращаются те же данные
    expect(responseBody).toEqual(bookingData);
    console.log(responseBody);
  });

  test("Обновление бронирования (PUT - /booking/{id})", async ({ request }) => {
    // Получаем токен аутификации
    const auth = await getAuthToken(request);

    const updateData = {
      firstname: "Artur",
      lastname: "Hager",
      totalprice: 1000,
      depositpaid: true,
      bookingdates: {
        checkin: "2026-04-01",
        checkout: "2026-04-05",
      },
      additionalneeds: "Breakfast",
    };

    // Отправляем PUT-запрос
    const response = await request.put(`${baseURL}/booking/${bookingId}`, {
      data: updateData,
      headers: {
        Cookie: `token=${auth}`,
      },
    });

    // Проверка 1: Статус-код ответа
    console.log(`Статус-код: ${response.status()}`);
    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    // Проверка 2: В ответе возвращаются те же данные
    expect(responseBody).toEqual(updateData);
    console.log(responseBody);
  });

  test("Удаление бронирования  (DELETE - /booking/{id})", async ({
    request,
  }) => {
    // Получаем токен аутификации
    const auth = await getAuthToken(request);

    // Отправляем DELETE-запрос
    const response = await request.delete(`${baseURL}/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${auth}`,
      },
    });

    // Проверка 1: Статус-код ответа 201
    console.log(`Статус-код: ${response.status()}`);
    expect(response.status()).toBe(201);

    // Отправляем GET-запрос на удаленный Id
    const responseCheck = await request.get(`${baseURL}/booking/${bookingId}`);

    // Проверка 1: Статус-код ответа 404
    console.log(`Статус-код: ${responseCheck.status()}`);
    expect(responseCheck.status()).toBe(404);
  });
});
