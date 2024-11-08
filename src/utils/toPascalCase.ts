const toPascalCase = (str: string) => {
  console.log(typeof str);

  return str.replace(/\w+/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).replace(/\s+/g, '');
};

export default toPascalCase;
