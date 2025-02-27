import { createPortal } from 'react-dom';

export default function ModalPortal({
  children
}: {
  children: React.ReactNode;
}) {
  const el = document.getElementById('modal');

  return createPortal(children, el!);
}
