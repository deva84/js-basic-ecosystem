function stringEraser(str: string, substr: string): string {
  if (typeof str !== 'string' || typeof substr !== 'string') {
    return 'Only string type is supported!'
  }
  if (str === '') return str;
  return str.slice(0, str.indexOf(substr)).concat(str.slice(str.indexOf(substr) + substr.length));
}

export { stringEraser };
