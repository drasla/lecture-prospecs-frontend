import { FILTER_GENDERS, FILTER_SIZES, FILTER_STYLES } from "../../constants/filter.const";

interface FilterSidebarProps {
    selectedStyles: string[];
    selectedGenders: string[];
    selectedSizes: string[];
    onFilterChange: (type: "styles" | "genders" | "sizes", value: string) => void;
    onReset: () => void;
}

const FilterSidebar = ({
    selectedStyles,
    selectedGenders,
    selectedSizes,
    onFilterChange,
    onReset,
}: FilterSidebarProps) => {
    // 체크박스/버튼 공통 핸들러
    const handleChange = (type: "styles" | "genders" | "sizes", value: string) => {
        onFilterChange(type, value);
    };

    return (
        <aside className="w-64 pr-8 space-y-10 h-fit">
            {/* 초기화 버튼 */}
            <div className="flex justify-between items-center pb-4 border-b border-black">
                <h2 className="font-bold text-lg">FILTER</h2>
                <button
                    onClick={onReset}
                    className="text-xs text-gray-500 underline hover:text-black">
                    초기화
                </button>
            </div>

            {/* 1. 종류 (Style) - 체크박스 리스트 */}
            <div className="space-y-4">
                <h3 className="font-bold text-sm">종류</h3>
                <div className="space-y-2  pr-2">
                    {FILTER_STYLES.map(style => (
                        <label
                            key={style.value}
                            className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={selectedStyles.includes(style.value)}
                                onChange={() => handleChange("styles", style.value)}
                                className="w-4 h-4 border-gray-300 rounded focus:ring-black accent-black"
                            />
                            <span className="text-sm text-gray-600 group-hover:text-black transition-colors">
                                {style.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* 2. 성별 (Gender) - 체크박스 리스트 */}
            <div className="space-y-4">
                <h3 className="font-bold text-sm">성별</h3>
                <div className="space-y-2">
                    {FILTER_GENDERS.map(gender => (
                        <label
                            key={gender.value}
                            className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={selectedGenders.includes(gender.value)}
                                onChange={() => handleChange("genders", gender.value)}
                                className="w-4 h-4 border-gray-300 rounded focus:ring-black accent-black"
                            />
                            <span className="text-sm text-gray-600 group-hover:text-black transition-colors">
                                {gender.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* 3. 사이즈 (Size) - 그리드 버튼 */}
            <div className="space-y-4">
                <h3 className="font-bold text-sm">사이즈</h3>
                <div className="flex flex-wrap gap-2">
                    {FILTER_SIZES.map(size => {
                        const isSelected = selectedSizes.includes(size);
                        return (
                            <button
                                key={size}
                                onClick={() => handleChange("sizes", size)}
                                className={`text-xs py-2 px-3 border transition-all rounded-sm ${
                                    isSelected
                                        ? "bg-black text-white border-black font-bold"
                                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                                }`}>
                                {size}
                            </button>
                        );
                    })}
                </div>
            </div>
        </aside>
    );
};

export default FilterSidebar;
