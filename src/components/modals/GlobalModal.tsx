import useModalStore from "../../store/useModalStore";
import CategoryModal from "./CategoryModal";
import ConfirmModal from "./ConfirmModal";

const MODAL_COMPONENTS = {
    CATEGORY_FORM: CategoryModal,
    CONFIRM: ConfirmModal,
};

const GlobalModal = () => {
    const { modalType, isOpen } = useModalStore();

    if (!isOpen || !modalType) return null;

    const SpecificModal = MODAL_COMPONENTS[modalType];

    return <SpecificModal />;
};

export default GlobalModal;