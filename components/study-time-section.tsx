import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts"

const chartData = [
  { date: "06/26", 自習学習時間: 2.5, 実績学習時間: 3.2 },
  { date: "06/27", 自習学習時間: 1.8, 実績学習時間: 2.1 },
  { date: "06/28", 自習学習時間: 3.1, 実績学習時間: 3.8 },
  { date: "06/29", 自習学習時間: 2.2, 実績学習時間: 2.7 },
  { date: "06/30", 自習学習時間: 4.0, 実績学習時間: 4.5 },
  { date: "07/01", 自習学習時間: 1.5, 実績学習時間: 2.0 },
  { date: "07/02", 自習学習時間: 3.3, 実績学習時間: 3.9 },
]

export function StudyTimeSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">学習時間</CardTitle>
        <div className="text-sm text-gray-600">
          期間フィルタ
          <br />※ 以下の設定した期間に応じて、左のグラフや下の数値が変わります。
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-6">
          <Input type="date" defaultValue="2025-06-26" className="w-40" />
          <span className="self-center">〜</span>
          <Input type="date" defaultValue="2025-06-28" className="w-40" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Legend />
                <Bar dataKey="自習学習時間" fill="#60A5FA" />
                <Bar dataKey="実績学習時間" fill="#34D399" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">設定された期間の自習学習時間</h4>
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-gray-100">
                  <CardContent className="p-4 text-center">
                    <div className="text-sm text-gray-600">合計</div>
                    <div className="text-xl font-bold">18.4時間</div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-100">
                  <CardContent className="p-4 text-center">
                    <div className="text-sm text-gray-600">1日の平均</div>
                    <div className="text-xl font-bold">2.6時間</div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-700 mb-2">設定された期間の実績学習時間</h4>
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-gray-100">
                  <CardContent className="p-4 text-center">
                    <div className="text-sm text-gray-600">合計</div>
                    <div className="text-xl font-bold">22.2時間</div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-100">
                  <CardContent className="p-4 text-center">
                    <div className="text-sm text-gray-600">1日の平均</div>
                    <div className="text-xl font-bold">3.2時間</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h4 className="font-semibold text-gray-700 mb-4">全体の学習進捗</h4>
          <div className="bg-gray-100 p-4 rounded">
            <div className="text-sm text-gray-600 mb-2">教材読了率</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-400 h-2 rounded-full" style={{ width: "75%" }}></div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h4 className="font-semibold text-gray-700 mb-4">各教材ごとの進捗率</h4>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">HTML/CSS基礎</span>
                <span className="text-sm text-gray-600">95%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "95%" }}></div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">JavaScript基礎</span>
                <span className="text-sm text-gray-600">78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "78%" }}></div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">React入門</span>
                <span className="text-sm text-gray-600">62%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-cyan-500 h-2 rounded-full" style={{ width: "62%" }}></div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">データベース基礎</span>
                <span className="text-sm text-gray-600">45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "45%" }}></div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">サーバーサイド開発</span>
                <span className="text-sm text-gray-600">23%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: "23%" }}></div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">ポートフォリオ制作</span>
                <span className="text-sm text-gray-600">8%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: "8%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
