export const forClass = (tree, target) => {
  const classRegex = new RegExp(`(^|(\\s))(${target})((\\s)|$)`);
  if (!tree || !tree.props) {
    return false;
  }
  let children = tree.props.children;
  if (!children) {
    return false;
  }
  if (classRegex.test(tree.props.className)) {
    return tree;
  }
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      const child = children[i];

      const foundInChildren = forClass(child, target);
      if (foundInChildren) {
        return foundInChildren;
      }
    }
  } else {
    const foundInChildren = forClass(children, target);
    if (foundInChildren) {
      return foundInChildren;
    }
  }
  return false;
};