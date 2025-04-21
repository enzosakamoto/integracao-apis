import { useState } from 'react'
import { validateCep } from './utils/helpers/validate-cep'
import { httpRequest } from './utils/http-request'
import { ViaCepResponse } from './utils/types/via-cep-reponse'
import { LuLoaderCircle } from 'react-icons/lu'

export function App() {
  const [cep, setCep] = useState('')
  const [response, setResponse] = useState<ViaCepResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validateCep(cep)) {
      setError('CEP inválido. Use 12345678 ou 12345-678.')
      return
    }
    setError('')
    setResponse(null)
    setIsLoading(true)
    try {
      const response = await httpRequest<ViaCepResponse>({
        url: `https://viacep.com.br/ws/${cep}/json/`,
        method: 'GET'
      })

      if (response.erro) {
        setError('CEP não encontrado.')
        setResponse(null)
        return
      }

      await new Promise((resolve) => setTimeout(resolve, 1000))

      setResponse(response)
    } catch (error) {
      setError('Erro ao buscar o CEP. Tente novamente.')
      setResponse(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex flex-col items-center justify-center">
      <div className="flex min-h-screen w-full max-w-5xl flex-col items-center justify-center gap-4">
        <form
          className="flex h-1/2 w-4/5 flex-col gap-8 rounded-xl bg-white p-6 drop-shadow-sm/15 drop-shadow-black sm:w-1/2"
          onSubmit={handleSubmit}
        >
          <h1 className="text-center text-2xl font-bold">Buscar pelo CEP</h1>
          <div className="flex flex-col justify-center gap-2">
            <label htmlFor="cep">Digite um CEP:</label>
            <input
              id="cep"
              type="text"
              onChange={(e) => setCep(e.target.value)}
              className="rounded-md border-[1px] border-black/30 px-2 py-1 outline-black"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <div className="flex w-full items-center justify-center">
            <button
              className="cursor-pointer rounded-xl bg-black px-3 py-2 text-white disabled:cursor-not-allowed disabled:opacity-30"
              // onClick={handleSubmit}
              disabled={isLoading || !cep}
              type="submit"
            >
              Enviar
            </button>
          </div>
        </form>
        {isLoading && (
          <LuLoaderCircle className="mt-16 animate-spin" size={32} />
        )}
        {response && (
          <div className="flex h-1/2 w-4/5 flex-col rounded-xl bg-white p-6 drop-shadow-sm/15 drop-shadow-black sm:w-1/2">
            {response.cep && (
              <p>
                <b>CEP:</b> {response.cep}
              </p>
            )}
            {response.logradouro && (
              <p>
                <b>Logradouro:</b> {response.logradouro}
              </p>
            )}
            {response.complemento && (
              <p>
                <b>Complemento:</b> {response.complemento}
              </p>
            )}
            {response.unidade && (
              <p>
                <b>Unidade:</b> {response.unidade}
              </p>
            )}
            {response.bairro && (
              <p>
                <b>Bairro:</b> {response.bairro}
              </p>
            )}
            {response.localidade && (
              <p>
                <b>Cidade:</b> {response.localidade}
              </p>
            )}
            {response.uf && (
              <p>
                <b>UF:</b> {response.uf}
              </p>
            )}
            {response.estado && (
              <p>
                <b>Estado:</b> {response.estado}
              </p>
            )}
            {response.regiao && (
              <p>
                <b>Região:</b> {response.regiao}
              </p>
            )}
            {response.ddd && (
              <p>
                <b>DDD:</b> {response.ddd}
              </p>
            )}
            {response.ibge && (
              <p>
                <b>IBGE:</b> {response.ibge}
              </p>
            )}
            {response.gia && (
              <p>
                <b>GIA:</b> {response.gia}
              </p>
            )}
            {response.siafi && (
              <p>
                <b>SIAFI:</b> {response.siafi}
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
