import useModalStore from "../../store/useModalStore";
import CategoryModal from "./CategoryModal";
import ConfirmModal from "./ConfirmModal";
import PostcodeModal from "./PostcodeModal.tsx";
import PaymentModal from "./PaymentModal.tsx";

const MODAL_COMPONENTS = {
    CATEGORY_FORM: CategoryModal,
    CONFIRM: ConfirmModal,
    POSTCODE: PostcodeModal,
    PAYMENT: PaymentModal,
};

const GlobalModal = () => {
    const { modalType, isOpen } = useModalStore();

    if (!isOpen || !modalType) return null;

    const SpecificModal = MODAL_COMPONENTS[modalType];

    return <SpecificModal />;
};

export default GlobalModal;
