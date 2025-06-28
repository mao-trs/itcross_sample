import { Card, CardContent } from "@/components/ui/card"

export function ProgressCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card className="bg-gray-100">
        <CardContent className="p-6 text-center">
          <div className="text-gray-600 text-sm mb-2">全体の課題達成率</div>
          <div className="text-3xl font-bold text-gray-900">63%</div>
        </CardContent>
      </Card>

      <Card className="bg-gray-100">
        <CardContent className="p-6 text-center">
          <div className="text-gray-600 text-sm mb-2">昨日までの課題達成率</div>
          <div className="text-3xl font-bold text-gray-900">-</div>
        </CardContent>
      </Card>

      <Card className="bg-gray-100">
        <CardContent className="p-6 text-center">
          <div className="text-gray-600 text-sm mb-2">全体の学習時間達成率</div>
          <div className="text-3xl font-bold text-gray-900">110%</div>
        </CardContent>
      </Card>

      <Card className="bg-gray-100">
        <CardContent className="p-6 text-center">
          <div className="text-gray-600 text-sm mb-2">昨日までの学習時間達成率</div>
          <div className="text-3xl font-bold text-gray-900">110%</div>
        </CardContent>
      </Card>
    </div>
  )
}
