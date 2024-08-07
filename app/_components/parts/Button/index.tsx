import { ComponentPropsWithoutRef } from 'react';

export const Button = (
  props: Omit<ComponentPropsWithoutRef<'button'>, 'className'>
) => {
  return (
    <button className="px-5 py-2 bg-green-600 rounded text-white" {...props} />
  );
};
