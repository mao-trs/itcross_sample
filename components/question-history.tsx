"use client"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, MessageCircle, Clock, CheckCircle } from "lucide-react"

interface Question {
  id: number
  title: string
  content: string
  category: string
  status: "pending" | "answered"
  createdAt: string
  answeredAt?: string
  answer?: string
  instructor?: string
}

const mockQuestions: Question[] = [
  {
    id: 1,
    title: "ReactのuseEffectの使い方について",
    content:
      "useEffectの依存配列について理解できません。空の配列を渡した場合とuseEffectの第二引数を省略した場合の違いを教えてください。",
    category: "React",
    status: "answered",
    createdAt: "2025-06-25 14:30",
    answeredAt: "2025-06-25 16:45",
    answer:
      "useEffectの依存配列について説明します。空の配列[]を渡した場合は、コンポーネントのマウント時に一度だけ実行されます。第二引数を省略した場合は、毎回のレンダリング時に実行されます。",
    instructor: "田中 太郎",
  },
  {
    id: 2,
    title: "CSSのFlexboxレイアウトが崩れる",
    content:
      "Flexboxを使ってレイアウトを作成していますが、画面サイズが変わると崩れてしまいます。レスポンシブ対応の方法を教えてください。",
    category: "CSS",
    status: "pending",
    createdAt: "2025-06-26 10:15",
  },
  {
    id: 3,
    title: "JavaScriptの非同期処理について",
    content: "async/awaitとPromiseの違いがよく分かりません。どちらを使うべきでしょうか？",
    category: "JavaScript",
    status: "answered",
    createdAt: "2025-06-24 16:20",
    answeredAt: "2025-06-24 18:30",
    answer:
      "async/awaitはPromiseの構文糖衣です。Promiseをより読みやすく書けるようになります。基本的にはasync/awaitの使用をお勧めします。",
    instructor: "鈴木 花子",
  },
]

export function QuestionHistory() {
  const [questions, setQuestions] = useState<Question[]>(mockQuestions)
  const [filter, setFilter] = useState<"all" | "pending" | "answered">("all")
  const [isNewQuestionOpen, setIsNewQuestionOpen] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)

  const filteredQuestions = questions.filter((q) => {
    if (filter === "all") return true
    return q.status === filter
  })

  const handleNewQuestion = (e: FormEvent) => {
    e.preventDefault()
    setIsNewQuestionOpen(false)
    // 新しい質問の投稿処理
  }

  return (
    <div className="space-y-4">
      {/* フィルターと新規質問ボタン */}
      <div className="flex justify-between items-center">
        <Select value={filter} onValueChange={(value: "all" | "pending" | "answered") => setFilter(value)}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">すべて</SelectItem>
            <SelectItem value="pending">未回答</SelectItem>
            <SelectItem value="answered">回答済み</SelectItem>
          </SelectContent>
        </Select>

        <Dialog open={isNewQuestionOpen} onOpenChange={setIsNewQuestionOpen}>
          <DialogTrigger asChild>
            <Button className="bg-cyan-500 hover:bg-cyan-600">
              <Plus className="w-4 h-4 mr-2" />
              新しい質問
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>新しい質問を投稿</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleNewQuestion} className="space-y-4">
              <div>
                <Label htmlFor="title">質問タイトル</Label>
                <Input id="title" placeholder="質問のタイトルを入力してください" required />
              </div>

              <div>
                <Label htmlFor="category">カテゴリ</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="カテゴリを選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="html">HTML</SelectItem>
                    <SelectItem value="css">CSS</SelectItem>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="react">React</SelectItem>
                    <SelectItem value="database">データベース</SelectItem>
                    <SelectItem value="other">その他</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="content">質問内容</Label>
                <Textarea id="content" placeholder="詳細な質問内容を入力してください" rows={5} required />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsNewQuestionOpen(false)}>
                  キャンセル
                </Button>
                <Button type="submit" className="bg-cyan-500 hover:bg-cyan-600">
                  質問を投稿
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* 質問一覧 */}
      <div className="space-y-3">
        {filteredQuestions.map((question) => (
          <Card key={question.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4" onClick={() => setSelectedQuestion(question)}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900 flex-1">{question.title}</h3>
                <div className="flex items-center space-x-2 ml-4">
                  <Badge variant={question.status === "answered" ? "default" : "secondary"}>
                    {question.status === "answered" ? (
                      <>
                        <CheckCircle className="w-3 h-3 mr-1" />
                        回答済み
                      </>
                    ) : (
                      <>
                        <Clock className="w-3 h-3 mr-1" />
                        未回答
                      </>
                    )}
                  </Badge>
                  <Badge variant="outline">{question.category}</Badge>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">{question.content}</p>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>投稿日時: {question.createdAt}</span>
                {question.answeredAt && <span>回答日時: {question.answeredAt}</span>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 質問詳細モーダル */}
      <Dialog open={!!selectedQuestion} onOpenChange={() => setSelectedQuestion(null)}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          {selectedQuestion && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>{selectedQuestion.title}</span>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Badge variant={selectedQuestion.status === "answered" ? "default" : "secondary"}>
                    {selectedQuestion.status === "answered" ? "回答済み" : "未回答"}
                  </Badge>
                  <Badge variant="outline">{selectedQuestion.category}</Badge>
                  <span className="text-sm text-gray-500">投稿日時: {selectedQuestion.createdAt}</span>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">質問内容</h4>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-700">{selectedQuestion.content}</p>
                  </div>
                </div>

                {selectedQuestion.status === "answered" && selectedQuestion.answer && (
                  <div>
                    <h4 className="font-semibold mb-2">回答</h4>
                    <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
                      <p className="text-gray-700 mb-2">{selectedQuestion.answer}</p>
                      <div className="text-sm text-gray-600">
                        <span>回答者: {selectedQuestion.instructor}</span>
                        <span className="ml-4">回答日時: {selectedQuestion.answeredAt}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
