import { useState } from 'react'
import {
  Edit3,
  IdCard,
  Loader2,
  Mail,
  Phone,
  Save,
  UserIcon,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  updateProfileSchema,
  type UpdateProfileSchema
} from '@/schemas/auth/update-profile-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'
import { useUpdateProfile } from '@/http/api/hooks/users/use-update-profile'
import { useAuth } from '@/contexts/auth-context'
import { cn } from '@/lib/utils'
import { useHookFormMask } from 'use-mask-input'
import type { User } from '@/models/user'

export function ProfileInformation() {
  const { user, setUser } = useAuth()

  const [isEditing, setIsEditing] = useState(false)

  const profileForm = useForm<UpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      whatsapp: user?.phone || '',
      document: user?.document || ''
    }
  })

  const registerWithMask = useHookFormMask(profileForm.register)

  const {
    mutateAsync: updateProfileMutateAsync,
    isPending: isPendingUpdateProfile
  } = useUpdateProfile()

  const handleSaveProfile = async (data: UpdateProfileSchema) => {
    try {
      const response = await updateProfileMutateAsync(data)

      const updatedUser: User = {
        ...response.user,
        authAccounts: response.user.authAccounts?.length
          ? response.user.authAccounts
          : user?.authAccounts ?? []
      }

      setUser(updatedUser)
      toast.success('Perfil atualizado com sucesso')
      profileForm.reset({
        name: response.user.name,
        email: response.user.email,
        whatsapp: response.user.phone,
        document: response.user.document
      })
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.status === 409) {
          profileForm.setError('email', {
            type: 'manual',
            message: 'Email já cadastrado'
          })
          profileForm.reset({
            name: user?.name,
            email: user?.email,
            whatsapp: user?.phone,
            document: user?.document
          })
          return toast.error('Email já cadastrado', {
            description: 'Este email já está cadastro por outro usuário'
          })
        }
        profileForm.reset({
          name: user?.name,
          email: user?.email,
          whatsapp: user?.phone,
          document: user?.document
        })
        return toast.error('Houve um erro ao atualizar o perfil', {
          description: 'Por favor tente novamente mais tarde'
        })
      }
    } finally {
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <UserIcon className="w-5 h-5" />
            Informações Pessoais
          </CardTitle>
          <CardDescription>Atualize suas informações básicas</CardDescription>
        </div>
        <Button
          variant={isEditing ? 'destructive' : 'outline'}
          size="sm"
          onClick={isEditing ? handleCancel : () => setIsEditing(true)}
        >
          {isEditing ? (
            <>
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </>
          ) : (
            <>
              <Edit3 className="w-4 h-4 mr-2" />
              Editar
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={profileForm.handleSubmit(handleSaveProfile)}>
          <Field>
            <FieldLabel htmlFor="name" className="-mb-2">
              Nome Completo
            </FieldLabel>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                disabled={!isEditing}
                {...profileForm.register('name')}
                className="pl-9"
              />
            </div>
            {profileForm.formState.errors.name && (
              <FieldError>
                {profileForm.formState.errors.name.message}
              </FieldError>
            )}
          </Field>

          <Field className="mt-5">
            <FieldLabel htmlFor="email" className="-mb-2">
              Email
            </FieldLabel>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                disabled={!isEditing}
                className={cn(
                  'pl-9',
                  profileForm.formState.errors.email && 'border-destructive'
                )}
                {...profileForm.register('email')}
              />
            </div>
            {profileForm.formState.errors.email && (
              <FieldError className="-mt-2">
                {profileForm.formState.errors.email.message}
              </FieldError>
            )}
          </Field>

          <Field className="mt-5">
            <FieldLabel htmlFor="whatsapp" className="-mb-2">
              WhatsApp
            </FieldLabel>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="whatsapp"
                type="tel"
                disabled={!isEditing}
                className={cn(
                  'pl-9',
                  profileForm.formState.errors.whatsapp && 'border-destructive'
                )}
                {...registerWithMask('whatsapp', ['(99) 99999-9999'], {
                  jitMasking: true
                })}
              />
            </div>
            {profileForm.formState.errors.whatsapp && (
              <FieldError className="-mt-2">
                {profileForm.formState.errors.whatsapp.message}
              </FieldError>
            )}
          </Field>

          <Field className="mt-5">
            <FieldLabel htmlFor="document" className="-mb-2">
              Documento
            </FieldLabel>
            <div className="relative">
              <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="document"
                type="text"
                disabled={!isEditing}
                className={cn(
                  'pl-9',
                  profileForm.formState.errors.document && 'border-destructive'
                )}
                {...registerWithMask(
                  'document',
                  ['999.999.999-99', '99.999.999/9999-99'],
                  {
                    jitMasking: true
                  }
                )}
              />
            </div>
            {profileForm.formState.errors.document && (
              <FieldError className="-mt-2">
                {profileForm.formState.errors.document.message}
              </FieldError>
            )}
          </Field>

          {isEditing && (
            <div className="flex gap-2 pt-4">
              <Button
                type="submit"
                className="flex-1"
                disabled={
                  isPendingUpdateProfile || profileForm.formState.isSubmitting
                }
              >
                {isPendingUpdateProfile ||
                profileForm.formState.isSubmitting ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Salvar Alterações
                  </>
                )}
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
