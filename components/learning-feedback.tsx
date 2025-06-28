"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { TrendingUp, Target, BookOpen, Clock, AlertTriangle, Sparkles } from "lucide-react"

interface LearningAnalysis {
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
  nextSteps: string[]
  studyEfficiency: number
  consistencyScore: number
}

interface StudyPlan {
  title: string
  duration: string
  topics: Array<{
    week: number
    topic: string
    goals: string[]
    exercises: string[]
  }>
}

const mockAnalysis: LearningAnalysis = {
  strengths: ["HTML/CSSの基礎理解", "継続的な学習習慣"],
  weaknesses: ["JavaScript非同期処理", "React Hooks", "データベース設計"],
  recommendations: [
    "JavaScript非同期処理の演習問題を追加で取り組みましょう",
    "React Hooksの実践的なプロジェクトを作成してみましょう",
    "データベース設計の基礎から復習することをお勧めします",
  ],
  nextSteps: ["Promise/async-awaitの理解を深める", "useEffect、useStateの使い分けを練習", "SQLの基本クエリを復習"],
  studyEfficiency: 78,
  consistencyScore: 85,
}

const generateStudyPlan = (): StudyPlan => {
  return {
    title: "佐々木さん専用 4週間集中学習プラン",
    duration: "4週間（週10-12時間）",
    topics: [
      {
        week: 1,
        topic: "JavaScript非同期処理の基礎",
        goals: ["Promiseの概念を理解する", "async/awaitの基本的な使い方を覚える", "エラーハンドリングを実装できる"],
        exercises: [
          "Promise を使った簡単なAPI呼び出し",
          "async/await でのデータ取得練習",
          "try-catch を使ったエラー処理",
        ],
      },
      {
        week: 2,
        topic: "React Hooks実践",
        goals: [
          "useEffectの依存配列を正しく使える",
          "カスタムHooksを作成できる",
          "useStateとuseEffectの組み合わせを理解する",
        ],
        exercises: [
          "ToDoアプリでuseStateとuseEffectを使用",
          "APIからデータを取得するカスタムHook作成",
          "フォームバリデーションの実装",
        ],
      },
      {
        week: 3,
        topic: "データベース設計基礎",
        goals: ["正規化の概念を理解する", "基本的なSQLクエリを書ける", "テーブル設計ができる"],
        exercises: [
          "ユーザー管理システムのテーブル設計",
          "SELECT、INSERT、UPDATE、DELETEの練習",
          "JOINを使った複数テーブルの操作",
        ],
      },
      {
        week: 4,
        topic: "総合プロジェクト",
        goals: ["学習した技術を組み合わせる", "完成したアプリケーションを作る", "コードレビューを受ける"],
        exercises: [
          "React + Node.js でのフルスタックアプリ開発",
          "データベースとの連携実装",
          "デプロイまでの一連の流れを体験",
        ],
      },
    ],
  }
}

export function LearningFeedback() {
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPlanDialog, setShowPlanDialog] = useState(false)

  const handleGeneratePlan = () => {
    setIsGenerating(true)

    // 実際のAI生成をシミュレート
    setTimeout(() => {
      const plan = generateStudyPlan()
      setStudyPlan(plan)
      setIsGenerating(false)
      setShowPlanDialog(true)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {/* 学習効率スコア */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span>学習効率</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">効率スコア</span>
                <span className="font-semibold">{mockAnalysis.studyEfficiency}%</span>
              </div>
              <Progress value={mockAnalysis.studyEfficiency} className="h-2" />
              <p className="text-xs text-gray-500">平均的な学習者と比較した効率性</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-500" />
              <span>継続性</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">継続スコア</span>
                <span className="font-semibold">{mockAnalysis.consistencyScore}%</span>
              </div>
              <Progress value={mockAnalysis.consistencyScore} className="h-2" />
              <p className="text-xs text-gray-500">学習習慣の継続性</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 強み・弱み分析 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2 text-green-600">
              <TrendingUp className="w-5 h-5" />
              <span>得意分野</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockAnalysis.strengths.map((strength, index) => (
                <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                  {strength}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2 text-orange-600">
              <AlertTriangle className="w-5 h-5" />
              <span>改善が必要な分野</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockAnalysis.weaknesses.map((weakness, index) => (
                <Badge key={index} variant="secondary" className="bg-orange-100 text-orange-800">
                  {weakness}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI推奨事項 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <Target className="w-5 h-5 text-purple-500" />
            <span>AI推奨学習プラン</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">今週の推奨事項</h4>
              <ul className="space-y-2">
                {mockAnalysis.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <BookOpen className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-700 mb-2">次のステップ</h4>
              <ul className="space-y-2">
                {mockAnalysis.nextSteps.map((step, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                      {index + 1}
                    </div>
                    <span className="text-sm text-gray-700">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              className="w-full bg-purple-500 hover:bg-purple-600 disabled:opacity-50"
              onClick={handleGeneratePlan}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  AI学習プランを生成中...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  個別学習プランを生成
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 学習プラン表示ダイアログ */}
      <Dialog open={showPlanDialog} onOpenChange={setShowPlanDialog}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-purple-500" />
              <span>AI生成学習プラン</span>
            </DialogTitle>
          </DialogHeader>

          {studyPlan && (
            <div className="space-y-6">
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-800">{studyPlan.title}</h3>
                <p className="text-sm text-purple-600">{studyPlan.duration}</p>
              </div>

              <div className="space-y-4">
                {studyPlan.topics.map((topic, index) => (
                  <Card key={index} className="border-l-4 border-l-purple-500">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">
                        第{topic.week}週: {topic.topic}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <h5 className="font-semibold text-sm text-gray-700 mb-2">学習目標</h5>
                        <ul className="space-y-1">
                          {topic.goals.map((goal, goalIndex) => (
                            <li key={goalIndex} className="text-sm text-gray-600 flex items-start space-x-2">
                              <span className="text-green-500 mt-1">•</span>
                              <span>{goal}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-semibold text-sm text-gray-700 mb-2">実践課題</h5>
                        <ul className="space-y-1">
                          {topic.exercises.map((exercise, exerciseIndex) => (
                            <li key={exerciseIndex} className="text-sm text-gray-600 flex items-start space-x-2">
                              <span className="text-blue-500 mt-1">•</span>
                              <span>{exercise}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex space-x-2">
                <Button className="flex-1 bg-purple-500 hover:bg-purple-600">学習プランを開始</Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  プランをカスタマイズ
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
