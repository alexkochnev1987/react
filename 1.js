function sostavChisla(massivChisel, chislo) {
  const results = [];

  function backtrack(combination, start, target) {
    if (target < 0) return;
    if (target === 0) {
      results.push([...combination]);
      return;
    }

    for (let i = start; i < massivChisel.length; i++) {
      if (i > start && massivChisel[i] === massivChisel[i - 1]) continue;
      combination.push(massivChisel[i]);
      backtrack(combination, i + 1, target - massivChisel[i]);
      combination.pop();
    }
  }

  massivChisel.sort((a, b) => a - b);
  backtrack([], 0, chislo);
  return results;
}
