function realsToCents(reals: string | null): string {
  if (reals) {
    const cents = Math.round(Number(reals) * 100);

    return cents.toString();
  }

  return '0';
}

export { realsToCents };
