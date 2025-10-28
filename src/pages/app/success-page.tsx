import { motion } from 'framer-motion'
import { CheckCircle2, Crown, PartyPopper, Sparkles, Star, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/contexts/auth-context'
import { Link } from 'react-router'

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, staggerChildren: 0.12 }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const pop = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 160 }
  }
}

export function SuccessPage() {
  const { user } = useAuth()

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="container max-w-3xl mx-auto p-6"
    >
      <div className="relative">
        <motion.div
          variants={pop}
          className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl"
        >
          <Crown className="h-12 w-12" />
        </motion.div>

        <motion.div
          className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 flex gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Sparkles className="h-6 w-6 text-primary" />
          <PartyPopper className="h-6 w-6 text-primary" />
          <Star className="h-6 w-6 text-primary" />
        </motion.div>
      </div>

      <motion.div variants={item} className="text-center space-y-3 mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Assinatura PRO Ativada!
        </h1>
        <p className="text-muted-foreground text-lg">
          {user?.name ? `${user.name}, ` : ''}obrigado por apoiar nosso trabalho. Seu plano PRO já está ativo.
        </p>
      </motion.div>

      <motion.div variants={item}>
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-primary" />
              <CardTitle>Bem-vindo ao próximo nível</CardTitle>
            </div>
            <CardDescription className="text-center">
              Você desbloqueou recursos premium e suporte prioritário
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-lg border p-4">
              <Shield className="h-5 w-5 shrink-0 text-primary" />
              <div>
                <div className="font-medium">Acesso prioritário</div>
                <div className="text-sm text-muted-foreground">Atendimento mais rápido e dedicado.</div>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border p-4">
              <Star className="h-5 w-5 shrink-0 text-primary" />
              <div>
                <div className="font-medium">Funcionalidades PRO</div>
                <div className="text-sm text-muted-foreground">Relatórios, integrações e muito mais.</div>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border p-4">
              <Sparkles className="h-5 w-5 shrink-0 text-primary" />
              <div>
                <div className="font-medium">Experiência premium</div>
                <div className="text-sm text-muted-foreground">Mais performance e novidades primeiro.</div>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border p-4">
              <Crown className="h-5 w-5 shrink-0 text-primary" />
              <div>
                <div className="font-medium">Seu apoio importa</div>
                <div className="text-sm text-muted-foreground">Obrigado por fortalecer o projeto.</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item} className="mt-8 grid gap-3 sm:grid-cols-1">
        <Button asChild size="lg" className="h-11">
          <Link to="/">Ir para o Dashboard</Link>
        </Button>
      </motion.div>
    </motion.div>
  )
}
