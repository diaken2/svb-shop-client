import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, type } = body;

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    // Получаем данные для двух менеджеров

    
    const telegramApiUrl = "https://api.telegram.org/bot7832092415:AAGvkXi-5vfyk0PM02pus4XQGwem-zdW5_E/sendMessage";
    const chatId1 = "973416651";
    const chatId2 = process.env.TELEGRAM_CHAT_ID_2;

    if (!telegramApiUrl || !chatId1) {
      console.error('Missing Telegram environment variables');
      return NextResponse.json(
        { error: 'Telegram configuration not found' }, 
        { status: 500 }
      );
    }

    // Отправляем сообщение первому менеджеру
    const response1 = await fetch(telegramApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId1,
        text: text,
        parse_mode: 'HTML',
      }),
    });

    let result1 = null;
    if (response1.ok) {
      result1 = await response1.json();
    }

    // Отправляем сообщение второму менеджеру (если настроен)
    let result2 = null;
    if (chatId2) {
      const response2 = await fetch(telegramApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId2,
          text: text,
          parse_mode: 'HTML',
        }),
      });

      if (response2.ok) {
        result2 = await response2.json();
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Message sent successfully',
      manager1: result1,
      manager2: result2
    });

  } catch (error) {
    console.error('Error sending message to Telegram:', error);
    return NextResponse.json(
      { error: 'Failed to send message' }, 
      { status: 500 }
    );
  }
} 