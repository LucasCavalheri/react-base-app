import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Ghost, ArrowLeft, Search, Sparkles, Home, User } from 'lucide-react'
import { Link, useLocation } from 'react-router'

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, staggerChildren: 0.12 } }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const float = {
  hidden: { y: 0 },
  visible: {
    y: [0, -8, 0],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const }
  }
}

export function NotFoundPage() {
  const location = useLocation()

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="container max-w-3xl mx-auto p-6 flex h-screen items-center justify-center"
    >
      <div className="relative flex flex-col items-center text-center">
        <motion.div
          variants={float}
          initial="hidden"
          animate="visible"
          className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-lg"
        >
          <Ghost className="h-12 w-12" />
        </motion.div>

        <motion.div variants={item} className="space-y-2 mb-2">
          <h1 className="text-4xl font-bold bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            404 - Página não encontrada
          </h1>
          <p className="text-muted-foreground text-lg">
            A rota <span className="font-semibold">{location.pathname}</span>{' '}
            não existe.
          </p>
        </motion.div>

        <motion.div variants={item} className="w-full">
          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-center gap-2">
                <Search className="h-5 w-5 text-primary" />
                <CardTitle>Você parece perdido</CardTitle>
              </div>
              <CardDescription className="text-center">
                Siga pelos botões abaixo para voltar ao caminho certo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                <Button asChild size="lg" className="h-11">
                  <Link to="/">
                    <Home className="mr-2 h-4 w-4" /> Ir para o início
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-11">
                  <Link to="/profile">
                    <User className="mr-2 h-4 w-4" /> Ir para o perfil
                  </Link>
                </Button>
              </div>
              <div className="pointer-events-none mt-6 flex items-center justify-center gap-4 text-primary/70">
                <Sparkles className="h-5 w-5" />
                <span className="text-sm">
                  Estamos sempre por aqui para ajudar
                </span>
                <Sparkles className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="mt-6">
          <Button asChild variant="ghost">
            <Link to={-1 as unknown as string}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}
