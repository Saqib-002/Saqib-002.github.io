import { useEffect } from 'react';
const stack = [];
let previousOverflow = '';
export default function useModal(isOpen, onClose, ref) {
  useEffect(() => {
    if (!isOpen) return;
    const dialog = ref.current;
    const previousFocus = document.activeElement;
    if (!stack.length) {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
    stack.push(dialog);
    const elements = () => [...dialog.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),video[controls],[tabindex="0"]')].filter(el => el.getClientRects().length);
    (dialog.querySelector('[data-modal-autofocus]') || elements()[0] || dialog).focus();
    const contain = event => {
      if (stack.at(-1) === dialog && !dialog.contains(event.target)) (elements()[0] || dialog).focus();
    };
    const keydown = event => {
      if (stack.at(-1) !== dialog) return;
      if (event.key === 'Escape') { event.preventDefault(); onClose(); }
      if (event.key === 'Tab') {
        const list = elements(), first = list[0], last = list.at(-1);
        if (!first) { event.preventDefault(); dialog.focus(); }
        else if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', keydown);
    document.addEventListener('focusin', contain);
    return () => {
      document.removeEventListener('keydown', keydown);
      document.removeEventListener('focusin', contain);
      const wasTop = stack.at(-1) === dialog;
      stack.splice(stack.indexOf(dialog), 1);
      if (!stack.length) document.body.style.overflow = previousOverflow;
      if (wasTop && previousFocus?.isConnected) previousFocus.focus();
    };
  }, [isOpen, onClose, ref]);
}
