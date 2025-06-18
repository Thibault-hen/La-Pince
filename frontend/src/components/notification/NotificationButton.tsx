import { Bell, BellRing } from "lucide-react"
import { Button } from "../ui/button"
import { Sheet, SheetTrigger, SheetContent, SheetHeader } from "../ui/sheet"
import Notification from "./Notification"
import { useNotifications } from "@/hooks/use-notification"



export default function NotificationButton() {
  const { notifications } = useNotifications();

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline" size="icon">
          {notifications.length > 0
            ? <BellRing className="size-4 text-secondary-color" />
            : <Bell className="size-4 opacity-50" />
          }
        </Button>

      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <div className="flex align-center gap-2  items-center justify-start">
            <Bell className="h-5 w-5 text-primary-color" />
            <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
          </div>
        </SheetHeader>
        <div className="flex flex-col  gap-2 overflow-auto mb-2 shadow-inner shadow-20  px-2 rounded-md ">
          {notifications.map((notification) => {
            return (
              <Notification key={notification.id} notification={notification} />
            )
          })
          }
        </div>
      </SheetContent>
    </Sheet>
  )
}
