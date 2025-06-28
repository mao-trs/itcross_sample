"use client"

import type React from "react"

import { useState } from "react"
import { useChat } from "ai/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, User, Send, AlertCircle, CheckCircle } from "lucide-react"

interface LearningHistory {
  completedTopics: string[]
  testResults: { topic: string; score: number }[]
  strugglingAreas: string[]
  studyTime: { [key: string]: number }
}

const mockLearningHistory: LearningHistory = {
  completedTopics: ["HTML基礎", "CSS基礎", "JavaScript基礎"],
  testResults: [
    { topic: "HTML", score: 85 },
    { topic: "CSS", score: 72 },
    { topic: "JavaScript", score: 68 },
  ],
  strugglingAreas: ["JavaScript非同期処理", "React Hooks"],
  studyTime: {
    HTML: 24,
    CSS: 18,
    JavaScript: 32,
    React: 15,
  },
}

// デモ用の回答データ
const demoResponses: { [key: string]: string } = {
  JavaScriptの非同期処理について教えて: `JavaScriptの非同期処理について説明します。

**主な概念：**
1. **Promise**: 非同期操作の結果を表すオブジェクト
2. **async/await**: Promiseをより読みやすく書く構文

**基本的な使い方：**
\`\`\`javascript
// Promise の例
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("データを取得しました");
    }, 1000);
  });
}

// async/await の例
async function getData() {
  try {
    const result = await fetchData();
    console.log(result);
  } catch (error) {
    console.error("エラー:", error);
  }
}
\`\`\`

**学習のポイント：**
- まずPromiseの基本概念を理解する
- async/awaitは後から学習する
- 実際のAPIを使って練習する`,

  CSSのFlexboxの使い方: `CSSのFlexboxについて説明します。

**基本設定：**
\`\`\`css
.container {
  display: flex;
  justify-content: center; /* 水平方向の配置 */
  align-items: center;     /* 垂直方向の配置 */
}
\`\`\`

**主要プロパティ：**
- \`flex-direction\`: 配置方向（row, column）
- \`justify-content\`: 主軸の配置
- \`align-items\`: 交差軸の配置
- \`flex-wrap\`: 折り返し設定

**実践例：**
\`\`\`css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}
\`\`\``,

  ReactのuseEffectの使い方: `ReactのuseEffectについて説明します。

**基本的な使い方：**
\`\`\`javascript
import { useEffect, useState } from 'react';

function MyComponent() {
  const [data, setData] = useState(null);

  // コンポーネントマウント時に実行
  useEffect(() => {
    fetchData().then(setData);
  }, []); // 空の依存配列

  // dataが変更された時に実行
  useEffect(() => {
    console.log('データが更新されました:', data);
  }, [data]); // dataを依存配列に追加

  return <div>{data}</div>;
}
\`\`\`

**依存配列のパターン：**
- \`[]\`: マウント時のみ実行
- \`[value]\`: valueが変更された時に実行
- 省略: 毎回実行（通常は避ける）`,

  エラーの原因を教えて: `よくあるJavaScriptエラーと解決方法：

**1. TypeError: Cannot read property 'X' of undefined**
- 原因: オブジェクトがundefinedまたはnull
- 解決: オプショナルチェーニング使用
\`\`\`javascript
// エラーが起きる例
const name = user.profile.name;

// 安全な書き方
const name = user?.profile?.name;
\`\`\`

**2. ReferenceError: X is not defined**
- 原因: 変数が宣言されていない
- 解決: 変数を正しく宣言

**3. SyntaxError**
- 原因: 構文エラー（括弧の不一致など）
- 解決: コードの構文をチェック

**デバッグのコツ：**
- console.logで値を確認
- ブラウザの開発者ツールを活用
- エラーメッセージを注意深く読む`,
}

