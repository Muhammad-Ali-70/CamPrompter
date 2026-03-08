import React, { useRef, useCallback } from 'react';

export const normalise = (word = '') =>
  word
    .toLowerCase()
    .replace(/[^a-z0-9']/g, '') // keep apostrophes so contractions survive
    .replace(/'/g, ''); // then strip apostrophes too for matching

export const tokenise = (text = '') =>
  text.split(/\s+/).map(normalise).filter(Boolean);

export const levenshtein = (a, b) => {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      matrix[i][j] =
        b[i - 1] === a[j - 1]
          ? matrix[i - 1][j - 1]
          : Math.min(
              matrix[i - 1][j - 1] + 1, // substitute
              matrix[i][j - 1] + 1, // insert
              matrix[i - 1][j] + 1, // delete
            );
    }
  }
  return matrix[b.length][a.length];
};

export const wordsMatch = (a, b) => {
  if (a === b) return true;
  const maxLen = Math.max(a.length, b.length);
  if (maxLen <= 3) return false; // short words must be exact
  return levenshtein(a, b) <= 1; // allow 1 typo/mishear for longer words
};

export const findMatchPosition = (
  scriptTokens,
  spokenTokens,
  searchFrom = 0,
  windowSize = 4,
  lookahead = 30,
) => {
  if (!spokenTokens.length || !scriptTokens.length) return -1;

  const window = spokenTokens.slice(-windowSize);
  const wLen = window.length;

  let bestScriptEnd = -1;
  let bestMatchCount = 0;

  const searchEnd = Math.min(
    searchFrom + lookahead,
    scriptTokens.length - wLen,
  );

  for (let si = searchFrom; si <= searchEnd; si++) {
    let matchCount = 0;
    for (let wi = 0; wi < wLen; wi++) {
      if (
        si + wi < scriptTokens.length &&
        wordsMatch(window[wi], scriptTokens[si + wi])
      ) {
        matchCount++;
      }
    }
    if (
      matchCount > bestMatchCount &&
      matchCount >= Math.max(1, Math.ceil(wLen / 2))
    ) {
      bestMatchCount = matchCount;
      bestScriptEnd = si + wLen - 1;
    }
  }

  return bestScriptEnd;
};

const useWordMatcher = (script = '') => {
  const scriptTokensRef = useRef(tokenise(script));
  const searchFromRef = useRef(0); // never search behind this position
  const [highlightIndex, setHighlightIndex] = React.useState(0);

  React.useEffect(() => {
    scriptTokensRef.current = tokenise(script);
    searchFromRef.current = 0;
    setHighlightIndex(0);
  }, [script]);

  const updateTranscript = useCallback((transcriptText = '') => {
    const spokenTokens = tokenise(transcriptText);
    if (!spokenTokens.length) return;

    const matchedIdx = findMatchPosition(
      scriptTokensRef.current,
      spokenTokens,
      searchFromRef.current,
    );

    if (matchedIdx > -1 && matchedIdx >= searchFromRef.current) {
      searchFromRef.current = matchedIdx;
      setHighlightIndex(matchedIdx);
    }
  }, []);

  const reset = useCallback(() => {
    searchFromRef.current = 0;
    setHighlightIndex(0);
  }, []);

  return { highlightIndex, updateTranscript, reset };
};

export default useWordMatcher;
