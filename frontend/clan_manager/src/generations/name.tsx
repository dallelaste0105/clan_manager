export function GenerateRandomName(): string {
  const vowels = ["a", "e", "i", "o", "u"];
  const consonants = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "r", "s", "t", "v", "w", "x", "z"];

  function createWord(minLen: number, maxLen: number): string {
    let word = "";
    const length = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
    let isVowel = Math.random() > 0.5;

    for (let i = 0; i < length; i++) {
      if (isVowel) {
        word += vowels[Math.floor(Math.random() * vowels.length)];
      } else {
        word += consonants[Math.floor(Math.random() * consonants.length)];
      }
      isVowel = !isVowel;
    }
    
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  if (Math.random() > 0.6) {
    const word1 = createWord(3, 8);
    const word2 = createWord(3, 8);
    
    const fullName = `${word1} ${word2}`;
    
    return fullName.length <= 20 ? fullName : word1;
  } else {
    return createWord(4, 12);
  }
}