export function AIChatbot() {
  const [demoMode, setDemoMode] = useState(false)
  const [demoMessages, setDemoMessages] = useState<Array<{ id: string; role: "user" | "assistant"; content: string }>>(
    [],
  )
  const [demoInput, setDemoInput] = useState("")
  const [demoLoading, setDemoLoading] = useState(false)
  const [apiStatus, setApiStatus] = useState<"checking" | "connected" | "error">("checking")

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: "/api/chat",
    body: {
      learningHistory: mockLearningHistory,
    },
    onError: (error) => {
      console.error("Chat error:", error)
      setDemoMode(true)
      setApiStatus("error")
    },
    onResponse: (response) => {
      if (response.ok) {
        setApiStatus("connected")
        setDemoMode(false)
      } else {
        setApiStatus("error")
        setDemoMode(true)
      }
    },
  })

  const [quickQuestions] = useState([
    "JavaScriptの非同期処理について教えて",
    "CSSのFlexboxの使い方",
    "ReactのuseEffectの使い方",
    "エラーの原因を教えて",
  ])

  const handleDemoSubmit = (question: string) => {
    setDemoLoading(true)
    const userMessage = { id: Date.now().toString(), role: "user" as const, content: question }
    setDemoMessages((prev) => [...prev, userMessage])

    setTimeout(() => {
      const response =
        demoResponses[question] ||
        `「${question}」についてお答えします。

これはデモモードでの回答です。実際のAI機能を使用するには、Google Generative AI APIキーの設定が必要です。

**一般的なアドバイス：**
- 公式ドキュメントを参照してください
- 実際にコードを書いて練習しましょう
- エラーが出た場合は、エラーメッセージを注意深く読んでください

何か具体的な質問があれば、お気軽にお聞きください。`

      const assistantMessage = { id: (Date.now() + 1).toString(), role: "assistant" as const, content: response }
      setDemoMessages((prev) => [...prev, assistantMessage])
      setDemoLoading(false)
    }, 1000)
  }

  const handleQuickQuestion = (question: string) => {
    if (demoMode) {
      setDemoInput(question)
      handleDemoSubmit(question)
    } else {
      handleSubmit(new Event("submit") as any, {
        data: { message: question },
      })
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (demoMode && demoInput.trim()) {
      handleDemoSubmit(demoInput)
      setDemoInput("")
    } else {
      handleSubmit(e)
    }
  }

  const currentMessages = demoMode ? demoMessages : messages
  const currentInput = demoMode ? demoInput : input
  const currentLoading = demoMode ? demoLoading : isLoading

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="w-5 h-5 text-blue-500" />
            <span>AI学習アシスタント</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            {apiStatus === "checking" && (
              <div className="flex items-center space-x-2 text-gray-500">
                <div className="w-3 h-3 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
                <span>接続確認中</span>
              </div>
            )}
            {apiStatus === "connected" && (
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span>Gemini 2.5 Pro</span>
              </div>
            )}
            {apiStatus === "error" && (
              <div className="flex items-center space-x-2 text-orange-600">
                <AlertCircle className="w-4 h-4" />
                <span>デモモード</span>
              </div>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col space-y-4">
        {/* クイック質問 */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">よくある質問</h4>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleQuickQuestion(question)}
                className="text-xs"
              >
                {question}
              </Button>
            ))}
          </div>
        </div>

        {/* チャット履歴 */}
        <ScrollArea className="flex-1 border rounded-lg p-4">
          <div className="space-y-4">
            {currentMessages.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <Bot className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>学習に関する質問をお気軽にどうぞ！</p>
                <p className="text-sm">コードの書き方、エラーの解決方法など何でも聞いてください。</p>
                {apiStatus === "connected" && <p className="text-xs text-green-600 mt-2">Gemini 2.5 Proが回答します</p>}
                {apiStatus === "error" && (
                  <p className="text-xs text-orange-600 mt-2">現在デモモードで動作しています</p>
                )}
              </div>
            )}

            {currentMessages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                </div>

                {message.role === "user" && (
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}

            {currentLoading && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* 入力フォーム */}
        <form onSubmit={handleFormSubmit} className="flex space-x-2">
          <Input
            value={currentInput}
            onChange={demoMode ? (e) => setDemoInput(e.target.value) : handleInputChange}
            placeholder="学習に関する質問を入力してください..."
            disabled={currentLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={currentLoading || !currentInput.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
