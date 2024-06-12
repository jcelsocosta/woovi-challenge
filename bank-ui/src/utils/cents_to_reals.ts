function centsToReals(cents: string | null): string {
  if (cents) {
    const reals = Number(cents) / 100;

    return reals.toLocaleString('pt-BR', {minimumFractionDigits: 2});
  }

  return '0'
}

export { centsToReals };
