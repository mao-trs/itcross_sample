"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"
import { useState } from "react"

export function InterviewSection() {
  const [isOpen, setIsOpen] = useState(false)
  const [interviews, setInterviews] = useState([
    // 既存の面談データがあれば表示
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // フォーム送信処理
    setIsOpen(false)
  }

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-gray-100">
          <CardContent className="p-6 text-center">
            <div className="text-gray-600 text-sm mb-2">前回の学習日</div>
            <div className="text-xl font-bold text-gray-900">2023/07/27</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-100">
          <CardContent className="p-6 text-center">
            <div className="text-gray-600 text-sm mb-2">学習開始から</div>
            <div className="text-xl font-bold text-gray-900">820日目</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-100">
          <CardContent className="p-6 text-center">
            <div className="text-gray-600 text-sm mb-2">学習終了まで残り</div>
            <div className="text-xl font-bold text-gray-900">0日</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">面談</CardTitle>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                面談設定
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>面談設定</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">面談日</Label>
                    <Input type="date" id="date" required />
                  </div>
                  <div>
                    <Label htmlFor="time">面談時間</Label>
                    <Input type="time" id="time" required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="instructor">面談担当者</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="担当者を選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tanaka">田中 太郎</SelectItem>
                      <SelectItem value="suzuki">鈴木 花子</SelectItem>
                      <SelectItem value="yamada">山田 次郎</SelectItem>
                      <SelectItem value="sato">佐藤 美咲</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="type">面談種別</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="面談種別を選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="progress">学習進捗確認</SelectItem>
                      <SelectItem value="career">キャリア相談</SelectItem>
                      <SelectItem value="technical">技術的質問</SelectItem>
                      <SelectItem value="portfolio">ポートフォリオレビュー</SelectItem>
                      <SelectItem value="other">その他</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="notes">相談内容・備考</Label>
                  <Textarea id="notes" placeholder="相談したい内容や質問があれば記入してください" rows={3} />
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                    キャンセル
                  </Button>
                  <Button type="submit" className="bg-cyan-500 hover:bg-cyan-600">
                    面談を予約する
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-cyan-400 text-white">
                  <th className="px-4 py-3 text-left">予定されている面談日時</th>
                  <th className="px-4 py-3 text-left">面談担当者</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-3 text-gray-600">現在予定されている面談はありません</td>
                  <td className="px-4 py-3 text-gray-600">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
