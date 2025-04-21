/**
 * Valida um CEP brasileiro.
 * @param cep - String contendo o CEP (com ou sem hífen)
 * @returns true se for um CEP válido, false caso contrário
 */
export function validateCep(cep: string): boolean {
  // Expressão regular: 5 dígitos + opcionalmente um hífen + 3 dígitos
  const regex = /^[0-9]{5}-?[0-9]{3}$/
  return regex.test(cep.trim())
}
