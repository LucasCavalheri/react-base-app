import { Link } from 'react-router'
import { Card, CardContent } from '@/components/ui/card'
import { FieldDescription } from '@/components/ui/field'
import { RegisterForm } from './components/register-form'
import { FormImage } from '@/components/form-image'

export function RegisterPage() {
  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2 items-start">
          <FormImage/>
          <RegisterForm />
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        Ao clicar em continuar, você concorda com os{' '}
        <Link to="#">Termos de Serviço</Link> e{' '}
        <Link to="#">Política de Privacidade</Link>.
      </FieldDescription>
    </div>
  )
}
