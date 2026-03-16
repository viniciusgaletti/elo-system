export function handleSupabaseError(error: any): string {
  if (!error) return 'Ocorreu um erro inesperado. Tente novamente.'
  if (
    error.message === 'Failed to fetch' ||
    (error.message && error.message.includes('Network Error'))
  ) {
    return 'Sem conexao. Verifique sua internet e tente novamente.'
  }
  switch (error.code) {
    case 'PGRST116':
      return 'Registro nao encontrado.'
    case '23505':
      return 'Este registro ja existe.'
    case '42501':
      return 'Sem permissao para realizar esta acao.'
    default:
      return 'Ocorreu um erro inesperado. Tente novamente.'
  }
}
