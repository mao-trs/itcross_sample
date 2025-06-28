import { Search, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { QuestionHistory } from "@/components/question-history"

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-gray-900">ITCROSS</div>
            <div className="text-sm text-gray-600">WEBCAMP</div>
          </div>
          <div className="text-sm text-gray-600">
            COMMIT ビジネススキルコンテンツ
            <ChevronDown className="inline w-4 h-4 ml-1" />
          </div>
        </div>

        <nav className="flex items-center space-x-6">
          <Button variant="ghost" className="bg-pink-400 text-white hover:bg-pink-500 rounded-full px-6">
            ダッシュボード
          </Button>
          <Button variant="ghost" className="bg-green-400 text-white hover:bg-green-500 rounded-full px-6">
            学習時間
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                質問履歴
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>質問履歴</DialogTitle>
              </DialogHeader>
              <QuestionHistory />
            </DialogContent>
          </Dialog>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input placeholder="キーワードを入力してください" className="pl-10 w-64 rounded-full border-gray-300" />
          </div>

          <div className="flex items-center space-x-2">
            <Avatar className="w-8 h-8 bg-green-500">
              <AvatarFallback className="text-white text-sm">佐</AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-700">佐々木 麻緒</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </nav>
      </div>
    </header>
  )
}
