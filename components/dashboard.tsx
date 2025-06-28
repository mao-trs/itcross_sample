import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { ProgressCards } from "@/components/progress-cards"
import { InterviewSection } from "@/components/interview-section"
import { StudyTimeSection } from "@/components/study-time-section"
import { AIChatbot } from "@/components/ai-chatbot"
import { LearningFeedback } from "@/components/learning-feedback"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function Dashboard() {
  return (
    <div className="bg-cyan-400 min-h-screen">
      <div className="bg-cyan-400 text-white py-8 px-6">
        <h1 className="text-3xl font-bold">ダッシュボード</h1>
      </div>

      <div className="bg-white mx-6 rounded-t-lg p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              佐々木 麻緒さんのダッシュボード
              <span className="text-blue-500 text-sm ml-2 underline cursor-pointer">使い方はこちら</span>
            </h2>
            <p className="text-gray-600">受講生ID:49901 📋</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
            学習目標を編集する
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <ProgressCards />

        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">概要</TabsTrigger>
            <TabsTrigger value="ai-chat">AI質問</TabsTrigger>
            <TabsTrigger value="feedback">学習分析</TabsTrigger>
            <TabsTrigger value="interview">面談</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <InterviewSection />
            <StudyTimeSection />
          </TabsContent>

          <TabsContent value="ai-chat">
            <AIChatbot />
          </TabsContent>

          <TabsContent value="feedback">
            <LearningFeedback />
          </TabsContent>

          <TabsContent value="interview">
            <InterviewSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
