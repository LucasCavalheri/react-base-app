import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Eye, EyeOff, Loader, Loader2, Lock, Save, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  updatePasswordSchema,
  type UpdatePasswordSchema
} from '@/schemas/auth/update-password-schema'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'
import { useUpdatePassword } from '@/http/api/hooks/users/use-update-password'

export function PasswordSection() {
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const passwordForm = useForm<UpdatePasswordSchema>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  })

  const {
    mutateAsync: updatePasswordMutate,
    isPending: isPendingUpdatePassword
  } = useUpdatePassword()

  const handleSavePassword = async (data: UpdatePasswordSchema) => {
    try {
      await updatePasswordMutate(data)
      toast.success('Senha atualizada com sucesso')
      setIsChangingPassword(false)
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error)

        if (error.status === 400) {
          passwordForm.setError('currentPassword', {
            type: 'manual',
            message: error.response?.data.message
          })
          return toast.error('Erro ao atualizar senha', {
            description: error.response?.data.message
          })
        }

        return toast.error('Houve um erro ao atualizar a senha', {
          description: 'Por favor, tente novamente mais tarde.'
        })
      }
    } finally {
    }
  }

  const handleCancel = () => {
    setIsChangingPassword(false)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Segurança
          </CardTitle>
          <CardDescription>
            Altere sua senha para manter sua conta segura
          </CardDescription>
        </div>
        <Button
          variant={isChangingPassword ? 'destructive' : 'outline'}
          size="sm"
          onClick={
            isChangingPassword
              ? handleCancel
              : () => setIsChangingPassword(true)
          }
        >
          {isChangingPassword ? (
            <>
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </>
          ) : (
            <>
              <Lock className="w-4 h-4 mr-2" />
              Alterar Senha
            </>
          )}
        </Button>
      </CardHeader>
      {isChangingPassword && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <CardContent>
            <form
              onSubmit={passwordForm.handleSubmit(handleSavePassword)}
              className="space-y-4"
            >
              <Field>
                <FieldLabel htmlFor="currentPassword">Senha Atual</FieldLabel>
                <FieldContent>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="currentPassword"
                      type={showCurrentPassword ? 'text' : 'password'}
                      placeholder="Digite sua senha atual"
                      className="pl-9 pr-10"
                      {...passwordForm.register('currentPassword')}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {passwordForm.formState.errors.currentPassword && (
                    <FieldError>
                      {passwordForm.formState.errors.currentPassword.message}
                    </FieldError>
                  )}
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel htmlFor="newPassword">Nova Senha</FieldLabel>
                <FieldContent>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="newPassword"
                      type={showNewPassword ? 'text' : 'password'}
                      placeholder="Digite sua nova senha"
                      className="pl-9 pr-10"
                      {...passwordForm.register('newPassword')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {passwordForm.formState.errors.newPassword && (
                    <FieldError>
                      {passwordForm.formState.errors.newPassword.message}
                    </FieldError>
                  )}
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel htmlFor="confirmPassword">
                  Confirmar Nova Senha
                </FieldLabel>
                <FieldContent>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirme sua nova senha"
                      className="pl-9 pr-10"
                      {...passwordForm.register('confirmPassword')}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {passwordForm.formState.errors.confirmPassword && (
                    <FieldError>
                      {passwordForm.formState.errors.confirmPassword.message}
                    </FieldError>
                  )}
                </FieldContent>
              </Field>

              <div className="flex gap-2 pt-4">
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={
                    isPendingUpdatePassword ||
                    passwordForm.formState.isSubmitting
                  }
                >
                  {isPendingUpdatePassword ||
                  passwordForm.formState.isSubmitting ? (
                    <Loader2 className="w-4 h-4 mr-2" />
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Alterar Senha
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </motion.div>
      )}
    </Card>
  )
}
