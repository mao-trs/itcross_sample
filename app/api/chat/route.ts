import { google } from "@ai-sdk/google"
import { streamText } from "ai"

export async function POST(req: Request) {
  try {
    const { messages, learningHistory } = await req.json()

    // AI SDKが期待する環境変数名に修正
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY

    if (!apiKey) {
      console.error("GOOGLE_GENERATIVE_AI_API_KEY is not set")
      return new Response(JSON.stringify({ error: "APIキーが設定されていません" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    }

    const systemPrompt = `あなたは学習管理システムのAIアシスタントです。以下の役割を担います：

1. 学習中の疑問に対する即時回答
2. コードサンプルの提示
3. エラー原因の分析とアドバイス
4. 学習履歴に基づく個別フィードバック

学習履歴データ: ${JSON.stringify(learningHistory)}

回答は日本語で、分かりやすく丁寧に説明してください。
コードサンプルがある場合は、適切にフォーマットして提示してください。

例：
- JavaScript の質問には具体的なコード例を含めて回答
- エラーについては原因と解決方法を段階的に説明
- 学習アドバイスは個人の進捗に合わせてカスタマイズ`

    const result = streamText({
      model: google("gemini-2.5-pro"),
      messages: [{ role: "system", content: systemPrompt }, ...messages],
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Chat API Error:", error)
    return new Response(JSON.stringify({ error: "チャットボットでエラーが発生しました" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
