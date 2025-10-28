import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  CreditCard,
  Shield,
  Crown,
  Check,
  Phone,
  FileText,
  Sparkles,
  Lock,
  Zap,
  Star
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Field, FieldContent, FieldLabel } from '@/components/ui/field'
import { Separator } from '@/components/ui/separator'

const proFeatures = [
  'Acesso ilimitado a todas as funcionalidades',
  'Suporte prioritário 24/7',
  'Relatórios avançados e analytics',
  'Integração com APIs externas',
  'Backup automático na nuvem'
]

export function UpgradePlanPage() {
  const [formData, setFormData] = useState({
    cpf: '',
    phone: ''
  })
  const [isProcessing, setIsProcessing] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  const sparkleAnimation = {
    scale: [1, 1.2, 1],
    rotate: [0, 180, 360],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut' as const
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsProcessing(false)
    // Handle payment success/error
  }

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container max-w-6xl mx-auto p-6 space-y-8"
    >
      {/* Header with Sparkles */}
      <motion.div
        variants={itemVariants}
        className="text-center space-y-6 relative"
      >
        <motion.div
          animate={sparkleAnimation}
          className="absolute -top-4 -left-4 text-primary"
        >
          <Sparkles className="w-8 h-8" />
        </motion.div>
        <motion.div
          animate={{
            ...sparkleAnimation,
            transition: {
              ...sparkleAnimation.transition,
              delay: 0.5
            }
          }}
          className="absolute -top-2 -right-8 text-primary"
        >
          <Sparkles className="w-6 h-6" />
        </motion.div>

        <div className="space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-primary text-primary-foreground rounded-full mx-auto shadow-lg"
          >
            <Crown className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-primary/70">
            Upgrade para PRO
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Desbloqueie todo o potencial da plataforma com recursos premium e
            suporte prioritário
          </p>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Plan Details */}
        <motion.div variants={itemVariants} className="space-y-6">
          <Card className="border-2 border-border">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Crown className="w-6 h-6 text-primary" />
                <CardTitle className="text-2xl text-primary">
                  Plano PRO
                </CardTitle>
              </div>
              <div className="space-y-2">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-primary">R$ 49</span>
                  <span className="text-lg text-primary/80">,90</span>
                  <span className="text-sm text-muted-foreground">/mês</span>
                </div>
                <CardDescription className="text-center text-muted-foreground">
                  Acesso completo a todos os recursos premium
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                {proFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="shrink-0 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-primary" />
                <span>Pagamento 100% seguro e criptografado</span>
              </div>
            </CardContent>
          </Card>

          {/* Trust Indicators */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-4 text-center"
          >
            <div className="space-y-2">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <div className="text-xs text-muted-foreground">
                <div className="font-medium">Seguro</div>
                <div>SSL 256-bit</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div className="text-xs text-muted-foreground">
                <div className="font-medium">Instantâneo</div>
                <div>Ativação imediata</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <div className="text-xs text-muted-foreground">
                <div className="font-medium">Garantia</div>
                <div>7 dias</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Payment Form */}
        <motion.div variants={itemVariants}>
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Finalizar Pagamento
              </CardTitle>
              <CardDescription>
                Preencha seus dados para processar o pagamento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Field>
                  <FieldLabel htmlFor="cpf">CPF</FieldLabel>
                  <FieldContent>
                    <div className="relative">
                      <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="cpf"
                        value={formData.cpf}
                        onChange={(e) => {
                          const formatted = formatCPF(e.target.value)
                          if (formatted.length <= 14) {
                            setFormData((prev) => ({ ...prev, cpf: formatted }))
                          }
                        }}
                        placeholder="000.000.000-00"
                        className="pl-9"
                        maxLength={14}
                        required
                      />
                    </div>
                  </FieldContent>
                </Field>

                <Field>
                  <FieldLabel htmlFor="phone">Número de Celular</FieldLabel>
                  <FieldContent>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => {
                          const formatted = formatPhone(e.target.value)
                          if (formatted.length <= 15) {
                            setFormData((prev) => ({
                              ...prev,
                              phone: formatted
                            }))
                          }
                        }}
                        placeholder="(11) 99999-9999"
                        className="pl-9"
                        maxLength={15}
                        required
                      />
                    </div>
                  </FieldContent>
                </Field>

                <Separator />

                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span>Plano PRO (mensal)</span>
                    <span>R$ 49,90</span>
                  </div>
                  <div className="flex justify-between items-center font-semibold text-lg border-t pt-4">
                    <span>Total</span>
                    <span className="text-primary">R$ 49,90</span>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="w-full h-12 text-lg"
                    disabled={isProcessing || !formData.cpf || !formData.phone}
                  >
                    {isProcessing ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: 'linear'
                        }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        <Crown className="w-5 h-5 mr-2" />
                        Upgrade para PRO - R$ 49,90
                      </>
                    )}
                  </Button>
                </motion.div>

                <div className="text-xs text-muted-foreground text-center space-y-1">
                  <p>
                    Ao continuar, você concorda com nossos termos de serviço.
                  </p>
                  <p>Pagamento processado de forma segura via PIX ou cartão.</p>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
