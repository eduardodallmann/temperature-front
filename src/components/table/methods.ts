export const getNodeText = (node: React.ReactNode): string => {
  if (['string', 'number'].includes(typeof node)) return node?.toString() || '';
  if (node instanceof Array) return node.map(getNodeText).join('');
  if (typeof node === 'object' && node)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return getNodeText((node as any)?.props.children);
  return '';
};
