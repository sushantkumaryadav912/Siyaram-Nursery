const formatCategoryName = (categoryName) => {
  const categoryNameArray = categoryName.split('-');
  return categoryNameArray.join(' ');
};

const convertCategoryNameToURLFriendly = (categoryName) => {
  const categoryNameArray = categoryName.split(' ');
  return categoryNameArray.join('-');
};

export { formatCategoryName, convertCategoryNameToURLFriendly };