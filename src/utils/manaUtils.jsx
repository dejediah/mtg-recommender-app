import React from 'react';

export const renderManaSymbols = (manaCost) => {
  if (!manaCost) return null;

  const regex = /{(.*?)}/g;
  const symbols = [];
  let match;

  while ((match = regex.exec(manaCost)) !== null) {
    // Standardizing the symbol name for the 'mana-font' classes
    const symbol = match[1].toLowerCase().replace("/", ""); 
    symbols.push(
      <i key={Math.random()} className={`ms ms-${symbol} ms-cost`}></i>
    );
  }

  return symbols;
};

export const renderOracleText = (text) => {
  if (!text) return null;

  // This regex finds anything inside curly braces { }
  const regex = /{(.*?)}/g;
  
  // Split the text by the symbols, but keep the symbols in the array
  const parts = text.split(/({.*?})/g);

  return parts.map((part, index) => {
    if (part.match(regex)) {
      // It's a symbol! Clean it up (remove braces and slashes)
      const symbol = part.replace(/{|}|/g, "").toLowerCase().replace("/", "");
      return (
        <i 
          key={index} 
          className={`ms ms-${symbol} ms-cost`}
          style={{ fontSize: '0.8em', margin: '3px 0px' }}
        ></i>
      );
    }
    // It's just regular text
    return part;
  });
};