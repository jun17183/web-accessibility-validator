interface BoxTitleProps {
  children: string
}

export default function BoxTitle({ children }: BoxTitleProps) {
  return (
    <span className='text-2xl pl-2 pb-2'>{children}</span>
  );
}