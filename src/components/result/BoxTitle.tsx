interface BoxTitleProps {
  children: string
}

export default function BoxTitle({ children }: BoxTitleProps) {
  return (
    <div className='flex-none text-2xl pl-2 pb-2'>{children}</div>
  );
}