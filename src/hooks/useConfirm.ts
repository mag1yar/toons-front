import { useConfirmationStore } from '../zustand';

function useConfirm() {
  const confirm = useConfirmationStore((state) => state.confirm);
  return confirm;
}

export default useConfirm;
