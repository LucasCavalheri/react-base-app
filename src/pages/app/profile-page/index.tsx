import { motion } from 'framer-motion'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { useAuth } from '@/contexts/auth-context'
import { UserProviders } from '@/types/user/user-providers'
import { ProfileInformation } from './components/profile-information'
import { PasswordSection } from './components/password-section'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UserPlan } from '@/types/user/user-plan'
import { Crown, Shield } from 'lucide-react'

export function ProfilePage() {
  const { user } = useAuth()

  console.log(user)

  const avatar =
    user?.authAccounts?.find((account) => account.image)?.image ?? undefined
  const showPasswordChange = user?.authAccounts?.some(
    (account) => account.provider === UserProviders.CREDENTIALS
  )

  console.log(showPasswordChange)

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container max-w-4xl mx-auto p-6 space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Meu Perfil
        </h1>
        <p className="text-muted-foreground text-lg">
          Gerencie suas informações pessoais e configurações de conta
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Avatar Section */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <Card className="text-center">
            {/* <Header avatar={avatar} user={user} /> */}
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
                      <Crown className="w-4 h-4 text-primary" />
                      <span className="text-primary font-medium">
                        Plano PRO
                      </span>
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
          </Card>
        </motion.div>

        {/* Profile Information */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
          <ProfileInformation />

          {/* Password Section */}
          {showPasswordChange && <PasswordSection />}
        </motion.div>
      </div>
    </motion.div>
  )
}
