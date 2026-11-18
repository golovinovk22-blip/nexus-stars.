
const TelegramBot = require("node-telegram-bot-api");

const token = process.env.BOT_TOKEN;

if (!token) {
  throw new Error("BOT_TOKEN is missing");
}

const bot = new TelegramBot(token, {
  polling: true
});

const packages = [50, 100, 250, 500, 1000, 2500];

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "⭐ Добро пожаловать в NEXUS STARS!\n\nВыберите количество звёзд:",
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: "⭐ Купить Stars", callback_data: "buy" }],
          [{ text: "ℹ️ Помощь", callback_data: "help" }]
        ]
      }
    }
  );
});

bot.on("callback_query", async (query) => {
  const chatId = query.message.chat.id;

  if (query.data === "buy") {
    const keyboard = packages.map((amount) => [{
      text: `${amount} ⭐`,
      url: `tg://stars_topup?balance=${amount}`
    }]);

    await bot.sendMessage(
      chatId,
      "Выберите пакет для официального пополнения Telegram Stars:",
      {
        reply_markup: {
          inline_keyboard: keyboard
        }
      }
    );
  }

  if (query.data === "help") {
    await bot.sendMessage(
      chatId,
      "NEXUS STARS — официальный переход к пополнению Telegram Stars."
    );
  }

  await bot.answerCallbackQuery(query.id);
});

bot.onText(/\/paysupport/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Поддержка NEXUS STARS."
  );
});

console.log("NEXUS STARS запущен!");
