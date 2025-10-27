import { Link } from 'react-router'
import { env } from '@/env'
import { AppleIconSvg } from '@/components/svg/apple-icon-svg'
import { GoogleIconSvg } from '@/components/svg/google-icon-svg'
import { MetaIconSvg } from '@/components/svg/meta-icon-svg'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'

export function RegisterForm() {
  return (
    <form className="p-6 md:p-8">
      <FieldGroup>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Cadastro</h1>
          <p className="text-muted-foreground text-balance">
            Faça cadastro em sua conta {env.VITE_APP_NAME}!
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Nome</FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="Seu nome completo"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="email@exemplo.com"
            required
          />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Senha</FieldLabel>
            <Link
              to="#"
              className="ml-auto text-sm underline-offset-2 hover:underline"
            >
              Esqueceu sua senha?
            </Link>
          </div>
          <div className="flex flex-col gap-1">
            <Input
              id="password"
              type="password"
              placeholder="*******"
              required
            />
            <span className="text-xs text-muted-foreground">
              Sua senha deve ter pelo menos 6 caracteres
            </span>
          </div>
        </Field>
        <Field>
          <Button type="submit">Cadastrar</Button>
        </Field>
        <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
          Ou continue com
        </FieldSeparator>
        <Field className="grid grid-cols-3 gap-4">
          <Button variant="outline" type="button">
            <AppleIconSvg />
          </Button>
          <Button variant="outline" type="button">
            <GoogleIconSvg />
          </Button>
          <Button variant="outline" type="button">
            <MetaIconSvg />
          </Button>
        </Field>
        <FieldDescription className="text-center">
          Já tem uma conta? <Link to="/login">Faça login</Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  )
}
