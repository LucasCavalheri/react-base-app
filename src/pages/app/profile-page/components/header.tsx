import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import type { User } from '@/models/user'
import { UserPlan } from '@/types/user/user-plan'
import { Crown, Shield } from 'lucide-react'

interface HeaderProps {
  avatar?: string
  user: User | null
}

export function Header({ avatar, user }: HeaderProps) {
  return (
    <CardHeader>
      <div className="relative mx-auto">
        <Avatar className="w-32 h-32 mx-auto">
          <AvatarImage src={avatar} />
          <AvatarFallback className="text-2xl bg-linear-to-br from-primary/20 to-primary/10 uppercase">
            {user?.name[0]}
            {user?.name[1]}
          </AvatarFallback>
        </Avatar>
        {/* <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground p-2 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
                >
                  <Camera className="w-4 h-4" />
                </motion.button> */}
      </div>
      <div className="space-y-2">
        <CardTitle className="text-2xl">{user?.name}</CardTitle>
        <CardDescription className="flex items-center justify-center gap-2">
          {user?.plan === UserPlan.PRO ? (
            <>
              <Crown className="w-4 h-4 text-yellow-500" />
              <span className="text-yellow-600 font-medium">Plano PRO</span>
            </>
          ) : (
            <>
              <Shield className="w-4 h-4 text-muted-foreground" />
              <span>Plano Gratuito</span>
            </>
          )}
        </CardDescription>
      </div>
    </CardHeader>
  )
}
